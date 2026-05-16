import express from "express";
import cors from "cors";
import multer from "multer";
import { generateCaptions } from "./generate.js";
import { config, cloudinary } from "./config.js";
import { SOCIAL_MEDIA_SYSTEM_PROMPT, PLATFORM_PROMPTS } from "./prompt.js";
import { logger } from "./logger.js";

const app = express();
app.use(cors());
app.use(express.json({ limit: "10mb" }));

const upload = multer({ storage: multer.memoryStorage() });

app.post("/api/generate-caption", upload.single("image"), async (req, res) => {
  const reqId = Date.now().toString(36) + Math.random().toString(36).substring(2, 9);
  const log = logger.child({ reqId });
  const { language } = req.body;
  const file = req.file;

  log.info({ method: req.method, path: req.path, fileSize: file?.size, fileMimeType: file?.mimetype }, "Request received");

  if (!file) {
    log.warn("No image file provided");
    res.status(400).json({ error: "No image file provided" });
    return;
  }

  let cloudinaryUrl: string | null = null;
  let publicId: string | null = null;

  try {
    log.info({ folder: "autocaption" }, "Starting Cloudinary upload");
    const uploadStartTime = Date.now();

    const uploadResult = await new Promise<{ secure_url: string; public_id: string }>((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        { folder: "autocaption" },
        (error, result) => {
          if (error) reject(error);
          else if (!result) reject(new Error("Upload failed - no result"));
          else resolve(result);
        }
      );
      uploadStream.end(file.buffer);
    });

    const uploadDuration = Date.now() - uploadStartTime;
    cloudinaryUrl = uploadResult.secure_url;
    publicId = uploadResult.public_id;

    log.info({ publicId, cloudinaryUrl, uploadDuration }, "Cloudinary upload successful");

    log.info({ model: config.modelName, language, imageUrl: cloudinaryUrl }, "Calling GitHub Models");
    const generationStartTime = Date.now();

    const result = await generateCaptions({
      config,
      imageUrl: cloudinaryUrl,
      language,
      socialMediaSystemPrompt: SOCIAL_MEDIA_SYSTEM_PROMPT,
      platformPrompt: PLATFORM_PROMPTS,
      brandVoice: undefined,
      targetAudience: undefined,
      customPrompt: undefined,
      includeHashtags: true,
    });

    const generationDuration = Date.now() - generationStartTime;
    log.info({ generationDuration, result: result ? "success" : "null" }, "GitHub Models response received");

    if (publicId) {
      log.info({ publicId }, "Deleting image from Cloudinary");
      await cloudinary.uploader.destroy(publicId);
      log.info({ publicId }, "Cloudinary image deleted");
    }

    log.info({ statusCode: 200 }, "Request completed");
    res.json({ result });
  } catch (e: unknown) {
    const error = e as Error;
    log.error({ error: error.message, stack: error.stack }, "Error during request processing");

    if (publicId) {
      log.info({ publicId }, "Cleaning up: deleting image from Cloudinary after error");
      await cloudinary.uploader.destroy(publicId).catch((deleteErr) => {
        log.error({ error: (deleteErr as Error).message }, "Failed to delete Cloudinary image");
      });
    }

    res.status(500).json({ error: error.message });
  }
});

app.get("/", (req, res) => {
  res.status(200).json({ status: "ok", timestamp: new Date().toISOString() });
});

app.get("/health", (req, res) => {
  res.status(200).json({ status: "healthy", timestamp: new Date().toISOString() });
});

app.listen(3001, () => logger.info("Backend running on port 3001"));
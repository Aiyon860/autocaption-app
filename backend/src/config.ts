import dotenv from "dotenv";
import { v2 as cloudinary } from "cloudinary";
import type { ImageCaptionConfig } from "./types.ts";
dotenv.config();

cloudinary.config({
  cloud_name: process.env["CLOUDINARY_CLOUD_NAME"],
  api_key: process.env["CLOUDINARY_API_KEY"],
  api_secret: process.env["CLOUDINARY_API_SECRET"],
});

const config: ImageCaptionConfig = {
  token: process.env["GITHUB_TOKEN"],
  endpoint: "https://models.github.ai/inference",
  modelName: "openai/gpt-4o"
}

export { config, cloudinary };
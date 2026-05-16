import OpenAI from "openai";
import type {
  CaptionResults,
  generateCaptionsFuncProps,
  ImageCaptionConfig,
  PlatformPromptType,
} from "./types.ts";
import { logger } from "./logger.ts";

export async function generateCaptions({
  config,
  imageUrl,
  language,
  socialMediaSystemPrompt,
  platformPrompt,
  brandVoice,
  targetAudience,
  customPrompt,
  includeHashtags,
}: generateCaptionsFuncProps): Promise<CaptionResults | null> {
  const reqId = Date.now().toString(36) + Math.random().toString(36).substring(2, 9);
  const log = logger.child({ reqId });

  if (!config.token) {
    throw new Error("GITHUB_TOKEN environment variable is required");
  }

  const client = new OpenAI({
    baseURL: config.endpoint,
    apiKey: config.token,
  });

  const enhancedSystemPrompt = `${socialMediaSystemPrompt}
  🎭 BRAND VOICE: ${brandVoice?.toUpperCase()}
  🗣️ LANGUAGE: Please respond in ${language}
  ${targetAudience ? `🎯 TARGET AUDIENCE: ${targetAudience}` : ""}
  ${!includeHashtags ? "🚫 DO NOT include hashtags in the response" : ""}`;

  const userPrompt = customPrompt || platformPrompt.all;

  const requestPayload = {
    model: config.modelName,
    messages: [
      { role: "system", content: enhancedSystemPrompt },
      {
        role: "user",
        content: [
          { type: "text", text: userPrompt },
          { type: "image_url", image_url: { url: imageUrl, details: "low" } },
        ],
      },
    ],
    temperature: 1.0,
    max_completion_tokens: 2500,
  };

  log.debug({ request: requestPayload }, "GitHub Models request payload");

  try {
    log.info({ model: config.modelName, language }, "Sending request to GitHub Models");
    const response = await client.chat.completions.create(requestPayload);

    const responseLog = {
      model: response.model,
      created: response.created,
      choices: response.choices.map((choice) => ({
        index: choice.index,
        finishReason: choice.finish_reason,
        messageLength: choice.message.content?.length || 0,
      })),
      usage: response.usage,
    };

    log.info({ response: responseLog }, "GitHub Models response received");

    const raw = response.choices[0].message.content || "";

    log.debug({ rawResponse: raw }, "Raw model response");

    const jsonString = raw
      .trim()
      .replace(/^```(?:json)?\s*/i, "")
      .replace(/```$/, "")
      .split("**Strategy Explanation:**")[0]
      .trim();

    log.debug({ parsedJsonString: jsonString }, "Parsed JSON string");

    let parsed: CaptionResults;
    try {
      parsed = JSON.parse(jsonString);
      log.info({ parsedCaption: parsed }, "Successfully parsed caption response");
    } catch (err) {
      log.error({ jsonString, parseError: (err as Error).message }, "Failed to parse JSON from model response");
      return null;
    }

    return parsed;
  } catch (err) {
    const error = err as Error;
    log.error({ error: error.message, stack: error.stack }, "GitHub Models API error");
    throw err;
  }
}
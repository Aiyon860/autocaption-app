// Type definitions
interface ImageCaptionConfig {
  token?: string;
  endpoint: string;
  modelName: string;
};

type InputType = "text" | "image_url"
type DetailsType = "low" | "high" | "auto";

interface ImageMessage {
  type: InputType;
  text?: string;
  image_url?: {
    url: string;
    details?: DetailsType;
  }
}

type Roles = "system" | "user" | "assistant";
type ContentType = string | ImageMessage[];

interface ChatMessage {
  role: Roles,
  content: ContentType,
}

interface PlatformPromptType {
  whatsapp: string,
  twitter: string,
  facebook: string,
  linkedin: string,
  all: string,
}

interface CaptionResults {
  instagram: string;
  twitter: string;
  whatsapp: string;
  facebook: string;
  linkedin: string;
};

type LanguageType = 
  "English"     |
  "Indonesian"  |
  "Japanese"    |
  "Espanol"     ;

interface generateCaptionsFuncProps {
  config: ImageCaptionConfig;
  imageUrl: string;
  language: LanguageType;
  socialMediaSystemPrompt: string;
  platformPrompt: PlatformPromptType;
  brandVoice?: 'casual' | 'professional' | 'friendly' | 'authoritative' | 'playful';
  targetAudience?: string;
  customPrompt?: string;
  includeHashtags?: boolean;
}

export { ImageCaptionConfig, ImageMessage, ChatMessage, PlatformPromptType, generateCaptionsFuncProps, LanguageType, CaptionResults }
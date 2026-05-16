import type { ImageCaptionProps } from "../types/ImageCaption";

const API_URL = import.meta.env.VITE_API_URL || '';

export const generateImageCaption = async ({ imageFile, language }: ImageCaptionProps) => {
  try {
    const formData = new FormData();
    formData.append("image", imageFile);
    formData.append("language", language);

    const res = await fetch(`${API_URL}/api/generate-caption`, {
      method: "POST",
      body: formData,
    });

    if (!res.ok) {
      let errorMsg = `Failed to generate caption (status: ${res.status})`;
      try {
        const errorData = await res.json();
        if (errorData?.error) {
          errorMsg = errorData.error;
        } else if (errorData?.message) {
          errorMsg = errorData.message;
        }
      } catch {
        // Ignore JSON parse errors, keep default errorMsg
      }
      throw new Error(errorMsg);
    }

    let data;
    try {
      data = await res.json();
    } catch {
      throw new Error("Invalid server response (not JSON)");
    }

    if (!data || !data.result) {
      throw new Error("No caption result returned from server");
    }

    const captions = data.result;
    return captions;
  } catch (err: unknown) {
    if (typeof err === "object" && err !== null && "name" in err && "message" in err) {
      const errorObj = err as { name: string; message: string };
      
      if (errorObj.name === "TypeError" && errorObj.message.includes("Failed to fetch")) {
        throw new Error("Network error: Unable to reach the server");
      }

      if (errorObj.name === "AbortError") {
        throw new Error("Request was aborted");
      }

      throw new Error(errorObj.message || "Unknown error occurred");
    }
    throw new Error("Unknown error occurred");
  }
}
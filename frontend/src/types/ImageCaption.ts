type LanguageType = 
  "English"     |
  "Indonesian"  |
  "Japanese"    |
  "Espanol"     ;

export const languageOptions: LanguageType[] = [
  "English",
  "Indonesian",
  "Japanese",
  "Espanol"
];

interface ImageCaptionProps {
  imageFile: File,
  language: LanguageType,
};

interface CaptionResults {
  instagram: string;
  twitter: string;
  whatsapp: string;
  facebook: string;
  linkedin: string;
};

interface CaptionState {
  // Image data
  selectedImage: File | null;
  imagePreview: string | null;

  // User preference
  selectedLanguage: LanguageType;

  // Result
  captionResults: CaptionResults | null;

  // Loading and Error state
  isLoading: boolean;
  error: string | null;

  // Actions
  setSelectedImage: (file: File | null) => void;
  setImagePreview: (preview: string | null) => void;
  setSelectedLanguage: (language: string) => void;
  setCaptionResults: (result: CaptionResults | null) => void;
  setIsLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;

  // Utility actions
  resetAll: () => void;
  resetResults: () => void;
};

export type { 
  ImageCaptionProps, 
  LanguageType, 
  CaptionResults, 
  CaptionState
};
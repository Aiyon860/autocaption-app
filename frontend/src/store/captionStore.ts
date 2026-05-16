import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { CaptionState, LanguageType } from "../types/ImageCaption";

const initialState = {
  selectedImage: null,
  imagePreview: null,
  selectedLanguage: "English" as LanguageType,
  captionResults: null,
  isLoading: false,
  error: null,
}

// create store with persistance
const useCaptionStore = create<CaptionState>()(
  persist(
    (set) => ({
      ...initialState,

      // Actions
      setSelectedImage: (file) => {
        set({ selectedImage: file });

        if (file) {
          const reader = new FileReader();
          reader.onload = () => {
            set({ imagePreview: reader.result as string });
          };
        } else {
          set({ imagePreview: null });
        }
      },

      setImagePreview: (preview) => set({ imagePreview: preview }),

      setSelectedLanguage: (language) => set({ selectedLanguage: language as LanguageType }),

      setCaptionResults: (results) => set({ captionResults: results }),

      setIsLoading: (loading) => set({ isLoading: loading }),

      setError: (error) => set({ error }),

      resetAll: () => set(initialState as CaptionState),

      resetResults: () => set({
        captionResults: null,
        error: null,
        isLoading: false,
      })
    }),
    {
      name: "caption-store",   // localStorage key

      // Only persist user preferences, not file data
      partialize: (state) => ({
        selectedLanguage: state.selectedLanguage,
      })
    }
  )
);

export { useCaptionStore }
import { useNavigate } from "react-router";
import ImageUploader from "../components/ImageUploader";
import { generateImageCaption } from "../api/captionService";
import { 
  Dropdown, 
  DropdownTrigger, 
  DropdownMenu, 
  DropdownItem, 
  Button 
} from "@heroui/react";
import { useCaptionStore } from "../store/captionStore"
import { languageOptions } from "../types/ImageCaption";
import { X } from "lucide-react";
// import { useState } from 'react';

const HomePage = () => {
  const navigate = useNavigate();

  // const [result, setResult] = useState(null);

  // zustand store hooks
  const selectedImage = useCaptionStore((state) => state.selectedImage);
  const setSelectedImage = useCaptionStore((state) => state.setSelectedImage);

  const selectedLanguage = useCaptionStore((state) => state.selectedLanguage);
  const setSelectedLanguage = useCaptionStore((state) => state.setSelectedLanguage);

  const isLoading = useCaptionStore((state) => state.isLoading);
  const error = useCaptionStore((state) => state.error);
  const setCaptionResults = useCaptionStore((state) => state.setCaptionResults);
  const setIsLoading = useCaptionStore((state) => state.setIsLoading);
  const setError = useCaptionStore((state) => state.setError);

  const handleGenerateCaption = async () => {
    if (!selectedImage) {
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const results = await generateImageCaption({ 
        imageFile: selectedImage,
        language: selectedLanguage,
      });
      setCaptionResults(results);

      navigate("/results");
    } catch (error: unknown) {
      if (typeof error === "string") {
        setError(error.toUpperCase())
      } else if (error instanceof Error) {
        setError(error.message);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleImageRemove = () => {
    setSelectedImage(null);
    setError(null);
  };

  return (
    <>
      {/* Header */}
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold text-gray-900">
          Generate AI Captions
        </h1>
        <p className="text-lg text-gray-600">
          Upload an image and get captions for 5 different social media platforms
        </p>
      </div>

      {/* Image Uploader */}
      <div className="w-full flex flex-col justify-center items-center">
        <ImageUploader
          onImageSelect={setSelectedImage}
          onImageRemove={handleImageRemove}
          selectedImage={selectedImage}
          maxSize={10} // in MB
          acceptedTypes={["image/jpeg", "image/png", "image/webp"]}
          disabled={isLoading}
        />
      </div>

      {/* Language & Tone Selection */}
      {selectedImage && (
        <div className="flex justify-center items-center">
          <div className="flex gap-4 justify-center items-center">
            <label className="block text-sm font-medium text-gray-700">
              Language:
            </label>
            <Dropdown isDisabled={isLoading}>
              <DropdownTrigger>
                <Button 
                  className="capitalize" 
                  variant="ghost" 
                  color="primary" 
                  size="md" 
                >
                  {selectedLanguage}
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                disallowEmptySelection
                aria-label="Single selection example"
                selectedKeys={selectedLanguage}
                selectionMode="single"
                variant="flat"
                onSelectionChange={(keys) => {
                  const selected = Array.from(keys)[0];
                  if (typeof selected === "string") {
                    setSelectedLanguage(selected);
                  }
                }}
              >
              {languageOptions.map(language => (
                <DropdownItem key={language}>{language}</DropdownItem>
              ))}
              </DropdownMenu>
            </Dropdown>
          </div>
        </div>
      )}

      {/* Button to Submit Image */}
      {selectedImage && !error && (
        <div className="flex justify-center">
          <Button 
            isLoading={isLoading} 
            onPress={handleGenerateCaption} 
            color="primary" 
            size="lg"
            className="w-full md:w-auto px-8"
          >
            {isLoading ? "Generating..." : "Generate Captions!"}
          </Button>
        </div>
      )}

      {/* Error Display */}
      {error && (
        <div className="flex justify-center items-center">
          <div className="flex items-center justify-between gap-x-4 py-4 px-8 bg-red-50 border border-red-200 rounded-lg max-w-fit relative">
            <p className="text-red-600">{error}</p>
            <button
              onClick={(e) => {
                e.stopPropagation();
                setError(null);
              }}
              className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </>
  )
};

export default HomePage;
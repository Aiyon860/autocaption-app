import { useState, useRef, useEffect, useCallback } from "react";
import type { FC, DragEvent, ChangeEvent } from "react";
import { Upload, X, Image as ImageIcon } from "lucide-react";

interface ImageUploaderProps {
  onImageSelect: (file: File) => void;
  onImageRemove: () => void;
  selectedImage?: File | null;
  maxSize?: number; // in MB
  acceptedTypes?: string[];
  disabled?: boolean;
}

const ImageUploader: FC<ImageUploaderProps> = ({ 
  onImageSelect, 
  onImageRemove, 
  selectedImage, 
  maxSize, 
  acceptedTypes, 
  disabled 
}) => {
  const [isDragOver, setIsDragOver] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (selectedImage) {
      const fileUrl = URL.createObjectURL(selectedImage);
      setPreviewUrl(fileUrl);
    } else {
      setPreviewUrl(null);
    }
  }, [selectedImage]);

  const validateFile = useCallback((file: File): string | null => {
    if (!acceptedTypes?.includes(file.type)) {
      return `File type not supported. Please use: ${acceptedTypes?.map(type => type.split('/')[1]).join(', ')}`;
    }

    const fileSizeMB = file.size / (1024 * 1024);
    if (maxSize && fileSizeMB > maxSize) {
      return `File size too large. Maximum size: ${maxSize}MB`;
    }

    return null;
  }, [acceptedTypes, maxSize]);

  const handleFileSelect = useCallback((file: File) => {
    const validationError = validateFile(file);
    if (validationError) {
      setError(validationError);
      return;
    }

    setError(null);
    onImageSelect(file);
  }, [validateFile, onImageSelect]);

  const handleDragOver = useCallback((e: DragEvent) => {
    e.preventDefault();
    if (!disabled) {
      setIsDragOver(true);
    }
  }, [disabled]);

  const handleDragLeave = useCallback((e: DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  }, []);

  const handleDrop = useCallback((e: DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);

    if (disabled) return;

    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0) {
      handleFileSelect(files[0]);
    }
  }, [disabled, handleFileSelect]);

  const handleFileInputChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      handleFileSelect(files[0]);
    }
  }, [handleFileSelect]);

  const handleRemoveImage = useCallback(() => {
    setError(null);
    setPreviewUrl(null);
    onImageRemove();
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  }, [onImageRemove]);

  const handleClick = useCallback(() => {
    if (!disabled && fileInputRef.current) {
      fileInputRef.current.click();
    }
  }, [disabled]);

  return (
    <div className="flex flex-col justify-center items-center w-3/4 sm:w-full max-w-md">
      {/* Upload Area */}
      <div
        className={`
          relative border-2 border-dashed rounded-lg p-6 text-center transition-all duration-200 cursor-pointer w-full mx-6
          ${isDragOver && !disabled 
            ? "border-blue-500 bg-blue-50"
            : selectedImage 
              ? "border-green-500 bg-green-50"
              : error 
                ? "border-red-500 bg-red-50"
                : "border-gray-300 bg-gray-50 hover:border-gray-400 hover:bg-gray-100"
          }
          ${disabled ? "opacity-50 cursor-not-allowed" : ''}
        `}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={handleClick}
      >
        {/* Hidden File Input */}
        <input
          ref={fileInputRef}
          type="file"
          accept={acceptedTypes?.join(',')}
          onChange={handleFileInputChange}
          className="hidden"
          disabled={disabled}
        />

        {/* Preview Image */}
        {previewUrl ? (
          <div className="relative">
            <img
              src={previewUrl}
              alt="Preview"
              className="max-w-full max-h-48 mx-auto rounded-lg shadow-sm"
            />
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleRemoveImage();
              }}
              className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors cursor-pointer"
              disabled={disabled}
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        ) : (
          /* Upload Icon and Text */
          <div className="space-y-4">
            <div className="flex justify-center">
              {error ? (
                <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                  <X className="w-6 h-6 text-red-500" />
                </div>
              ) : (
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                  {isDragOver ? (
                    <ImageIcon className="w-6 h-6 text-blue-600" />
                  ) : (
                    <Upload className="w-6 h-6 text-blue-600" />
                  )}
                </div>
              )}
            </div>

            <div className="space-y-2">
              {error ? (
                <div>
                  <p className="text-sm font-medium text-red-600">Upload Failed</p>
                  <p className="text-xs text-red-500">{error}</p>
                </div>
              ) : (
                <div>
                  <p className="text-sm font-medium text-gray-900">
                    {isDragOver ? "Drop image here" : "Upload an image"}
                  </p>
                  <p className="text-xs text-gray-500">
                    Drag and drop or click to browse
                  </p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* File Info */}
      {selectedImage && !error && (
        <div className="mt-3 text-xs text-gray-600 text-center">
          <p className="font-medium">{selectedImage.name}</p>
          <p>{(selectedImage.size / (1024 * 1024)).toFixed(2)} MB</p>
        </div>
      )}

      {/* Supported Formats */}
      <div className="mt-3 text-xs text-gray-500 text-center">
        Supported formats: {acceptedTypes?.map(type => type.split('/')[1].toUpperCase()).join(', ')} 
        <span className="mx-1">•</span>
        Max size: {maxSize}MB
      </div>
    </div>
  );
};

export default ImageUploader;
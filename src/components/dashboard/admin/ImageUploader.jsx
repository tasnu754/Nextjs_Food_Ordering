"use client";

import { Upload, X, Plus } from "lucide-react";
import { useRef, useState } from "react";
import { Oswald, Roboto } from "next/font/google";
import Image from "next/image";

const roboto = Roboto({
  subsets: ["latin"],
  weight: "400",
});

const oswald = Oswald({
  subsets: ["latin"],
  weight: "600",
});

const ImageUploader = ({ onThumbnailChange, onAdditionalChange }) => {
  const [thumbnailPreview, setThumbnailPreview] = useState(null);
  const [thumbnailFile, setThumbnailFile] = useState(null);
  const [additionalPreviews, setAdditionalPreviews] = useState([]);
  const [additionalFiles, setAdditionalFiles] = useState([]);
  const thumbnailRef = useRef(null);
  const additionalRef = useRef(null);

  const handleThumbnailChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setThumbnailFile(file);
      if (onThumbnailChange) {
        onThumbnailChange(file);
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setThumbnailPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAdditionalChange = (e) => {
    const files = Array.from(e.target.files || []);
    if (files.length > 0) {
      const newFiles = [...additionalFiles, ...files];
      setAdditionalFiles(newFiles);

      if (onAdditionalChange) {
        onAdditionalChange(newFiles);
      }

      // Create previews for new files
      const newPreviews = [];
      files.forEach((file) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          newPreviews.push(reader.result);
          if (newPreviews.length === files.length) {
            setAdditionalPreviews((prev) => [...prev, ...newPreviews]);
          }
        };
        reader.readAsDataURL(file);
      });
    }
  };

  const removeThumbnail = () => {
    setThumbnailPreview(null);
    setThumbnailFile(null);
    if (onThumbnailChange) {
      onThumbnailChange(null); // Notify parent
    }
    if (thumbnailRef.current) {
      thumbnailRef.current.value = "";
    }
  };

  const removeAdditional = (index) => {
    setAdditionalPreviews((prev) => prev.filter((_, i) => i !== index));
    const newFiles = additionalFiles.filter((_, i) => i !== index);
    setAdditionalFiles(newFiles);
    if (onAdditionalChange) {
      onAdditionalChange(newFiles); // Notify parent
    }
  };

  return (
    <>
      {/* Thumbnail Upload */}
      <div className={`mb-6 sm:mb-8 }`}>
        <label
          className={`block text-base sm:text-lg font-semibold text-gray-800 mb-2 sm:mb-3 ${oswald.className}`}
        >
          Thumbnail Image *
          <span className="text-sm font-normal text-gray-600 block mt-1">
            For featured food, please upload an image with white background
          </span>
        </label>
        <div className="relative">
          {!thumbnailPreview ? (
            <label
              className={`!flex flex-col items-center !justify-center w-full h-48 sm:h-56 md:h-64 border-2 sm:border-3 border-dashed border-[#C9983C] rounded-lg sm:rounded-xl cursor-pointer bg-gradient-to-br from-amber-50 to-orange-50 hover:bg-amber-100 transition-all ${roboto.className}`}
            >
              <Upload className="w-10 h-10 sm:w-12 sm:h-12 text-[#C9983C] mb-2 sm:mb-3" />
              <span className="text-xs sm:text-sm font-medium text-gray-700 px-4 text-center">
                Click to upload thumbnail
              </span>
              <span className="text-xs text-gray-500 mt-1">
                PNG, JPG up to 10MB
              </span>
              <input
                ref={thumbnailRef}
                type="file"
                name="thumbnail"
                className="hidden"
                accept="image/*"
                onChange={handleThumbnailChange}
                required
              />
            </label>
          ) : (
            <div className="relative w-full h-48 sm:h-56 md:h-64 object-cover rounded-lg sm:rounded-xl">
              <Image
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 768px) 768px, 1024px"
                src={thumbnailPreview}
                alt="Thumbnail"
                className="object-contain"
              />
              <button
                type="button"
                onClick={removeThumbnail}
                className="absolute top-2 sm:top-3 right-2 sm:right-3 bg-[#AE3433] text-white p-1.5 sm:p-2 !rounded-full hover:bg-[#5E0208] transition shadow-lg"
              >
                <X className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Additional Images */}
      <div className="mb-6 sm:mb-8">
        <label
          className={`block text-base sm:text-lg font-semibold text-gray-800 mb-2 sm:mb-3 ${oswald.className}`}
        >
          Additional Images
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 sm:gap-4 mb-4">
          {additionalPreviews.map((img, index) => (
            <div
              key={index}
              className="relative group w-full h-24 sm:h-28 md:h-32 object-cover !rounded-lg"
            >
              <Image
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 768px) 768px, 1024px"
                src={img}
                alt={`Additional ${index}`}
                className="object-contain !rounded-lg"
              />
              <button
                type="button"
                onClick={() => removeAdditional(index)}
                className="absolute top-1.5 sm:top-2 right-1.5 sm:right-2 bg-[#5E0208] text-white p-1 sm:p-1.5 rounded-full transition shadow-lg opacity-100 sm:opacity-0 sm:group-hover:opacity-100"
              >
                <X className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              </button>
            </div>
          ))}
          <label className="!flex items-center !justify-center h-24 sm:h-28 md:h-32 border-2 border-dashed border-[#C9983C] rounded-lg cursor-pointer bg-amber-50 hover:bg-amber-100 transition">
            <Plus className="w-6 h-6 sm:w-7 sm:h-7 md:w-9 md:h-9 text-[#C9983C]" />
            <input
              ref={additionalRef}
              type="file"
              name="additionalImages"
              multiple
              className="hidden"
              accept="image/*"
              onChange={handleAdditionalChange}
            />
          </label>
        </div>
      </div>
    </>
  );
};

export default ImageUploader;

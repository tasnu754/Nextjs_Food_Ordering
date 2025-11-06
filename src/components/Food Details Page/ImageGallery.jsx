"use client";
import Image from "next/image";
import { useState } from "react";

const ImageGallery = ({ thumbnail, images, productName }) => {
  const [selectedImage, setSelectedImage] = useState(0);

  const allImages = [thumbnail, ...(images || [])].filter(Boolean);

  if (allImages.length === 0) {
    return (
      <div className="bg-gray-100 rounded-lg overflow-hidden relative aspect-square flex items-center justify-center">
        <span className="text-gray-500">No image available</span>
      </div>
    );
  }

  return (
    <div className="">
      {/* Main image */}

      <div className="bg-gray-100 rounded-lg overflow-hidden mb-4 relative aspect-[4/3]">
        <Image
          src={allImages[selectedImage]}
          alt={productName || "Food image"}
          fill
          className="object-cover"
          priority
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>

      {/* Thumbnail navigation */}
      {allImages.length > 1 && (
        <div className="grid grid-cols-4 gap-3">
          {allImages.map((img, idx) => (
            <div
              key={idx}
              onClick={() => setSelectedImage(idx)}
              className={`border-2 rounded-lg overflow-hidden cursor-pointer hover:border-yellow-500 transition duration-200 relative aspect-square ${
                selectedImage === idx ? "border-yellow-500" : "border-gray-200"
              }`}
            >
              <Image
                src={img}
                alt={`${productName || "Food"} - Image ${idx + 1}`}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 25vw, (max-width: 1200px) 20vw, 15vw"
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ImageGallery;

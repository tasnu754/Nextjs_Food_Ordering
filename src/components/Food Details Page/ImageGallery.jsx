"use client";
import Image from "next/image";
import { useState } from "react";

const ImageGallery = ({ images, productName }) => {
  const [selectedImage, setSelectedImage] = useState(0);

  return (
    <div className="">
      <div className="bg-gray-100 rounded-lg overflow-hidden mb-4 relative aspect-square">
        <Image
          src={images[selectedImage]}
          alt={productName}
          fill
          className="object-cover"
          priority
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>

      <div className="grid grid-cols-4 gap-3">
        {images.map((img, idx) => (
          <div
            key={idx}
            onClick={() => setSelectedImage(idx)}
            className={`border-2 rounded-lg overflow-hidden cursor-pointer hover:border-yellow-500 transition duration-200 relative aspect-square ${
              selectedImage === idx ? "border-yellow-500" : "border-gray-200"
            }`}
          >
            <Image
              src={img}
              alt={`${productName} view ${idx + 1}`}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 25vw, (max-width: 1200px) 20vw, 15vw"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImageGallery;

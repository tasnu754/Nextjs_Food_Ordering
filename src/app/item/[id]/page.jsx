"use client";

import { Facebook, Twitter, Linkedin, Share2 } from "lucide-react";
import { QuantitySelector } from "@/components/Food Details Page/QuantitySelector";
import ImageGallery from "@/components/Food Details Page/ImageGallery";
import ProductTabs from "@/components/Food Details Page/ProductTabs";
import { Oswald, Roboto } from "next/font/google";
import ProtectedRoute from "@/components/ProtectedRoute";
import Navbar from "@/components/Home Page/Navbar";
import { useGetSingleFoodItemQuery } from "@/redux/features/foodApi";
import { useParams } from "next/navigation";

const roboto = Roboto({
  subsets: ["latin"],
  weight: "400",
});

const oswald = Oswald({
  subsets: ["latin"],
  weight: "600",
});

export default function FoodDetails() {
  const { id } = useParams();
  const { data, isLoading } = useGetSingleFoodItemQuery({ id });
  const product = data?.data;

  if (isLoading) {
    return (
      <ProtectedRoute>
        <Navbar />
        <div className="min-h-screen pt-20 flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-500"></div>
        </div>
      </ProtectedRoute>
    );
  }

  if (!product) {
    return (
      <ProtectedRoute>
        <Navbar />
        <div className="min-h-screen pt-20 flex items-center justify-center">
          <p className="text-xl text-gray-600">Product not found</p>
        </div>
      </ProtectedRoute>
    );
  }

  return (
    <ProtectedRoute>
      <Navbar />
      <div className="min-h-screen pt-20">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 bg-white rounded-lg shadow-sm p-6 !mb-8">
            <ImageGallery
              thumbnail={product?.thumbnail}
              images={product?.additionalImages}
              productName={product?.foodName}
            />

            <div>
              <h1
                className={`!text-3xl lg:!text-6xl font-bold !text-[#642F21] mb-4 ${oswald.className}`}
              >
                {product?.foodName}
              </h1>
              <div
                className={`text-2xl lg:text-5xl font-bold text-yellow-500 mb-6 ${oswald.className}`}
              >
                ${product?.price.toFixed(2)}
              </div>

              <p
                className={`text-[#642F21] text-lg mb-6  leading-relaxed ${roboto.className}`}
              >
                {product?.shortDescription}
              </p>

              <div className={`mb-6 ${roboto.className} text-lg`}>
                <span className="text-gray-600">Category: </span>
                <span className="text-gray-800 font-medium">
                  {product?.category?.name}
                </span>
              </div>

              <QuantitySelector
                foodItemId={product?._id}
                price={product?.price}
                variants={product?.variants}
              />

              <div className={`flex items-center gap-4 ${roboto.className}`}>
                <span className="text-gray-500 md:text-xl font-bold">
                  Share This:
                </span>
                <div className="flex gap-3">
                  <button className="text-gray-600 hover:text-yellow-600 transition duration-200">
                    <Facebook size={20} />
                  </button>
                  <button className="text-gray-600 hover:text-yellow-600 transition duration-200">
                    <Twitter size={20} />
                  </button>
                  <button className="text-gray-600 hover:text-yellow-600 transition duration-200">
                    <Linkedin size={20} />
                  </button>
                  <button className="text-gray-600 hover:text-yellow-600 transition duration-200">
                    <Share2 size={20} />
                  </button>
                </div>
              </div>
            </div>
          </div>

          <ProductTabs
            item={product}
            fullDescription={product?.fullDescription}
            weight={product?.weight}
            variants={product?.variants}
            reviews={product?.reviews}
            name={product?.foodName}
          />
        </div>
      </div>
    </ProtectedRoute>
  );
}

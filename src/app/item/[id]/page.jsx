"use client";

import {
  ShoppingCart,
  Facebook,
  Twitter,
  Linkedin,
  Share2,
} from "lucide-react";
import { useState } from "react";

import { Oswald, Roboto } from "next/font/google";
import { duration } from "@mui/material";

const roboto = Roboto({
  subsets: ["latin"],
  weight: "300",
});
const robotoBold = Roboto({
  subsets: ["latin"],
  weight: "700",
});

const oswald = Oswald({
  subsets: ["latin"],
  weight: "600",
});

// Image Gallery Component (Client)
function ImageGallery({ images, productName }) {
  const [selectedImage, setSelectedImage] = useState(0);

  return (
    <div className="">
      <div className="bg-gray-100 rounded-lg overflow-hidden mb-4 ">
        <img
          src={images[selectedImage]}
          alt={productName}
          className="w-full h-auto object-cover"
        />
      </div>
      {/* Thumbnail Gallery */}
      <div className="grid grid-cols-4 gap-3">
        {images.map((img, idx) => (
          <div
            key={idx}
            onClick={() => setSelectedImage(idx)}
            className={`border-2 rounded-lg overflow-hidden cursor-pointer hover:border-yellow-500 transition duration-200 ${
              selectedImage === idx ? "border-yellow-500" : "border-gray-200"
            }`}
          >
            <img
              src={img}
              alt={`${productName} view ${idx + 1}`}
              className="w-full h-auto object-cover "
            />
          </div>
        ))}
      </div>
    </div>
  );
}

// Quantity Selector Component (Client)
function QuantitySelector() {
  const [quantity, setQuantity] = useState(1);

  const increment = () => setQuantity((q) => q + 1);
  const decrement = () => setQuantity((q) => (q > 1 ? q - 1 : 1));

  return (
    <div className={`flex items-center gap-4 mb-8 ${roboto.className}`}>
      <div className="flex items-center border border-gray-300 rounded">
        <input
          type="number"
          value={quantity}
          readOnly
          className={`w-16 text-center !text-xl border-x border-gray-300 ${robotoBold.className} py-2 appearance-none`}
        />
        <div className="flex flex-col border-l border-gray-300">
          <button
            onClick={increment}
            className="px-3 py-1 hover:bg-gray-100 border-b border-gray-300 flex items-center justify-center"
          >
            <svg
              className="w-3 h-3"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 15l7-7 7 7"
              />
            </svg>
          </button>
          <button
            onClick={decrement}
            className="px-3 py-1 hover:bg-gray-100 flex items-center justify-center"
          >
            <svg
              className="w-3 h-3"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </button>
        </div>
      </div>
      <button
        className={`bg-yellow-500 hover:bg-yellow-600 ${robotoBold.className} !font-bold py-2 md:py-3 px-3 md:px-6 rounded flex items-center justify-center gap-2 transition`}
      >
        <ShoppingCart size={20} />
        Add to cart
      </button>
    </div>
  );
}

// Tabs Component (Client)
function ProductTabs({ fullDescription }) {
  const [activeTab, setActiveTab] = useState("description");

  return (
    <div className={`bg-white rounded-lg shadow-sm !my-20 ${roboto.className}`}>
      {/* Tab Headers */}
      <div className="flex justify-center   text-lg">
        <button
          onClick={() => setActiveTab("description")}
          className={`px-8 py-4 font-semibold rounded-lg transition duration-400  ${
            oswald.className
          } ${
            activeTab === "description"
              ? "bg-yellow-500 text-black !rounded-lg"
              : "text-gray-600 hover:bg-gray-50 !rounded-lg"
          }`}
        >
          Description
        </button>
        <button
          onClick={() => setActiveTab("additional")}
          className={`px-8 py-4 font-semibold  transition duration-400  ${
            activeTab === "additional"
              ? "bg-yellow-500 text-black !rounded-lg"
              : "text-gray-600 hover:bg-gray-50 !rounded-lg"
          }`}
        >
          Additional information
        </button>
        <button
          onClick={() => setActiveTab("reviews")}
          className={`px-8 py-4 font-semibold transition duration-400 ${
            activeTab === "reviews"
              ? "bg-yellow-500 text-black !rounded-lg"
              : "text-gray-600 hover:bg-gray-50 !rounded-lg"
          }`}
        >
          Reviews (0)
        </button>
      </div>

      {/* Tab Content */}
      <div className="p-8">
        {activeTab === "description" && (
          <div>
            <h2
              className={`text-3xl ${oswald.className} font-bold !text-[#642F21] mb-6`}
            >
              Description
            </h2>

            <p className="text-gray-600 text-lg  mb-6 leading-relaxed">
              {fullDescription.intro}
            </p>

            <ul className="space-y-4 mb-6">
              {fullDescription.bullets.map((bullet, idx) => (
                <li
                  key={idx}
                  className="text-lg text-gray-600 leading-relaxed pl-6 relative before:content-['•'] before:absolute before:left-0 before:text-yellow-500 before:font-bold"
                >
                  {bullet.split("volute turpis dolores")[0]}
                  {bullet.includes("volute turpis dolores") && (
                    <>
                      <span className="font-semibold text-gray-800">
                        volute turpis dolores
                      </span>
                      {bullet.split("volute turpis dolores")[1]}
                    </>
                  )}
                </li>
              ))}
            </ul>

            <p className="text-gray-600 text-lg leading-relaxed">
              {fullDescription.outro}
            </p>
          </div>
        )}

        {activeTab === "additional" && (
          <div>
            <h2
              className={`text-3xl ${oswald.className} font-bold !text-[#642F21] mb-6`}
            >
              Additional Information
            </h2>
            <p className="text-gray-600">
              Additional product information would go here.
            </p>
          </div>
        )}

        {activeTab === "reviews" && (
          <div>
            <h2
              className={`text-3xl ${oswald.className} font-bold !text-[#642F21] mb-6`}
            >
              Reviews
            </h2>
            <p className="text-gray-600">
              No reviews yet. Be the first to review this product!
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

// Main Product Page Component
export default function ProductPage() {
  // In a real app, this data would come from props or a database query
  const product = {
    name: "CLASSIC BURGER",
    price: 7.95,
    description:
      "Mushroom patty, vegan cheese, lettuce, tomatoes, avocado ligula rutrum risus ultrice luctus ligula congue a vitae auctor sapien gravida enim ipsum congue.",
    category: "Burgers",
    images: [
      "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=800&h=800&fit=crop",
      "https://images.unsplash.com/photo-1550547660-d9450f859349?w=800&h=800&fit=crop",
      "https://images.unsplash.com/photo-1572802419224-296b0aeee0d9?w=800&h=800&fit=crop",
      "https://images.unsplash.com/photo-1553979459-d2229ba7433b?w=800&h=800&fit=crop",
    ],
    fullDescription: {
      intro:
        "Juicy, handcrafted perfection nestled between toasted artisan buns, our classic beef burger embodies the timeless essence of American comfort food. Each element meticulously curated to deliver an unforgettable culinary experience that celebrates simplicity and quality in every bite.",
      bullets: [
        "Crafted from 100% premium grass-fed beef, seasoned with our signature blend of herbs and spices, then grilled to succulent perfection. The patty rests gracefully upon a foundation of crisp iceberg lettuce and ripe tomato slices, enhanced by thinly sliced red onions.",
        "Generously adorned with our house-made burger sauce—a creamy, subtly spiced concoction that elevates without overwhelming—and embraced by a soft, lightly toasted brioche bun that yields gently to each bite. ",
      ],
      outro:
        "Served alongside golden, triple-cooked fries and your choice of complementary sides, this burger represents more than just a meal—it's a celebration of culinary tradition, where quality ingredients and expert preparation converge to create something truly extraordinary. Each component working in perfect harmony to deliver that quintessential burger experience you've been craving.",
    },
  };

  return (
    <div className="min-h-screen pt-20 ">
      <div className="max-w-7xl mx-auto px-4 py-8   ">
        {/* Product Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 bg-white rounded-lg shadow-sm p-6 mb-8">
          {/* Image Section */}
          <ImageGallery images={product.images} productName={product.name} />

          {/* Product Info Section */}
          <div>
            <h1
              className={`!text-3xl lg:!text-6xl font-bold !text-[#642F21] mb-4 ${oswald.className}`}
            >
              {product.name}
            </h1>
            <div
              className={`text-2xl lg:text-5xl font-bold text-yellow-500 mb-6  ${oswald.className}`}
            >
              ${product.price.toFixed(2)}
            </div>

            <p
              className={`text-gray-500 text-lg mb-6 font-normal leading-relaxed  ${roboto.className}`}
            >
              {product.description}
            </p>

            <div className={`mb-6 ${roboto.className} text-lg`}>
              <span className="text-gray-600">Category: </span>
              <span className="text-gray-800 font-medium">
                {product.category}
              </span>
            </div>

            {/* Quantity and Add to Cart */}
            <QuantitySelector />

            {/* Share Section */}
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

        {/* Tabs Section */}
        <ProductTabs fullDescription={product.fullDescription} />
      </div>
    </div>
  );
}

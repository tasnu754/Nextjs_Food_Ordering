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
  weight: "300",
});

const oswald = Oswald({
  subsets: ["latin"],
  weight: "600",
});

export default function foodDetails() {
  const { id } = useParams();
  const { data } = useGetSingleFoodItemQuery({ id });
  const product = data?.data;
  console.log(product, "foooddDet");

  // const product = {
  //   name: "CLASSIC BURGER",
  //   price: 7.95,
  //   description:
  //     "Mushroom patty, vegan cheese, lettuce, tomatoes, avocado ligula rutrum risus ultrice luctus ligula congue a vitae auctor sapien gravida enim ipsum congue.",
  //   category: "Burgers",
  //   images: [
  //     "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=800&h=800&fit=crop",
  //     "https://images.unsplash.com/photo-1550547660-d9450f859349?w=800&h=800&fit=crop",
  //     "https://images.unsplash.com/photo-1572802419224-296b0aeee0d9?w=800&h=800&fit=crop",
  //     "https://images.unsplash.com/photo-1553979459-d2229ba7433b?w=800&h=800&fit=crop",
  //   ],
  //   fullDescription: {
  //     intro:
  //       "Juicy, handcrafted perfection nestled between toasted artisan buns, our classic beef burger embodies the timeless essence of American comfort food. Each element meticulously curated to deliver an unforgettable culinary experience that celebrates simplicity and quality in every bite.",
  //     bullets: [
  //       "Crafted from 100% premium grass-fed beef, seasoned with our signature blend of herbs and spices, then grilled to succulent perfection. The patty rests gracefully upon a foundation of crisp iceberg lettuce and ripe tomato slices, enhanced by thinly sliced red onions.",
  //       "Generously adorned with our house-made burger sauce—a creamy, subtly spiced concoction that elevates without overwhelming—and embraced by a soft, lightly toasted brioche bun that yields gently to each bite. ",
  //     ],
  //     outro:
  //       "Served alongside golden, triple-cooked fries and your choice of complementary sides, this burger represents more than just a meal—it's a celebration of culinary tradition, where quality ingredients and expert preparation converge to create something truly extraordinary. Each component working in perfect harmony to deliver that quintessential burger experience you've been craving.",
  //   },
  // };

  return (
    <ProtectedRoute>
      <Navbar></Navbar>
      <div className="min-h-screen pt-20 ">
        <div className="max-w-7xl mx-auto px-4 py-8   ">
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
                className={`text-2xl lg:text-5xl font-bold text-yellow-500 mb-6  ${oswald.className}`}
              >
                ${product?.price.toFixed(2)}
              </div>

              <p
                className={`text-gray-500 text-lg mb-6 font-normal leading-relaxed  ${roboto.className}`}
              >
                {product?.shortDescription}
              </p>

              <div className={`mb-6 ${roboto.className} text-lg`}>
                <span className="text-gray-600">Category: </span>
                <span className="text-gray-800 font-medium">
                  {product?.category?.name}
                </span>
              </div>

              <QuantitySelector />

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
            fullDescription={product?.fullDescription}
            weight={product?.weight}
            variants={product?.variants}
            reviews={product?.reviews}
          />
        </div>
      </div>
    </ProtectedRoute>
  );
}

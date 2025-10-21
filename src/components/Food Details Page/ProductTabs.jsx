"use client";

import { useState } from "react";
import { Oswald, Roboto } from "next/font/google";
import ReviewForm from "./ReviewForm";
import AdditionalInfo from "./AdditionalInfo";

const roboto = Roboto({
  subsets: ["latin"],
  weight: "300",
});
const oswald = Oswald({
  subsets: ["latin"],
  weight: "600",
});

const ProductTabs = ({ fullDescription }) => {
  const [activeTab, setActiveTab] = useState("description");

  return (
    <div className={`bg-white rounded-lg shadow-sm !my-20 ${roboto.className}`}>
      <div className="md:flex justify-center   text-lg">
        <button
          onClick={() => setActiveTab("description")}
          className={`px-8 py-4 font-semibold rounded-lg transition duration-400 ${
            activeTab === "description"
              ? "md:bg-yellow-500 text-yellow-500  md:text-black !rounded-lg "
              : " md:text-gray-600 hover:bg-gray-50 !rounded-lg"
          }`}
        >
          Description
        </button>
        <button
          onClick={() => setActiveTab("additional")}
          className={`px-8 py-4  font-semibold  transition duration-400  ${
            activeTab === "additional"
              ? "md:bg-yellow-500 text-yellow-500  md:text-black !rounded-lg"
              : "text-gray-600 hover:bg-gray-50 !rounded-lg"
          }`}
        >
          Additional information
        </button>
        <button
          onClick={() => setActiveTab("reviews")}
          className={`px-8 py-4 font-semibold transition duration-400 ${
            activeTab === "reviews"
              ? "md:bg-yellow-500 text-yellow-500  md:text-black !rounded-lg"
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
              className={`text-3xl ${oswald.className} font-bold !text-[#642F21] !mb-6`}
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
              <AdditionalInfo></AdditionalInfo>
            </h2>
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
              <ReviewForm></ReviewForm>
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductTabs;

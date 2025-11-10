"use client";

import { useState } from "react";
import { Heart, Clock, Award, TrendingUp } from "lucide-react";
import { Roboto } from "next/font/google";
import Image from "next/image";

const roboto = Roboto({
  subsets: ["latin"],
  weight: "300",
});

const values = [
  {
    icon: Heart,
    title: "Quality First",
    description:
      "We partner only with restaurants that meet our high standards for food quality and safety.",
    gradient: "from-red-500 to-pink-500",
  },
  {
    icon: Clock,
    title: "Fast Delivery",
    description:
      "Your food arrives hot and fresh with our efficient delivery network and real-time tracking.",
    gradient: "from-blue-500 to-purple-500",
  },
  {
    icon: Award,
    title: "Best Experience",
    description:
      "From browsing to delivery, we ensure every step of your journey is smooth and delightful.",
    gradient: "from-orange-500 to-yellow-500",
  },
  {
    icon: TrendingUp,
    title: "Always Innovating",
    description:
      "We continuously improve our service with the latest technology and customer feedback.",
    gradient: "from-green-500 to-teal-500",
  },
];

const timeline = [
  {
    year: "2020",
    event: "Founded with a vision",
    description: "Started as a small food delivery service in the city",
  },
  {
    year: "2021",
    event: "Rapid expansion",
    description: "Grew to 50+ partner restaurants",
  },
  {
    year: "2022",
    event: "Mobile app launch",
    description: "Launched our mobile app for iOS and Android",
  },
  {
    year: "2023",
    event: "Regional leader",
    description: "Became the top-rated food delivery service",
  },
  {
    year: "2024",
    event: "Innovation continues",
    description: "Introduced AI-powered recommendations",
  },
];

export default function TabsClient() {
  const [activeTab, setActiveTab] = useState("story");

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      <div className="flex justify-center gap-4 mb-12 flex-wrap">
        <button
          onClick={() => setActiveTab("story")}
          className={`px-8 py-4 rounded font-bold text-lg transition-all duration-300 ${
            activeTab === "story"
              ? "bg-[#642F21] text-white shadow-lg scale-105"
              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
          }`}
        >
          Our Story
        </button>
        <button
          onClick={() => setActiveTab("values")}
          className={`px-8 py-4 rounded font-bold text-lg transition-all duration-300 ${
            activeTab === "values"
              ? "bg-[#642F21] text-white shadow-lg scale-105"
              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
          }`}
        >
          Our Values
        </button>
        <button
          onClick={() => setActiveTab("timeline")}
          className={`px-8 py-4 rounded font-bold text-lg transition-all duration-300 ${
            activeTab === "timeline"
              ? "bg-[#642F21] text-white shadow-lg scale-105"
              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
          }`}
        >
          Timeline
        </button>
      </div>

      {/* Story Tab */}
      {activeTab === "story" && (
        <div className="animate-in fade-in duration-500">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-6">
                Where It All{" "}
                <span className="text-transparent bg-clip-text bg-[#642F21]">
                  Began
                </span>
              </h2>
              <div
                className={`space-y-4 text-lg text-gray-700 leading-relaxed ${roboto.className}`}
              >
                <p>
                  Our journey started with a simple idea: everyone deserves
                  access to delicious, quality food without the hassle. We
                  noticed how difficult it was to discover great local
                  restaurants and get reliable delivery service.
                </p>
                <p>
                  What began as a small operation with just a handful of
                  restaurant partners has grown into a thriving platform serving
                  thousands of customers daily. But our mission remains the same
                  – to make every meal memorable.
                </p>
                <p>
                  Today, we're proud to work with the finest restaurants in the
                  region, ensuring that whether you're craving comfort food or
                  trying something new, we've got you covered.
                </p>
              </div>
            </div>
            <div className="relative">
              <div
                className="aspect-square rounded-3xl overflow-hidden shadow-2xl hover:rotate-0 transition-transform duration-500"
                style={{ transform: "rotate(3deg)" }}
              >
                <Image
                  src="/about.webp"
                  alt="Restaurant food"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
                />
              </div>
              <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-[#642F21] rounded-full blur-3xl opacity-50"></div>
              <div className="absolute -top-6 -right-6 w-32 h-32 bg-[#642F21] rounded-full blur-3xl opacity-50"></div>
            </div>
          </div>
        </div>
      )}

      {/* Values Tab */}
      {activeTab === "values" && (
        <div className="animate-in fade-in duration-500">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-4">
              What We{" "}
              <span className="text-transparent bg-clip-text bg-[#642F21]">
                Stand For
              </span>
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              These core values guide everything we do
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            {values.map((value, index) => {
              const IconComponent = value.icon;
              return (
                <div
                  key={index}
                  className="bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 group"
                >
                  <div
                    className={`inline-flex p-5 rounded-2xl bg-[#642F21] mb-6 group-hover:scale-110 transition-transform duration-300`}
                  >
                    <IconComponent className="w-10 h-10 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">
                    {value.title}
                  </h3>
                  <p className="text-gray-600 text-lg leading-relaxed">
                    {value.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Timeline Tab */}
      {activeTab === "timeline" && (
        <div className="animate-in fade-in duration-500">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-4">
              Our{" "}
              <span className="text-transparent bg-clip-text bg-[#642F21]">
                Journey
              </span>
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Milestones that shaped who we are today
            </p>
          </div>
          <div className="relative max-w-4xl mx-auto">
            {/* Timeline Line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-[#642F21]"></div>

            {timeline.map((item, index) => (
              <div
                key={index}
                className={`relative flex items-center mb-12 ${
                  index % 2 === 0 ? "flex-row-reverse" : ""
                }`}
              >
                <div
                  className={`w-1/2 ${
                    index % 2 === 0 ? "pr-12 text-right" : "pl-12 text-left"
                  }`}
                >
                  <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105">
                    <div className="text-3xl font-black text-transparent bg-clip-text bg-[#642F21] mb-2">
                      {item.year}
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                      {item.event}
                    </h3>
                    <p className="text-gray-600">{item.description}</p>
                  </div>
                </div>
                <div className="absolute left-1/2 transform -translate-x-1/2 w-6 h-6 bg-white border-4 border-amber-900 rounded-full shadow-lg"></div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

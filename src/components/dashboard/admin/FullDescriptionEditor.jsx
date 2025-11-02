"use client";

import { Plus, X } from "lucide-react";
import { Oswald } from "next/font/google";

const oswald = Oswald({
  subsets: ["latin"],
  weight: "600",
});

const FullDescriptionEditor = ({ fullDescription, setFullDescription }) => {
  const handleBulletChange = (index, value) => {
    setFullDescription((prev) => ({
      ...prev,
      bullets: prev.bullets.map((bullet, i) => (i === index ? value : bullet)),
    }));
  };

  const addBullet = () => {
    setFullDescription((prev) => ({
      ...prev,
      bullets: [...prev.bullets, ""],
    }));
  };

  const removeBullet = (index) => {
    if (fullDescription.bullets.length > 1) {
      setFullDescription((prev) => ({
        ...prev,
        bullets: prev.bullets.filter((_, i) => i !== index),
      }));
    }
  };

  return (
    <div className="mb-6 sm:mb-8 bg-gradient-to-br from-amber-50 to-orange-50 p-4 sm:p-5 md:p-6 rounded-lg sm:rounded-xl border-2 border-[#C9983C]">
      <h2
        className={`text-lg sm:text-xl font-bold text-gray-800 mb-3 sm:mb-4 ${oswald.className}`}
      >
        Full Description
      </h2>

      <div className="mb-4 sm:mb-6">
        <label className="block text-md font-semibold text-gray-700 mb-2">
          Introduction
        </label>
        <textarea
          value={fullDescription.intro}
          onChange={(e) =>
            setFullDescription({ ...fullDescription, intro: e.target.value })
          }
          rows={4}
          className="w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base border-2 border-gray-300 rounded-lg focus:border-[#AE3433] focus:outline-none transition resize-none"
          placeholder="A captivating introduction to your dish..."
        />
      </div>

      <div className="mb-4 sm:mb-6">
        <div className="flex items-center justify-between mb-2">
          <label className="block text-md font-semibold text-gray-700">
            Bullet Points
          </label>
          <button
            type="button"
            onClick={addBullet}
            className="text-[#AE3433] hover:text-[#5E0208] font-medium text-xs sm:text-sm flex items-center gap-1"
          >
            <Plus className="w-3.5 h-3.5 sm:w-4 sm:h-4" /> Add Bullet
          </button>
        </div>
        {fullDescription.bullets.map((bullet, index) => (
          <div key={index} className="flex gap-2 mb-3">
            <textarea
              value={bullet}
              onChange={(e) => handleBulletChange(index, e.target.value)}
              rows={3}
              className="flex-1 px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base border-2 border-gray-300 rounded-lg focus:border-[#AE3433] focus:outline-none transition resize-none"
              placeholder={`Bullet point ${index + 1}...`}
            />
            {fullDescription.bullets.length > 1 && (
              <button
                type="button"
                onClick={() => removeBullet(index)}
                className="bg-red-100 text-red-600 h-8 !px-2 sm:px-3 !rounded-lg hover:bg-red-200 transition "
              >
                <X className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
            )}
          </div>
        ))}
      </div>

      <div>
        <label className="block text-md font-semibold text-gray-700 mb-2">
          Conclusion
        </label>
        <textarea
          value={fullDescription.outro}
          onChange={(e) =>
            setFullDescription({ ...fullDescription, outro: e.target.value })
          }
          rows={4}
          className="w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base border-2 border-gray-300 rounded-lg focus:border-[#AE3433] focus:outline-none transition resize-none"
          placeholder="A memorable conclusion about your dish..."
        />
      </div>
    </div>
  );
};

export default FullDescriptionEditor;

"use client";
import { useState, useEffect, useRef } from "react";
import { Star, X } from "lucide-react";
import { Oswald } from "next/font/google";

const oswald = Oswald({
  subsets: ["latin"],
  weight: "600",
});

const foodItems = [
  {
    id: 1,
    name: "Classic Burger",
    rating: 4.5,
    image: "/foodSlider-1.jfif",
  },
  {
    id: 2,
    name: "Margherita Pizza",
    rating: 4,
    image: "/foodSlider-2.jfif",
  },
  {
    id: 3,
    name: "BBQ Ribs",
    rating: 5,
    image: "/foodSlider-3.jfif",
  },
  {
    id: 4,
    name: "Supreme Pizza",
    rating: 4.5,
    image: "/foodSlider-4.jfif",
  },
  {
    id: 5,
    name: "Honey Cake",
    rating: 3.5,
    image: "/foodSlider-5.jpg",
  },
  {
    id: 6,
    name: "Classical California",
    rating: 4,
    image: "/foodSlider-6.jpg",
  },
];

const FoodSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [isPaused, setIsPaused] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const sliderRef = useRef(null);

  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % foodItems.length);
    }, 2000);

    return () => clearInterval(interval);
  }, [isPaused]);

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  const getVisibleSlides = () => {
    const slides = [];
    for (let i = 0; i < 4; i++) {
      slides.push(foodItems[(currentIndex + i) % foodItems.length]);
    }
    return slides;
  };

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < 5; i++) {
      if (i < fullStars) {
        stars.push(
          <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
        );
      } else if (i === fullStars && hasHalfStar) {
        stars.push(
          <div key={i} className="relative w-4 h-4">
            <Star className="w-4 h-4 text-yellow-400 absolute" />
            <div className="overflow-hidden w-2 absolute">
              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
            </div>
          </div>
        );
      } else {
        stars.push(<Star key={i} className="w-4 h-4 text-yellow-400" />);
      }
    }
    return stars;
  };

  const handleImageClick = (item) => {
    setSelectedImage(item);
  };

  const closeModal = () => {
    setSelectedImage(null);
  };

  // Close modal on escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape") {
        closeModal();
      }
    };

    if (selectedImage) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [selectedImage]);

  return (
    <>
      <div className="relative w-full bg-gradient-to-b from-[#642F21] to-[#642F21] py-14 overflow-hidden">
        <div className="max-w-8xl mx-auto px-4">
          <div
            ref={sliderRef}
            className="relative"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 ">
              {getVisibleSlides().map((item, index) => {
                const actualIndex = (currentIndex + index) % foodItems.length;
                const isHovered = hoveredIndex === actualIndex;

                return (
                  <div
                    key={`${item.id}-${index}`}
                    className="relative group cursor-pointer overflow-hidden rounded-lg shadow-2xl transition-all duration-500 hover:scale-105"
                    onMouseEnter={() => setHoveredIndex(actualIndex)}
                    onMouseLeave={() => setHoveredIndex(null)}
                    onClick={() => handleImageClick(item)}
                    style={{
                      height: "400px",
                    }}
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />

                    <div
                      className={`absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent transition-opacity duration-300 ${
                        isHovered ? "opacity-100" : "opacity-0"
                      }`}
                    />

                    <div
                      className={`absolute bottom-0 left-0 right-0 p-6 transform transition-all duration-300 ${
                        isHovered
                          ? "translate-y-0 opacity-100"
                          : "translate-y-4 opacity-0"
                      }`}
                    >
                      <h3
                        className={`text-white text-xl font-bold mb-3 uppercase tracking-wide ${oswald.className}`}
                      >
                        {item.name}
                      </h3>
                      <div className="flex items-center gap-2">
                        <span
                          className={`text-white text-lg font-semibold ${oswald.className}`}
                        >
                          {item.rating}
                        </span>
                        <div className="flex gap-1">
                          {renderStars(item.rating)}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Dots Navigation */}
          <div className="flex justify-center gap-3 mt-8">
            {foodItems.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`transition-all duration-300 rounded-full ${
                  index === currentIndex
                    ? "w-12 h-3 rounded bg-white"
                    : "w-3 h-3 rounded bg-white/50 hover:bg-white/75"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm animate-in fade-in duration-200"
          onClick={closeModal}
        >
          <button
            onClick={closeModal}
            className="absolute top-4 right-4 md:top-10 md:right-82 z-60 text-white hover:text-gray-300 transition-colors p-2 rounded-full hover:bg-white/10"
            aria-label="Close modal"
          >
            <X className="w-8 h-8" />
          </button>

          <div
            className="relative max-w-6xl max-h-[100vh] w-full  mx-4 animate-in zoom-in-5 duration-300"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={selectedImage.image}
              alt={selectedImage.name}
              className="w-full h-full object-contain rounded-lg shadow-2xl"
            />
          </div>
        </div>
      )}
    </>
  );
};

export default FoodSlider;

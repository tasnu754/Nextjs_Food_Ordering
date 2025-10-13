"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-fade";
import { Pagination, Autoplay, Navigation, EffectFade } from "swiper/modules";
import { Oswald } from "next/font/google";
import { Lilita_One } from "next/font/google";

const lil = Lilita_One({
  subsets: ["latin"],
  weight: "400",
});

const oswald = Oswald({
  subsets: ["latin"],
  weight: "600",
});

const BannerSlider = () => {
  return (
    <div>
      <Swiper
        spaceBetween={30}
        effect={"fade"}
        pagination={{
          clickable: true,
        }}
        loop={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        modules={[Autoplay, Pagination, Navigation, EffectFade]}
        className="banner-slider w-full mySwiper"
      >
        <SwiperSlide>
          <div
            className="item w-full relative flex items-center justify-center md:justify-start px-4 sm:px-6 md:px-8 lg:pl-[50px] xl:pl-[310px]"
            style={{
              background: `url(/slide-1.jpg)`,
            }}
          >
            <div className="info w-full md:w-[90%] lg:w-[80%] xl:w-[50%] flex flex-col gap-3 sm:gap-4 text-center md:text-left mr-auto duration-1500 lg:pl-[200px]">
              <h2 className={`text-white ${lil.className}`}>CRISPY CHICKEN</h2>
              <h3 className={`${oswald.className}`}>
                <span className="text-white/90">Open Daily: </span>
                <span className="text-yellow-400 text-xl sm:text-2xl md:text-3xl lg:text-4xl">
                  11:30PM - 8:30PM
                </span>
              </h3>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div
            className="item w-full relative flex items-center justify-center md:justify-end px-4 sm:px-6 md:px-8 lg:pr-[50px] xl:pr-[310px]"
            style={{
              background: `url(/slide-2.jpg)`,
            }}
          >
            <div className="info w-full md:w-[90%] lg:w-[80%] xl:w-[50%] flex flex-col gap-3 sm:gap-4 text-center md:text-left ml-auto duration-1500">
              <h2 className={`text-white ${lil.className}`}>CHICKEN FINGERS</h2>
              <h3 className={`${oswald.className}`}>
                <span className="text-white/90">Enjoy the food you love </span>
                <span className="text-yellow-400 text-xl sm:text-2xl md:text-3xl lg:text-4xl">
                  FROM $6.99
                </span>
              </h3>
            </div>
          </div>
        </SwiperSlide>

        <SwiperSlide>
          <div
            className="item w-full relative flex items-center justify-center md:justify-start px-4 sm:px-6 md:px-8 lg:pl-[50px] xl:pl-[310px]"
            style={{
              background: `url(/slide-3.jpg)`,
            }}
          >
            <div className="info w-full md:w-[90%] lg:w-[80%] xl:w-[50%] flex flex-col gap-3 sm:gap-4 text-center md:text-left mr-auto duration-1500 lg:pl-[100px]">
              <h2 className={`text-white ${lil.className}`}> DOUBLE BURGER</h2>
              <h3 className={`${oswald.className}`}>
                <span className="text-white/90">Order Now: </span>
                <span className="text-yellow-400 text-xl sm:text-2xl md:text-3xl lg:text-4xl">
                  0103-4729823
                </span>
              </h3>
            </div>
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default BannerSlider;

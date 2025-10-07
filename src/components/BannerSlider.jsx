"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import React, { useRef, useState } from "react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";

// import "./styles.css";
const BannerSlider = () => {
  return (
    <div>
      {" "}
      <Swiper
        navigation={true}
        modules={[Navigation]}
        className="banner-slider w-[100%]"
      >
        <SwiperSlide>
          <div
            className="item w-[100%] relative flex items-center"
            style={{
              background: `url(/slide-1.jpg)`,
            }}
          >
            <div className="info w-[50%] d-flex flex-col gap-4 pl-[310px]">
              <h2 className=" text-white">CRISPY CHICKEN</h2>
              <h3>
                <span className=" text-white/90">Open Daily: </span>
                <span className=" text-yellow-400 text-4xl">
                  11:30PM - 8:30PM
                </span>
              </h3>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div
            className="item w-[100%] relative flex items-center"
            style={{
              background: `url(/slide-2.jpg)`,
            }}
          >
            <div className="info w-[50%] d-flex flex-col gap-4 ml-[980px]">
              <h2 className=" text-white">CHICKEN FINGERS</h2>
              <h3>
                <span className=" text-white/90">Enjoy the food you love </span>
                <span className=" text-yellow-400 text-4xl">FROM $6.99</span>
              </h3>
            </div>
          </div>
        </SwiperSlide>

        <SwiperSlide>
          <div
            className="item w-[100%] relative flex items-center"
            style={{
              background: `url(/slide-3.jpg)`,
            }}
          >
            <div className="info w-[50%] d-flex flex-col gap-4 pl-[310px]">
              <h2 className=" text-white">DOUBLE BURGER</h2>
              <h3>
                <span className=" text-white/90">Order Now: </span>
                <span className=" text-yellow-400 text-4xl">789-654-3210</span>
              </h3>
            </div>
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default BannerSlider;

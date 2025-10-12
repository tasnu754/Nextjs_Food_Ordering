import Image from "next/image";

const Discount = () => {
  return (
    <div className="relative mb-70 mt-30 md:mb-30 lg:my-48 overflow-x-visible ">
      {/* Background Banner - Only covers part of the width */}
      <div className="banner w-full h-[70vh] bg-gray-200 ml-auto"></div>

      {/* Content Overlay */}
      <div className="absolute inset-0 top-0 ">
        <div className=" mx-auto h-full overflow-visible">
          <div className="container flex flex-col md:flex-row justify-between items-center h-full px-4 md:px-6 lg:px-8 overflow-visible">
            {/* Text Content */}
            <div className="w-full lg:w-[45%] flex items-center pt-4 lg:pt-0 lg:pr-8 z-10">
              <div className=" lg:text-left">
                {/* Main Title */}
                <h2 className="pizzaTitle  uppercase !text-4xl  lg:!text-8xl opacity-70 leading-tight !text-white font-bold">
                  <span className="block">WHEN TASTE</span>
                  <span className="block">BUDS SPEAK</span>
                </h2>

                {/* Description */}
                <p className="pizzaDes !text-white text-lg font-md py-2 lg:py-6 max-w-2xl mx-auto lg:mx-0 leading-relaxed text-start">
                  The culinary technique of stacking food on a plate, which is
                  often done for presentation and to keep food warm. You make in
                  or serve in layers.
                </p>

                {/* Order Now Section */}
                <div className="mt-6 ">
                  <h3 className="mb-4 title">
                    <span className="text-white/90 lg:text-2xl font-light mb-2 mr-3 ">
                      ORDER NOW:
                    </span>
                    <span className="text-yellow-400 text-2xl sm:text-3xl md:text-3xl lg:text-5xl font-bold">
                      789-654-3210
                    </span>
                  </h3>
                </div>
              </div>
            </div>

            {/* Image Content - Positioned outside */}
            <div className="w-full  lg:w-[55%] flex justify-center lg:justify-end mt-8 lg:mt-0 md:relative z-20">
              <div className="relative w-full max-w-lg lg:max-w-2xl xl:max-w-3xl aspect-square h-[250px] md:h-[400px]   lg:h-[620px] lg:ml-[-100px] xl:ml-[-150px] transform lg:scale-110">
                <Image
                  src={"/stack2.png"}
                  alt="Pizza Banner"
                  fill
                  className="object-contain drop-shadow-2xl"
                  sizes="(max-width: 1024px) 90vw, 60vw"
                  priority
                />

                {/* 50% OFF Badge */}
                <div className="relative md:w-24 md:h-24 lg:w-42 lg:h-42 ml-[100px] mt-[150px] ">
                  <Image
                    src={"/discount-BG.png"}
                    alt="Discount Batch"
                    fill
                    className="object-contain"
                    sizes="(max-width: 1024px) 90vw, 60vw"
                    priority
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Discount;

import Image from "next/image";

const Discount = () => {
  return (
    <div className="relative mt-10 overflow-x-visible">
      {/* Background Banner - Only covers part of the width */}
      <div className="banner w-full h-[70vh] bg-gray-200 ml-auto"></div>

      {/* Content Overlay */}
      <div className="absolute inset-0 top-0 ">
        <div className=" mx-auto h-full overflow-visible">
          <div className="container flex flex-col lg:flex-row justify-between items-center h-full px-4 md:px-6 lg:px-8 overflow-visible">
            {/* Text Content */}
            <div className="w-full lg:w-[45%] flex items-center pt-4 lg:pt-0 lg:pr-8 z-10">
              <div className="text-center lg:text-left">
                {/* Main Title */}
                <h2 className="pizzaTitle uppercase lg:!text-7xl !text-5xl leading-tight !text-white font-bold">
                  <span className="block">WHEN TASTE</span>
                  <span className="block">BUDS SPEAK</span>
                </h2>

                {/* 50% OFF Badge */}
                <div className="my-6 lg:my-8">
                  <span className="bg-red-600 text-white text-2xl lg:text-3xl font-bold py-3 px-6 rounded-full inline-block">
                    50% OFF
                  </span>
                </div>

                {/* Description */}
                <p className="pizzaDes !text-white text-lg font-light py-4 lg:py-6 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
                  Semper locus cursus porta, feugiat primis ligula risus auctor
                  and rhoncus in ultrice ligula purus ipsum primis in cubilla
                  augue
                </p>

                {/* Order Now Section */}
                <div className="mt-6 lg:mt-8">
                  <h3 className="mb-4">
                    <span className="text-white/90 text-lg block mb-2">
                      ORDER NOW:
                    </span>
                    <span className="text-yellow-400 text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold">
                      789-654-3210
                    </span>
                  </h3>
                </div>
              </div>
            </div>

            {/* Image Content - Positioned outside */}
            <div className="w-full lg:w-[55%] flex justify-center lg:justify-end mt-8 lg:mt-0 relative z-20">
              <div className="relative w-full max-w-lg lg:max-w-2xl xl:max-w-3xl aspect-square h-[600px] lg:h-[700px] lg:ml-[-100px] xl:ml-[-150px] transform lg:scale-110">
                <Image
                  src={"/stack2.png"}
                  alt="Pizza Banner"
                  fill
                  className="object-contain drop-shadow-2xl"
                  sizes="(max-width: 1024px) 90vw, 60vw"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Discount;

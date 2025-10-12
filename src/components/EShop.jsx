import Image from "next/image";

const EShop = () => {
  return (
    <div className="bg-yellow-400 my-48">
      <div className="container h-[56vh]">
        <div className="flex flex-col lg:flex-row lg:gap-28">
          <div className="w-full flex items-center lg:pt-0 md:px-3 lg:px-0">
            <div className="w-[90%] mx-auto">
              <h2 className="pizzaTitle uppercase lg:!text-7xl !font-extrabold leading-tight !text-amber-950">
                <span className="!font-light text-4xl">
                  Download mobile App and
                </span>{" "}
                <br /> save up to 20%
              </h2>
              <p className="pizzaDes !text-amber-900 text-lg font-light py-3">
                The app offers a convenient way to order your favorite dishes{" "}
                <br />
                for pickup or delivery.
              </p>
            </div>
          </div>
          <div className="relative w-[100%] max-w-lg sm:max-w-xl md:max-w-2xl lg:min-h-[84vh] aspect-square lg:aspect-auto overflow-visible mt-[-50px] lg:mt-[-149px]">
            <Image
              src={"/e-shop.png"}
              alt="Pizza Banner"
              fill
              className="object-contain"
              sizes="(max-width: 1024px) 90vw, 60vw"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default EShop;

import Image from "next/image";
import { Oswald, Roboto } from "next/font/google";

const oswald = Oswald({
  subsets: ["latin"],
  weight: "700",
});
const roboto = Roboto({
  subsets: ["latin"],
  weight: "300",
});

const EShop = () => {
  return (
    <div className="bg-yellow-400 mt-48 mb-20">
      <div className="container h-[56vh]">
        <div className="flex flex-col-reverse lg:flex-row lg:gap-28">
          <div className="w-full flex items-center md:pt-8 lg:pt-0 md:px-3 lg:px-0">
            <div className="w-[90%] mx-auto">
              <h2
                className={`${oswald.className} uppercase lg:!text-7xl !font-extrabold leading-tight !text-amber-950`}
              >
                <span className="!font-light text-4xl">
                  Download mobile App and
                </span>{" "}
                <br /> save up to 20%
              </h2>
              <p
                className={`${roboto.className} !text-amber-900 text-lg font-light py-3`}
              >
                The app offers a convenient way to order your favorite dishes{" "}
                <br />
                for pickup or delivery.
              </p>
            </div>
          </div>
          <div className="relative w-full  max-w-lg sm:max-w-xl md:max-w-2xl h-[79vh] md:h-[66vh] lg:min-h-[84vh] aspect-square lg:aspect-auto overflow-visible mt-[-50px] md:mt-[-67px] lg:-mt-[18vh]">
            <Image
              src={"/e-shop.webp"}
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

import Image from "next/image";
import CategoryIcon2 from "./CategoryIcon2";
import { Oswald, Roboto } from "next/font/google";

const oswald = Oswald({
  subsets: ["latin"],
  weight: "600",
});
const roboto = Roboto({
  subsets: ["latin"],
  weight: "300",
});

const PizzaBanner = () => {
  return (
    <div className="bg-yellow-400">
      <div className="container py-10">
        <div className=" flex flex-col lg:flex-row lg:gap-28">
          <div className="relative  w-[90%] max-w-lg sm:max-w-xl md:max-w-2xl lg:w-[45%] lg:min-h-[80vh] aspect-square lg:aspect-auto">
            <Image
              src={"/pizzaBanner.webp"}
              alt="Pizza Banner"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 90vw, 60vw"
            />
          </div>
          <div className="flex-1 w-full flex items-center-safe pt-4 lg:pt-0 md:px-3 lg:px-0">
            <div className="w-full">
              <h2
                className={`${oswald.className} uppercase lg:!text-6xl leading-tight !text-amber-950`}
              >
                Nothing brings people together like a good burger
              </h2>
              <p
                className={`${roboto.className} !text-amber-950 text-lg font-light py-3`}
              >
                A oven-baked dish of Italian origin, made from a flattened bread
                dough base topped with ingredients like tomato sauce, cheese,
                and various other toppings, then baked at high temperatures. It
                is served hot
              </p>

              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                <CategoryIcon2
                  imageUrl={"/pizza.webp"}
                  name={"PIZZA"}
                ></CategoryIcon2>
                <CategoryIcon2
                  imageUrl={"/pasta.webp"}
                  name={"PASTA"}
                ></CategoryIcon2>

                <CategoryIcon2
                  imageUrl={"/dessert.webp"}
                  name={"DESSERT"}
                ></CategoryIcon2>
                <CategoryIcon2
                  imageUrl={"/salad.webp"}
                  name={"SALAD"}
                ></CategoryIcon2>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PizzaBanner;

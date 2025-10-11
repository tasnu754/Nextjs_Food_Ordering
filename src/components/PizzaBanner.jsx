import Image from "next/image";
import CategoryIcon2 from "./CategoryIcon2";

const PizzaBanner = () => {
  return (
    <div className="bg-yellow-500">
      <div className="container py-10">
        <div className=" flex flex-col lg:flex-row lg:gap-28">
          <div className="relative  w-[90%] max-w-lg sm:max-w-xl md:max-w-2xl lg:w-[45%] lg:min-h-[80vh] aspect-square lg:aspect-auto">
            <Image
              src={"/pizzaBanner.png"}
              alt="Pizza Banner"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 90vw, 60vw"
            />
          </div>
          <div className="border-2 border-amber-500 flex-1 w-full flex items-center-safe">
            <div className="w-full">
              <h2>Nothing brings people together like a good burger</h2>
              <p>
                A oven-baked dish of Italian origin, made from a flattened bread
                dough base topped with ingredients like tomato sauce, cheese,
                and various other toppings, then baked at high temperatures. It
                is served hot and comes in many variations.
              </p>

              <div>
                <CategoryIcon2
                  imageUrl={"/burger.png"}
                  name={"BURGERS"}
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

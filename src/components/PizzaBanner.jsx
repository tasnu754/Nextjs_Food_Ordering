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
          <div className="flex-1 w-full flex items-center-safe">
            <div className="w-full">
              <h2 className="pizzaTitle uppercase lg:!text-6xl leading-tight !text-amber-950">
                Nothing brings people together like a good burger
              </h2>
              <p className="pizzaDes !text-amber-950 text-lg font-light py-3">
                A oven-baked dish of Italian origin, made from a flattened bread
                dough base topped with ingredients like tomato sauce, cheese,
                and various other toppings, then baked at high temperatures. It
                is served hot
              </p>

              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                <CategoryIcon2
                  imageUrl={"/burger.png"}
                  name={"BURGERS"}
                ></CategoryIcon2>
                <CategoryIcon2
                  imageUrl={"/pizza.png"}
                  name={"PIZZAS"}
                ></CategoryIcon2>
                <CategoryIcon2
                  imageUrl={"/dessert.png"}
                  name={"DESSETS"}
                ></CategoryIcon2>
                <CategoryIcon2
                  imageUrl={"/salad.png"}
                  name={"SALADS"}
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

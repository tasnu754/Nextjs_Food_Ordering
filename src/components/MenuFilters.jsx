import Image from "next/image";
import Link from "next/link";
import FullMenuBtn from "./FullMenuBtn";
import { getCategories } from "@/services/categoryService";

const MenuFilters = async () => {
  const categories = await getCategories();

  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="md:w-[65%] mx-auto grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-2">
          {categories?.map((category, index) => (
            <Link
              key={index}
              href={category.link}
              className="  overflow-hidden flex flex-col justify-center items-center gap-3  !no-underline rounded-lg  transition-all duration-500 transform hover:-translate-y-2"
            >
              <div className="relative h-10 w-10  md:h-17 md:w-17 text-red-600">
                <Image
                  src={category.image}
                  alt={category.name}
                  fill
                  className="object-cover opacity-50 group-hover:scale-110 transition-transform duration-500"
                />

                <div className="absolute inset-0 border-2 border-transparent group-hover:border-yellow-400 transition-all duration-300 rounded-lg"></div>
              </div>
              <div className="text-[#642F21] category font-bold text-xl">
                {category.name}
              </div>
            </Link>
          ))}
        </div>

        <FullMenuBtn></FullMenuBtn>
      </div>
    </section>
  );
};

export default MenuFilters;

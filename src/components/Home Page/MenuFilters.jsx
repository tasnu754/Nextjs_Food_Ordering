"use client";

import CategoryIcon from "./CategoryIcon";
import FullMenuBtn from "./FullMenuBtn";
import MenuFilterCards from "./MenuFilterCards";
import { useGetAllCategoriesQuery } from "@/redux/features/categoryApi";

const MenuFilters = ({ searchParams }) => {
  const { data: categoryItems } = useGetAllCategoriesQuery();
  const categories = categoryItems?.data?.categories;

  const selectedCategory = searchParams?.category || null;

  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="md:w-[65%] mx-auto grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-2">
          {categories?.map((category, index) => (
            <CategoryIcon
              key={category?.name || index}
              category={category}
              isSelected={selectedCategory === category?._id}
            />
          ))}
        </div>

        <MenuFilterCards selectedCategory={selectedCategory} />
        <FullMenuBtn />
      </div>
    </section>
  );
};

export default MenuFilters;

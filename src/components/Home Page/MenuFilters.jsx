import CategoryIcon from "./CategoryIcon";
import FullMenuBtn from "./FullMenuBtn";
import { getCategories } from "@/services/categoryService";
import MenuFilterCards from "./MenuFilterCards";

const MenuFilters = async ({ searchParams }) => {
  const categories = await getCategories();
  const selectedCategory = searchParams?.category || null;

  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="md:w-[65%] mx-auto grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-2">
          {categories?.map((category, index) => (
            <CategoryIcon
              key={category.name || index}
              category={category}
              isSelected={selectedCategory === category.name.toLowerCase()}
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

import Image from "next/image";
import Link from "next/link";

const CategoryIcon = async ({ category, isSelected }) => {
  return (
    <Link
      href={`?category=${category.name.toLowerCase()}`}
      scroll={false}
      className={`overflow-hidden flex flex-col justify-center items-center gap-3 !no-underline rounded-lg transition-all duration-500 transform hover:-translate-y-2 group p-2 ${
        isSelected ? " " : ""
      }`}
    >
      <div className="relative h-10 w-10 md:h-17 md:w-17">
        <Image
          src={category.image}
          alt={category.name}
          fill
          className={`object-cover transition-transform duration-500 ${
            isSelected ? "opacity-100" : "opacity-50 "
          }`}
        />
        <div
          className={`absolute inset-0 border-2 transition-all duration-300 rounded-lg ${
            isSelected ? "border-none" : "border-transparent "
          }`}
        ></div>
      </div>
      <div
        className={`category font-bold text-xl transition-colors duration-300 ${
          isSelected ? "text-red-700" : "text-[#642F21]"
        }`}
      >
        {category.name}
      </div>
    </Link>
  );
};

export default CategoryIcon;

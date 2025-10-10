import Image from "next/image";
import Link from "next/link";

const CategoryIcon = async ({ category }) => {
  return (
    <Link
      href={category.link}
      className="overflow-hidden flex flex-col justify-center items-center gap-3 !no-underline rounded-lg transition-all duration-500 transform hover:-translate-y-2 group"
    >
      <div className="relative h-10 w-10 md:h-17 md:w-17 text-red-600">
        <Image
          src={category.image}
          alt={category.name}
          fill
          className="object-cover opacity-50 group-hover:scale-100 transition-transform duration-500"
        />
        <div className="absolute inset-0 border-2 border-transparent transition-all duration-300 rounded-lg"></div>
      </div>
      <div className="text-[#642F21] category font-bold text-xl">
        {category.name}
      </div>
    </Link>
  );
};

export default CategoryIcon;

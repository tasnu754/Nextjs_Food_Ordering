import { IoFastFoodOutline } from "react-icons/io5";
import Link from "next/link";

const FullMenuBtn = () => {
  return (
    <div className="text-center mt-6">
      <Link
        href="/menu"
        className="menuBtn flex justify-center items-center gap-2 md:w-[200px] mx-auto !no-underline font-bold bg-[#642F21] text-white py-2 md:py-4 rounded-lg font-oswald md:text-lg uppercase tracking-wider hover:bg-yellow-900 transition-colors duration-300 shadow-lg hover:shadow-xl"
      >
        <IoFastFoodOutline className="md:text-3xl"></IoFastFoodOutline>
        Full Menu
      </Link>
    </div>
  );
};

export default FullMenuBtn;

import Image from "next/image";

const CategoryIcon2 = async ({ imageUrl, name }) => {
  return (
    <div
      className={`overflow-hidden flex flex-col justify-center items-center gap-3 !no-underline rounded-lg transition-all duration-500 transform hover:-translate-y-2 group p-2 
      }`}
    >
      <div className="relative h-10 w-10 md:h-17 md:w-17">
        <Image
          src={imageUrl}
          alt="food"
          fill
          sizes="(max-width: 768px) 40px, 68px"
          className={`object-cover transition-transform duration-500 "
          }`}
        />
      </div>
      <div className="category font-bold text-xl transition-colors duration-300 text-[#642F21]">
        {name}
      </div>
    </div>
  );
};

export default CategoryIcon2;

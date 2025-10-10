import Image from "next/image";
import StarRating from "./StartRating";

const SingleCart = () => {
  return (
    <div>
      <div>
        <div className="w-[70%] border-1 border-gray-300 rounded py-3 flex flex-col justify-center items-center">
          <Image
            width={250}
            height={250}
            src={"/burger_1.png"}
            alt="Burger"
          ></Image>
          <div className="flex justify-around items-center gap-20 py-3">
            <div className="text-xl">
              <button className="bg-[#642F21] py-2 px-3 rounded addBtn  text-yellow-400 font-bold">
                $10.35
              </button>
            </div>
            <StarRating></StarRating>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleCart;

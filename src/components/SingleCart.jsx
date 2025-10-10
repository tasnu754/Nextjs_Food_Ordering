import Image from "next/image";
import StarRating from "./StartRating";
import AddToCartButton from "./AddToCartButton";

const SingleCart = () => {
  return (
    <div>
      <div>
        <div className="w-[90%] border-1 border-gray-300 rounded py-3 flex flex-col justify-center items-center">
          <Image
            width={200}
            height={200}
            src={"/burger_1.png"}
            alt="Burger"
          ></Image>
          <div className="flex justify-between gap-4 py-3">
            <div className="text-xl">
              <button className="bg-[#642F21] py-2 px-3 rounded addBtn  text-yellow-400 font-bold">
                $10.35
              </button>
            </div>
            <StarRating></StarRating>
          </div>
        </div>
        <div className="pt-3 title text-[#642F21] text-center w-[90%] flex flex-col justify-center gap-2">
          <h4 className=" uppercase">Bigti Burger</h4>
          <p className="des">
            Mushroom patty, vegan cheese, lettuce, tomatoes, avocado ligula
          </p>
          <AddToCartButton></AddToCartButton>
        </div>
      </div>
    </div>
  );
};

export default SingleCart;

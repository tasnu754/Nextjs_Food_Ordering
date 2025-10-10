import Image from "next/image";

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
          <div className="flex justify-between items-center">
            <div className="">
              <button className="bg-[#642F21]">$10.35</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleCart;

import Image from "next/image";

const Offer = () => {
  return (
    <div className="w-[70%] grid grid-cols-2 gap-y-14 mx-auto my-14">
      <div className="relative  w-[85%] mx-auto  aspect-square h-[200px] lg:h-[300px]  transform lg:scale-110">
        <Image
          src={"/offer-1.jpg"}
          alt="Pizza Banner"
          fill
          className="object-cover drop-shadow-2xl rounded-2xl"
          sizes="(max-width: 1024px) 90vw, 60vw"
          priority
        />
      </div>
      <div className="relative  w-[85%] mx-auto aspect-square h-[200px] lg:h-[300px]  transform lg:scale-110">
        <Image
          src={"/offer-2.jpg"}
          alt="Pizza Banner"
          fill
          className="object-cover drop-shadow-2xl rounded-2xl"
          sizes="(max-width: 1024px) 90vw, 60vw"
          priority
        />
      </div>
      <div className="relative  w-[85%] mx-auto  aspect-square h-[200px] lg:h-[300px]  transform lg:scale-110">
        <Image
          src={"/offer-3.jpg"}
          alt="Pizza Banner"
          fill
          className="object-cover drop-shadow-2xl rounded-2xl"
          sizes="(max-width: 1024px) 90vw, 60vw"
          priority
        />
      </div>
      <div className="relative  w-[85%] mx-auto  aspect-square h-[200px] lg:h-[300px]  transform lg:scale-110">
        <Image
          src={"/offer-4.jpg"}
          alt="Pizza Banner"
          fill
          className="object-cover drop-shadow-2xl rounded-2xl"
          sizes="(max-width: 1024px) 90vw, 60vw"
          priority
        />
      </div>
    </div>
  );
};

export default Offer;

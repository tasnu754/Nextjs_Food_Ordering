import Image from "next/image";

const Offer = () => {
  return (
    <div className="lg:w-[70%] grid grid-cols-2 gap-y-8 lg:gap-y-14 mx-auto md:my-36">
      <div className="relative  w-[85%] mx-auto  aspect-square h-[150px] lg:h-[300px]  transform lg:scale-110">
        <Image
          src={"/offer-1.webp"}
          alt="Pizza Banner"
          fill
          className="object-fit lg:object-cover drop-shadow-2xl rounded-2xl"
          sizes="(max-width: 1024px) 90vw, 60vw"
          priority
        />
      </div>
      <div className="relative  w-[85%] mx-auto aspect-square h-[150px] lg:h-[300px]  transform lg:scale-110">
        <Image
          src={"/offer-2.webp"}
          alt="Pizza Banner"
          fill
          className="object-fit lg:object-cover drop-shadow-2xl rounded-2xl"
          sizes="(max-width: 1024px) 90vw, 60vw"
          priority
        />
      </div>
      <div className="relative  w-[85%] mx-auto  aspect-square h-[150px] lg:h-[300px]  transform lg:scale-110">
        <Image
          src={"/offer-3.webp"}
          alt="Pizza Banner"
          fill
          className="object-fit lg:object-cover drop-shadow-2xl rounded-2xl"
          sizes="(max-width: 1024px) 90vw, 60vw"
          priority
        />
      </div>
      <div className="relative  w-[85%] mx-auto  aspect-square h-[150px] lg:h-[300px]  transform lg:scale-110">
        <Image
          src={"/offer-4.webp"}
          alt="Pizza Banner"
          fill
          className="object-fit lg:object-cover drop-shadow-2xl rounded-2xl"
          sizes="(max-width: 1024px) 90vw, 60vw"
          priority
        />
      </div>
    </div>
  );
};

export default Offer;

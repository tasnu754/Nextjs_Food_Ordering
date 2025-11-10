import MainMenuCard from "@/components/Home Page/MainMenuCard";
import { useGetAllFoodItemsQuery } from "@/redux/features/foodApi";
import { Roboto } from "next/font/google";
import Link from "next/link";

const roboto = Roboto({
  subsets: ["latin"],
  weight: "500",
});

const QuickOrder = () => {
  const { data: itemsData } = useGetAllFoodItemsQuery();

  const items =
    itemsData?.data?.foodItems?.slice(0, 6)?.map((item, index) => ({
      ...item,
      no: index + 1,
    })) || [];

  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <div
        className={`flex items-center justify-between mb-4 ${roboto.className}`}
      >
        <h2 className=" !font-bold !text-[#5E0208]">Quick Order</h2>
        <Link href="/menu">
          <button className="text-md text-[#AE3433] !font-bold hover:text-[#671d1d]">
            View Full Menu →
          </button>
        </Link>
      </div>

      <p className={`text-sm text-[#C9983C] mb-6 ${roboto.className}`}>
        Order your favorites with one click!
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20 !no-underline">
        {items?.slice(0, 6).map((item) => (
          <MainMenuCard key={item?.no} item={item} noImageClick={true} />
        ))}
      </div>
    </div>
  );
};

export default QuickOrder;

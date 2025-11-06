import { useGetFoodItemsByCategoryQuery } from "@/redux/features/foodApi";
import SingleCart from "./SingleCart";

const MenuFilterCards = ({ selectedCategory }) => {
  const categoryToUse = selectedCategory || "6908e684cf7b9979545bdafc";

  const {
    data: foodItems,
    isLoading,
    isFetching,
  } = useGetFoodItemsByCategoryQuery(categoryToUse);
  const items = foodItems?.data?.foodItems;

  if (isLoading || isFetching) {
    return (
      <div className="container bg-gray-100 py-12 px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {/* Loading skeletons */}
          {[...Array(8)].map((_, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-md overflow-hidden animate-pulse"
            >
              <div className="h-64 bg-gray-300"></div>
              <div className="p-4">
                <div className="h-6 bg-gray-300 rounded mb-2"></div>
                <div className="h-4 bg-gray-300 rounded w-3/4 mb-2"></div>
                <div className="h-4 bg-gray-300 rounded w-1/2"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="container bg-gray-100 py-12 px-4">
      {items?.length !== 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {items?.map((item, index) => (
            <SingleCart key={item?.name || index} item={item} />
          ))}
        </div>
      ) : (
        <div className="flex justify-center py-16">
          <div>
            {" "}
            <div className="text-6xl text-center mb-4">😕</div>
            <p className="text-xl text-center text-gray-600">
              No items found <br />
              matching your filters
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default MenuFilterCards;

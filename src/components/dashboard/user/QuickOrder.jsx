import MainMenuCard from "@/components/Home Page/MainMenuCard";
import { Roboto } from "next/font/google";
import Link from "next/link";

const roboto = Roboto({
  subsets: ["latin"],
  weight: "500",
});

const QuickOrder = () => {
  // const popularItems = [
  //   {
  //     id: 1,
  //     name: "Margherita Pizza",
  //     price: 12.99,
  //     emoji: "🍕",
  //     category: "Pizza",
  //   },
  //   {
  //     id: 2,
  //     name: "Cheese Burger",
  //     price: 8.99,
  //     emoji: "🍔",
  //     category: "Burger",
  //   },
  //   {
  //     id: 3,
  //     name: "Caesar Salad",
  //     price: 7.99,
  //     emoji: "🥗",
  //     category: "Salad",
  //   },
  //   {
  //     id: 4,
  //     name: "Chicken Wings",
  //     price: 10.99,
  //     emoji: "🍗",
  //     category: "Appetizer",
  //   },
  //   { id: 5, name: "Spaghetti", price: 11.99, emoji: "🍝", category: "Pasta" },
  //   {
  //     id: 6,
  //     name: "Fish Tacos",
  //     price: 9.99,
  //     emoji: "🌮",
  //     category: "Mexican",
  //   },
  // ];
  const items = [
    {
      no: 1,
      name: "CHOCOLATE LAVA CAKE",
      description:
        "Warm chocolate cake with molten center and vanilla ice cream",
      price: 7.95,
      image:
        "https://images.unsplash.com/photo-1624353365286-3f8d62daad51?w=500&h=400&fit=crop",
      rating: 5,
      category: "dessert",
    },
    {
      no: 2,
      name: "PALAK PANEER",
      description: "Fresh cottage cheese in creamy spinach gravy with spices",
      price: 13.95,
      image:
        "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?w=500&h=400&fit=crop",
      rating: 4.3,
      category: "indian",
    },

    {
      no: 3,
      name: "BEEF TACOS",
      description:
        "Three soft tortillas with seasoned beef, salsa, and guacamole",
      price: 10.95,
      image:
        "https://images.unsplash.com/photo-1551504734-5ee1c4a1479b?w=500&h=400&fit=crop",
      rating: 4,
      category: "mexican",
    },
    {
      no: 4,
      name: "CLASSIC BURGER",
      description:
        "Angus beef patty, cheddar cheese, lettuce, tomato, special sauce",
      price: 11.95,
      image:
        "https://images.unsplash.com/photo-1550547660-d9450f859349?w=500&h=400&fit=crop",
      rating: 4.5,
      category: "burger",
    },
    {
      no: 5,
      name: "VEGGIE SUSHI PLATTER",
      description:
        "Assorted vegetable sushi with ginger, wasabi, and soy sauce",
      price: 16.95,
      image:
        "https://images.unsplash.com/photo-1476124369491-e7addf5db371?w=500&h=400&fit=crop",
      rating: 4.5,
      category: "japanese",
    },

    {
      no: 6,
      name: "MARGHERITA PIZZA",
      description: "Fresh mozzarella, tomato sauce, basil leaves, olive oil",
      price: 12.95,
      image:
        "https://images.unsplash.com/photo-1604068549290-dea0e4a305ca?w=500&h=400&fit=crop",
      rating: 4.5,
      category: "pizza",
    },
  ];
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

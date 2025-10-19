import EventsCateringSection from "@/components/About Page/EventsCateringSection ";
import TabsClient from "@/components/About Page/TabsClient";
import { Users, Award, ChefHat, Truck, Star } from "lucide-react";
import { Oswald, Roboto } from "next/font/google";
import Image from "next/image";
import Link from "next/link";

const roboto = Roboto({
  subsets: ["latin"],
  weight: "400",
});

const oswald = Oswald({
  subsets: ["latin"],
  weight: "600",
});

const stats = [
  {
    icon: Users,
    number: "50K+",
    label: "Happy Customers",
    color: "from-orange-500 to-red-500",
  },
  {
    icon: ChefHat,
    number: "200+",
    label: "Partner Restaurants",
    color: "from-purple-500 to-pink-500",
  },
  {
    icon: Truck,
    number: "100K+",
    label: "Deliveries Made",
    color: "from-blue-500 to-cyan-500",
  },
  {
    icon: Star,
    number: "4.8",
    label: "Average Rating",
    color: "from-yellow-500 to-orange-500",
  },
];

export default function AboutUs() {
  return (
    <div
      className={`min-h-screen bg-gradient-to-b from-gray-50 to-white ${oswald.className}`}
    >
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-br from-yellow-500 via-yellow-600 to-yellow-800">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIj48cGF0aCBkPSJNMzYgMzRjMC0yLjIxLTEuNzktNC00LTRzLTQgMS43OS00IDQgMS43OSA0IDQgNCA0LTEuNzkgNC00em0wLTEwYzAtMi4yMS0xLjc5LTQtNC00cy00IDEuNzktNCA0IDEuNzkgNCA0IDQgNC0xLjc5IDQtNHoiLz48L2c+PC9nPjwvc3ZnPg==')] opacity-30"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 relative z-10">
          <div className="text-center">
            {/* Logo Placeholder - Replace with your logo */}
            <div className="inline-flex items-center justify-center w-32 h-32 rounded-3xl  mb-8">
              <div className="text-6xl">
                <div className="relative  w-56 h-30">
                  <Image
                    src={"/footer.png"}
                    alt="Pizza Banner"
                    fill
                    className="object-fit"
                    sizes="(max-width: 1024px) 90vw, 60vw"
                  />
                </div>
              </div>
              {/* Replace above with: <img src="/your-logo.png" alt="Logo" className="w-full h-full object-contain p-4" /> */}
            </div>

            <h1 className="text-5xl md:text-7xl font-black text-white mb-6 tracking-tight">
              About <span className="text-yellow-300">Our Story</span>
            </h1>
            <p
              className={`text-xl md:text-2xl text-white/90 max-w-3xl mx-auto leading-relaxed ${roboto.className}`}
            >
              Delivering happiness, one meal at a time. We're passionate about
              connecting you with the best local restaurants.
            </p>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0">
          <svg
            viewBox="0 0 1440 120"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M0 120L60 110C120 100 240 80 360 70C480 60 600 60 720 65C840 70 960 80 1080 85C1200 90 1320 90 1380 90L1440 90V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0V120Z"
              fill="white"
            />
          </svg>
        </div>
      </div>

      {/* Stats Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-20 relative z-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => {
            const IconComponent = stat.icon;
            return (
              <div
                key={index}
                className="bg-white rounded-2xl shadow-xl p-8 hover:scale-105 transition-all duration-300 hover:shadow-2xl"
              >
                <div
                  className={`inline-flex p-4 rounded-2xl  bg-amber-800 mb-4`}
                >
                  <IconComponent className="w-8 h-8 text-white" />
                </div>
                <div className="text-4xl font-black text-gray-900 mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-600 font-medium">{stat.label}</div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Tabs Section - Client Component */}
      <TabsClient />
      <EventsCateringSection></EventsCateringSection>

      {/* CTA Section */}
      <div className="bg-amber-900 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-black text-white mb-6">
            Ready to Order?
          </h2>
          <p className="text-xl text-white mb-8 max-w-2xl mx-auto">
            Join thousands of happy customers and experience the best food
            delivery service in town
          </p>
          <Link href="/">
            <button className="bg-white rounded text-amber-800 px-12 py-4  font-bold !text-xl shadow-2xl hover:shadow-3xl hover:scale-105 transition-all duration-300">
              Browse Restaurants
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

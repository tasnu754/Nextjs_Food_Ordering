import Image from "next/image";
import Link from "next/link";
import { MdOutlineDashboard } from "react-icons/md";
import { MdOutlineShoppingCart } from "react-icons/md";
import { MdOutlineFavorite } from "react-icons/md";
import { CgProfile } from "react-icons/cg";
import { IoFastFoodSharp } from "react-icons/io5";
import { BiDish } from "react-icons/bi";
import { HiUsers } from "react-icons/hi";
import { SiGoogleanalytics } from "react-icons/si";
import { MdAdminPanelSettings } from "react-icons/md";
import { usePathname } from "next/navigation";
import { Lilita_One, Oswald } from "next/font/google";
import Logout from "./Logout";

const lil = Lilita_One({
  subsets: ["latin"],
  weight: "400",
});

const oswald = Oswald({
  subsets: ["latin"],
  weight: "600",
});

const Sidebar = ({ isOpen, setIsOpen, userRole }) => {
  const pathname = usePathname();

  const adminLinks = [
    {
      name: "Dashboard",
      href: "/dashboard/admin",
      icon: <MdOutlineDashboard></MdOutlineDashboard>,
    },
    {
      name: "Add Food",
      href: "/dashboard/admin/addFood",
      icon: <IoFastFoodSharp></IoFastFoodSharp>,
    },
    {
      name: "Orders",
      href: "/dashboard/admin/orders",
      icon: <MdOutlineShoppingCart></MdOutlineShoppingCart>,
    },
    {
      name: "Categories",
      href: "/dashboard/admin/categories",
      icon: <IoFastFoodSharp></IoFastFoodSharp>,
    },
    {
      name: "Dishes",
      href: "/dashboard/admin/dishes",
      icon: <BiDish></BiDish>,
    },
    {
      name: "Users",
      href: "/dashboard/admin/users",
      icon: <HiUsers></HiUsers>,
    },
    {
      name: "Analytics",
      href: "/dashboard/admin/analytics",
      icon: <SiGoogleanalytics></SiGoogleanalytics>,
    },
  ];

  const userLinks = [
    {
      name: "Dashboard",
      href: "/dashboard/user",
      icon: <MdOutlineDashboard></MdOutlineDashboard>,
    },
    {
      name: "My Orders",
      href: "/dashboard/user/orders",
      icon: <MdOutlineShoppingCart></MdOutlineShoppingCart>,
    },
    {
      name: "Favorites",
      href: "/dashboard/user/favorites",
      icon: <MdOutlineFavorite></MdOutlineFavorite>,
    },
    {
      name: "Profile",
      href: "/dashboard/user/profile",
      icon: <CgProfile></CgProfile>,
    },
  ];

  const links = userRole === "admin" ? adminLinks : userLinks;

  return (
    <>
      <div
        className={`fixed inset-y-0 left-0 z-30 w-64 bg-white shadow-xl transform transition-transform duration-300 ease-in-out lg:translate-x-0 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full ">
          <Link href="/">
            <div className="flex items-center justify-between  h-16 px-6 bg-gradient-to-r from-[#5E0208] to-[#AE3433] hover:!bg-[#5E0208] ">
              <div className="flex items-center px-5  hover:!bg-[#5E0208]  ">
                <div className="relative w-20 h-20">
                  {" "}
                  <Image
                    src="/logo.png"
                    alt="TestoBurger Logo"
                    fill
                    sizes="80px"
                    className="object-contain"
                  />
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="lg:hidden text-white hover:text-gray-200"
              >
                ✕
              </button>
            </div>
          </Link>

          <div className="px-6 py-4  bg-gradient-to-r from-orange-100 to-red-100">
            <div
              className={`inline-flex items-center  px-3 py-1 rounded-full text-md font-semibold bg-white text-[#5E0208] shadow-sm ${oswald.className}`}
            >
              <MdAdminPanelSettings className="mr-2"></MdAdminPanelSettings>
              {userRole === "admin" ? " Admin Panel" : " User Panel"}
            </div>
          </div>

          <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
            {links.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`flex items-center px-4 py-3 !no-underline text-md font-medium rounded-lg transition-all duration-200 ${
                    lil.className
                  } ${
                    isActive
                      ? "bg-[#5E0208] text-white shadow-md transform scale-105"
                      : "!text-[#5E0208] hover:bg-orange-50 hover:text-[#C9983C]"
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                  <span className="text-xl mr-3">{link.icon}</span>
                  {link.name}
                </Link>
              );
            })}
          </nav>

          <div className="p-4 border-t border-[#5E0208]">
            <Logout></Logout>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;

import BannerSlider from "@/components/Home Page/BannerSlider";
import Discount from "@/components/Home Page/Discount";
import EShop from "@/components/Home Page/EShop";
import FoodSlider from "@/components/Home Page/FoodSlider";
import Footer from "@/components/Home Page/Footer";
import MenuFilters from "@/components/Home Page/MenuFilters";
import Navbar from "@/components/Home Page/Navbar";
import Offer from "@/components/Home Page/Offer";
import PizzaBanner from "@/components/Home Page/PizzaBanner";

export default async function Home({ searchParams }) {
  const resolvedSearchParams = await searchParams;
  return (
    <div>
      {/* <Navbar></Navbar> */}
      <BannerSlider></BannerSlider>
      <MenuFilters searchParams={resolvedSearchParams}></MenuFilters>
      <PizzaBanner></PizzaBanner>
      <Discount></Discount>
      <Offer></Offer>
      <FoodSlider></FoodSlider>
      <EShop></EShop>
      <Footer></Footer>
    </div>
  );
}

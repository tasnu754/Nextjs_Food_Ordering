import BannerSlider from "@/components/BannerSlider";
import Discount from "@/components/Discount";
import EShop from "@/components/EShop";
import MenuFilters from "@/components/MenuFilters";
import Navbar from "@/components/Navbar";
import Offer from "@/components/Offer";
import PizzaBanner from "@/components/PizzaBanner";

export default async function Home({ searchParams }) {
  const resolvedSearchParams = await searchParams;
  return (
    <div>
      <Navbar></Navbar>
      <BannerSlider></BannerSlider>
      <MenuFilters searchParams={resolvedSearchParams}></MenuFilters>
      <PizzaBanner></PizzaBanner>
      <Discount></Discount>
      <Offer></Offer>
      <EShop></EShop>
    </div>
  );
}

import BannerSlider from "@/components/BannerSlider";
import Discount from "@/components/Discount";
import MenuFilters from "@/components/MenuFilters";
import Navbar from "@/components/Navbar";
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
    </div>
  );
}

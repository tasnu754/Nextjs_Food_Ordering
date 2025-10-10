import BannerSlider from "@/components/BannerSlider";
import MenuFilters from "@/components/MenuFilters";
import Navbar from "@/components/Navbar";

export default async function Home({ searchParams }) {
  const resolvedSearchParams = await searchParams;
  return (
    <div>
      <Navbar></Navbar>
      <BannerSlider></BannerSlider>
      <MenuFilters searchParams={resolvedSearchParams}></MenuFilters>
    </div>
  );
}

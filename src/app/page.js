import BannerSlider from "@/components/BannerSlider";
import MenuFilterCards from "@/components/MenuFilterCards";
import MenuFilters from "@/components/MenuFilters";
import Navbar from "@/components/Navbar";
import Image from "next/image";

export default function Home() {
  return (
    <div>
      <Navbar></Navbar>
      <BannerSlider></BannerSlider>
      <MenuFilters></MenuFilters>
    </div>
  );
}

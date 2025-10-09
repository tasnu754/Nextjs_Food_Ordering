import BannerSlider from "@/components/BannerSlider";
import Navbar from "@/components/Navbar";
import Image from "next/image";

export default function Home() {
  return (
    <div>
      <Navbar></Navbar>
      <BannerSlider></BannerSlider>
      <BannerSlider></BannerSlider>
    </div>
  );
}

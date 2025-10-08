import BannerSlider from "@/components/BannerSlider";
import Navbar from "@/components/Navbar";
import Image from "next/image";

export default function Home() {
  return (
    <div>
      <BannerSlider></BannerSlider>
      <Navbar></Navbar>
    </div>
  );
}

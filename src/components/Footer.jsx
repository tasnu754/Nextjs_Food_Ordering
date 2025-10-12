import { FaFacebookF } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="bg-white pb-20 px-4 mt-92 md:mt-72 lg:mt-0">
      <div className="max-w-6xl mx-auto ">
        {/* Logo */}
        <div className="flex justify-center mb-8">
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

        {/* Social Icons */}
        <div className="flex justify-center gap-6 mb-8 ">
          <a
            href="#"
            className="!text-[#642F21] hover:text-orange-500 transition-colors"
            aria-label="Facebook"
          >
            <FaFacebookF className="w-6 h-6 !text-[#642F21]" />
          </a>
          <a
            href="#"
            className="!text-[#642F21] hover:text-orange-500 transition-colors"
            aria-label="Twitter"
          >
            <FaTwitter className="w-6 h-6 !text-[#642F21]" />
          </a>
          <a
            href="#"
            className=" hover:text-orange-500 transition-colors !text-[#642F21]"
            aria-label="Behance"
          >
            <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
              <path d="M22 7h-7v-2h7v2zm1.726 10c-.442 1.297-2.029 3-5.101 3-3.074 0-5.564-1.729-5.564-5.675 0-3.91 2.325-5.92 5.466-5.92 3.082 0 4.964 1.782 5.375 4.426.078.506.109 1.188.095 2.14h-8.027c.13 3.211 3.483 3.312 4.588 2.029h3.168zm-7.686-4h4.965c-.105-1.547-1.136-2.219-2.477-2.219-1.466 0-2.277.768-2.488 2.219zm-9.574 6.988h-6.466v-14.967h6.953c5.476.081 5.58 5.444 2.72 6.906 3.461 1.26 3.577 8.061-3.207 8.061zm-3.466-8.988h3.584c2.508 0 2.906-3-.312-3h-3.272v3zm3.391 3h-3.391v3.016h3.341c3.055 0 2.868-3.016.05-3.016z" />
            </svg>
          </a>
          <a
            href="#"
            className="!text-[#642F21] hover:text-orange-500 transition-colors"
            aria-label="YouTube"
          >
            <FaYoutube className="w-6 h-6 !text-[#642F21]" />
          </a>
          <a
            href="#"
            className="!text-[#642F21] hover:text-orange-500 transition-colors"
            aria-label="Pinterest"
          >
            <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0c-6.627 0-12 5.372-12 12 0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738.098.119.112.224.083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.631-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146 1.124.347 2.317.535 3.554.535 6.627 0 12-5.373 12-12 0-6.628-5.373-12-12-12z" />
            </svg>
          </a>
        </div>

        {/* Navigation Links */}
        <nav className="flex justify-center gap-4 mb-6 flex-wrap">
          <a
            href="#about"
            className="!text-[#642F21] !no-underline  hover:text-orange-500 font-medium transition-colors"
          >
            ABOUT
          </a>
          <span className="!text-[#642F21]">|</span>
          <a
            href="#menu"
            className="!text-[#642F21] !no-underline hover:text-orange-500 font-medium transition-colors"
          >
            MENU
          </a>
          <span className="!text-[#642F21]">|</span>
          <a
            href="#order"
            className="!text-[#642F21] !no-underline hover:text-orange-500 font-medium transition-colors"
          >
            ORDER NOW
          </a>
          <span className="!text-[#642F21]">|</span>
          <a
            href="#gallery"
            className="!text-[#642F21] !no-underline hover:text-orange-500 font-medium transition-colors"
          >
            GALLERY
          </a>
          <span className="!text-[#642F21]">|</span>
          <a
            href="#locations"
            className="!text-[#642F21] !no-underline hover:text-orange-500 font-medium transition-colors"
          >
            LOCATIONS
          </a>
          <span className="!text-[#642F21]">|</span>
          <a
            href="#contact"
            className="!text-[#642F21] hover:text-orange-500 font-medium transition-colors"
          >
            CONTACT
          </a>
        </nav>

        {/* Copyright */}
        <div className="text-center text-gray-500 text-md des">
          2021 © Copyright, Testo. All rights reserved.
        </div>
      </div>
    </footer>
  );
}

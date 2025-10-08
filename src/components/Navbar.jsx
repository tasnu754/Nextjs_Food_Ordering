import Image from "next/image";
import Link from "next/link";
import React from "react";

const Navbar = () => {
  return (
    <div>
      <header className="w-[100%] fixed top-0 left-0 z-[100] py-4 ">
        <div className="container flex items-center justify-between">
          <div className="logo">
            <Link href="/">
              <Image src="/logo.png" width={100} height={100} alt="logo" />
            </Link>
          </div>

          <div className="w-full">
            <nav>
              <ul>
                <li className="ml-auto flex items-center justify-center gap-4 uppercase text-white font-bold text-xl">
                  <Link
                    href="/"
                    className="text-white !no-underline  hover:!text-yellow-500 transition-colors duration-300"
                  >
                    Home
                  </Link>
                  <Link
                    href="/about"
                    className="text-white !no-underline hover:no-underline hover:!text-yellow-500 transition-colors duration-300"
                  >
                    About
                  </Link>
                  <Link
                    href="/menu"
                    className="text-white !no-underline hover:no-underline hover:!text-yellow-500 transition-colors duration-300"
                  >
                    Our Menu
                  </Link>
                  <Link
                    href="/shop"
                    className="text-white !no-underline hover:no-underline hover:!text-yellow-500 transition-colors duration-300"
                  >
                    Shop
                  </Link>
                  <Link
                    href="/blog"
                    className="text-white !no-underline hover:no-underline hover:!text-yellow-500 transition-colors duration-300"
                  >
                    Blog
                  </Link>
                  <Link
                    href="/contact"
                    className="text-white !no-underline  hover:!text-yellow-400 transition-colors duration-300"
                  >
                    Contact Us
                  </Link>
                  <Link
                    href="/"
                    className="!no-underline text-2xl  !text-yellow-400"
                  >
                    789-654-3210
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </header>
    </div>
  );
};

export default Navbar;

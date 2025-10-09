"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useRef } from "react";
import { IoCallOutline } from "react-icons/io5";
import { HiOutlineShoppingBag } from "react-icons/hi2";

const Navbar = () => {
  const headerRef = useRef();
  useEffect(() => {
    window.addEventListener("scroll", () => {
      let position = window.pageYOffset;

      if (headerRef.current) {
        if (position > 100) {
          headerRef.current.classList.add("scroll");
          headerRef.current.classList.remove("bg-transparent");
          headerRef.current.classList.add("bg-white");
          headerRef.current.classList.add("navScroll");
        } else {
          headerRef.current.classList.remove("scroll");
          headerRef.current.classList.remove("navScroll");
          headerRef.current.classList.remove("bg-white");
          headerRef.current.classList.add("bg-transparent");
        }
      }
    });
  }, []);
  return (
    <div>
      <header
        className="w-[100%]  bg-transparent fixed z-[100] pt-4 pb-3 align-middle transition-all duration-500 ease-in-out"
        ref={headerRef}
      >
        <div className="container flex items-center justify-between">
          <div className="logo">
            <Link href="/">
              <Image src="/logo.png" width={100} height={100} alt="logo" />
            </Link>
          </div>

          <div className="w-full">
            <nav>
              <ul>
                <li className="ml-auto flex items-center justify-center gap-9 uppercase font-bold text-xl">
                  <Link
                    href="/"
                    className="text-white nav-link hover:!text-yellow-500 transition-colors duration-300"
                  >
                    Home
                  </Link>
                  <Link
                    href="/about"
                    className="text-white nav-link hover:!text-yellow-500 transition-colors duration-300"
                  >
                    About
                  </Link>
                  <Link
                    href="/menu"
                    className="text-white nav-link hover:!text-yellow-500 transition-colors duration-300"
                  >
                    Our Menu
                  </Link>
                  <Link
                    href="/shop"
                    className="text-white nav-link hover:!text-yellow-500 transition-colors duration-300"
                  >
                    Shop
                  </Link>
                  <Link
                    href="/blog"
                    className="text-white nav-link hover:!text-yellow-500 transition-colors duration-300"
                  >
                    Blog
                  </Link>
                  <Link
                    href="/contact"
                    className="text-white nav-link hover:!text-yellow-400 transition-colors duration-300"
                  >
                    Contact Us
                  </Link>
                  <Link
                    href="/"
                    className="nav-link-call !no-underline text-2xl flex items-center gap-1 !text-yellow-400"
                  >
                    <IoCallOutline></IoCallOutline>0103-4729823
                  </Link>
                  <Link
                    href="/carts"
                    className="relative nav-link-cart text-[40px] text-white hover:!text-yellow-400 transition-colors duration-300"
                  >
                    <span className="absolute text-[15px] w-[45%] text-center top-0 right-0 bg-red-600 rounded-2xl z-10">
                      0
                    </span>
                    <HiOutlineShoppingBag></HiOutlineShoppingBag>
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

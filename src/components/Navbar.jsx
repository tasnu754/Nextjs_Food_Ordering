"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import { IoCallOutline } from "react-icons/io5";
import { CgMenuGridO } from "react-icons/cg";
import { MdRestaurantMenu } from "react-icons/md";
import { HiOutlineShoppingBag } from "react-icons/hi2";

const Navbar = () => {
  const headerRef = useRef();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <div>
      <header
        className="w-[100%] bg-transparent fixed z-[100] pt-5 pb-3 align-middle transition-all duration-500 ease-in-out"
        ref={headerRef}
      >
        <div className="container flex items-center justify-between">
          <div className="logo">
            <Link href="/" onClick={closeMenu}>
              <Image src="/logo.png" width={100} height={100} alt="logo" />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:block w-full">
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
                    Blogs
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
                    <IoCallOutline className="text-xl" />
                    0103-4729823
                  </Link>
                  <Link
                    href="/carts"
                    className="relative nav-link-cart text-[40px] text-white hover:!text-yellow-400 transition-colors duration-300"
                  >
                    <span className="absolute text-[15px] w-[45%] text-center top-0 right-0 bg-red-600 rounded-2xl z-10">
                      0
                    </span>
                    <HiOutlineShoppingBag />
                  </Link>
                  <Link href="/signin" className="!no-underline">
                    {" "}
                    <button className="btn-grad mr-6">Sign In</button>
                  </Link>
                </li>
              </ul>
            </nav>
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden flex items-center gap-4">
            <Link
              href="/carts"
              className="relative nav-link-cart text-[32px] text-white hover:!text-yellow-400 transition-colors duration-300"
            >
              <span className="absolute text-[12px] w-[45%] text-center top-0 right-0 bg-red-600 rounded-2xl z-10">
                0
              </span>
              <HiOutlineShoppingBag />
            </Link>
            <button
              onClick={toggleMenu}
              className="text-gray-300 text-3xl focus:outline-none"
            >
              {isMenuOpen ? (
                <MdRestaurantMenu className="text-2xl" />
              ) : (
                <CgMenuGridO className="text-2xl" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        <div
          className={`lg:hidden absolute top-full left-0 w-full  bg-white shadow-lg transition-all duration-300 ease-in-out ${
            isMenuOpen
              ? "max-h-screen opacity-100"
              : "max-h-0 opacity-0 overflow-hidden"
          }`}
        >
          <nav className="container py-4">
            <ul className="flex flex-col gap-4 uppercase  font-bold text-lg">
              <li>
                <Link
                  href="/"
                  className=" !no-underline !text-yellow-500   hover:!text-yellow-500 transition-colors duration-300 block py-2"
                  onClick={closeMenu}
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="!text-yellow-500 !no-underline hover:!text-yellow-500 transition-colors duration-300 block py-2"
                  onClick={closeMenu}
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  href="/menu"
                  className="!text-yellow-500 !no-underline hover:!text-yellow-500 transition-colors duration-300 block py-2"
                  onClick={closeMenu}
                >
                  Our Menu
                </Link>
              </li>
              <li>
                <Link
                  href="/shop"
                  className="!text-yellow-500 !no-underline hover:!text-yellow-500 transition-colors duration-300 block py-2"
                  onClick={closeMenu}
                >
                  Shop
                </Link>
              </li>
              <li>
                <Link
                  href="/blog"
                  className="!text-yellow-500 !no-underline hover:!text-yellow-500 transition-colors duration-300 block py-2"
                  onClick={closeMenu}
                >
                  Blog
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="!text-yellow-500 !no-underline hover:!text-yellow-400 transition-colors duration-300 block py-2"
                  onClick={closeMenu}
                >
                  Contact Us
                </Link>
              </li>
              <li>
                <Link
                  href="/"
                  className="!no-underline text-xl flex items-center gap-1 !text-yellow-400 py-2"
                  onClick={closeMenu}
                >
                  <IoCallOutline className="text-lg" />
                  0103-4729823
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </header>
    </div>
  );
};

export default Navbar;

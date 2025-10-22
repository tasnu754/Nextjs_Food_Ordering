"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import { IoCallOutline } from "react-icons/io5";
import { CgMenuGridO } from "react-icons/cg";
import { MdRestaurantMenu } from "react-icons/md";
import { HiOutlineShoppingBag } from "react-icons/hi2";
import { Lilita_One } from "next/font/google";
import { Oswald } from "next/font/google";
import { usePathname } from "next/navigation";

const lil = Lilita_One({
  subsets: ["latin"],
  weight: "400",
});

const oswald = Oswald({
  subsets: ["latin"],
  weight: "600",
});

const Navbar = ({ searchParams }) => {
  const headerRef = useRef();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const pathname = usePathname();

  const transparentBgPages = [
    "/",
    "/contact",
    "/blog",
    "/about",
    "/menu",
    "/signup",
    "/login",
  ];
  const shouldHaveTransparentBg = transparentBgPages.includes(pathname);

  const isAbout = pathname === "/about";

  const getInitialBackground = () => {
    return shouldHaveTransparentBg ? "bg-transparent" : "bg-white";
  };

  useEffect(() => {
    setIsMounted(true);

    const initialScroll =
      typeof window !== "undefined" ? window.pageYOffset > 100 : false;
    setIsScrolled(initialScroll);

    const handleScroll = () => {
      const position = window.pageYOffset;
      const scrolled = position > 100;

      if (scrolled !== isScrolled) {
        setIsScrolled(scrolled);
      }

      if (headerRef.current) {
        if (scrolled) {
          headerRef.current.classList.add("scroll", "bg-white", "navScroll");
          headerRef.current.classList.remove("bg-transparent");
        } else {
          headerRef.current.classList.remove("scroll", "navScroll");
          if (shouldHaveTransparentBg) {
            headerRef.current.classList.remove("bg-white");
            headerRef.current.classList.add("bg-transparent");
          } else {
            headerRef.current.classList.add("bg-white");
          }
        }
      }
    };

    if (typeof window !== "undefined") {
      window.addEventListener("scroll", handleScroll);
    }

    return () => {
      if (typeof window !== "undefined") {
        window.removeEventListener("scroll", handleScroll);
      }
    };
  }, [shouldHaveTransparentBg, isScrolled]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const isActiveLink = (path) => {
    return pathname === path;
  };

  const getLinkStyles = (path, isMobile = false) => {
    const baseStyles =
      "nav-link hover:!text-yellow-500 transition-colors duration-300";
    const activeStyles = `${
      isAbout ? "!text-amber-900" : "!text-yellow-500"
    } border-b-2 border-yellow-500`;

    if (isMobile) {
      return `!no-underline ${baseStyles} ${
        isActiveLink(path) ? activeStyles : "!text-amber-900"
      } block py-2`;
    }

    if (shouldHaveTransparentBg && !isScrolled) {
      return `${baseStyles} ${
        isActiveLink(path) ? activeStyles : "text-white"
      }`;
    } else {
      return `${baseStyles} ${
        isActiveLink(path) ? activeStyles : "text-amber-900"
      }`;
    }
  };

  const getCartStyles = () => {
    if (shouldHaveTransparentBg && !isScrolled) {
      return "relative nav-link-cart text-[40px] text-white hover:!text-yellow-400 transition-colors duration-300";
    } else {
      return "relative nav-link-cart text-[40px] text-amber-900 hover:!text-yellow-500 transition-colors duration-300";
    }
  };

  const getMobileCartStyles = () => {
    if (shouldHaveTransparentBg && !isScrolled) {
      return "relative nav-link-cart text-[32px] text-white hover:!text-yellow-400 transition-colors duration-300";
    } else {
      return "relative nav-link-cart text-[32px] text-amber-900 hover:!text-yellow-500 transition-colors duration-300";
    }
  };

  const getMenuButtonColor = () => {
    return shouldHaveTransparentBg && !isScrolled
      ? "text-gray-300"
      : "text-amber-900";
  };

  if (!isMounted) {
    return (
      <header
        className={`w-[100%] ${getInitialBackground()} fixed z-40 pt-2 pb-0 align-middle transition-all duration-500 ease-in-out ${
          oswald.className
        }`}
      >
        <div className="container flex items-center justify-between">
          <div className="logo">
            <Link href="/">
              <Image src="/logo.png" width={100} height={100} alt="logo" />
            </Link>
          </div>
        </div>
      </header>
    );
  }

  return (
    <div>
      <header
        className={`w-[100%] ${getInitialBackground()} fixed z-40 pt-2 pb-0 align-middle transition-all duration-500 ease-in-out ${
          oswald.className
        }`}
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
                <li className="ml-auto flex items-center justify-center gap-7 uppercase font-bold text-xl">
                  <Link href="/" className={getLinkStyles("/")}>
                    Home
                  </Link>
                  <Link href="/about" className={getLinkStyles("/about")}>
                    About
                  </Link>
                  <Link href="/menu" className={getLinkStyles("/menu")}>
                    Our Menu
                  </Link>
                  <Link href="/blog" className={getLinkStyles("/blog")}>
                    Blog
                  </Link>
                  <Link href="/contact" className={getLinkStyles("/contact")}>
                    Contact Us
                  </Link>
                  <Link
                    href="/"
                    className="nav-link-call !no-underline text-2xl flex items-center gap-1 !text-yellow-400"
                  >
                    <IoCallOutline className="text-xl" />
                    0103-4729823
                  </Link>
                  <Link href="/carts" className={getCartStyles()}>
                    <span className="absolute text-[15px] w-[45%] text-center top-0 right-0 bg-red-600 rounded-2xl z-10 text-white">
                      0
                    </span>
                    <HiOutlineShoppingBag />
                  </Link>
                  <Link href="/signup" className="!no-underline">
                    <button className={`btn-grad mr-6 ${lil.className}`}>
                      Sign Up
                    </button>
                  </Link>
                </li>
              </ul>
            </nav>
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden flex items-center gap-4">
            <Link href="/carts" className={getMobileCartStyles()}>
              <span className="absolute text-[12px] w-[45%] text-center top-0 right-0 bg-red-600 rounded-2xl z-10 text-white">
                0
              </span>
              <HiOutlineShoppingBag />
            </Link>
            <button
              onClick={toggleMenu}
              className={`text-3xl focus:outline-none ${getMenuButtonColor()}`}
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
          className={`lg:hidden absolute top-full left-0 w-full bg-white shadow-lg transition-all duration-300 ease-in-out ${
            isMenuOpen
              ? "max-h-screen opacity-100"
              : "max-h-0 opacity-0 overflow-hidden"
          }`}
        >
          <nav className="container py-4">
            <ul className="flex flex-col gap-4 uppercase font-bold text-lg">
              <li>
                <Link
                  href="/"
                  className={getLinkStyles("/", true)}
                  onClick={closeMenu}
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className={getLinkStyles("/about", true)}
                  onClick={closeMenu}
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  href="/menu"
                  className={getLinkStyles("/menu", true)}
                  onClick={closeMenu}
                >
                  Our Menu
                </Link>
              </li>
              <li>
                <Link
                  href="/shop"
                  className={getLinkStyles("/shop", true)}
                  onClick={closeMenu}
                >
                  Shop
                </Link>
              </li>
              <li>
                <Link
                  href="/blog"
                  className={getLinkStyles("/blog", true)}
                  onClick={closeMenu}
                >
                  Blog
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className={getLinkStyles("/contact", true)}
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
              <Link href="/signup" className="!no-underline">
                <button className="btn-grad mr-6">Sign Up</button>
              </Link>
            </ul>
          </nav>
        </div>
      </header>
    </div>
  );
};

export default Navbar;

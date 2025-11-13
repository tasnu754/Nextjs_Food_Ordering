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
import { usePathname, useRouter } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "@/redux/features/authSlice";
import { useLogoutMutation } from "@/redux/features/authApi";
import Swal from "sweetalert2";
import { useGetCartQuery } from "@/redux/features/cartApi";
import { ShoppingCart } from "lucide-react";
import { clearLocalCart } from "@/redux/features/cartSlice";

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
  const router = useRouter();

  const authState = useSelector((state) => state.auth);
  const id = authState?.user?._id;

  const { data, refetch } = useGetCartQuery({ id });
  const cart = data?.data;
  const dispatch = useDispatch();

  const [logoutApi, { isLoading: isLoggingOut }] = useLogoutMutation();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const isLoggedIn = isMounted && !!(authState.user && authState.accessToken);

  const transparentBgPages = [
    "/",
    "/contact",
    "/blog",
    "/about",
    "/signup",
    "/login",
    "/dashboard",
  ];
  const shouldHaveTransparentBg = transparentBgPages.includes(pathname);

  const isAbout = pathname === "/about";

  const handleLogout = async () => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You will be logged out from your account!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, logout!",
      cancelButtonText: "Cancel",
    });

    if (result.isConfirmed) {
      try {
        dispatch(clearLocalCart());

        await logoutApi().unwrap();
        dispatch(logout());

        refetch();

        Swal.fire({
          title: "Logged out!",
          text: "You have been successfully logged out.",
          icon: "success",
        });

        closeMenu();
        router.push("/");
      } catch (error) {
        dispatch(clearLocalCart());
        dispatch(logout());

        Swal.fire({
          title: "Logged out locally",
          text: "You have been logged out from this device. There was an issue with the server.",
          icon: "info",
        });
        console.log(error);

        closeMenu();
        router.push("/");
      }
    }
  };

  const getInitialBackground = () => {
    return shouldHaveTransparentBg ? "bg-transparent" : "bg-white";
  };

  useEffect(() => {
    const handleScroll = () => {
      if (!isMounted) return;

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

    if (isMounted) {
      const initialScroll = window.pageYOffset > 100;
      setIsScrolled(initialScroll);

      if (headerRef.current) {
        if (initialScroll) {
          headerRef.current.classList.add("scroll", "bg-white", "navScroll");
          headerRef.current.classList.remove("bg-transparent");
        } else {
          if (shouldHaveTransparentBg) {
            headerRef.current.classList.add("bg-transparent");
            headerRef.current.classList.remove("bg-white");
          } else {
            headerRef.current.classList.add("bg-white");
          }
        }
      }

      window.addEventListener("scroll", handleScroll);
    }

    return () => {
      if (isMounted) {
        window.removeEventListener("scroll", handleScroll);
      }
    };
  }, [shouldHaveTransparentBg, isScrolled, isMounted]);

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

  const getAuthButtonStyle = () => {
    if (shouldHaveTransparentBg && !isScrolled) {
      return "bg-red-600 hover:bg-red-700 text-white";
    } else {
      return "btn-grad";
    }
  };

  // Render same structure always, conditionally show content only after mount
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
              <Image
                src="/logo.webp"
                width={100}
                height={100}
                alt="logo"
                priority
              />
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

                  {/* Always render dashboard link but conditionally show based on auth */}
                  {isMounted && isLoggedIn && (
                    <Link
                      href="/dashboard"
                      className={getLinkStyles("/dashboard")}
                      onClick={closeMenu}
                    >
                      Dashboard
                    </Link>
                  )}

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

                  <Link href="/cart" className={getCartStyles()}>
                    <button
                      className="relative p-2 rounded-full transition"
                      aria-label="Shopping Cart"
                    >
                      {authState?.user && cart && cart.totalItems > 0 ? (
                        <span className="absolute text-[15px] w-[45%] text-center top-0 right-0 bg-red-600 rounded-2xl z-10 text-white">
                          {cart?.items.length > 99 ? "99+" : cart?.items.length}
                        </span>
                      ) : (
                        <span className="absolute text-[15px] w-[45%] text-center top-0 right-0 bg-red-600 rounded-2xl z-10 text-white">
                          0
                        </span>
                      )}
                      <HiOutlineShoppingBag />
                    </button>
                  </Link>

                  {/* Auth buttons - use display: none initially to maintain layout */}
                  <div style={{ minWidth: "100px", display: "inline-block" }}>
                    {isMounted ? (
                      isLoggedIn ? (
                        <button
                          onClick={handleLogout}
                          disabled={isLoggingOut}
                          className={`btn-grad px-6 py-2 rounded-lg font-medium transition-all duration-300 ${
                            isLoggingOut ? "opacity-50 cursor-not-allowed" : ""
                          } ${getAuthButtonStyle()} ${lil.className}`}
                        >
                          {isLoggingOut ? (
                            <span className="flex items-center justify-center">
                              <svg
                                className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                                fill="none"
                                viewBox="0 0 24 24"
                              >
                                <circle
                                  className="opacity-25"
                                  cx="12"
                                  cy="12"
                                  r="10"
                                  stroke="currentColor"
                                  strokeWidth="4"
                                ></circle>
                                <path
                                  className="opacity-75"
                                  fill="currentColor"
                                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                ></path>
                              </svg>
                              Logging out...
                            </span>
                          ) : (
                            "Logout"
                          )}
                        </button>
                      ) : (
                        <Link href="/signup" className="!no-underline">
                          <button
                            className={`flex justify-center items-center gap-2 py-2 px-6 lg:px-6  text-[#501606] hover:bg-[#642F21] hover:text-white border-2 border-[#501606] font-semibold !rounded-md transition-colors duration-400 ${lil.className}`}
                          >
                            Sign Up
                          </button>
                        </Link>
                      )
                    ) : (
                      // Placeholder with same dimensions during SSR
                      <div style={{ width: "100px", height: "40px" }}></div>
                    )}
                  </div>
                </li>
              </ul>
            </nav>
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden flex items-center gap-4">
            <Link href="/cart" className={getCartStyles()}>
              <button
                className="relative p-2 rounded-full transition"
                aria-label="Shopping Cart"
              >
                {cart && cart.totalItems > 0 && (
                  <span className="absolute text-[15px] w-[45%] text-center top-0 right-0 bg-red-600 rounded-2xl z-10 text-white">
                    {cart?.items.length > 99 ? "99+" : cart?.items.length}
                  </span>
                )}
                <HiOutlineShoppingBag />
              </button>
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

              {/* Mobile dashboard link - conditionally shown */}
              {isMounted && isLoggedIn && (
                <li>
                  <Link
                    href="/dashboard"
                    className={getLinkStyles("/dashboard", true)}
                    onClick={closeMenu}
                  >
                    Dashboard
                  </Link>
                </li>
              )}

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

              {/* Mobile auth buttons */}
              <li>
                {isMounted ? (
                  isLoggedIn ? (
                    <button
                      onClick={handleLogout}
                      disabled={isLoggingOut}
                      className={`btn-grad w-full text-center ${
                        isLoggingOut ? "opacity-50 cursor-not-allowed" : ""
                      }`}
                    >
                      {isLoggingOut ? "Logging out..." : "Logout"}
                    </button>
                  ) : (
                    <Link
                      href="/signup"
                      className="!no-underline"
                      onClick={closeMenu}
                    >
                      <button className="btn-grad w-full text-center">
                        Sign Up
                      </button>
                    </Link>
                  )
                ) : (
                  <div className="h-10"></div>
                )}
              </li>
            </ul>
          </nav>
        </div>
      </header>
    </div>
  );
};

export default Navbar;

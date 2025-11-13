"use client";

import Image from "next/image";
import Link from "next/link";
import { Roboto, Oswald } from "next/font/google";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useState, useEffect } from "react";
import { useLoginMutation } from "@/redux/features/authApi";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { setCredentials } from "@/redux/features/authSlice";
import Swal from "sweetalert2";
import Navbar from "@/components/Home Page/Navbar";

const roboto = Roboto({
  subsets: ["latin"],
  weight: "500",
});
const oswald = Oswald({
  subsets: ["latin"],
  weight: "600",
});

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [login, { isLoading, error }] = useLoginMutation();
  const router = useRouter();
  const dispatch = useDispatch();

  useEffect(() => {
    const checkExistingAuth = () => {
      const token = localStorage.getItem("accessToken");
      const user = localStorage.getItem("user");
      if (token && user) {
        handleRedirectAfterLogin();
      }
    };

    checkExistingAuth();
  }, []);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const getErrorMessage = () => {
    if (!error) return null;

    if (typeof error === "string") return error;
    if (error?.data?.error) return error.data.error;
    if (error?.data?.message) return error.data.message;
    if (error?.error) return error.error;
    if (error?.message) return error.message;

    return "Login failed. Please try again.";
  };

  const errorMessage = getErrorMessage();

  const handleRedirectAfterLogin = () => {
    const redirectData = sessionStorage.getItem("redirectAfterLogin");

    if (redirectData) {
      try {
        const { path, action, itemId } = JSON.parse(redirectData);

        // Clear the redirect data regardless
        sessionStorage.removeItem("redirectAfterLogin");

        // Don't redirect to dashboard routes - let the dashboard handle its own routing
        if (path && path.startsWith("/dashboard")) {
          console.log("Ignoring dashboard redirect, going to home page");
          router.push("/");
          return;
        }

        // Redirect based on the original action for non-dashboard routes
        if (action === "view_details" && itemId) {
          router.push(`/item/${itemId}`);
        } else if (action === "add_to_cart") {
          router.push(path || "/");
        } else {
          router.push(path || "/");
        }
      } catch (err) {
        console.error("Error parsing redirect data:", err);
        router.push("/");
      }
    } else {
      router.push("/");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);

    const userData = {
      email: formData.get("email"),
      password: formData.get("password"),
    };

    try {
      const result = await login(userData).unwrap();
      // console.log("Login result:", result);

      dispatch(
        setCredentials({
          user: result?.data?.user,
          accessToken: result?.data?.accessToken,
        })
      );

      Swal.fire({
        title: `Hello ${result?.data?.user?.name}!`,
        text: "Login successful!",
        icon: "success",
        timer: 1500,
        showConfirmButton: false,
      }).then(() => {
        handleRedirectAfterLogin();
      });
    } catch (err) {
      Swal.fire({
        title: "Login Failed!",
        text:
          err?.data?.message || "Please check your credentials and try again.",
        icon: "error",
        confirmButtonText: "Try Again",
      });
    }
  };

  return (
    <div>
      <Navbar></Navbar>
      <div className="signupBg min-h-[80vh] authContainer pt-14">
        <div className="glass-container flex items-center justify-center backdrop-blur-sm">
          <div className="max-w-xl px-8 md:px-18 py-8 w-full border-none rounded-2xl shadow-2xl backdrop-blur-sm">
            <div className="hidden lg:visible text-center mb-2 lg:flex flex-col justify-center items-center gap-2">
              <div className="relative w-30 h-17">
                <Image
                  src={"/footer.webp"}
                  alt="Pizza Banner"
                  fill
                  className="object-fit"
                  sizes="(max-width: 1024px) 90vw, 60vw"
                />
              </div>
              <p className={`text-white text-2xl ${oswald.className}`}>
                Login to your account
              </p>
            </div>

            {errorMessage && (
              <div className="mb-3 p-3 bg-red-500/20 text-red-200 rounded-lg">
                {errorMessage}
              </div>
            )}

            <form
              onSubmit={handleSubmit}
              className={`space-y-3 ${roboto.className}`}
            >
              <div>
                <label
                  htmlFor="email"
                  className="block text-lg !font-bold mb-1"
                >
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="w-full px-4 py-3 border-none inputBg rounded-lg text-white focus:outline-none focus:ring-2 focus:border-transparent"
                  placeholder="tasnuva@gmail.com"
                  required
                  disabled={isLoading}
                  autoComplete="email"
                />
              </div>

              <div className="relative">
                <label
                  htmlFor="password"
                  className="block text-lg font-bold mb-1"
                >
                  Password
                </label>
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  className="w-full px-4 py-3 border-none inputBg rounded-lg text-white focus:outline-none focus:ring-2 focus:border-transparent pr-12"
                  placeholder="••••••••"
                  required
                  disabled={isLoading}
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  className="absolute right-3 top-15 transform -translate-y-1/2 text-white hover:text-yellow-500 transition-colors"
                  onClick={togglePasswordVisibility}
                  disabled={isLoading}
                >
                  {showPassword ? (
                    <FaEyeSlash size={20} />
                  ) : (
                    <FaEye size={20} />
                  )}
                </button>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className={`w-full !text-xl py-3 px-4 inputBg text-white font-medium !rounded-lg shadow-lg transition-all duration-300 ${
                  isLoading
                    ? "opacity-70 cursor-not-allowed"
                    : "hover:from-purple-700 hover:to-violet-700 hover:shadow-purple-500/30"
                }`}
              >
                {isLoading ? (
                  <span className="flex items-center justify-center">
                    <svg
                      className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
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
                    Logging in...
                  </span>
                ) : (
                  "Login"
                )}
              </button>
            </form>

            <div className={`mt-8 text-center ${oswald.className}`}>
              <p className="!text-white text-xl">
                Don't have account?{" "}
                <Link
                  href="/signup"
                  className="!text-yellow-500 font-medium transition-colors"
                >
                  Signup
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;

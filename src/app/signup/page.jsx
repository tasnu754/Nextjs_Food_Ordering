"use client";

import Image from "next/image";
import Link from "next/link";
import { Roboto, Oswald } from "next/font/google";
import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";
import { useRegisterMutation } from "@/redux/features/root";
import Navbar from "@/components/Home Page/Navbar";

const roboto = Roboto({
  subsets: ["latin"],
  weight: "500",
});
const oswald = Oswald({
  subsets: ["latin"],
  weight: "600",
});

const Signup = () => {
  const [register, { isLoading, error }] = useRegisterMutation();
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);

    const userData = {
      name: formData.get("name"),
      email: formData.get("email"),
      password: formData.get("password"),
    };

    try {
      const result = await register(userData).unwrap();
      Swal.fire({
        title: `Hello ${result?.data?.name}!`,
        text: "Registration success, Please login!",
        icon: "success",
      }).then(() => {
        router.push("/login");
      });

      router.push("/login");
    } catch (err) {
      console.log("Registration failed:", err?.data?.error);
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
                  src={"/footer.png"}
                  alt="Pizza Banner"
                  fill
                  className="object-fit"
                  sizes="(max-width: 1024px) 90vw, 60vw"
                />
              </div>
              <p className={`text-white text-2xl ${oswald.className}`}>
                Create your account
              </p>
            </div>

            {error && (
              <div className="mb-3 p-3 bg-red-500 text-white rounded-lg">
                {error?.data?.error || "An error occurred during registration"}
              </div>
            )}

            <form
              onSubmit={handleSubmit}
              className={`space-y-3 ${roboto.className}`}
            >
              <div>
                <label
                  htmlFor="name"
                  className="block text-lg font-bold text-white mb-1"
                >
                  Full Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  className="w-full px-4 py-3 border-none inputBg rounded-lg text-white focus:outline-none focus:ring-2 focus:border-transparent"
                  placeholder="Tasnuva Islam"
                  required
                  disabled={isLoading}
                />
              </div>

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
                  placeholder="tasnu@gmail.com"
                  required
                  disabled={isLoading}
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

              <div className="flex items-center">
                <input
                  id="terms"
                  name="terms"
                  type="checkbox"
                  className="h-4 w-4 bg-white/10 border-white/20 rounded focus:ring-purple-500 text-yellow-500"
                  required
                  disabled={isLoading}
                />
                <label
                  htmlFor="terms"
                  className="ml-2 block text-md text-white"
                >
                  I agree to the{" "}
                  <Link href="#" className="!text-yellow-500 hover:text-white">
                    Terms
                  </Link>{" "}
                  and{" "}
                  <Link href="#" className="!text-yellow-500 hover:text-white">
                    Privacy Policy
                  </Link>
                </label>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className={`w-full !text-xl py-3 px-4 inputBg text-white font-medium !rounded-lg shadow-lg transition-all duration-300 ${
                  isLoading
                    ? "opacity-70 cursor-not-allowed"
                    : "hover:!bg-white-700  hover:shadow-purple-500/30"
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
                    Registering...
                  </span>
                ) : (
                  "Sign Up"
                )}
              </button>
            </form>

            <div className={`mt-8 text-center ${oswald.className}`}>
              <p className="!text-white text-xl">
                Already have an account?{" "}
                <Link
                  href="/login"
                  className="!text-yellow-400 font-medium transition-colors hover:!text-[#642F21] duration-300"
                >
                  Log in
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;

import Image from "next/image";
import Link from "next/link";
import { Roboto, Oswald } from "next/font/google";

const roboto = Roboto({
  subsets: ["latin"],
  weight: "500",
});
const oswald = Oswald({
  subsets: ["latin"],
  weight: "600",
});

const Login = () => {
  const error = "";
  const isLoading = false;
  return (
    <div>
      {" "}
      <div className="signupBg min-h-[80vh] authContainer pt-14  ">
        <div className="glass-container flex items-center  justify-center backdrop-blur-sm ">
          <div className=" max-w-xl px-18 py-8 w-full  border-none rounded-2xl shadow-2xl backdrop-blur-sm">
            <div className="text-center mb-2 flex flex-col justify-center items-center gap-2 ">
              <div className="relative w-30 h-15">
                <Image
                  src={"/footer.png"}
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

            {error && (
              <div className="mb-3 p-3 bg-red-500/20 text-red-200 rounded-lg">
                {error}
              </div>
            )}

            <form className={`space-y-3 ${roboto.className} `}>
              <div>
                <label
                  htmlFor="email"
                  className="block text-lg !font-bold  mb-1"
                >
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="w-full px-4 py-3 border-none inputBg rounded-lg text-white  focus:outline-none focus:ring-2  focus:border-transparent"
                  placeholder="tasnu@gmail.com"
                  required
                  disabled={isLoading}
                />
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="block text-lg font-bold mb-1"
                >
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  className="w-full px-4 py-3 border-none inputBg rounded-lg text-white  focus:outline-none focus:ring-2  focus:border-transparent"
                  placeholder="••••••••"
                  required
                  disabled={isLoading}
                />
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
                    : "hover:from-purple-700 hover:to-violet-700 hover:shadow-purple-500/30"
                }`}
              >
                {isLoading ? (
                  <span className="flex items-center justify-center ">
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
                Don't have account?{" "}
                <Link
                  href="/login"
                  className="!text-yellow-500 font-medium  transition-colors"
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

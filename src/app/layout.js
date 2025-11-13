import "bootstrap/dist/css/bootstrap.min.css";
import "./globals.css";
import ReduxProvider from "@/redux/ReduxProvider";
import { IoFastFood } from "react-icons/io5";

export const metadata = {
  title: "TestoBurger",
  description: "A food ordering website",
  icons: {
    icon: "/logo.ico",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <body suppressHydrationWarning={true}>
        <ReduxProvider>
          {/* <Navbar></Navbar> */}
          {children}
        </ReduxProvider>
      </body>
    </html>
  );
}

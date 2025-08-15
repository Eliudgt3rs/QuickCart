import { Outfit } from "next/font/google";
import "./globals.css";
import { AppContextProvider } from "@/context/AppContext";
import { Toaster } from "react-hot-toast";
import { ClerkProvider } from "@clerk/nextjs";
import ScrollToTop from "@/components/ScrollToTop";
import { WishlistProvider } from "@/context/WishlistContext";
import Script from "next/script";

const outfit = Outfit({ subsets: ['latin'], weight: ["300", "400", "500"] })

export const metadata = {
  title: "Yenu Phones Kenya | The Latest Smartphones and Gadgets in Kenya",
  description: "All Your Gadgets in One Place",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={`${outfit.className} antialiased text-gray-700`} >
          <Toaster />
          <AppContextProvider>
            <WishlistProvider>
              {children}
              <ScrollToTop />
            </WishlistProvider>
          </AppContextProvider>
          <Script src="//code.tidio.co/rnso6itayaxmnwwlihwjhhhwikfdtek1.js" async />
        </body>
      </html>
    </ClerkProvider>
  );
}
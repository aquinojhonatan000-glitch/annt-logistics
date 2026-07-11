import type { Metadata } from "next";

import Navbar from "@/components/Navbar";
import FloatingCart from "@/components/FloatingCart";

import { Geist, Geist_Mono } from "next/font/google";

import "./globals.css";

import { CartProvider } from "@/context/CartContext";
import { ProductProvider } from "@/context/ProductContext";
import { OrderProvider } from "@/context/OrderContext";
import { UserProvider } from "@/context/UserContext";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});


const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});


export const metadata: Metadata = {
  title: "ANNT LOGISTICS",
  description: "Tienda online ANNT LOGISTICS",
};



export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (

    <html lang="es">

      <body
        className={`
          ${geistSans.variable}
          ${geistMono.variable}
          antialiased
          bg-[#111111]
          text-white
          min-h-screen
        `}
      >

        <UserProvider>
          <ProductProvider>
            <CartProvider>
              <OrderProvider>


                <div className="
                  min-h-screen
                  bg-gradient-to-b
                  from-[#111111]
                  via-[#181818]
                  to-[#0a0a0a]
                ">


                  <Navbar />


                  {children}


                  <FloatingCart />


                </div>


              </OrderProvider>
            </CartProvider>
          </ProductProvider>
        </UserProvider>


      </body>

    </html>

  );

}
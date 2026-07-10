import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
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

        className={`${geistSans.variable} ${geistMono.variable} antialiased`}

      >


        <ProductProvider>


          <CartProvider>


            <OrderProvider>


              <UserProvider>


                <Navbar />

                {children}


              </UserProvider>


            </OrderProvider>


          </CartProvider>


        </ProductProvider>


      </body>


    </html>


  );

}
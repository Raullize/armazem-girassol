import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import BackToTop from "@/components/ui/BackToTop";
import { CartProvider } from "../contexts/CartContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Armazém Girassol | Produtos Naturais",
  description: "O a granel mais queridinho da região. Produtos naturais, saudáveis e selecionados com carinho.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-linear-to-br from-[#FFFDF4] via-[#FCF9EE] to-[#F5EED8] text-gray-800 min-h-screen flex flex-col`}
      >
        <CartProvider>
          <Header />
          <main className="grow">
            {children}
          </main>
          <Footer />
          <BackToTop />
        </CartProvider>
      </body>
    </html>
  );
}

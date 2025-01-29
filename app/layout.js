
import Header from "@/components/header/header";
import "./globals.css";
import { CartProvider } from "@/context/CartContext";

export const metadata = {
  title: "Armazem Girassol",
  description: "E-commerce gerado por Miguel Lewandowski",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
      <CartProvider><Header/>{children}</CartProvider>

        
     
      </body>
    </html>
  );
}

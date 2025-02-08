import Header from "@/components/header";
import "./globals.css";
import { CartProvider } from "@/context/CartContext";

export const metadata = {
  title: "Armazem Girassol",
  description: "E-commerce gerado por Miguel Lewandowski",
  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/favicon.ico', sizes: '32x32' },
      { url: '/favicon.ico', sizes: '16x16' },
    ],
    shortcut: ['/favicon.ico'],
    apple: [
      { url: '/favicon.ico' },
    ],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </head>
      <body>
        <CartProvider>
          <Header />
          {children}
        </CartProvider>
      </body>
    </html>
  );
}

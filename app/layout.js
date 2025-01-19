
import Header from "@/components/header/header";
import "./globals.css";

export const metadata = {
  title: "Armazem Girassol",
  description: "E-commerce gerado por Miguel Lewandowski",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Header/>
        {children}
      </body>
    </html>
  );
}

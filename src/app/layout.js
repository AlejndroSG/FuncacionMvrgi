import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/context/CartContext";
import { UserProvider } from "@/context/UserContext";
import CartDrawer from "@/components/CartDrawer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Fundación Mvrgi - Gente normal haciendo cosas normales",
  description: "Fundación benéfica dedicada a proyectos sociales, culturales y medioambientales. Área Ecológica, Co-housing, Voluntariado Internacional y más.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <UserProvider>
          <CartProvider>
            {children}
            <CartDrawer />
          </CartProvider>
        </UserProvider>
      </body>
    </html>
  );
}

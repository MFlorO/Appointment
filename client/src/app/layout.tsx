import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../styles/globals.css";
import 'animate.css';

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Aplicación de turnos",
  description: "Aplicación de turnos",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {/* <Providers> */}
          <main>
            {children}
          </main>
        {/* </Providers> */}
      </body>
    </html>
  );
}

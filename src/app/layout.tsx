import { Poppins, Roboto_Mono } from "next/font/google";
import "@/src/styles/globals.css";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-poppins",
});

const roboto_mono = Roboto_Mono({
  subsets: ["latin"],
  variable: "--font-roboto-mono",
  display: "swap",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
   <html lang="en" className={`${poppins.variable} ${roboto_mono.variable}`}>
      <body>{children}</body>
    </html>
  );
}

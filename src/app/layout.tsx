"use client";

import { Merriweather, Poppins, Roboto_Mono } from "next/font/google";
import "@/src/styles/globals.css";
import { usePathname } from "next/navigation";
import { SideBar } from "../components/ui/SideBar";

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

const merriweather = Merriweather({
  subsets: ["latin"],
  weight: ["300", "400", "700"],
  variable: "--font-merriweather",
  display: "swap",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const isAuthRoute = pathname.startsWith("/auth");

  return (
    <html
      lang="en"
      className={`${poppins.variable} ${roboto_mono.variable} ${merriweather.variable}`}
    >
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,FILL,GRAD@20..48,0..1,-50..200&icon_names=123,close_small,crisis_alert,device_hub,favorite,group,info,key,logout,medication,menu,monitor,monitor_heart,person,refresh,schedule,settings,visibility,warning&display=block"
          rel="stylesheet"
        />
      </head>
      <body className="h-full flex">
        {!isAuthRoute && <SideBar />}
        <main className="flex-grow h-full px-8 py-6">{children}</main>
      </body>
    </html>
  );
}

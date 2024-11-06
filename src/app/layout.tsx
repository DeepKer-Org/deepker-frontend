import {Merriweather, Poppins, Roboto_Mono} from "next/font/google";
import "@/src/styles/globals.css";
import {Metadata} from "next";
import ClientWrapper from "@/src/components/ui/wrappers/ClientWrapper";
import React from "react";
import {AuthProvider} from "@/src/context/AuthContext";

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

export const metadata: Metadata = {
    title: "DeepKer - Sistema de monitoreo de pacientes",
    description: "DeepKer - Sistema de monitoreo de pacientes",
    icons: ["/icons/deepker-original.webp"],
};
export default function RootLayout({
                                       children,
                                   }: {
    children: React.ReactNode;
}) {

    return (
        <html
            lang="en"
            className={`${poppins.variable} ${roboto_mono.variable} ${merriweather.variable}`}
        >
        <head>
            <link
                href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,FILL,GRAD@20..48,0..1,-50..200&icon_names=123,account_box,arrow_back_ios,arrow_drop_down,arrow_forward_ios,chevron_left,chevron_right,close_small,crisis_alert,date_range,delete,device_hub,edit,favorite,group,health_and_safety,info,key,logout,medication,menu,monitor,monitor_heart,person,person_add,refresh,schedule,search,settings,visibility,visibility_off,warning&display=block"
                rel="stylesheet"
            />
        </head>
        <body>
            <AuthProvider>
                <ClientWrapper>
                    {children}
                </ClientWrapper>
            </AuthProvider>
        </body>
        </html>
    );
}

import type { Metadata } from "next";
import { Tabs } from "@/view/tabs";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";

import "./globals.css";

export const metadata: Metadata = {
    title: "Weather App",
    description: "Weather App",
};

export default async function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" className="h-100 mh-100">
            <body className={`h-100 mh-100`}>
                <div className={`container h-100 mh-100 layout`}>
                    <div className="card">
                        <Tabs />
                        {children}
                    </div>
                </div>
            </body>
        </html>
    );
}

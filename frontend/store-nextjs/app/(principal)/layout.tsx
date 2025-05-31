import type { Metadata } from "next";
import "../globals.css";
import { NavBar, Footer } from "../components";



export const metadata: Metadata = {
    title: "Dashboard",
    description: "Dashboard",
    icons: {
        icon: "/logo3.ico",
        shortcut: "/logo3.ico",
        apple: "/logo3.ico",
    },
};

export default function PrincipalLayout({ children }: Readonly<{ children: React.ReactNode; }>) {
    return (
        <>
            <NavBar />
            <main className="container mx-auto py-8 md:py-16 lg:py-24 min-h-screen">
                {children}
            </main>
            <Footer />
        </>
    );
}

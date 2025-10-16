import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Cart from "../Cart";
import { Toaster } from "sonner";

export default function RootLayout() {
    return (
        <>
            <Navbar />
            <Cart />
            <main className="wrapper px-8 py-12">
                <Outlet />
                <Toaster />
            </main>
        </>
    )
}

import { NavLink, useLocation } from "react-router-dom";
import { CATEGORIES_LINKS } from "../../constants/navbar";
import Logo from "./Logo";
import CartButton from "../CartButton";

export default function Navbar() {
    const location = useLocation();

    return (
        <nav className="wrapper py-3 px-10 flex items-center justify-between">
            <div className="flex-1">
                {CATEGORIES_LINKS.map((link) => {
                    const isActive = location.pathname === `/${link.path}`;
                    return (
                        <NavLink
                            key={link.label}
                            to={`/${link.path}`}
                            className={({ isActive }) =>
                                `px-4 py-[21px] mx-1 font-medium transition-colors duration-200 font-raleway ${isActive
                                    ? "text-green-500 border-b-2 border-green-500"
                                    : "text-gray-700"
                                }`
                            }
                            data-testid={isActive ? "active-category-link" : "category-link"}
                        >
                            {link.label}
                        </NavLink>
                    );
                })}
            </div>

            <Logo />
            <CartButton />
        </nav>
    );
}

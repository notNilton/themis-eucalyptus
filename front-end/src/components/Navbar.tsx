import React, { forwardRef, FC, ForwardedRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { MdDarkMode, MdLightMode } from "react-icons/md";
import "../styles/components/Navbar.css";

interface NavbarProps {
  theme: "light" | "dark";
  toggleTheme: () => void;
}

const Navbar = forwardRef<HTMLDivElement, NavbarProps>(
  ({ theme, toggleTheme }, ref: ForwardedRef<HTMLDivElement>) => {
    const location = useLocation();
    
    const navLinks = [
      { path: "/home", label: "Home" },
      { path: "/dashboard", label: "Dashboard" },
    ];

    return (
      <nav ref={ref} className={`navbar ${theme}`}>
        <ul className="list">
          {navLinks.map((link) => (
            <li key={link.path}>
              <Link
                to={link.path}
                className={location.pathname === link.path ? "active" : ""}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="buttons">
          <button onClick={toggleTheme} className="theme-button">
            {theme === "light" ? <MdDarkMode size={24} /> : <MdLightMode size={24} />}
          </button>

        </div>
      </nav>
    );
  }
);

export default Navbar;

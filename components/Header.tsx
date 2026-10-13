"use client";

import { useState } from "react";
import Link from "next/link";
import "./Header.css";
import Cart from "./Cart";

const navItems = [
  { label: "Shop", href: "/shop" },
  { label: "Gift Boxes", href: "/gift-boxes" },
  { label: "Build Your Own", href: "/#builder" },
  { label: "Occasions", href: "/occasions" },
  { label: "About", href: "/#about" },
];

export default function Header() {
  const [mobileOpen, setMobileOpen] =
    useState(false);

  return (
    <header className="header">
      <div className="header-container">
        {/* LOGO */}
        <Link href="/" className="logo">
          <span className="logo-icon">✦</span>

          <div>
            <span className="logo-text">
              Little Moments
            </span>

            <span className="logo-tagline">
              Gifts that matter
            </span>
          </div>
        </Link>

        {/* DESKTOP NAV */}
        <nav className="desktop-nav">
          {navItems.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="nav-link"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* RIGHT ACTIONS */}
        <div className="header-actions">
          {/* SEARCH */}
          <button
            type="button"
            aria-label="Search"
            className="header-button"
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.7"
            >
              <circle cx="11" cy="11" r="6.5" />
              <path d="M16 16L21 21" />
            </svg>
          </button>

          {/* ACCOUNT */}
          <button
            type="button"
            aria-label="Account"
            className="header-button account-button"
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.6"
            >
              <circle cx="12" cy="8" r="3.5" />
              <path d="M5 21c.8-4 3.1-6 7-6s6.2 2 7 6" />
            </svg>
          </button>

          {/* CART */}
          <Cart />

          {/* MOBILE MENU */}
          <button
            type="button"
            aria-label="Open menu"
            className="mobile-menu-button"
            onClick={() =>
              setMobileOpen(!mobileOpen)
            }
          >
            {mobileOpen ? (
              <span className="close-icon">
                ×
              </span>
            ) : (
              <span className="menu-lines">
                <span className="menu-line" />
                <span className="menu-line" />
              </span>
            )}
          </button>
        </div>
      </div>

      {/* MOBILE NAV */}
      {mobileOpen && (
        <div className="mobile-nav">
          <nav className="mobile-nav-inner">
            {navItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="mobile-nav-link"
                onClick={() =>
                  setMobileOpen(false)
                }
              >
                {item.label}
              </Link>
            ))}
            <Link
              href="/#builder"
              className="mobile-builder-button"
              onClick={() => setMobileOpen(false)}
            >
              Build Your Gift ✦
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}

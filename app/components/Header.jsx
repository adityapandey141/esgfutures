"use client";
import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X } from "lucide-react";

const Header = ({ currentPage = "" }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navigation = [
    { name: "Home", href: "/", id: "home" },
    { name: "Reports", href: "/reports", id: "reports" },
    { name: "Impact", href: "/impact", id: "impact" },
    { name: "Team", href: "/team", id: "team" },
    { name: "Contact", href: "/contact", id: "contact" },
  ];

  const isActive = (href) => {
    if (href === "/") {
      return currentPage === "/" || currentPage === "";
    }
    return currentPage.startsWith(href);
  };

  return (
    <header className="fixed top-0 w-full bg-white/90 backdrop-blur-xl border-b border-neutral-200/80 z-50 transition-all">
      <div className="max-w-[1440px] mx-auto px-8 lg:px-20">
        <div className="flex justify-between items-center py-4">
          <Link href="/" className="flex items-center gap-2">
            <Image
              src="/esg-logo.png"
              alt="ESGFuture"
              width={120}
              height={60}
              priority
              className="object-contain"
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-10 text-[15px] font-medium">
            {navigation.map((item) => (
              <Link
                key={item.id}
                href={item.href}
                className={`transition-colors ${
                  isActive(item.href)
                    ? "text-emerald-800 font-semibold"
                    : "text-neutral-600 hover:text-emerald-800"
                }`}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden flex items-center gap-2 p-2 text-neutral-600 hover:text-emerald-800 transition-colors"
          >
            <Menu className="w-6 h-6" />
            <span className="text-sm font-medium">Menu</span>
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-0 bg-white/95 backdrop-blur-lg z-40">
          <div className="flex flex-col h-full">
            {/* Mobile Header */}
            <div className="flex justify-between items-center p-6 border-b border-neutral-200">
              <Image
                src="/esg-logo.png"
                alt="ESGFuture"
                width={100}
                height={50}
                className="object-contain"
              />
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="p-2 text-neutral-600 hover:text-emerald-800 transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Mobile Navigation Links */}
            <nav className="flex-1 p-6 space-y-4">
              {navigation.map((item) => (
                <Link
                  key={item.id}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`block px-4 py-3 text-lg font-medium rounded-lg transition-colors ${
                    isActive(item.href)
                      ? "text-emerald-800 bg-emerald-50"
                      : "text-neutral-600 hover:text-emerald-800 hover:bg-neutral-50"
                  }`}
                >
                  {item.name}
                </Link>
              ))}
            </nav>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;

"use client";
import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";

const MainLayout = ({ children, currentPage = "" }) => {
  return (
    <div
      className="min-h-screen bg-white text-neutral-800"
      style={{
        fontFamily:
          "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
      }}
    >
      {/* Premium grain texture */}
      <div
        className="fixed inset-0 pointer-events-none z-50 opacity-[0.015] mix-blend-overlay"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='3.5' numOctaves='5' /%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' /%3E%3C/svg%3E\")",
        }}
      />

      {/* Header */}
      <Header currentPage={currentPage} />

      {/* Main Content */}
      <main>{children}</main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default MainLayout;

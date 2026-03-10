"use client";
import React from 'react';
import Link from 'next/link';
import { Linkedin, Twitter, Mail } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    navigation: [
      { name: 'Home', href: '/' },
      { name: 'Reports', href: '/reports' },
      { name: 'Impact', href: '/impact' },
      { name: 'Team', href: '/team' },
    ],
    social: [
      { name: 'LinkedIn', href: '#', icon: Linkedin },
      { name: 'Twitter', href: '#', icon: Twitter },
      { name: 'Email', href: 'mailto:contact@esgfutures.com', icon: Mail },
    ],
  };

  return (
    <footer className="bg-neutral-900 text-neutral-300 border-t border-neutral-800">
      <div className="max-w-[1440px] mx-auto px-8 lg:px-20 py-16 lg:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-16 mb-12">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <h3 className="text-2xl font-bold text-white mb-4">ESGFuture</h3>
            <p className="text-neutral-400 leading-relaxed mb-6 max-w-md">
              Turning ESG Intelligence into Strategic Advantage. Making sustainability simple, transparent, and actionable for better decision-making.
            </p>
            <div className="flex gap-4">
              {footerLinks.social.map((item) => {
                const Icon = item.icon;
                return (
                  <a
                    key={item.name}
                    href={item.href}
                    target={item.name !== 'Email' ? '_blank' : undefined}
                    rel={item.name !== 'Email' ? 'noopener noreferrer' : undefined}
                    className="w-10 h-10 bg-neutral-800 rounded-lg flex items-center justify-center hover:bg-emerald-800 transition-colors"
                    aria-label={item.name}
                  >
                    <Icon className="w-5 h-5" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Navigation Links */}
          <div>
            <h4 className="text-white font-semibold mb-4">Navigation</h4>
            <ul className="space-y-3">
              {footerLinks.navigation.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-neutral-400 hover:text-emerald-500 transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-semibold mb-4">Contact</h4>
            <ul className="space-y-3">
              <li>
                <a
                  href="mailto:contact@esgfutures.com"
                  className="text-neutral-400 hover:text-emerald-500 transition-colors"
                >
                  contact@esgfutures.com
                </a>
              </li>
              <li>
                <a
                  href="/admin/login"
                  className="text-neutral-400 hover:text-emerald-500 transition-colors"
                >
                  Admin Login
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-neutral-800">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-neutral-500">
              © {currentYear} ESGFuture. All rights reserved.
            </p>
            <div className="flex gap-6 text-sm">
              <Link href="#" className="text-neutral-500 hover:text-emerald-500 transition-colors">
                Privacy Policy
              </Link>
              <Link href="#" className="text-neutral-500 hover:text-emerald-500 transition-colors">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

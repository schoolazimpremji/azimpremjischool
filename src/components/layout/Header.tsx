'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Sprout, Compass, Bird, Info, Shield, Menu, X } from 'lucide-react';

export default function Header() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { href: '/', label: 'Home', icon: Sprout },
    { href: '/flora', label: 'Flora', icon: Compass },
    { href: '/fauna', label: 'Fauna', icon: Bird },
    { href: '/about', label: 'About Project', icon: Info },
    { href: '/admin', label: 'Curator Portal', icon: Shield },
  ];

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/';
    if (href === '/flora') return pathname.startsWith('/flora') || pathname.startsWith('/explore');
    return pathname.startsWith(href);
  };

  return (
    <header className="sticky top-0 z-40 bg-[#faf7f0]/90 backdrop-blur-md border-b border-sage-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-18 py-3">
          {/* Logo & School Branding */}
          <Link href="/" className="flex items-center space-x-3 group">
            <div className="w-10 h-10 rounded-xl bg-forest-800 text-white flex items-center justify-center shadow-sm group-hover:bg-forest-900 transition-colors">
              <Sprout className="w-6 h-6 text-ochre-300" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="font-serif font-bold text-lg text-forest-950 tracking-tight">
                  Azim Premji School
                </span>
                <span className="text-[11px] uppercase tracking-wider font-semibold px-2 py-0.5 rounded-full bg-forest-100 text-forest-800 border border-forest-200">
                  Biodiversity
                </span>
              </div>
              <p className="text-xs text-sage-600 font-medium">Campus Flora & Fauna Field Guide</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1 lg:space-x-2">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const active = isActive(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`flex items-center space-x-2 px-3.5 py-2 rounded-lg text-sm font-medium transition-colors ${
                    active
                      ? 'bg-forest-100 text-forest-900 font-semibold'
                      : 'text-sage-700 hover:text-forest-900 hover:bg-sage-100/70'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${active ? 'text-forest-700' : 'text-sage-500'}`} />
                  <span>{link.label}</span>
                </Link>
              );
            })}
          </nav>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-sage-700 hover:bg-sage-200/50 focus:outline-none"
              aria-label="Toggle navigation"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile menu dropdown */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-sage-200 py-3 space-y-1">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const active = isActive(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center space-x-3 px-3 py-2.5 rounded-lg text-base font-medium ${
                    active
                      ? 'bg-forest-100 text-forest-950 font-semibold'
                      : 'text-sage-800 hover:bg-sage-100'
                  }`}
                >
                  <Icon className="w-5 h-5 text-forest-600" />
                  <span>{link.label}</span>
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </header>
  );
}

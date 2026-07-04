'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import Button from './Button';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/unicorns', label: 'Unicorns' },
  { href: '/investors', label: 'Investors' },
  { href: '/faq', label: 'FAQ' },
  { href: '/apply', label: 'Apply' },
];

export default function Navbar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-xl border-b border-surface-100">
      <div className="container-wide">
        <div className="flex items-center justify-between h-16">
          <Link
            href="/"
            className="text-xl font-semibold tracking-tight text-surface-900"
          >
            Wild Rydes
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm font-medium transition-colors duration-150 ${
                  pathname === link.href
                    ? 'text-surface-900'
                    : 'text-surface-500 hover:text-surface-900'
                }`}
              >
                {link.label}
              </Link>
            ))}
            <Link href="/signin" className="text-sm font-medium text-surface-500 hover:text-surface-900 transition-colors duration-150">
              Sign in
            </Link>
            <Link href="/register">
              <Button size="sm">Sign Up</Button>
            </Link>
          </nav>

          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden p-2 -mr-2 text-surface-500 hover:text-surface-900"
            aria-label="Toggle menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {mobileOpen ? (
                <path strokeLinecap="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {mobileOpen && (
          <nav className="md:hidden pb-4 border-t border-surface-100 pt-4 animate-fade-in">
            <div className="flex flex-col gap-3">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className={`text-sm font-medium transition-colors ${
                    pathname === link.href
                      ? 'text-surface-900'
                      : 'text-surface-500 hover:text-surface-900'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              <Link href="/signin" onClick={() => setMobileOpen(false)} className="text-sm font-medium text-surface-500 hover:text-surface-900">
                Sign in
              </Link>
              <Link href="/register" onClick={() => setMobileOpen(false)}>
                <Button size="sm" className="w-full">Sign Up</Button>
              </Link>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}

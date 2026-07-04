import Link from 'next/link';

const footerLinks = [
  { href: '/', label: 'Home' },
  { href: '/unicorns', label: 'Unicorns' },
  { href: '/investors', label: 'Investors' },
  { href: '/faq', label: 'FAQ' },
  { href: '/apply', label: 'Apply' },
];

export default function Footer() {
  return (
    <footer className="border-t border-surface-100 bg-surface-50">
      <div className="container-wide py-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <Link
            href="/"
            className="text-lg font-semibold tracking-tight text-surface-900"
          >
            Wild Rydes
          </Link>

          <nav className="flex items-center gap-6">
            {footerLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm text-surface-500 hover:text-surface-900 transition-colors duration-150"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="mt-8 pt-8 border-t border-surface-200 text-center">
          <p className="text-sm text-surface-400">
            &copy; WildRydes Inc. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

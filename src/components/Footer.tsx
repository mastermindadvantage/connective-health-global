import Link from 'next/link'

const footerLinks = {
  Directory: [
    { name: 'Conditions', href: '/conditions' },
    { name: 'Research Library', href: '/research' },
    { name: 'Supplements', href: '/supplements' },
    { name: 'Clinics', href: '/clinics' },
    { name: 'Providers', href: '/providers' },
  ],
  Resources: [
    { name: 'Evidence Rubric', href: '/about#rubric' },
    { name: 'For Providers', href: '/for-providers' },
    { name: 'Newsletter', href: '/newsletter' },
    { name: 'About Us', href: '/about' },
  ],
  Support: [
    { name: 'Contact', href: '/about#contact' },
    { name: 'Privacy Policy', href: '/privacy' },
    { name: 'Terms of Use', href: '/terms' },
    { name: 'Accessibility', href: '/accessibility' },
  ],
}

export function Footer() {
  return (
    <footer className="border-t border-gray-100 bg-gray-50">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-600">
                <span className="text-sm font-bold text-white">C</span>
              </div>
              <span className="text-sm font-semibold text-gray-900">Connective Health Global</span>
            </Link>
            <p className="mt-3 text-sm leading-relaxed text-gray-500">
              Evidence-guided chronic illness navigation. Trust first. Revenue follows.
            </p>
          </div>

          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h3 className="text-sm font-semibold text-gray-900">{title}</h3>
              <ul className="mt-3 space-y-2">
                {links.map((link) => (
                  <li key={link.name}>
                    <Link href={link.href} className="text-sm text-gray-500 transition-colors hover:text-emerald-600">
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-8 border-t border-gray-200 pt-8">
          <p className="text-center text-xs text-gray-400">
            &copy; {new Date().getFullYear()} Connective Health Global. All rights reserved.
          </p>
          <p className="mt-1 text-center text-xs text-gray-400">
            Always consult your healthcare provider before starting any new treatment or supplement.
          </p>
        </div>
      </div>
    </footer>
  )
}

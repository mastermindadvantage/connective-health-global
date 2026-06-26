import Link from 'next/link'

const footerLinks = {
  Directory: [
    { name: 'Research Library', href: '/research' },
    { name: 'Supplements', href: '/supplements' },
    { name: 'Clinics', href: '/providers' },
  ],
  Resources: [
    { name: 'Newsletter', href: '/newsletter' },
    { name: 'About Us', href: '/about' },
    { name: 'Evidence Rubric', href: '/about#rubric' },
  ],
  Support: [
    { name: 'Contact', href: '/about#contact' },
    { name: 'Privacy Policy', href: '/privacy' },
    { name: 'Terms of Use', href: '/terms' },
  ],
}

export function Footer() {
  return (
    <footer style={{ background: '#0f3b45', borderTop: '2px solid #0f3b45' }}>
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="font-serif text-lg font-semibold" style={{ color: '#ffffff' }}>
              Connected Health <span style={{ color: '#f2d9b3' }}>Global</span>
            </Link>
            <p className="mt-3 text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,0.6)' }}>
              Evidence. Community. Direction.
            </p>
          </div>

          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h3 className="text-sm font-semibold" style={{ color: '#f2d9b3' }}>{title}</h3>
              <ul className="mt-3 space-y-2">
                {links.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-sm transition-colors"
                      style={{ color: 'rgba(255,255,255,0.6)' }}
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-8 pt-8" style={{ borderTop: '1px solid rgba(255,255,255,0.15)' }}>
          <p className="text-center text-xs" style={{ color: 'rgba(255,255,255,0.4)' }}>
            &copy; {new Date().getFullYear()} Connected Health Global. All rights reserved.
          </p>
          <p className="mt-1 text-center text-xs" style={{ color: 'rgba(255,255,255,0.4)' }}>
            Always consult your healthcare provider before starting any new treatment or supplement.
          </p>
        </div>
      </div>
    </footer>
  )
}

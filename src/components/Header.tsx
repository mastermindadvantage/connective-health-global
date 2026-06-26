'use client'

import Link from 'next/link'
import { useState } from 'react'
import { cn } from '@/lib/utils'

const navigation = [
  { name: 'Research', href: '/research' },
  { name: 'Supplements', href: '/supplements' },
  { name: 'Clinics', href: '/providers' },
  { name: 'About', href: '/about' },
]

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 w-full" style={{ background: '#0f3b45' }}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-14 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <span className="font-serif text-lg font-semibold text-white">
              Connected Health <span style={{ color: '#f2d9b3' }}>Global</span>
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex md:items-center md:gap-1">
            {navigation.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded px-3 py-1.5 text-sm font-medium transition-colors"
                style={{ color: 'rgba(255,255,255,0.7)' }}
                onMouseEnter={(e) => { (e.target as HTMLElement).style.color = '#f2d9b3' }}
                onMouseLeave={(e) => { (e.target as HTMLElement).style.color = 'rgba(255,255,255,0.7)' }}
              >
                {item.name}
              </Link>
            ))}
            <Link
              href="/newsletter"
              className="ml-4 rounded px-4 py-1.5 text-sm font-semibold transition-colors"
              style={{ background: '#c77d2a', color: '#ffffff' }}
              onMouseEnter={(e) => { (e.target as HTMLElement).style.background = '#b06d1f' }}
              onMouseLeave={(e) => { (e.target as HTMLElement).style.background = '#c77d2a' }}
            >
              Subscribe
            </Link>
          </nav>

          {/* Mobile menu button */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="inline-flex items-center justify-center rounded p-2 md:hidden"
            style={{ color: 'rgba(255,255,255,0.7)' }}
          >
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              {mobileOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile nav */}
        <div className={cn('overflow-hidden transition-all duration-200', mobileOpen ? 'max-h-96 pb-4' : 'max-h-0')}>
          <nav className="flex flex-col gap-1">
            {navigation.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className="rounded px-3 py-2 text-sm font-medium transition-colors"
                style={{ color: 'rgba(255,255,255,0.7)' }}
              >
                {item.name}
              </Link>
            ))}
            <Link
              href="/newsletter"
              onClick={() => setMobileOpen(false)}
              className="mt-2 rounded px-4 py-2 text-center text-sm font-semibold"
              style={{ background: '#c77d2a', color: '#ffffff' }}
            >
              Subscribe
            </Link>
          </nav>
        </div>
      </div>
    </header>
  )
}

'use client'

import Link from 'next/link'
import { useState } from 'react'
import { cn } from '@/lib/utils'
import { useRouter } from 'next/navigation'

const navigation = [
  { name: 'Research', href: '/research' },
  { name: 'Treatments', href: '/treatments' },
  { name: 'Clinics', href: '/clinics' },
  { name: 'Providers', href: '/providers' },
  { name: 'Supplements', href: '/supplements' },
  { name: 'About', href: '/about' },
]

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const router = useRouter()

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`)
      setSearchOpen(false)
      setSearchQuery('')
    }
  }

  return (
    <header className="sticky top-0 z-50 w-full" style={{ background: '#a8b8a2' }}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-14 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 shrink-0">
            <span className="font-serif text-lg font-semibold" style={{ color: '#ffffff' }}>
              Connective Health <span style={{ color: '#c1a482' }}>Global</span>
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex md:items-center md:gap-1">
            {navigation.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded px-3 py-1.5 text-sm font-medium transition-colors"
                style={{ color: '#3e5b4f' }}
                onMouseEnter={(e) => { (e.target as HTMLElement).style.color = '#29382f' }}
                onMouseLeave={(e) => { (e.target as HTMLElement).style.color = '#3e5b4f' }}
              >
                {item.name}
              </Link>
            ))}
            {/* Search icon */}
            <button
              onClick={() => setSearchOpen(!searchOpen)}
              className="ml-2 rounded p-2 transition-colors"
              style={{ color: '#3e5b4f' }}
              onMouseEnter={(e) => { (e.target as HTMLElement).style.color = '#29382f' }}
              onMouseLeave={(e) => { (e.target as HTMLElement).style.color = '#3e5b4f' }}
              aria-label="Search"
            >
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35M11 19a8 8 0 100-16 8 8 0 000 16z" />
              </svg>
            </button>
            <Link
              href="/newsletter"
              className="ml-4 rounded px-4 py-1.5 text-sm font-semibold transition-colors"
              style={{ background: '#3e5b4f', color: '#ffffff' }}
              onMouseEnter={(e) => { (e.target as HTMLElement).style.background = '#29382f' }}
              onMouseLeave={(e) => { (e.target as HTMLElement).style.background = '#3e5b4f' }}
            >
              Subscribe
            </Link>
          </nav>

          {/* Mobile menu button */}
          <div className="flex items-center gap-2 md:hidden">
            <button
              onClick={() => {
                setSearchOpen(!searchOpen)
              }}
              className="rounded p-2"
              style={{ color: '#3e5b4f' }}
              aria-label="Search"
            >
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35M11 19a8 8 0 100-16 8 8 0 000 16z" />
              </svg>
            </button>
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="inline-flex items-center justify-center rounded p-2"
              style={{ color: '#3e5b4f' }}
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
        </div>

        {/* Search bar (expandable) */}
        <div className={cn('overflow-hidden transition-all duration-200', searchOpen ? 'max-h-16 pb-3' : 'max-h-0')}>
          <form onSubmit={handleSearch} className="relative">
            <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2" style={{ color: '#6b6f68' }}>
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35M11 19a8 8 0 100-16 8 8 0 000 16z" />
              </svg>
            </span>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search all listings..."
              className="w-full rounded-lg py-2 pl-10 pr-4 text-sm"
              style={{ background: '#f8f6f1', color: '#29382f', border: '1px solid #d4ddd6' }}
              onFocus={(e) => { e.target.style.borderColor = '#3e5b4f' }}
              onBlur={(e) => { e.target.style.borderColor = '#d4ddd6' }}
            />
          </form>
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
                style={{ color: '#3e5b4f' }}
              >
                {item.name}
              </Link>
            ))}
            <Link
              href="/newsletter"
              onClick={() => setMobileOpen(false)}
              className="mt-2 rounded px-4 py-2 text-center text-sm font-semibold"
              style={{ background: '#3e5b4f', color: '#ffffff' }}
            >
              Subscribe
            </Link>
          </nav>
        </div>
      </div>
    </header>
  )
}

'use client'

import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { useState } from 'react'

export default function NewsletterPage() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('loading')
    
    try {
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })
      if (res.ok) {
        setStatus('success')
        setEmail('')
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main className="mx-auto max-w-2xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900">Stay Informed</h1>
          <p className="mt-3 text-gray-500">
            Get the latest research updates, evidence changes, and new provider listings 
            delivered to your inbox.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="mt-10">
          <div className="flex gap-3">
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="flex-1 rounded-xl border border-gray-200 px-4 py-3 text-sm focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-200"
            />
            <button
              type="submit"
              disabled={status === 'loading'}
              className="rounded-xl bg-emerald-600 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-emerald-700 disabled:opacity-50"
            >
              {status === 'loading' ? 'Subscribing...' : 'Subscribe'}
            </button>
          </div>
          {status === 'success' && (
            <p className="mt-4 text-sm text-emerald-600">Thanks! Check your inbox for confirmation.</p>
          )}
          {status === 'error' && (
            <p className="mt-4 text-sm text-red-600">Something went wrong. Please try again.</p>
          )}
        </form>

        <div className="mt-12 space-y-6">
          <h2 className="text-lg font-semibold text-gray-900">What to expect</h2>
          <div className="grid gap-4 sm:grid-cols-3">
            <div className="rounded-xl border border-gray-200 p-4">
              <div className="text-xl">📚</div>
              <h3 className="mt-2 text-sm font-semibold text-gray-900">Weekly Research</h3>
              <p className="mt-1 text-xs text-gray-500">New studies and evidence updates</p>
            </div>
            <div className="rounded-xl border border-gray-200 p-4">
              <div className="text-xl">🏥</div>
              <h3 className="mt-2 text-sm font-semibold text-gray-900">New Providers</h3>
              <p className="mt-1 text-xs text-gray-500">Clinics and practitioners added</p>
            </div>
            <div className="rounded-xl border border-gray-200 p-4">
              <div className="text-xl">⚡</div>
              <h3 className="mt-2 text-sm font-semibold text-gray-900">Evidence Changes</h3>
              <p className="mt-1 text-xs text-gray-500">When ratings are updated</p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}

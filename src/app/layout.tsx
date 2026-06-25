import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: {
    default: 'Connective Health Global',
    template: '%s | Connective Health Global',
  },
  description: 'Evidence-guided chronic illness navigation. Research, treatments, supplements, clinics and providers — all graded by our published evidence rubric.',
  keywords: ['chronic illness', 'ME/CFS', 'Long COVID', 'POTS', 'fibromyalgia', 'evidence', 'directory', 'health'],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-white antialiased">{children}</body>
    </html>
  )
}

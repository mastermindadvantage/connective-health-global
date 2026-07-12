import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function POST(request: Request) {
  try {
    const { email, first_name } = await request.json()
    
    if (!email || !email.includes('@')) {
      return NextResponse.json({ error: 'Invalid email' }, { status: 400 })
    }

    if (!supabase) {
      return NextResponse.json({ message: 'Subscriptions not available - database not configured' })
    }

    const { error } = await supabase
      .from('subscribers')
      .insert({ email, first_name: first_name || null, source: 'website' })

    if (error) {
      if (error.code === '23505') {
        return NextResponse.json({ message: 'Already subscribed' })
      }
      throw error
    }

    // Send notification email if Resend is configured
    const apiKey = process.env.RESEND_API_KEY
    if (apiKey) {
      try {
        const { Resend } = await import('resend')
        const resend = new Resend(apiKey)
        await resend.emails.send({
          from: 'CHG Directory <notifications@connectivehealthglobal.com>',
          to: ['SW@mastermindalliance.com.au'],
          subject: `New newsletter subscriber: ${email}`,
          html: `<p>New subscriber: <strong>${email}</strong>${first_name ? ` (${first_name})` : ''}</p>`,
        })
      } catch {
        // Notifications are non-critical
      }
    }

    return NextResponse.json({ message: 'Subscribed' })
  } catch (error) {
    console.error('Subscription error:', error)
    return NextResponse.json({ error: 'Internal error' }, { status: 500 })
  }
}

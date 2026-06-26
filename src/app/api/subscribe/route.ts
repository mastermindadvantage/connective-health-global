import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function POST(request: Request) {
  try {
    const { email } = await request.json()
    
    if (!email || !email.includes('@')) {
      return NextResponse.json({ error: 'Invalid email' }, { status: 400 })
    }

    if (!supabase) {
      return NextResponse.json({ message: 'Subscriptions not available - database not configured' })
    }

    const { error } = await supabase
      .from('subscribers')
      .insert({ email, source: 'website' })

    if (error) {
      // Duplicate email is fine
      if (error.code === '23505') {
        return NextResponse.json({ message: 'Already subscribed' })
      }
      throw error
    }

    return NextResponse.json({ message: 'Subscribed' })
  } catch (error) {
    console.error('Subscription error:', error)
    return NextResponse.json({ error: 'Internal error' }, { status: 500 })
  }
}

import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const { name, email, phone, practiceName, website, tier, message } = await request.json()

    if (!name || !email || !practiceName) {
      return NextResponse.json({ error: 'Name, email, and practice name are required' }, { status: 400 })
    }

    const tierLabel = tier === 'featured' ? 'Featured ($79/mo)' : tier === 'verified' ? 'Verified ($29/mo)' : 'Free Listing'

    const emailHtml = `
      <h2>New Provider Claim Request</h2>
      <table style="border-collapse:collapse;width:100%;max-width:600px;">
        <tr><td style="padding:8px;border:1px solid #d6cebf;font-weight:bold;">Name</td><td style="padding:8px;border:1px solid #d6cebf;">${name}</td></tr>
        <tr><td style="padding:8px;border:1px solid #d6cebf;font-weight:bold;">Email</td><td style="padding:8px;border:1px solid #d6cebf;">${email}</td></tr>
        <tr><td style="padding:8px;border:1px solid #d6cebf;font-weight:bold;">Phone</td><td style="padding:8px;border:1px solid #d6cebf;">${phone || '-'}</td></tr>
        <tr><td style="padding:8px;border:1px solid #d6cebf;font-weight:bold;">Practice / Clinic</td><td style="padding:8px;border:1px solid #d6cebf;">${practiceName}</td></tr>
        <tr><td style="padding:8px;border:1px solid #d6cebf;font-weight:bold;">Website</td><td style="padding:8px;border:1px solid #d6cebf;">${website || '-'}</td></tr>
        <tr><td style="padding:8px;border:1px solid #d6cebf;font-weight:bold;">Tier Requested</td><td style="padding:8px;border:1px solid #d6cebf;">${tierLabel}</td></tr>
        <tr><td style="padding:8px;border:1px solid #d6cebf;font-weight:bold;">Notes</td><td style="padding:8px;border:1px solid #d6cebf;">${message || '-'}</td></tr>
      </table>
      <p style="color:#8a8275;font-size:12px;">Sent from connectivehealthglobal.com</p>
    `

    // Try sending email via Resend — gracefully handle missing API key
    const apiKey = process.env.RESEND_API_KEY
    if (apiKey) {
      const { Resend } = await import('resend')
      const resend = new Resend(apiKey)
      await resend.emails.send({
        from: 'CHG Directory <notifications@connectivehealthglobal.com>',
        to: ['SW@mastermindalliance.com.au'],
        subject: `New Provider Claim: ${practiceName} (${tierLabel})`,
        html: emailHtml,
      })
    } else {
      console.log('RESEND_API_KEY not set — claim data saved to server log only')
      console.log('Claim:', { name, email, practiceName, tier })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Claim form error:', error)
    return NextResponse.json({ error: 'Failed to send claim' }, { status: 500 })
  }
}

/**
 * VELARI PRIVÉ — Serverless Enquiry Dispatch API
 * Target Monitored Inbox: enquiries@velariprive.com
 * Supports: Vercel Serverless Functions & local Vite dev server middleware
 */

export default async function handler(req, res) {
  // CORS & Security Headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('X-Content-Type-Options', 'nosniff');

  if (req.method === 'OPTIONS') {
    res.statusCode = 200;
    res.end();
    return;
  }

  if (req.method !== 'POST') {
    res.statusCode = 405;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({ error: 'Method Not Allowed. Use POST.' }));
    return;
  }

  try {
    // Parse body if not already parsed
    let body = req.body;
    if (typeof body === 'string') {
      try {
        body = JSON.parse(body);
      } catch (e) {
        res.statusCode = 400;
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify({ error: 'Invalid JSON payload' }));
        return;
      }
    } else if (!body) {
      body = {};
    }

    const {
      name,
      email,
      phone,
      scalp_category,
      allocation,
      message,
      notes,
      location,
      consent,
      hp_organization,
      submit_time
    } = body;

    // 1. SPAM DEFENSE: Honeypot field check
    if (hp_organization && String(hp_organization).trim().length > 0) {
      // Bot detected: drop quietly without notifying attacker
      res.statusCode = 200;
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify({ success: true, status: 'filtered' }));
      return;
    }

    // 2. SPAM DEFENSE: Rapid submission check (sub-second submission)
    if (submit_time && Date.now() - Number(submit_time) < 1000) {
      res.statusCode = 400;
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify({ error: 'Submission rejected: too rapid.' }));
      return;
    }

    // 3. VALIDATION: Required fields
    if (!name || typeof name !== 'string' || !name.trim()) {
      res.statusCode = 422;
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify({ error: 'Full name is required.' }));
      return;
    }

    const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;
    if (!email || !emailRegex.test(String(email).trim())) {
      res.statusCode = 422;
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify({ error: 'A valid email address is required.' }));
      return;
    }

    if (!phone || typeof phone !== 'string' || !phone.trim() || phone.trim().length < 6) {
      res.statusCode = 422;
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify({ error: 'A valid phone or WhatsApp number is required.' }));
      return;
    }

    if (!consent) {
      res.statusCode = 422;
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify({ error: 'Confidentiality agreement consent is required.' }));
      return;
    }

    // Sanitization
    const sanitize = (str) => String(str || '').replace(/[\r\n]+/g, ' ').trim().slice(0, 500);
    const cleanName = sanitize(name);
    const cleanEmail = sanitize(email);
    const cleanPhone = sanitize(phone);
    const cleanFocus = sanitize(scalp_category || allocation || 'General Scalp Care');
    const cleanLocation = sanitize(location);
    const cleanMessage = String(message || notes || '').trim().slice(0, 3000);

    const targetRecipient = process.env.ENQUIRY_RECIPIENT_EMAIL || 'enquiries@velariprive.com';
    const emailSubject = `VELARI PRIVÉ Consultation Enquiry: ${cleanFocus} — ${cleanName}`;

    const textContent = 
`============================================================
VELARI PRIVÉ — PRIVATE CLIENT CONSULTATION ENQUIRY
============================================================

TIMESTAMP: ${new Date().toISOString()}
TARGET INBOX: ${targetRecipient}

CLIENT DETAILS:
- Full Name: ${cleanName}
- Direct Email: ${cleanEmail}
- Phone / WhatsApp: ${cleanPhone}
${cleanLocation ? `- Primary City / Country: ${cleanLocation}\n` : ''}
SELECTED AREA OF FOCUS / ALLOCATION:
${cleanFocus}

MESSAGE / ROUTINE NOTES:
${cleanMessage || 'None provided.'}

CONSENT:
Confirmed client confidentiality agreement.

============================================================
Dispatched from ANAGÈNESE Flagship (velariprive.com)
`;

    // 4. DISPATCH VIA CONFIGURED EMAIL SERVICE
    const resendApiKey = process.env.RESEND_API_KEY;
    const sendgridApiKey = process.env.SENDGRID_API_KEY;

    if (resendApiKey) {
      const resendRes = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${resendApiKey}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          from: process.env.ENQUIRY_FROM_EMAIL || 'concierge@velariprive.com',
          to: [targetRecipient],
          reply_to: cleanEmail,
          subject: emailSubject,
          text: textContent
        })
      });

      if (!resendRes.ok) {
        const errorData = await resendRes.text();
        console.error('[Resend Error]', errorData);
        throw new Error('Resend delivery failed: ' + resendRes.status);
      }

      res.statusCode = 200;
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify({
        success: true,
        recipient: targetRecipient,
        message: 'Your Private Enquiry has been securely transmitted to the VELARI PRIVÉ Private Client Liaison.'
      }));
      return;
    }

    if (sendgridApiKey) {
      const sgRes = await fetch('https://api.sendgrid.com/v3/mail/send', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${sendgridApiKey}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          personalizations: [{ to: [{ email: targetRecipient }] }],
          from: { email: process.env.ENQUIRY_FROM_EMAIL || 'concierge@velariprive.com' },
          reply_to: { email: cleanEmail },
          subject: emailSubject,
          content: [{ type: 'text/plain', value: textContent }]
        })
      });

      if (!sgRes.ok) {
        const errorData = await sgRes.text();
        console.error('[SendGrid Error]', errorData);
        throw new Error('SendGrid delivery failed: ' + sgRes.status);
      }

      res.statusCode = 200;
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify({
        success: true,
        recipient: targetRecipient,
        message: 'Your Private Enquiry has been securely transmitted to the VELARI PRIVÉ Private Client Liaison.'
      }));
      return;
    }

    // 5. UNCONFIGURED SERVICE HANDLER
    // In local dev or environments without API keys:
    // Safely record to server console log for verification
    console.log('\n[INCOMING_ENQUIRY_CAPTURED]');
    console.log(textContent);

    // If local dev environment or explicit test flag:
    const isLocalDev = process.env.NODE_ENV !== 'production' || process.env.VERCEL_ENV !== 'production';

    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({
      success: true,
      recipient: targetRecipient,
      isLocalSimulation: isLocalDev,
      message: 'Your Private Enquiry has been securely lodged with the VELARI PRIVÉ Private Client Liaison (' + targetRecipient + ').'
    }));

  } catch (err) {
    console.error('[Enquiry Handler Error]', err);
    res.statusCode = 500;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({
      success: false,
      error: 'We were unable to deliver your enquiry due to a server connection error. Please try again or compose your enquiry directly via your email application.',
      recipient: 'enquiries@velariprive.com'
    }));
  }
}

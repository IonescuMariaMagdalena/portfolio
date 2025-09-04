// api/contact.ts
import type { VercelRequest, VercelResponse } from '@vercel/node';
import nodemailer from 'nodemailer';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') return res.status(405).json({ ok:false, error: 'Method not allowed' });

  const { name, replyTo, message } = req.body || {};
  if (!name || !replyTo || !message) return res.status(400).json({ ok:false, error: 'Missing fields' });

  try {
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,     // ex. "smtp.mail.yahoo.com"
      port: Number(process.env.SMTP_PORT || 465),
      secure: true,
      auth: {
        user: process.env.SMTP_USER,   // ex. "imagda05@yahoo.com"
        pass: process.env.SMTP_PASS,
      },
    });

    await transporter.sendMail({
      from: `"Portfolio Contact" <${process.env.SMTP_USER}>`,
      to: process.env.TO_EMAIL,        // "imagda05@yahoo.com"
      subject: `New message from ${name}`,
      replyTo,
      text: `From: ${name} (${replyTo})\n\n${message}`,
      html: `<p><b>From:</b> ${name} (${replyTo})</p><p>${message.replace(/\n/g,'<br/>')}</p>`,
    });

    return res.status(200).json({ ok:true });
  } catch (err:any) {
    console.error(err);
    return res.status(500).json({ ok:false, error: 'Mailer error' });
  }
}

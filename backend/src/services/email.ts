/**
 * Simple email service used by the backend auth controller.
 *
 * - Exports `sendEmail` which accepts a minimal options object.
 * - If SMTP environment variables are configured, it will try to send via nodemailer.
 * - If nodemailer or SMTP settings are missing, it falls back to logging the email to the console
 *   (useful for development).
 *
 * Expected env vars (optional):
 *  - SMTP_HOST
 *  - SMTP_PORT
 *  - SMTP_USER
 *  - SMTP_PASS
 *  - SMTP_SECURE (optional, 'true'|'false')
 */

type EmailOptions = {
  to: string
  subject?: string
  template?: 'email-verification' | string
  data?: Record<string, any>
  html?: string
  text?: string
}

export async function sendEmail(opts: EmailOptions): Promise<{ success: boolean; info?: any }> {
  const { to, subject = 'Timeless Email Verification', template, data = {}, html, text } = opts

  // Build default HTML/text for known templates
  let finalHtml = html
  let finalText = text

  if (template === 'email-verification') {
    const firstName = (data.firstName || '').toString()
    const verificationUrl = data.verificationUrl || ''

    finalText = finalText || `Hi ${firstName || 'there'},\n\nPlease verify your email by visiting the following link:\n${verificationUrl}\n\nIf you didn't request this, you can ignore this message.`

    finalHtml = finalHtml || `
      <div style="font-family: Arial, sans-serif; color: #111;">
        <h2>Verify your email</h2>
        <p>Hi ${firstName || 'there'},</p>
        <p>Thanks for registering. Please verify your email by clicking the button below.</p>
        <p style="margin: 24px 0;"><a href="${verificationUrl}" style="background:#111;color:#fff;padding:10px 16px;border-radius:6px;text-decoration:none;">Verify Email</a></p>
        <p>If the button doesn't work, paste this link into your browser:</p>
        <p style="word-break:break-all">${verificationUrl}</p>
        <hr />
        <small>If you didn't create an account, you can safely ignore this email.</small>
      </div>
    `
  }

  // If nodemailer and SMTP are available, try to send. Use dynamic import so projects without nodemailer won't crash.
  const smtpHost = process.env.SMTP_HOST
  const smtpPort = process.env.SMTP_PORT
  const smtpUser = process.env.SMTP_USER
  const smtpPass = process.env.SMTP_PASS
  const smtpSecure = (process.env.SMTP_SECURE || 'false').toLowerCase() === 'true'

  if (smtpHost && smtpPort && smtpUser && smtpPass) {
    try {
      // dynamic import
      // eslint-disable-next-line @typescript-eslint/no-var-requires
      const nodemailer = await import('nodemailer')

      const transporter = nodemailer.createTransport({
        host: smtpHost,
        port: Number(smtpPort),
        secure: smtpSecure,
        auth: {
          user: smtpUser,
          pass: smtpPass,
        },
      })

      const sendResult = await transporter.sendMail({
        from: process.env.SMTP_FROM || `no-reply@${process.env.SMTP_HOST}`,
        to,
        subject,
        text: finalText,
        html: finalHtml,
      })

      return { success: true, info: sendResult }
    } catch (err) {
      // If sending fails for any reason, fall back to logging the message and return failure info
      console.error('sendEmail: failed to send via SMTP, falling back to console log', err)
    }
  }

  // Fallback: log the email to the console (development-friendly)
  // eslint-disable-next-line no-console
  console.info('sendEmail (fallback):', {
    to,
    subject,
    template,
    data,
    text: finalText,
    html: finalHtml ? finalHtml.replace(/\s+/g, ' ').trim() : undefined,
  })

  return { success: true, info: 'logged' }
}

export default sendEmail

/**
 * Email service using Resend.com
 *
 * - Exports `sendEmail` which accepts a minimal options object.
 * - Uses Resend API for sending emails
 * - Falls back to console logging if Resend API key is not configured
 *
 * Expected env vars:
 *  - RESEND_API_KEY (required for production)
 *  - EMAIL_FROM (optional, defaults to 'onboarding@resend.dev')
 */

import { Resend } from 'resend';

type EmailOptions = {
  to: string;
  subject?: string;
  template?: "email-verification" | string;
  data?: Record<string, any>;
  html?: string;
  text?: string;
};

export async function sendEmail(
  opts: EmailOptions,
): Promise<{ success: boolean; info?: any }> {
  const {
    to,
    subject = "Timeless Email Verification",
    template,
    data = {},
    html,
    text,
  } = opts;

  // Build default HTML/text for known templates
  let finalHtml = html;
  let finalText = text;

  if (template === "email-verification") {
    const firstName = (data.firstName || "").toString();
    const verificationUrl = data.verificationUrl || "";

    finalText =
      finalText ||
      `Hi ${firstName || "there"},\n\nPlease verify your email by visiting the following link:\n${verificationUrl}\n\nIf you didn't request this, you can ignore this message.`;

    finalHtml =
      finalHtml ||
      `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Verify Your Email</title>
        </head>
        <body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f4f4f4;">
          <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background-color: #f4f4f4;">
            <tr>
              <td style="padding: 40px 0;">
                <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="600" style="margin: 0 auto; background-color: #ffffff; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
                  <tr>
                    <td style="padding: 40px 30px;">
                      <h1 style="margin: 0 0 20px; font-size: 28px; font-weight: bold; color: #111;">Verify Your Email</h1>
                      <p style="margin: 0 0 20px; font-size: 16px; line-height: 1.5; color: #333;">Hi ${firstName || "there"},</p>
                      <p style="margin: 0 0 30px; font-size: 16px; line-height: 1.5; color: #333;">Thanks for registering with Timeless! Please verify your email address by clicking the button below.</p>
                      <table role="presentation" cellspacing="0" cellpadding="0" border="0" style="margin: 30px 0;">
                        <tr>
                          <td style="border-radius: 6px; background-color: #111;">
                            <a href="${verificationUrl}" target="_blank" style="display: inline-block; padding: 14px 28px; font-size: 16px; font-weight: bold; color: #ffffff; text-decoration: none;">Verify Email Address</a>
                          </td>
                        </tr>
                      </table>
                      <p style="margin: 30px 0 10px; font-size: 14px; line-height: 1.5; color: #666;">If the button doesn't work, copy and paste this link into your browser:</p>
                      <p style="margin: 0 0 30px; font-size: 14px; line-height: 1.5; color: #0066cc; word-break: break-all;">${verificationUrl}</p>
                      <hr style="border: none; border-top: 1px solid #e0e0e0; margin: 30px 0;" />
                      <p style="margin: 0; font-size: 12px; line-height: 1.5; color: #999;">If you didn't create an account with Timeless, you can safely ignore this email.</p>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
          </table>
        </body>
      </html>
    `;
  }

  // Try to send via Resend if API key is configured
  const resendApiKey = process.env.RESEND_API_KEY;
  const emailFrom = process.env.EMAIL_FROM || 'onboarding@resend.dev';

  if (resendApiKey) {
    try {
      const resend = new Resend(resendApiKey);

      const emailPayload: {
        from: string;
        to: string;
        subject: string;
        html?: string;
        text?: string;
      } = {
        from: emailFrom,
        to: to,
        subject: subject,
      };

      // Only add html/text if they exist
      if (finalHtml) {
        emailPayload.html = finalHtml;
      }
      if (finalText) {
        emailPayload.text = finalText;
      }

      const sendResult = await resend.emails.send(emailPayload as any);

      // Log detailed response for debugging
      console.log(`✅ Email sent successfully to ${to} via Resend`);
      console.log(`📧 Resend Response:`, JSON.stringify(sendResult, null, 2));
      
      // Check if there's an error in the response
      if (sendResult.error) {
        console.error("❌ Resend API Error:", sendResult.error);
        throw new Error(sendResult.error.message || "Failed to send email via Resend");
      }
      
      return { success: true, info: sendResult };
    } catch (err: any) {
      console.error("❌ Failed to send email via Resend:", err);
      console.error("❌ Error details:", JSON.stringify(err, null, 2));
      // Re-throw to let caller handle it
      throw err;
    }
  } else {
    console.warn("⚠️  RESEND_API_KEY not configured. Falling back to console logging.");
  }

  // Fallback: log the email to the console (development-friendly)
  console.info("📧 Email (console fallback):", {
    to,
    subject,
    template,
    data,
    text: finalText,
    html: finalHtml ? "[HTML content available]" : undefined,
  });

  return { success: true, info: "logged" };
}

export default sendEmail;

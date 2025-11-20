/**
 * CONTACT CONTROLLER
 *
 * Handles contact form submissions and sends emails via Resend
 */

import { Request, Response } from "express";
import { sendEmail } from "../services/email";

/**
 * Submit contact form
 * POST /api/contact
 */
export const submitContact = async (req: Request, res: Response) => {
  try {
    const { name, email, phone, subject, message } = req.body;

    // Validate required fields
    if (!name || !email || !subject || !message) {
      return res.status(400).json({
        status: "error",
        message: "Name, email, subject, and message are required",
      });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        status: "error",
        message: "Invalid email format",
      });
    }

    // Get recipient email from environment (your email)
    const recipientEmail = process.env.CONTACT_EMAIL as string;
    if (!recipientEmail) {
      return res.status(400).json({
        status: "error",
        message: "Recipient email is not set",
      });
    }

    // Create email content
    const emailSubject = `Contact Form: ${subject}`;
    const emailHtml = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>New Contact Form Submission</title>
        </head>
        <body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f4f4f4;">
          <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background-color: #f4f4f4;">
            <tr>
              <td style="padding: 40px 0;">
                <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="600" style="margin: 0 auto; background-color: #ffffff; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
                  <tr>
                    <td style="padding: 40px 30px;">
                      <h1 style="margin: 0 0 20px; font-size: 28px; font-weight: bold; color: #111;">New Contact Form Submission</h1>
                      <p style="margin: 0 0 20px; font-size: 16px; line-height: 1.5; color: #333;">You have received a new message from the Timeless contact form:</p>
                      
                      <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="margin: 20px 0;">
                        <tr>
                          <td style="padding: 12px; background-color: #f9f9f9; border-left: 4px solid #111;">
                            <p style="margin: 0 0 8px; font-size: 14px; color: #666;"><strong>Name:</strong></p>
                            <p style="margin: 0; font-size: 16px; color: #111;">${name}</p>
                          </td>
                        </tr>
                        <tr>
                          <td style="padding: 12px; background-color: #f9f9f9; border-left: 4px solid #111; margin-top: 8px;">
                            <p style="margin: 0 0 8px; font-size: 14px; color: #666;"><strong>Email:</strong></p>
                            <p style="margin: 0; font-size: 16px; color: #111;"><a href="mailto:${email}" style="color: #0066cc; text-decoration: none;">${email}</a></p>
                          </td>
                        </tr>
                        ${phone ? `
                        <tr>
                          <td style="padding: 12px; background-color: #f9f9f9; border-left: 4px solid #111; margin-top: 8px;">
                            <p style="margin: 0 0 8px; font-size: 14px; color: #666;"><strong>Phone:</strong></p>
                            <p style="margin: 0; font-size: 16px; color: #111;"><a href="tel:${phone}" style="color: #0066cc; text-decoration: none;">${phone}</a></p>
                          </td>
                        </tr>
                        ` : ''}
                        <tr>
                          <td style="padding: 12px; background-color: #f9f9f9; border-left: 4px solid #111; margin-top: 8px;">
                            <p style="margin: 0 0 8px; font-size: 14px; color: #666;"><strong>Subject:</strong></p>
                            <p style="margin: 0; font-size: 16px; color: #111;">${subject}</p>
                          </td>
                        </tr>
                        <tr>
                          <td style="padding: 12px; background-color: #f9f9f9; border-left: 4px solid #111; margin-top: 8px;">
                            <p style="margin: 0 0 8px; font-size: 14px; color: #666;"><strong>Message:</strong></p>
                            <p style="margin: 0; font-size: 16px; color: #111; white-space: pre-wrap;">${message}</p>
                          </td>
                        </tr>
                      </table>
                      
                      <hr style="border: none; border-top: 1px solid #e0e0e0; margin: 30px 0;" />
                      <p style="margin: 0; font-size: 12px; line-height: 1.5; color: #999;">This email was sent from the Timeless contact form.</p>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
          </table>
        </body>
      </html>
    `;

    const emailText = `
New Contact Form Submission

Name: ${name}
Email: ${email}
${phone ? `Phone: ${phone}` : ''}
Subject: ${subject}

Message:
${message}

---
This email was sent from the Timeless contact form.
    `;

    // Send email via Resend
    try {
      await sendEmail({
        to: recipientEmail,
        subject: emailSubject,
        html: emailHtml,
        text: emailText,
      });

      console.log(`✅ Contact form email sent successfully to ${recipientEmail}`);

      res.status(200).json({
        status: "success",
        message: "Thank you for contacting us! We'll get back to you soon.",
      });
    } catch (emailError: any) {
      console.error("Failed to send contact email:", emailError);
      res.status(500).json({
        status: "error",
        message: "Failed to send your message. Please try again later.",
      });
    }
  } catch (error: any) {
    console.error("Contact form error:", error);
    res.status(500).json({
      status: "error",
      message: "Internal server error. Please try again later.",
    });
  }
};


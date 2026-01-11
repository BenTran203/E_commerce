# Contact Form Setup with Resend

## Overview

The contact form now sends emails directly to your inbox using Resend.com when users submit the contact form.

## Implementation

### Backend

1. **Controller**: `backend/src/controllers/contact.ts`
   - Validates form data
   - Sends email via Resend API
   - Returns success/error response

2. **Route**: `backend/src/routes/contact.ts`
   - Public endpoint (no authentication required)
   - `POST /api/contact`

3. **Email Service**: Uses existing `sendEmail()` function from `backend/src/services/email.ts`

### Frontend

1. **API Client**: Added `contactAPI.submit()` to `src/lib/api.ts`
2. **Contact Page**: Updated `src/app/pages/contact/page.tsx`
   - Calls real API instead of simulating
   - Shows toast notifications
   - Handles errors gracefully

## Configuration

### Environment Variables

Add to your Railway backend service:

```env
# Your email address to receive contact form submissions
CONTACT_EMAIL=bentranph@gmail.com

# Or it will fallback to EMAIL_FROM if CONTACT_EMAIL is not set
EMAIL_FROM=onboarding@resend.dev

# Resend API Key (already configured)
RESEND_API_KEY=re_EsAousjK_JAdrUfXs3AVe1VgZ5mAAKqRB
```

## Email Format

When a user submits the contact form, you'll receive an email with:

- **Subject**: `Contact Form: [User's Subject]`
- **Content**:
  - Name
  - Email (clickable mailto link)
  - Phone (if provided, clickable tel link)
  - Subject
  - Message

## API Endpoint

```
POST /api/contact
Content-Type: application/json

Body:
{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "+1234567890",  // optional
  "subject": "General Inquiry",
  "message": "Hello, I have a question..."
}

Response:
{
  "status": "success",
  "message": "Thank you for contacting us! We'll get back to you soon."
}
```

## Testing

1. Go to `/pages/contact` on your frontend
2. Fill out the form
3. Submit
4. Check your email inbox (the email specified in `CONTACT_EMAIL`)

## Error Handling

- **Validation errors**: Returns 400 with error message
- **Email sending failures**: Returns 500 with error message
- **Frontend**: Shows toast notifications for success/error

## Security

- ✅ Public endpoint (no auth required for contact form)
- ✅ Email validation
- ✅ Input sanitization (via HTML escaping in email template)
- ✅ Rate limiting (via Express rate limiter on `/api/` routes)

## Customization

To change the recipient email, update the `CONTACT_EMAIL` environment variable in Railway.

To customize the email template, edit `backend/src/controllers/contact.ts` - the `emailHtml` variable.


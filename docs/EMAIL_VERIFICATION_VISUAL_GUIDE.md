# Email Verification - Visual Guide

## 🎬 Complete User Journey

### Step 1: User Registers

**Registration Form**
```
┌────────────────────────────────────┐
│  Create Your Account               │
│                                    │
│  First Name:  [John            ]   │
│  Last Name:   [Doe             ]   │
│  Email:       [john@example.com]   │
│  Password:    [••••••••••••••••]   │
│                                    │
│         [Create Account]           │
└────────────────────────────────────┘
```

**User clicks "Create Account"**

---

### Step 2: Backend Processing

```typescript
// 1. Validate input
✅ Email format valid
✅ Password strong enough
✅ Email not already registered

// 2. Create user in database
User {
  id: "clx123...",
  email: "john@example.com",
  firstName: "John",
  lastName: "Doe",
  isEmailVerified: false,  // ← Not verified yet!
  verificationToken: "a1b2c3d4...",
  verificationExpiry: "2025-11-20T12:00:00Z"
}

// 3. Send email via Resend
resend.emails.send({
  from: "onboarding@resend.dev",
  to: "john@example.com",
  subject: "Welcome to Timeless - Verify Your Email",
  html: "<beautiful template>"
})

// 4. Return success
Response: {
  status: "success",
  message: "User registered successfully",
  data: { user, tokens }
}
```

---

### Step 3: User Receives Email

**Email in Inbox**
```
┌─────────────────────────────────────────────┐
│ From: Timeless <onboarding@resend.dev>     │
│ To: john@example.com                        │
│ Subject: Welcome to Timeless - Verify...   │
├─────────────────────────────────────────────┤
│                                             │
│  ╔═══════════════════════════════════════╗ │
│  ║                                       ║ │
│  ║  Verify Your Email                    ║ │
│  ║  ────────────────                     ║ │
│  ║                                       ║ │
│  ║  Hi John,                             ║ │
│  ║                                       ║ │
│  ║  Thanks for registering with          ║ │
│  ║  Timeless! Please verify your email  ║ │
│  ║  address by clicking the button       ║ │
│  ║  below.                               ║ │
│  ║                                       ║ │
│  ║     ┌──────────────────────┐          ║ │
│  ║     │ Verify Email Address │          ║ │
│  ║     └──────────────────────┘          ║ │
│  ║                                       ║ │
│  ║  If the button doesn't work, paste   ║ │
│  ║  this link into your browser:         ║ │
│  ║                                       ║ │
│  ║  http://localhost:3000/verify-email  ║ │
│  ║  ?token=a1b2c3d4...                  ║ │
│  ║                                       ║ │
│  ║  ───────────────────────────────      ║ │
│  ║  If you didn't create an account,    ║ │
│  ║  you can safely ignore this email.   ║ │
│  ║                                       ║ │
│  ╚═══════════════════════════════════════╝ │
└─────────────────────────────────────────────┘
```

---

### Step 4: User Clicks Verify Button

**Browser opens verification page**
```
URL: http://localhost:3000/verify-email?token=a1b2c3d4...

┌────────────────────────────────────┐
│                                    │
│         ⏳ Loading...              │
│                                    │
│   Verifying your email address...  │
│                                    │
└────────────────────────────────────┘
```

**Frontend code executes:**
```typescript
// src/app/verify-email/page.tsx

useEffect(() => {
  const verifyToken = async () => {
    const token = searchParams.get("token");
    
    try {
      const response = await authAPI.verifyEmail(token);
      setStatus("success");
    } catch (error) {
      setStatus("error");
    }
  };
  
  verifyToken();
}, []);
```

---

### Step 5: Backend Verification

```typescript
// backend/src/controllers/auth.ts

export const verifyEmail = async (req, res) => {
  const { token } = req.body;
  
  // 1. Find user with this token
  const user = await prisma.user.findUnique({
    where: { verificationToken: token }
  });
  
  if (!user) {
    return res.status(400).json({
      message: "Invalid or expired verification token"
    });
  }
  
  // 2. Check expiration
  if (user.verificationExpiry < new Date()) {
    return res.status(400).json({
      message: "Verification token has expired"
    });
  }
  
  // 3. Update user
  await prisma.user.update({
    where: { id: user.id },
    data: {
      isEmailVerified: true,        // ✅ Verified!
      emailVerifiedAt: new Date(),
      verificationToken: null,      // Clear token
      verificationExpiry: null
    }
  });
  
  return res.status(200).json({
    status: "success",
    message: "Email verified successfully"
  });
};
```

---

### Step 6: Success Screen

**User sees success message**
```
┌────────────────────────────────────┐
│                                    │
│           ✅ Success!              │
│                                    │
│    Email Verified Successfully!    │
│                                    │
│   Your email has been verified.    │
│   You can now access all features. │
│                                    │
│       [Go to Dashboard]            │
│                                    │
└────────────────────────────────────┘
```

---

### Step 7: User Profile Updated

**Account Page**
```
┌────────────────────────────────────┐
│  My Account                        │
│                                    │
│  Personal Information              │
│  ────────────────────             │
│                                    │
│  Name:    John Doe                 │
│  Email:   john@example.com ✅      │
│          (Verified)                │
│                                    │
│  Member since: Nov 19, 2025        │
│                                    │
└────────────────────────────────────┘
```

**Database State**
```typescript
User {
  id: "clx123...",
  email: "john@example.com",
  firstName: "John",
  lastName: "Doe",
  isEmailVerified: true,  // ✅ NOW VERIFIED!
  emailVerifiedAt: "2025-11-19T10:30:00Z",
  verificationToken: null,  // Cleared
  verificationExpiry: null  // Cleared
}
```

---

## 🔄 Alternative Flow: Resend Verification

**If user doesn't verify within 24 hours:**

### Step 1: Token Expired

**User clicks old link**
```
┌────────────────────────────────────┐
│                                    │
│           ❌ Error                 │
│                                    │
│   Verification Link Expired        │
│                                    │
│   This verification link has       │
│   expired. Please request a new    │
│   one from your account page.      │
│                                    │
│       [Request New Link]           │
│                                    │
└────────────────────────────────────┘
```

### Step 2: User Requests New Link

**Account Page**
```
┌────────────────────────────────────┐
│  My Account                        │
│                                    │
│  Personal Information              │
│  ────────────────────             │
│                                    │
│  Name:    John Doe                 │
│  Email:   john@example.com ⚠️      │
│          (Not Verified)            │
│          [Resend Verification]     │
│                                    │
└────────────────────────────────────┘
```

### Step 3: New Email Sent

**User clicks "Resend Verification"**
```typescript
// Frontend calls API
await authAPI.resendVerification();

// Backend generates new token
const newToken = crypto.randomBytes(32).toString("hex");

// Send new email
await sendEmail({
  to: user.email,
  subject: "Timeless - Verify Your Email",
  template: "email-verification",
  data: { firstName, verificationUrl }
});
```

### Step 4: User Receives New Email

**Success Message**
```
┌────────────────────────────────────┐
│                                    │
│           ✅ Sent!                 │
│                                    │
│   Verification email sent!         │
│                                    │
│   Please check your inbox and      │
│   click the verification link.     │
│                                    │
│           [OK]                     │
│                                    │
└────────────────────────────────────┘
```

---

## 🎨 Email Template Preview

The actual HTML email looks like this:

```html
<!DOCTYPE html>
<html>
<body style="background-color: #f4f4f4; padding: 40px;">
  <table width="600" style="background-color: #ffffff; margin: 0 auto;">
    <tr>
      <td style="padding: 40px;">
        
        <!-- Header -->
        <h1 style="color: #111; font-size: 28px;">
          Verify Your Email
        </h1>
        
        <!-- Greeting -->
        <p style="color: #333; font-size: 16px;">
          Hi John,
        </p>
        
        <!-- Message -->
        <p style="color: #333; font-size: 16px;">
          Thanks for registering with Timeless! 
          Please verify your email address by 
          clicking the button below.
        </p>
        
        <!-- Button -->
        <table style="margin: 30px 0;">
          <tr>
            <td style="background-color: #111; border-radius: 6px;">
              <a href="http://localhost:3000/verify-email?token=..."
                 style="display: inline-block; padding: 14px 28px;
                        color: #ffffff; text-decoration: none;
                        font-weight: bold;">
                Verify Email Address
              </a>
            </td>
          </tr>
        </table>
        
        <!-- Fallback Link -->
        <p style="color: #666; font-size: 14px;">
          If the button doesn't work, copy and paste 
          this link:
        </p>
        <p style="color: #0066cc; font-size: 14px; word-break: break-all;">
          http://localhost:3000/verify-email?token=a1b2c3d4...
        </p>
        
        <!-- Footer -->
        <hr style="border-top: 1px solid #e0e0e0;" />
        <p style="color: #999; font-size: 12px;">
          If you didn't create an account, you can 
          safely ignore this email.
        </p>
        
      </td>
    </tr>
  </table>
</body>
</html>
```

---

## 📊 Resend Dashboard View

**Email Logs**
```
┌───────────────────────────────────────────────────────┐
│  Emails                                               │
├───────────────────────────────────────────────────────┤
│  ✅ john@example.com                    Just now      │
│     Welcome to Timeless - Verify Your Email           │
│     Delivered • Opened • Clicked                      │
│                                                       │
│  ✅ jane@example.com                    2 mins ago    │
│     Welcome to Timeless - Verify Your Email           │
│     Delivered • Opened                                │
│                                                       │
│  ✅ bob@example.com                     5 mins ago    │
│     Timeless - Verify Your Email                      │
│     Delivered                                         │
└───────────────────────────────────────────────────────┘
```

**Click on an email to see details:**
```
┌───────────────────────────────────────────────────────┐
│  Email Details                                        │
├───────────────────────────────────────────────────────┤
│  ID:        1234567890                                │
│  To:        john@example.com                          │
│  From:      onboarding@resend.dev                     │
│  Subject:   Welcome to Timeless - Verify Your Email  │
│  Status:    Delivered ✅                              │
│                                                       │
│  Timeline:                                            │
│  • Sent:      10:30:00                                │
│  • Delivered: 10:30:02                                │
│  • Opened:    10:31:15                                │
│  • Clicked:   10:31:20                                │
│                                                       │
│  [View HTML] [View Plain Text] [Resend]              │
└───────────────────────────────────────────────────────┘
```

---

## 🔐 Database Changes

**Before Verification:**
```sql
SELECT id, email, isEmailVerified, verificationToken 
FROM User 
WHERE email = 'john@example.com';

┌──────────┬──────────────────┬─────────────────┬──────────────────┐
│ id       │ email            │ isEmailVerified │ verificationToken│
├──────────┼──────────────────┼─────────────────┼──────────────────┤
│ clx123.. │ john@example.com │ false           │ a1b2c3d4...      │
└──────────┴──────────────────┴─────────────────┴──────────────────┘
```

**After Verification:**
```sql
SELECT id, email, isEmailVerified, emailVerifiedAt, verificationToken 
FROM User 
WHERE email = 'john@example.com';

┌──────────┬──────────────────┬─────────────────┬───────────────────────┬──────────────────┐
│ id       │ email            │ isEmailVerified │ emailVerifiedAt       │ verificationToken│
├──────────┼──────────────────┼─────────────────┼───────────────────────┼──────────────────┤
│ clx123.. │ john@example.com │ true            │ 2025-11-19T10:31:20Z  │ null             │
└──────────┴──────────────────┴─────────────────┴───────────────────────┴──────────────────┘
```

---

## 🚦 API Flow Diagram

```
Frontend                Backend                 Database              Resend
   │                       │                        │                   │
   │  POST /register       │                        │                   │
   ├──────────────────────>│                        │                   │
   │                       │  Create user           │                   │
   │                       ├───────────────────────>│                   │
   │                       │<───────────────────────┤                   │
   │                       │                        │                   │
   │                       │  Send email            │                   │
   │                       ├────────────────────────────────────────────>│
   │                       │                        │   ✅ Email sent   │
   │                       │<────────────────────────────────────────────┤
   │  201 Created          │                        │                   │
   │<──────────────────────┤                        │                   │
   │                       │                        │                   │
   │                                                                     │
   │                                    ⏰ USER CHECKS EMAIL            │
   │                                    👆 USER CLICKS LINK             │
   │                                                                     │
   │  GET /verify-email    │                        │                   │
   │  ?token=xyz           │                        │                   │
   ├──────────────────────>│                        │                   │
   │                       │                        │                   │
   │  POST /verify-email   │                        │                   │
   ├──────────────────────>│                        │                   │
   │                       │  Find by token         │                   │
   │                       ├───────────────────────>│                   │
   │                       │<───────────────────────┤                   │
   │                       │  Update verified       │                   │
   │                       ├───────────────────────>│                   │
   │                       │<───────────────────────┤                   │
   │  200 OK               │                        │                   │
   │  {success: true}      │                        │                   │
   │<──────────────────────┤                        │                   │
   │                       │                        │                   │
```

---

## 📝 Summary

1. ✅ **User registers** → Token generated
2. ✅ **Email sent** → Via Resend API
3. ✅ **User clicks link** → Opens verification page
4. ✅ **Token verified** → Database updated
5. ✅ **Success!** → User can now use all features

**Key Points:**
- Token expires in 24 hours
- One-time use only
- Secure and encrypted
- Beautiful HTML email
- Mobile responsive
- Console fallback for development

---

**Ready to test? Follow the [Quick Start Guide](./RESEND_QUICK_START.md)!**


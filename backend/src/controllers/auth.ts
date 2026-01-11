

import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import { PrismaClient } from "@prisma/client";
import crypto from "crypto";
import {
  generateToken,
  generateRefreshToken,
  verifyRefreshToken,
} from "../middleware/auth";
import { sendEmail } from "../services/email"; // Implement this service
import { registerValidator, loginValidator } from "../middleware/validator";
const prisma = new PrismaClient();

/*Register a new user account*/
export const register = async (req: Request, res: Response) => {
  try {
    // Log incoming request data for debugging
    console.log("Registration request body:", JSON.stringify(req.body, null, 2));

    const {
      email,
      password,
      firstName,
      lastName,
      role = "CUSTOMER",
    } = req.body;
    const validate = registerValidator.safeParse(req.body);
    
    // Log validation result
    if (!validate.success) {
      console.log("Validation failed:", JSON.stringify(validate.error.errors, null, 2));
    }
    if (!validate.success) {
      // Format validation errors for user-friendly display
      const formattedErrors = validate.error.errors.map((err) => {
        const field = err.path.join(".");
        return `${field}: ${err.message}`;
      });

      return res.status(400).json({
        status: "error",
        message: formattedErrors.join(", "),
        errors: validate.error.errors,
      });
    }

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email: email.toLowerCase() },
    });

    if (existingUser) {
      return res.status(409).json({
        status: "error",
        message: "This email has already exists",
      });
    }

    // Hash password
    const hashedPass = await bcrypt.hash(password, 15);

    // Generate verification token
    const verificationToken = crypto.randomBytes(32).toString("hex");
    const verificationExpiry = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 hours

    // Create user
    const user = await prisma.user.create({
      data: {
        email: email.toLowerCase(),
        emailRaw: email,
        password: hashedPass,
        firstName,
        lastName,
        role,
        verificationToken,
        verificationExpiry,
      },
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        role: true,
        isActive: true,
        isEmailVerified: true,
        createdAt: true,
      },
    });

    // Generate tokens
    const accessToken = generateToken(user.id);
    const refreshToken = generateRefreshToken(user.id);

    // Send verification email
    const verificationUrl = `${process.env.FRONTEND_URL || "http://localhost:3000"}/verify-email?token=${verificationToken}`;
    
    try {
      await sendEmail({
        to: user.email,
        subject: "Welcome to Timeless - Verify Your Email",
        template: "email-verification",
        data: {
          firstName: user.firstName,
          verificationUrl,
        },
      });
      console.log(`Verification email sent to ${user.email}`);
    } catch (emailError) {
      console.error("Failed to send verification email:", emailError);
      // Don't fail registration if email fails
    }

    res.status(201).json({
      status: "success",
      message: "User registered successfully",
      data: {
        user,
        tokens: {
          accessToken,
          refreshToken,
        },
      },
    });
  } catch (error) {
    console.error("Registration error:", error);
    res.status(500).json({
      status: "error",
      message: "Internal server error during registration",
    });
  }
};

/**
 * USER LOGIN
 */
export const login = async (req: Request, res: Response) => {
  try {
    const { email, password, rememberMe = false } = req.body;


    const validation = loginValidator.safeParse(req.body)
    if (!validation.success) {
      return res.status(400).json({
        status: 'error',
        message: 'Validation failed',
        errors: validation.error
      })
    }

    // Basic validation
    if (!email || !password) {
      return res.status(400).json({
        status: "error",
        message: "Email and password are required",
      });
    }

    // Find user by email
    const user = await prisma.user.findUnique({
      where: { email: email.toLowerCase() },
      select: {
        id: true,
        email: true,
        password: true,
        firstName: true,
        lastName: true,
        role: true,
        isActive: true,
        isEmailVerified: true,
      },
    });

    if (!user) {
      return res.status(401).json({
        status: "error",
        message: "Invalid email or password",
      });
    }

    // Check if account is active
    if (!user.isActive) {
      return res.status(401).json({
        status: "error",
        message: "Account has been deactivated. Please contact support.",
      });
    }

    // Verify password
    // Check if user has a password (social auth users don't have passwords)
    if (!user.password) {
      return res.status(401).json({
        status: "error",
        message: "This account uses social login. Please login with your social provider.",
      });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({
        status: "error",
        message: "Invalid email or password",
      });
    }

    // Update last login timestamp
    await prisma.user.update({
      where: { id: user.id },
      data: { lastLoginAt: new Date() },
    });

    // Generate tokens
    const accessToken = generateToken(user.id);
    const refreshToken = generateRefreshToken(user.id);

    // Remove password from user object
    const { password: _, ...userWithoutPassword } = user;

    res.status(200).json({
      status: "success",
      message: "Login successful",
      data: {
        user: userWithoutPassword,
        tokens: {
          accessToken,
          refreshToken,
        },
      },
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({
      status: "error",
      message: "Internal server error during login",
    });
  }
};

/**
 * REFRESH TOKEN
 *
 * POST /api/auth/refresh
 *
 * Generate new access token using refresh token
 */
export const refreshToken = async (req: Request, res: Response) => {
  try {
    const { refreshToken } = req.body;

    if (!refreshToken) {
      return res.status(400).json({
        status: "error",
        message: "Refresh token is required",
      });
    }

    // Verify refresh token
    let userId: string;
    try {
      const decoded = verifyRefreshToken(refreshToken);
      userId = decoded.userId;
    } catch (error) {
      return res.status(401).json({
        status: "error",
        message: "Invalid or expired refresh token",
      });
    }

    // Check if user still exists and is active
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        isActive: true,
      },
    });

    if (!user || !user.isActive) {
      return res.status(401).json({
        status: "error",
        message: "User not found or account deactivated",
      });
    }

    // Generate new access token
    const newAccessToken = generateToken(user.id);

    res.status(200).json({
      status: "success",
      message: "Token refreshed successfully",
      data: {
        accessToken: newAccessToken,
      },
    });
  } catch (error) {
    console.error("Token refresh error:", error);
    res.status(500).json({
      status: "error",
      message: "Internal server error during token refresh",
    });
  }
};

/**
 * FORGOT PASSWORD
 *
 * POST /api/auth/forgot-password
 *
 * Send password reset email
 */
export const forgotPassword = async (req: Request, res: Response) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({
        status: "error",
        message: "Email is required",
      });
    }

    // Find user by email
    const user = await prisma.user.findUnique({
      where: { email: email.toLowerCase() },
      select: {
        id: true,
        email: true,
        firstName: true,
        isActive: true,
      },
    });

    // Always return success to prevent email enumeration
    if (!user || !user.isActive) {
      return res.status(200).json({
        status: "success",
        message:
          "If an account with that email exists, a password reset link has been sent.",
      });
    }

    // Generate password reset token (short-lived)
    const resetToken = generateToken(user.id); // Consider using a different secret for reset tokens

    // TODO: Save reset token to database with expiration
    // TODO: Send password reset email
    // await sendEmail({
    //   to: user.email,
    //   subject: 'Password Reset Request',
    //   template: 'password-reset',
    //   data: {
    //     firstName: user.firstName,
    //     resetUrl: `${process.env.FRONTEND_URL}/reset-password?token=${resetToken}`
    //   }
    // })

    res.status(200).json({
      status: "success",
      message:
        "If an account with that email exists, a password reset link has been sent.",
    });
  } catch (error) {
    console.error("Forgot password error:", error);
    res.status(500).json({
      status: "error",
      message: "Internal server error during password reset request",
    });
  }
};

/**
 * RESET PASSWORD
 *
 * POST /api/auth/reset-password
 *
 * Reset user password using reset token
 */
export const resetPassword = async (req: Request, res: Response) => {
  try {
    const { token, password } = req.body;

    if (!token || !password) {
      return res.status(400).json({
        status: "error",
        message: "Token and new password are required",
      });
    }

    // TODO: Validate password strength
    if (password.length < 8) {
      return res.status(400).json({
        status: "error",
        message: "Password must be at least 8 characters long",
      });
    }

    // Verify reset token
    // TODO: Implement proper reset token verification with database lookup
    // This is a simplified version - in production, use a separate token table

    // Hash new password
    const saltRounds = 12;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // TODO: Update user password and invalidate reset token
    // const user = await prisma.user.update({
    //   where: { id: userId },
    //   data: {
    //     password: hashedPassword,
    //     updatedAt: new Date()
    //   }
    // })

    res.status(200).json({
      status: "success",
      message: "Password reset successfully",
    });
  } catch (error) {
    console.error("Reset password error:", error);
    res.status(500).json({
      status: "error",
      message: "Internal server error during password reset",
    });
  }
};

/**
 * LOGOUT
 *
 * POST /api/auth/logout
 *
 * Logout user (invalidate tokens)
 */
export const logout = async (req: Request, res: Response) => {
  try {
    // TODO: Implement token blacklisting
    // In a production environment, you would typically:
    // 1. Add the token to a blacklist/revoked tokens table
    // 2. Set a short TTL in Redis for performance
    // 3. Check this blacklist in the authentication middleware

    res.status(200).json({
      status: "success",
      message: "Logged out successfully",
    });
  } catch (error) {
    console.error("Logout error:", error);
    res.status(500).json({
      status: "error",
      message: "Internal server error during logout",
    });
  }
};

/**
 * GET CURRENT USER
 *
 * GET /api/auth/me
 *
 * Get current authenticated user information
 */
export const getCurrentUser = async (req: Request, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({
        status: "error",
        message: "Not authenticated",
      });
    }

    // Fetch complete user information
    const user = await prisma.user.findUnique({
      where: { id: req.user.id },
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        avatar: true,
        phone: true,
        role: true,
        isActive: true,
        isEmailVerified: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    if (!user) {
      return res.status(404).json({
        status: "error",
        message: "User not found",
      });
    }

    res.status(200).json({
      status: "success",
      data: { user },
    });
  } catch (error) {
    console.error("Get current user error:", error);
    res.status(500).json({
      status: "error",
      message: "Internal server error",
    });
  }
};

/**
 * Social Login (Google, Facebook, Twitter)
 *
 * LEARNING OBJECTIVES:
 * - Handle OAuth authentication from social providers
 * - Create or find users from social login
 * - Link social accounts to existing users
 */
export const socialLogin = async (req: Request, res: Response) => {
  try {
    const { provider, providerId, email, name, image } = req.body;

    // Validate required fields
    if (!provider || !providerId || !email || !name) {
      return res.status(400).json({
        status: "error",
        message: "Provider, providerId, email, and name are required",
      });
    }

    // Validate provider
    const validProviders = ["google", "facebook", "twitter"];
    if (!validProviders.includes(provider)) {
      return res.status(400).json({
        status: "error",
        message: "Invalid provider. Must be google, facebook, or twitter",
      });
    }

    // Find existing user by email or providerId
    let user = await prisma.user.findFirst({
      where: {
        OR: [
          { email: email.toLowerCase() },
          {
            AND: [{ providerId }, { provider }],
          },
        ],
      },
    });

    // If user doesn't exist, create new user
    if (!user) {
      const [firstName, ...lastNameParts] = name.split(" ");

      user = await prisma.user.create({
        data: {
          email: email.toLowerCase(),
          emailRaw: email, // Store original email format
          firstName: firstName || "User",
          lastName: lastNameParts.join(" ") || firstName || "Name",
          provider,
          providerId,
          avatar: image || null,
          isEmailVerified: true, // Social auth emails are pre-verified
          role: "CUSTOMER",
          password: null, // No password for social auth users
        },
      });
    } else {
      // Update existing user with social provider info if not already set
      if (!user.provider || !user.providerId) {
        user = await prisma.user.update({
          where: { id: user.id },
          data: {
            provider,
            providerId,
            avatar: image || user.avatar,
            isEmailVerified: true,
          },
        });
      }

      // Update last login time
      await prisma.user.update({
        where: { id: user.id },
        data: { lastLoginAt: new Date() },
      });
    }

    // Check if user is active
    if (!user.isActive) {
      return res.status(403).json({
        status: "error",
        message: "Account is disabled. Please contact support.",
      });
    }

    // Generate tokens
    const accessToken = generateToken(user.id);
    const refreshToken = generateRefreshToken(user.id);

    // Store refresh token
    await prisma.refreshToken.create({
      data: {
        token: refreshToken,
        userId: user.id,
        expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days
      },
    });

    // Return user data and tokens
    res.status(200).json({
      status: "success",
      message: "Social login successful",
      data: {
        user: {
          id: user.id,
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
          avatar: user.avatar,
          phone: user.phone,
          role: user.role,
          isActive: user.isActive,
          isEmailVerified: user.isEmailVerified,
        },
        tokens: {
          accessToken,
          refreshToken,
        },
      },
    });
  } catch (error) {
    console.error("Social login error:", error);
    res.status(500).json({
      status: "error",
      message: "Social login failed. Please try again.",
    });
  }
};

/**
 * Verify user email with token
 */
export const verifyEmail = async (req: Request, res: Response) => {
  try {
    const { token } = req.body;

    if (!token) {
      return res.status(400).json({
        status: "error",
        message: "Verification token is required",
      });
    }

    // Find user with this verification token
    const user = await prisma.user.findUnique({
      where: { verificationToken: token },
      select: {
        id: true,
        email: true,
        isEmailVerified: true,
        verificationToken: true,
        verificationExpiry: true,
      },
    });

    if (!user) {
      return res.status(400).json({
        status: "error",
        message: "Invalid or expired verification token",
      });
    }

    // Check if token has expired
    if (user.verificationExpiry && user.verificationExpiry < new Date()) {
      return res.status(400).json({
        status: "error",
        message: "Verification token has expired. Please request a new one.",
      });
    }

    // Check if already verified
    if (user.isEmailVerified) {
      return res.status(200).json({
        status: "success",
        message: "Email is already verified",
      });
    }

    // Update user as verified
    await prisma.user.update({
      where: { id: user.id },
      data: {
        isEmailVerified: true,
        emailVerifiedAt: new Date(),
        verificationToken: null,
        verificationExpiry: null,
      },
    });

    res.status(200).json({
      status: "success",
      message: "Email verified successfully",
    });
  } catch (error) {
    console.error("Email verification error:", error);
    res.status(500).json({
      status: "error",
      message: "Internal server error during email verification",
    });
  }
};

/**
 * Resend verification email
 */
export const resendVerificationEmail = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user?.id;

    if (!userId) {
      return res.status(401).json({
        status: "error",
        message: "Unauthorized",
      });
    }

    // Get user details
    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      return res.status(404).json({
        status: "error",
        message: "User not found",
      });
    }

    // Check if already verified
    if (user.isEmailVerified) {
      return res.status(400).json({
        status: "error",
        message: "Email is already verified",
      });
    }

    // Generate new verification token
    const verificationToken = crypto.randomBytes(32).toString("hex");
    const verificationExpiry = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 hours

    // Update user with new token
    await prisma.user.update({
      where: { id: userId },
      data: {
        verificationToken,
        verificationExpiry,
      },
    });

    // Send verification email
    const verificationUrl = `${process.env.FRONTEND_URL || "http://localhost:3000"}/verify-email?token=${verificationToken}`;
    
    try {
      await sendEmail({
        to: user.email,
        subject: "Timeless - Verify Your Email",
        template: "email-verification",
        data: {
          firstName: user.firstName,
          verificationUrl,
        },
      });
      
      res.status(200).json({
        status: "success",
        message: "Verification email sent successfully",
      });
    } catch (emailError) {
      console.error("Failed to send verification email:", emailError);
      res.status(500).json({
        status: "error",
        message: "Failed to send verification email. Please try again later.",
      });
    }
  } catch (error) {
    console.error("Resend verification email error:", error);
    res.status(500).json({
      status: "error",
      message: "Internal server error",
    });
  }
};

/**
 * IMPLEMENTATION NOTES:
 *
 * 1. **Security Best Practices**:
 *    - Always hash passwords with bcrypt (salt rounds ≥ 12)
 *    - Use secure, random tokens for email verification and password reset
 *    - Implement rate limiting on auth endpoints
 *    - Add CAPTCHA for registration and login after failed attempts
 *    - Use HTTPS in production
 *
 * 2. **Validation**:
 *    - Implement proper input validation using Joi or Zod
 *    - Validate email format and password strength
 *    - Sanitize user inputs to prevent XSS
 *
 * 3. **Error Handling**:
 *    - Don't expose sensitive information in error messages
 *    - Log authentication events for monitoring
 *    - Implement consistent error response format
 *
 * 4. **Performance**:
 *    - Cache user sessions in Redis
 *    - Use database indexes on email and other frequently queried fields
 *    - Implement connection pooling for database
 *
 * NEXT STEPS:
 * 1. Implement proper input validation
 * 2. Set up email service (nodemailer)
 * 3. Add password strength validation
 * 4. Implement rate limiting
 * 5. Add comprehensive tests
 * 6. Set up monitoring and logging
 */

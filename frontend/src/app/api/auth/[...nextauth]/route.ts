import NextAuth from "next-auth";
import type { NextAuthConfig } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import FacebookProvider from "next-auth/providers/facebook";
import TwitterProvider from "next-auth/providers/twitter";
import CredentialsProvider from "next-auth/providers/credentials";

const authOptions = {
  providers: [
    // Google OAuth
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),

    // Facebook OAuth
    FacebookProvider({
      clientId: process.env.FACEBOOK_CLIENT_ID || "",
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET || "",
    }),

    // Twitter OAuth
    TwitterProvider({
      clientId: process.env.TWITTER_CLIENT_ID || "",
      clientSecret: process.env.TWITTER_CLIENT_SECRET || "",
    }),

    // Credentials Provider (for email/password login)
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Email and password required");
        }

        try {
          // Call your backend API
          const response = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001/api"}/auth/login`,
            {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                email: credentials.email,
                password: credentials.password,
              }),
            },
          );

          const data = await response.json();

          if (!response.ok) {
            throw new Error(data.message || "Login failed");
          }

          // Return user object with token
          return {
            id: data.data.user.id,
            email: data.data.user.email,
            name: `${data.data.user.firstName} ${data.data.user.lastName}`,
            accessToken: data.data.tokens.accessToken,
            refreshToken: data.data.tokens.refreshToken,
            user: data.data.user,
          };
        } catch (error: any) {
          throw new Error(error.message || "Authentication failed");
        }
      },
    }),
  ],

  callbacks: {
    async signIn({ user, account, profile }) {
      // Handle OAuth sign in
      if (
        account?.provider === "google" ||
        account?.provider === "facebook" ||
        account?.provider === "twitter"
      ) {
        try {
          // Register or login user via your backend
          const response = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001/api"}/auth/social-login`,
            {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                provider: account.provider,
                providerId: account.providerAccountId,
                email: user.email,
                name: user.name,
                image: user.image,
              }),
            },
          );

          if (!response.ok) {
            console.error("Social login failed:", await response.text());
            return false;
          }

          const data = await response.json();

          // Store tokens
          if (typeof window !== "undefined") {
            localStorage.setItem("auth_token", data.data.tokens.accessToken);
            localStorage.setItem("user", JSON.stringify(data.data.user));
          }

          return true;
        } catch (error) {
          console.error("Social sign in error:", error);
          return false;
        }
      }

      return true;
    },

    async jwt({ token, user, account }) {
      // Add access_token and user to JWT token
      if (user) {
        token.accessToken = (user as any).accessToken;
        token.refreshToken = (user as any).refreshToken;
        token.user = (user as any).user;
      }
      return token;
    },

    async session({ session, token }) {
      // Add token and user to session
      if (token) {
        (session as any).accessToken = token.accessToken as string;
        (session as any).refreshToken = token.refreshToken as string;
        (session as any).user = token.user;
      }
      return session;
    },
  },

  pages: {
    signIn: "/auth/login",
    error: "/auth/error",
  },

  session: {
    strategy: "jwt",
  },

  secret:
    process.env.AUTH_SECRET ||
    process.env.NEXTAUTH_SECRET ||
    "development-secret-please-change-in-production",
} satisfies NextAuthConfig;

const { handlers } = NextAuth(authOptions);
export const { GET, POST } = handlers;

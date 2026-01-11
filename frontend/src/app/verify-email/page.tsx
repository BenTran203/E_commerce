"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { CheckCircle, XCircle, Loader } from "lucide-react";
import Button from "@/components/ui/Button";
import { authAPI } from "@/lib/api";
import { useAuth } from "@/hooks/useAuth";

export default function VerifyEmailPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { refreshUser } = useAuth();
  const [status, setStatus] = useState<"loading" | "success" | "error">(
    "loading"
  );
  const [message, setMessage] = useState("");

  useEffect(() => {
    const verifyToken = async () => {
      const token = searchParams.get("token");

      if (!token) {
        setStatus("error");
        setMessage("Invalid verification link. No token provided.");
        return;
      }

      try {
        const response = await authAPI.verifyEmail(token);
        setStatus("success");
        setMessage(
          response.message || "Email verified successfully! You can now log in."
        );
        // Refresh user data to update verification status
        await refreshUser();
      } catch (error: any) {
        setStatus("error");
        setMessage(
          error.message ||
            "Failed to verify email. The link may have expired or is invalid."
        );
      }
    };

    verifyToken();
  }, [searchParams, refreshUser]);

  return (
    <div className="min-h-screen bg-luxury-cream flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-xl shadow-lg p-8 max-w-md w-full text-center"
      >
        {/* Status Icon */}
        <div className="mb-6">
          {status === "loading" && (
            <div className="flex justify-center">
              <Loader
                size={64}
                className="text-primary-900 animate-spin"
              />
            </div>
          )}
          {status === "success" && (
            <div className="flex justify-center">
              <CheckCircle size={64} className="text-green-600" />
            </div>
          )}
          {status === "error" && (
            <div className="flex justify-center">
              <XCircle size={64} className="text-red-600" />
            </div>
          )}
        </div>

        {/* Title */}
        <h1 className="text-3xl font-serif text-primary-900 mb-4">
          {status === "loading" && "Verifying Email..."}
          {status === "success" && "Email Verified!"}
          {status === "error" && "Verification Failed"}
        </h1>

        {/* Message */}
        <p className="text-primary-600 mb-8">{message}</p>

        {/* Actions */}
        <div className="space-y-3">
          {status === "success" && (
            <>
              <Button
                onClick={() => router.push("/account")}
                className="w-full"
              >
                Go to My Account
              </Button>
              <Button
                variant="secondary"
                onClick={() => router.push("/")}
                className="w-full"
              >
                Continue Shopping
              </Button>
            </>
          )}
          {status === "error" && (
            <>
              <Button
                onClick={() => router.push("/account")}
                className="w-full"
              >
                Go to My Account
              </Button>
              <Button
                variant="secondary"
                onClick={() => router.push("/")}
                className="w-full"
              >
                Back to Home
              </Button>
            </>
          )}
        </div>

        {/* Additional Help */}
        {status === "error" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-6 p-4 bg-primary-50 rounded-lg text-sm text-primary-700"
          >
            <p className="font-medium mb-2">Need help?</p>
            <p>
              If your verification link has expired, you can request a new one
              from your account page.
            </p>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}


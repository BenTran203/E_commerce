"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";
import { motion } from "framer-motion";
import { User, Mail, Phone, Calendar, Edit2, Save, X, Send } from "lucide-react";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import { authAPI } from "@/lib/api";

export default function ProfilePage() {
  const { user, isLoading, refreshUser } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [isSendingVerification, setIsSendingVerification] = useState(false);
  const [verificationMessage, setVerificationMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);
  const [formData, setFormData] = useState({
    firstName: user?.firstName || "",
    lastName: user?.lastName || "",
    phone: user?.phone || "",
    avatar: user?.avatar || "",
  });

  // Refresh user data when component mounts to get latest verification status
  useEffect(() => {
    if (user) {
      refreshUser();
    }
  }, []); // Only run on mount

  const handleInputChange = (field: string) => (value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = async () => {
    // TODO: Call API to update profile
    console.log("Saving profile:", formData);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setFormData({
      firstName: user?.firstName || "",
      lastName: user?.lastName || "",
      phone: user?.phone || "",
      avatar: user?.avatar || "",
    });
    setIsEditing(false);
  };

  const handleResendVerification = async () => {
    setIsSendingVerification(true);
    setVerificationMessage(null);

    try {
      await authAPI.resendVerification();
      setVerificationMessage({
        type: "success",
        text: "Verification email sent! Please check your inbox.",
      });
      // Refresh user data after sending
      await refreshUser();
    } catch (error: any) {
      setVerificationMessage({
        type: "error",
        text: error.message || "Failed to send verification email",
      });
    } finally {
      setIsSendingVerification(false);
      // Clear message after 5 seconds
      setTimeout(() => setVerificationMessage(null), 5000);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-luxury-cream flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-900"></div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-luxury-cream flex items-center justify-center">
        <p className="text-primary-600">Please log in to view your profile.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-luxury-cream py-12">
      <div className="container-luxury max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-xl shadow-sm p-8"
        >
          {/* Header */}
          <div className="flex justify-between items-start mb-8">
            <div>
              <h1 className="text-3xl font-serif text-primary-900 mb-2">
                My Profile
              </h1>
              <p className="text-primary-600">
                Manage your personal information
              </p>
            </div>
            {!isEditing ? (
              <Button
                variant="secondary"
                onClick={() => setIsEditing(true)}
                className="flex items-center gap-2"
              >
                <Edit2 size={18} />
                Edit Profile
              </Button>
            ) : (
              <div className="flex gap-2">
                <Button
                  variant="secondary"
                  onClick={handleCancel}
                  className="flex items-center gap-2"
                >
                  <X size={18} />
                  Cancel
                </Button>
                <Button
                  onClick={handleSave}
                  className="flex items-center gap-2"
                >
                  <Save size={18} />
                  Save Changes
                </Button>
              </div>
            )}
          </div>

          {/* Avatar */}
          <div className="flex items-center gap-6 mb-8 pb-8 border-b border-primary-200">
            <div className="relative">
              {user.avatar ? (
                <img
                  src={user.avatar}
                  alt={`${user.firstName} ${user.lastName}`}
                  className="w-24 h-24 rounded-full object-cover"
                />
              ) : (
                <div className="w-24 h-24 rounded-full bg-primary-900 text-white flex items-center justify-center text-3xl font-serif">
                  {user.firstName[0]}
                  {user.lastName[0]}
                </div>
              )}
              {isEditing && (
                <button className="absolute bottom-0 right-0 bg-primary-900 text-white p-2 rounded-full hover:bg-primary-800 transition-colors">
                  <Edit2 size={16} />
                </button>
              )}
            </div>
            <div>
              <h2 className="text-2xl font-serif text-primary-900 mb-1">
                {user.firstName} {user.lastName}
              </h2>
              <p className="text-primary-600">{user.email}</p>
              <span className="inline-block mt-2 px-3 py-1 bg-primary-100 text-primary-900 text-sm rounded-full">
                {user.role}
              </span>
            </div>
          </div>

          {/* Profile Information */}
          <div className="space-y-6">
            <h3 className="text-xl font-serif text-primary-900 mb-4">
              Personal Information
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="block text-sm font-medium text-primary-700">
                  <User size={16} className="inline mr-2" />
                  First Name
                </label>
                {isEditing ? (
                  <Input
                    value={formData.firstName}
                    onChange={handleInputChange("firstName")}
                  />
                ) : (
                  <p className="text-primary-900 py-2 px-3 bg-primary-50 rounded">
                    {user.firstName}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-primary-700">
                  <User size={16} className="inline mr-2" />
                  Last Name
                </label>
                {isEditing ? (
                  <Input
                    value={formData.lastName}
                    onChange={handleInputChange("lastName")}
                  />
                ) : (
                  <p className="text-primary-900 py-2 px-3 bg-primary-50 rounded">
                    {user.lastName}
                  </p>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-primary-700">
                <Mail size={16} className="inline mr-2" />
                Email Address
              </label>
              <div className="flex items-center gap-2">
                <p className="flex-1 text-primary-900 py-2 px-3 bg-primary-50 rounded">
                  {user.email}
                  {user.isEmailVerified ? (
                    <span className="ml-2 text-green-600 text-sm">
                      ✓ Verified
                    </span>
                  ) : (
                    <span className="ml-2 text-yellow-600 text-sm">
                      ⚠ Not verified
                    </span>
                  )}
                </p>
                {!user.isEmailVerified && (
                  <Button
                    variant="secondary"
                    onClick={handleResendVerification}
                    disabled={isSendingVerification}
                    className="flex items-center gap-2 whitespace-nowrap"
                  >
                    <Send size={16} />
                    {isSendingVerification ? "Sending..." : "Verify Email"}
                  </Button>
                )}
              </div>
              {verificationMessage && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`mt-2 p-2 rounded text-sm ${
                    verificationMessage.type === "success"
                      ? "bg-green-100 text-green-800"
                      : "bg-red-100 text-red-800"
                  }`}
                >
                  {verificationMessage.text}
                </motion.div>
              )}
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-primary-700">
                <Phone size={16} className="inline mr-2" />
                Phone Number
              </label>
              {isEditing ? (
                <Input
                  value={formData.phone}
                  onChange={handleInputChange("phone")}
                  placeholder="Enter phone number"
                />
              ) : (
                <p className="text-primary-900 py-2 px-3 bg-primary-50 rounded">
                  {user.phone || "Not provided"}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-primary-700">
                <Calendar size={16} className="inline mr-2" />
                Member Since
              </label>
              <p className="text-primary-900 py-2 px-3 bg-primary-50 rounded">
                {new Date(user.createdAt).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

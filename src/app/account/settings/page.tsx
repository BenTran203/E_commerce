"use client";

import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { motion } from "framer-motion";
import { Lock, Bell, Mail, Shield, Eye, EyeOff } from "lucide-react";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";

export default function SettingsPage() {
  const { user, isLoading } = useAuth();
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [notifications, setNotifications] = useState({
    orderUpdates: true,
    promotions: true,
    newsletter: false,
    productUpdates: true,
  });

  const handlePasswordChange = (field: string) => (value: string) => {
    setPasswordForm((prev) => ({ ...prev, [field]: value }));
  };

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      alert("Passwords do not match");
      return;
    }
    // TODO: Call API to change password
    console.log("Changing password...");
  };

  const handleNotificationToggle = (key: string) => {
    setNotifications((prev) => ({
      ...prev,
      [key]: !prev[key as keyof typeof prev],
    }));
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
        <p className="text-primary-600">Please log in to access settings.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-luxury-cream py-12">
      <div className="container-luxury max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-serif text-primary-900 mb-2">
              Account Settings
            </h1>
            <p className="text-primary-600">
              Manage your security and preferences
            </p>
          </div>

          <div className="space-y-6">
            {/* Security Section */}
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-primary-100 rounded-lg">
                  <Lock size={24} className="text-primary-900" />
                </div>
                <div>
                  <h2 className="text-xl font-serif text-primary-900">
                    Security
                  </h2>
                  <p className="text-sm text-primary-600">
                    Update your password
                  </p>
                </div>
              </div>

              <form onSubmit={handlePasswordSubmit} className="space-y-4">
                <div className="relative">
                  <Input
                    label="Current Password"
                    type={showCurrentPassword ? "text" : "password"}
                    value={passwordForm.currentPassword}
                    onChange={handlePasswordChange("currentPassword")}
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                    className="absolute right-3 top-9 text-primary-600 hover:text-primary-900"
                  >
                    {showCurrentPassword ? (
                      <EyeOff size={20} />
                    ) : (
                      <Eye size={20} />
                    )}
                  </button>
                </div>

                <div className="relative">
                  <Input
                    label="New Password"
                    type={showNewPassword ? "text" : "password"}
                    value={passwordForm.newPassword}
                    onChange={handlePasswordChange("newPassword")}
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowNewPassword(!showNewPassword)}
                    className="absolute right-3 top-9 text-primary-600 hover:text-primary-900"
                  >
                    {showNewPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>

                <Input
                  label="Confirm New Password"
                  type="password"
                  value={passwordForm.confirmPassword}
                  onChange={handlePasswordChange("confirmPassword")}
                  required
                />

                <div className="pt-2">
                  <Button type="submit">Update Password</Button>
                </div>
              </form>
            </div>

            {/* Email Preferences */}
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-primary-100 rounded-lg">
                  <Mail size={24} className="text-primary-900" />
                </div>
                <div>
                  <h2 className="text-xl font-serif text-primary-900">
                    Email Preferences
                  </h2>
                  <p className="text-sm text-primary-600">
                    Choose what emails you receive
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between py-3 border-b border-primary-200">
                  <div>
                    <p className="font-medium text-primary-900">
                      Order Updates
                    </p>
                    <p className="text-sm text-primary-600">
                      Shipping, delivery, and order status notifications
                    </p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={notifications.orderUpdates}
                      onChange={() => handleNotificationToggle("orderUpdates")}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-900"></div>
                  </label>
                </div>

                <div className="flex items-center justify-between py-3 border-b border-primary-200">
                  <div>
                    <p className="font-medium text-primary-900">Promotions</p>
                    <p className="text-sm text-primary-600">
                      Special offers, discounts, and sales
                    </p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={notifications.promotions}
                      onChange={() => handleNotificationToggle("promotions")}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-900"></div>
                  </label>
                </div>

                <div className="flex items-center justify-between py-3 border-b border-primary-200">
                  <div>
                    <p className="font-medium text-primary-900">Newsletter</p>
                    <p className="text-sm text-primary-600">
                      Weekly style tips and fashion trends
                    </p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={notifications.newsletter}
                      onChange={() => handleNotificationToggle("newsletter")}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-900"></div>
                  </label>
                </div>

                <div className="flex items-center justify-between py-3">
                  <div>
                    <p className="font-medium text-primary-900">
                      Product Updates
                    </p>
                    <p className="text-sm text-primary-600">
                      New arrivals and restocked items
                    </p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={notifications.productUpdates}
                      onChange={() =>
                        handleNotificationToggle("productUpdates")
                      }
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-900"></div>
                  </label>
                </div>
              </div>
            </div>

            {/* Privacy Section */}
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-primary-100 rounded-lg">
                  <Shield size={24} className="text-primary-900" />
                </div>
                <div>
                  <h2 className="text-xl font-serif text-primary-900">
                    Privacy & Data
                  </h2>
                  <p className="text-sm text-primary-600">
                    Manage your data and privacy
                  </p>
                </div>
              </div>

              <div className="space-y-3">
                <Button variant="secondary" className="w-full justify-start">
                  Download My Data
                </Button>
                <Button
                  variant="secondary"
                  className="w-full justify-start text-red-600 hover:bg-red-50"
                >
                  Delete Account
                </Button>
              </div>
            </div>

            {/* Account Status */}
            <div className="bg-primary-50 rounded-xl p-6">
              <h3 className="font-semibold text-primary-900 mb-3">
                Account Status
              </h3>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-primary-600">Account Type</p>
                  <p className="font-semibold text-primary-900">{user.role}</p>
                </div>
                <div>
                  <p className="text-primary-600">Email Status</p>
                  <p className="font-semibold text-primary-900">
                    {user.isEmailVerified ? "✓ Verified" : "⚠ Not Verified"}
                  </p>
                </div>
                <div>
                  <p className="text-primary-600">Member Since</p>
                  <p className="font-semibold text-primary-900">
                    {new Date(user.createdAt).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                    })}
                  </p>
                </div>
                <div>
                  <p className="text-primary-600">Account ID</p>
                  <p className="font-semibold text-primary-900 font-mono text-xs">
                    {user.id}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

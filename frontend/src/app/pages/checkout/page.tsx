"use client";

import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { ArrowLeft, CheckCircle, AlertCircle } from "lucide-react";
import { useCart } from "@/hooks/useCart";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import Link from "next/link";
import CheckoutWrapper from "@/components/checkout/CheckoutWrapper";
import StripePaymentForm from "@/components/checkout/StripePaymentForm";
import { ordersAPI, paymentsAPI } from "@/lib/api";
import toast from "react-hot-toast";

function CheckoutPageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { items, total, clearAllItems } = useCart();
  const [step, setStep] = useState<"details" | "payment" | "success">(
    "details",
  );
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Payment states
  const [orderId, setOrderId] = useState<string | null>(null);
  const [clientSecret, setClientSecret] = useState<string | null>(null);

  // Form states
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    country: "",
  });

  const shippingCost = total > 100 ? 0 : 10;
  const tax = total * 0.1;
  const finalTotal = total + shippingCost + tax;

  // Check authentication on mount
  useEffect(() => {
    const token = localStorage.getItem("auth_token");
    if (!token) {
      toast.error("Please login to continue with checkout");
      router.push("/auth/login?redirect=/pages/checkout");
      return;
    }
    setIsAuthenticated(true);
  }, [router]);

  // Check for payment success from redirect
  useEffect(() => {
    if (searchParams.get("success") === "true" && orderId) {
      handlePaymentSuccess();
    }
  }, [searchParams]);

  const handleInputChange = (field: string) => (value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleContinueToPayment = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // Check authentication before proceeding
    const token = localStorage.getItem("auth_token");
    if (!token) {
      setError("Please login to continue");
      toast.error("Please login to continue with checkout");
      router.push("/auth/login?redirect=/pages/checkout");
      return;
    }

    // Validate shipping details
    if (
      !formData.firstName ||
      !formData.lastName ||
      !formData.email ||
      !formData.address ||
      !formData.country
    ) {
      setError("Please fill in all required fields including country");
      toast.error("Please fill in all required fields including country");
      return;
    }

    setIsLoading(true);

    try {
      // Step 1: Create addresses
      // Note: Backend expects address1 field, not street
      const addressData = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        address1: formData.address, // Changed from 'street' to 'address1'
        city: formData.city,
        state: formData.state,
        postalCode: formData.zipCode,
        country: formData.country,
        phone: formData.phone,
        isDefault: false,
      };

      // For simplicity, using the same address for shipping and billing
      // In production, you might want separate address forms
      const shippingAddressResponse = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001"}/api/users/addresses`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(addressData),
        },
      );

      if (!shippingAddressResponse.ok) {
        const errorData = await shippingAddressResponse
          .json()
          .catch(() => ({}));
        if (shippingAddressResponse.status === 401) {
          toast.error("Session expired. Please login again.");
          localStorage.removeItem("auth_token");
          router.push("/auth/login?redirect=/pages/checkout");
          return;
        }
        throw new Error(errorData.message || "Failed to create address");
      }

      const shippingAddressResult = await shippingAddressResponse.json();
      const shippingAddressId = shippingAddressResult.data.address.id;
      const billingAddressId = shippingAddressId; // Using same address

      // Step 2: Create order
      const orderData = {
        items: items.map((item) => ({
          productId: item.product.id,
          quantity: item.quantity,
          variantId: item.selectedVariant?.id || undefined,
        })),
        shippingAddressId,
        billingAddressId,
        paymentMethod: "CARD",
        customerNotes: "",
      };

      const order = await ordersAPI.create(orderData);
      setOrderId(order.id);

      // Step 3: Create payment intent
      const paymentIntent = await paymentsAPI.createIntent(order.id);
      setClientSecret(paymentIntent.clientSecret);

      // Move to payment step
      setStep("payment");
      toast.success("Order created! Please complete payment.");
    } catch (err: any) {
      console.error("Checkout error:", err);
      setError(err.message || "Failed to process order");
      toast.error(err.message || "Failed to process order");
    } finally {
      setIsLoading(false);
    }
  };

  const handlePaymentSuccess = async () => {
    try {
      // Confirm payment with backend
      if (orderId && clientSecret) {
        const paymentIntentId = clientSecret.split("_secret_")[0];
        await paymentsAPI.confirmPayment(paymentIntentId, orderId);
      }

      setStep("success");
      clearAllItems();
      toast.success("Payment successful!");
    } catch (err: any) {
      console.error("Payment confirmation error:", err);
      toast.error("Payment processed but confirmation failed");
      setStep("success"); // Still show success since payment went through
      clearAllItems();
    }
  };

  const handlePaymentError = (errorMessage: string) => {
    setError(errorMessage);
    toast.error(errorMessage);
  };

  // Show loading while checking authentication
  if (!isAuthenticated && step !== "success") {
    return (
      <div className="min-h-screen bg-luxury-cream flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-900" />
      </div>
    );
  }

  if (items.length === 0 && step !== "success") {
    router.push("/pages/cart");
    return null;
  }

  if (step === "success") {
    return (
      <div className="min-h-screen bg-luxury-cream flex items-center justify-center py-16">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white rounded-2xl p-8 md:p-12 max-w-md text-center shadow-lg"
        >
          <CheckCircle size={80} className="text-green-500 mx-auto mb-6" />
          <h1 className="text-3xl font-serif text-primary-900 mb-4">
            Order Placed Successfully!
          </h1>
          <p className="text-primary-600 mb-8">
            Thank you for your purchase. You will receive a confirmation email
            shortly.
          </p>
          <div className="space-y-3">
            <Link href="/pages/shop">
              <Button className="w-full">Continue Shopping</Button>
            </Link>
            <Button
              onClick={() => router.push("/account/orders")}
              variant="secondary"
              className="w-full"
            >
              View Orders
            </Button>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-luxury-cream py-8">
      <div className="container-luxury max-w-6xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <button
            onClick={() =>
              step === "payment"
                ? setStep("details")
                : router.push("/pages/cart")
            }
            className="flex items-center gap-2 text-primary-600 hover:text-primary-900 mb-4 transition-colors"
          >
            <ArrowLeft size={20} />
            {step === "payment" ? "Back to Shipping" : "Back to Cart"}
          </button>
          <h1 className="text-3xl md:text-4xl font-serif text-primary-900">
            Checkout
          </h1>

          {/* Progress Steps */}
          <div className="flex items-center gap-4 mt-6">
            <div className="flex items-center gap-2">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  step === "details"
                    ? "bg-primary-900 text-white"
                    : "bg-green-500 text-white"
                }`}
              >
                {step === "details" ? "1" : "✓"}
              </div>
              <span className="text-sm font-medium">Shipping</span>
            </div>
            <div className="flex-1 h-0.5 bg-primary-200" />
            <div className="flex items-center gap-2">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  step === "payment"
                    ? "bg-primary-900 text-white"
                    : "bg-primary-200 text-primary-600"
                }`}
              >
                2
              </div>
              <span className="text-sm font-medium">Payment</span>
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3"
            >
              <AlertCircle
                className="text-red-500 flex-shrink-0 mt-0.5"
                size={20}
              />
              <div className="flex-1">
                <p className="text-sm text-red-800 font-medium">Error</p>
                <p className="text-sm text-red-600">{error}</p>
              </div>
            </motion.div>
          )}
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Form Section */}
          <div className="lg:col-span-2">
            {step === "details" ? (
              <motion.form
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                onSubmit={handleContinueToPayment}
                className="bg-white rounded-xl p-6 md:p-8 shadow-sm"
              >
                <h2 className="text-2xl font-serif text-primary-900 mb-6">
                  Shipping Information
                </h2>

                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Input
                      label="First Name"
                      value={formData.firstName}
                      onChange={handleInputChange("firstName")}
                      required
                    />
                    <Input
                      label="Last Name"
                      value={formData.lastName}
                      onChange={handleInputChange("lastName")}
                      required
                    />
                  </div>

                  <Input
                    label="Email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange("email")}
                    required
                  />

                  <Input
                    label="Phone Number"
                    type="tel"
                    value={formData.phone}
                    onChange={handleInputChange("phone")}
                  />

                  <Input
                    label="Address"
                    value={formData.address}
                    onChange={handleInputChange("address")}
                    required
                  />

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Input
                      label="City"
                      value={formData.city}
                      onChange={handleInputChange("city")}
                      required
                    />
                    <Input
                      label="State / Province"
                      value={formData.state}
                      onChange={handleInputChange("state")}
                      required
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Input
                      label="ZIP / Postal Code"
                      value={formData.zipCode}
                      onChange={handleInputChange("zipCode")}
                      required
                    />

                    {/* Country Selector */}
                    <div className="flex flex-col">
                      <label className="block text-sm font-medium text-primary-700 mb-2">
                        Country <span className="text-red-500">*</span>
                      </label>
                      <select
                        value={formData.country}
                        onChange={(e) =>
                          handleInputChange("country")(e.target.value)
                        }
                        required
                        className="w-full px-4 py-2 border border-primary-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white text-primary-900"
                      >
                        <option value="">Select Country</option>
                        <option value="US">United States</option>
                        <option value="CA">Canada</option>
                        <option value="GB">United Kingdom</option>
                        <option value="AU">Australia</option>
                        <option value="NZ">New Zealand</option>
                        <option value="DE">Germany</option>
                        <option value="FR">France</option>
                        <option value="IT">Italy</option>
                        <option value="ES">Spain</option>
                        <option value="NL">Netherlands</option>
                        <option value="BE">Belgium</option>
                        <option value="CH">Switzerland</option>
                        <option value="AT">Austria</option>
                        <option value="SE">Sweden</option>
                        <option value="NO">Norway</option>
                        <option value="DK">Denmark</option>
                        <option value="FI">Finland</option>
                        <option value="IE">Ireland</option>
                        <option value="PT">Portugal</option>
                        <option value="GR">Greece</option>
                        <option value="PL">Poland</option>
                        <option value="CZ">Czech Republic</option>
                        <option value="HU">Hungary</option>
                        <option value="RO">Romania</option>
                        <option value="BG">Bulgaria</option>
                        <option value="HR">Croatia</option>
                        <option value="SI">Slovenia</option>
                        <option value="SK">Slovakia</option>
                        <option value="LT">Lithuania</option>
                        <option value="LV">Latvia</option>
                        <option value="EE">Estonia</option>
                        <option value="JP">Japan</option>
                        <option value="KR">South Korea</option>
                        <option value="CN">China</option>
                        <option value="IN">India</option>
                        <option value="SG">Singapore</option>
                        <option value="MY">Malaysia</option>
                        <option value="TH">Thailand</option>
                        <option value="ID">Indonesia</option>
                        <option value="PH">Philippines</option>
                        <option value="VN">Vietnam</option>
                        <option value="AE">United Arab Emirates</option>
                        <option value="SA">Saudi Arabia</option>
                        <option value="IL">Israel</option>
                        <option value="TR">Turkey</option>
                        <option value="ZA">South Africa</option>
                        <option value="NG">Nigeria</option>
                        <option value="KE">Kenya</option>
                        <option value="EG">Egypt</option>
                        <option value="BR">Brazil</option>
                        <option value="MX">Mexico</option>
                        <option value="AR">Argentina</option>
                        <option value="CL">Chile</option>
                        <option value="CO">Colombia</option>
                        <option value="PE">Peru</option>
                      </select>
                    </div>
                  </div>
                </div>

                <Button
                  type="submit"
                  size="lg"
                  className="w-full mt-6"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2" />
                      Processing...
                    </>
                  ) : (
                    "Continue to Payment"
                  )}
                </Button>
              </motion.form>
            ) : (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
              >
                <CheckoutWrapper clientSecret={clientSecret}>
                  <StripePaymentForm
                    amount={finalTotal}
                    onSuccess={handlePaymentSuccess}
                    onError={handlePaymentError}
                  />
                </CheckoutWrapper>
              </motion.div>
            )}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-xl p-6 shadow-sm sticky top-24"
            >
              <h2 className="text-xl font-serif text-primary-900 mb-4">
                Order Summary
              </h2>

              {/* Items */}
              <div className="space-y-3 mb-4 max-h-64 overflow-y-auto">
                {items.map((item) => (
                  <div key={item.id} className="flex gap-3">
                    <img
                      src={item.product.images[0]?.url}
                      alt={item.product.name}
                      className="w-16 h-16 object-cover rounded"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-primary-900 truncate">
                        {item.product.name}
                      </p>
                      <p className="text-xs text-primary-600">
                        Qty: {item.quantity} {item.size && `• ${item.size}`}
                      </p>
                      <p className="text-sm font-semibold text-primary-900">
                        ${(item.product.price * item.quantity).toFixed(2)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Totals */}
              <div className="space-y-2 pt-4 border-t border-primary-200">
                <div className="flex justify-between text-primary-600">
                  <span>Subtotal</span>
                  <span>${total.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-primary-600">
                  <span>Shipping</span>
                  <span>
                    {shippingCost === 0
                      ? "FREE"
                      : `$${shippingCost.toFixed(2)}`}
                  </span>
                </div>
                <div className="flex justify-between text-primary-600">
                  <span>Tax</span>
                  <span>${tax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-lg font-bold text-primary-900 pt-2 border-t border-primary-200">
                  <span>Total</span>
                  <span>${finalTotal.toFixed(2)}</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function CheckoutPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    }>
      <CheckoutPageContent />
    </Suspense>
  );
}

"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import { motion } from "framer-motion";
import {
  Package,
  Truck,
  CheckCircle,
  XCircle,
  ArrowLeft,
  Download,
  MapPin,
  CreditCard,
  Calendar,
  AlertCircle,
} from "lucide-react";
import Link from "next/link";
import Button from "@/components/ui/Button";
import { ordersAPI } from "@/lib/api";
import toast from "react-hot-toast";

interface OrderItem {
  id: string;
  quantity: number;
  price: number;
  total: number;
  productName: string;
  productImage?: string;
  productSku?: string;
  product?: {
    id: string;
    name: string;
    slug: string;
    images?: Array<{ url: string; isPrimary: boolean }>;
  };
  variant?: {
    type: string;
    value: string;
  };
}

interface Order {
  id: string;
  orderNumber: string;
  status: string;
  paymentStatus: string;
  total: number;
  subtotal: number;
  shippingCost: number;
  tax: number;
  createdAt: string;
  updatedAt: string;
  items: OrderItem[];
  shippingAddress?: {
    firstName: string;
    lastName: string;
    address1: string;
    address2?: string;
    city: string;
    state: string;
    country: string;
    postalCode: string;
    phone?: string;
  };
  billingAddress?: {
    firstName: string;
    lastName: string;
    address1: string;
    address2?: string;
    city: string;
    state: string;
    country: string;
    postalCode: string;
    phone?: string;
  };
  trackingNumber?: string;
  shippedAt?: string;
  deliveredAt?: string;
  customerNotes?: string;
}

const statusConfig = {
  PENDING: {
    icon: Package,
    color: "text-yellow-600",
    bg: "bg-yellow-50 border-yellow-200",
    label: "Pending",
    description: "Your order is being processed",
  },
  CONFIRMED: {
    icon: CheckCircle,
    color: "text-blue-600",
    bg: "bg-blue-50 border-blue-200",
    label: "Confirmed",
    description: "Order confirmed and preparing",
  },
  PROCESSING: {
    icon: Package,
    color: "text-purple-600",
    bg: "bg-purple-50 border-purple-200",
    label: "Processing",
    description: "Your order is being prepared",
  },
  SHIPPED: {
    icon: Truck,
    color: "text-indigo-600",
    bg: "bg-indigo-50 border-indigo-200",
    label: "Shipped",
    description: "Your order is on the way",
  },
  DELIVERED: {
    icon: CheckCircle,
    color: "text-green-600",
    bg: "bg-green-50 border-green-200",
    label: "Delivered",
    description: "Order has been delivered",
  },
  CANCELLED: {
    icon: XCircle,
    color: "text-red-600",
    bg: "bg-red-50 border-red-200",
    label: "Cancelled",
    description: "Order has been cancelled",
  },
  REFUNDED: {
    icon: XCircle,
    color: "text-gray-600",
    bg: "bg-gray-50 border-gray-200",
    label: "Refunded",
    description: "Order has been refunded",
  },
};

export default function OrderDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const { user, isLoading: authLoading } = useAuth();
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!authLoading && user && params.id) {
      fetchOrder();
    }
  }, [authLoading, user, params.id]);

  const fetchOrder = async () => {
    try {
      setLoading(true);
      const orderData = await ordersAPI.getById(params.id as string);
      setOrder(orderData);
    } catch (error: any) {
      console.error("Error fetching order:", error);
      toast.error(error.message || "Failed to load order details");
      router.push("/account/orders");
    } finally {
      setLoading(false);
    }
  };

  const handleCancelOrder = async () => {
    if (!order) return;
    if (!confirm("Are you sure you want to cancel this order?")) {
      return;
    }

    try {
      await ordersAPI.cancel(order.id);
      toast.success("Order cancelled successfully");
      router.push("/account/orders");
    } catch (error: any) {
      toast.error(error.message || "Failed to cancel order");
    }
  };

  if (authLoading || loading) {
    return (
      <div className="min-h-screen bg-luxury-cream flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-900"></div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-luxury-cream flex items-center justify-center">
        <div className="text-center">
          <AlertCircle size={48} className="mx-auto text-primary-400 mb-4" />
          <p className="text-primary-600 mb-4">Please log in to view order details.</p>
          <Link href="/auth">
            <Button>Sign In</Button>
          </Link>
        </div>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="min-h-screen bg-luxury-cream flex items-center justify-center">
        <div className="text-center">
          <AlertCircle size={48} className="mx-auto text-primary-400 mb-4" />
          <p className="text-primary-600 mb-4">Order not found</p>
          <Link href="/account/orders">
            <Button>Back to Orders</Button>
          </Link>
        </div>
      </div>
    );
  }

  const statusConfigItem =
    statusConfig[order.status as keyof typeof statusConfig] ||
    statusConfig.PENDING;
  const StatusIcon = statusConfigItem.icon;

  return (
    <div className="min-h-screen bg-luxury-cream py-8 md:py-12">
      <div className="container-luxury max-w-5xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          {/* Back Button */}
          <Link
            href="/account/orders"
            className="inline-flex items-center gap-2 text-primary-600 hover:text-primary-900 mb-6 transition-colors"
          >
            <ArrowLeft size={20} />
            <span>Back to Orders</span>
          </Link>

          {/* Header */}
          <div className="bg-white rounded-xl shadow-sm border border-primary-100 p-6 mb-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <h1 className="text-2xl md:text-3xl font-serif text-primary-900 mb-2">
                  Order Details
                </h1>
                <p className="text-primary-600">{order.orderNumber}</p>
              </div>
              <div
                className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg border-2 ${statusConfigItem.bg} ${statusConfigItem.color}`}
              >
                <StatusIcon size={20} />
                <span className="font-semibold">{statusConfigItem.label}</span>
              </div>
            </div>
          </div>

          {/* Order Status Card */}
          <div
            className={`bg-white rounded-xl shadow-sm border-2 p-6 mb-6 ${statusConfigItem.bg} ${statusConfigItem.color}`}
          >
            <div className="flex items-start gap-4">
              <StatusIcon size={32} />
              <div className="flex-1">
                <h3 className="font-semibold text-lg mb-1">
                  {statusConfigItem.label}
                </h3>
                <p className="opacity-80 mb-3">{statusConfigItem.description}</p>
                {order.trackingNumber && (
                  <div className="mt-3 pt-3 border-t border-current border-opacity-20">
                    <p className="text-sm font-medium mb-1">Tracking Number:</p>
                    <p className="font-mono text-lg">{order.trackingNumber}</p>
                  </div>
                )}
                {order.shippedAt && (
                  <p className="text-sm mt-2">
                    Shipped on:{" "}
                    {new Date(order.shippedAt).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </p>
                )}
                {order.deliveredAt && (
                  <p className="text-sm mt-1">
                    Delivered on:{" "}
                    {new Date(order.deliveredAt).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Order Items */}
          <div className="bg-white rounded-xl shadow-sm border border-primary-100 p-6 mb-6">
            <h2 className="text-xl font-semibold text-primary-900 mb-4">
              Order Items ({order.items.length})
            </h2>
            <div className="space-y-4">
              {order.items.map((item) => {
                const imageUrl =
                  item.productImage ||
                  item.product?.images?.[0]?.url ||
                  "/placeholder-product.jpg";

                return (
                  <div
                    key={item.id}
                    className="flex gap-4 p-4 border border-primary-200 rounded-lg hover:bg-primary-50 transition-colors"
                  >
                    <Link
                      href={`/product/${item.product?.slug || item.product?.id}`}
                      className="flex-shrink-0"
                    >
                      <img
                        src={imageUrl}
                        alt={item.productName}
                        className="w-24 h-24 object-cover rounded border border-primary-200 hover:opacity-80 transition-opacity"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src =
                            "/placeholder-product.jpg";
                        }}
                      />
                    </Link>
                    <div className="flex-1">
                      <Link
                        href={`/product/${item.product?.slug || item.product?.id}`}
                        className="hover:text-primary-600 transition-colors"
                      >
                        <h3 className="font-semibold text-primary-900 mb-1">
                          {item.productName}
                        </h3>
                      </Link>
                      {item.variant && (
                        <p className="text-sm text-primary-600 mb-1">
                          {item.variant.type}: {item.variant.value}
                        </p>
                      )}
                      {item.productSku && (
                        <p className="text-xs text-primary-500 mb-2">
                          SKU: {item.productSku}
                        </p>
                      )}
                      <div className="flex items-center justify-between mt-2">
                        <span className="text-sm text-primary-600">
                          Quantity: {item.quantity} × ${item.price.toFixed(2)}
                        </span>
                        <span className="font-semibold text-lg text-primary-900">
                          ${item.total.toFixed(2)}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Order Information Grid */}
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            {/* Shipping Address */}
            {order.shippingAddress && (
              <div className="bg-white rounded-xl shadow-sm border border-primary-100 p-6">
                <h3 className="text-lg font-semibold text-primary-900 mb-4 flex items-center gap-2">
                  <MapPin size={20} />
                  Shipping Address
                </h3>
                <div className="text-primary-700 space-y-1">
                  <p className="font-medium">
                    {order.shippingAddress.firstName}{" "}
                    {order.shippingAddress.lastName}
                  </p>
                  <p>{order.shippingAddress.address1}</p>
                  {order.shippingAddress.address2 && (
                    <p>{order.shippingAddress.address2}</p>
                  )}
                  <p>
                    {order.shippingAddress.city}, {order.shippingAddress.state}{" "}
                    {order.shippingAddress.postalCode}
                  </p>
                  <p>{order.shippingAddress.country}</p>
                  {order.shippingAddress.phone && (
                    <p className="mt-2 pt-2 border-t border-primary-200">
                      Phone: {order.shippingAddress.phone}
                    </p>
                  )}
                </div>
              </div>
            )}

            {/* Billing Address */}
            {order.billingAddress && (
              <div className="bg-white rounded-xl shadow-sm border border-primary-100 p-6">
                <h3 className="text-lg font-semibold text-primary-900 mb-4 flex items-center gap-2">
                  <CreditCard size={20} />
                  Billing Address
                </h3>
                <div className="text-primary-700 space-y-1">
                  <p className="font-medium">
                    {order.billingAddress.firstName}{" "}
                    {order.billingAddress.lastName}
                  </p>
                  <p>{order.billingAddress.address1}</p>
                  {order.billingAddress.address2 && (
                    <p>{order.billingAddress.address2}</p>
                  )}
                  <p>
                    {order.billingAddress.city}, {order.billingAddress.state}{" "}
                    {order.billingAddress.postalCode}
                  </p>
                  <p>{order.billingAddress.country}</p>
                  {order.billingAddress.phone && (
                    <p className="mt-2 pt-2 border-t border-primary-200">
                      Phone: {order.billingAddress.phone}
                    </p>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Order Summary */}
          <div className="bg-white rounded-xl shadow-sm border border-primary-100 p-6 mb-6">
            <h3 className="text-lg font-semibold text-primary-900 mb-4 flex items-center gap-2">
              <CreditCard size={20} />
              Order Summary
            </h3>
            <div className="space-y-3">
              <div className="flex justify-between text-primary-700">
                <span>Subtotal:</span>
                <span className="font-medium">${order.subtotal.toFixed(2)}</span>
              </div>
              {order.shippingCost > 0 && (
                <div className="flex justify-between text-primary-700">
                  <span>Shipping:</span>
                  <span className="font-medium">
                    ${order.shippingCost.toFixed(2)}
                  </span>
                </div>
              )}
              {order.tax > 0 && (
                <div className="flex justify-between text-primary-700">
                  <span>Tax:</span>
                  <span className="font-medium">${order.tax.toFixed(2)}</span>
                </div>
              )}
              <div className="border-t border-primary-300 pt-3 mt-3 flex justify-between">
                <span className="font-semibold text-lg text-primary-900">
                  Total:
                </span>
                <span className="font-bold text-xl text-primary-900">
                  ${order.total.toFixed(2)}
                </span>
              </div>
              <div className="pt-3 border-t border-primary-200 flex items-center justify-between">
                <span className="text-primary-600">Payment Status:</span>
                <span
                  className={`font-semibold px-3 py-1 rounded-full ${
                    order.paymentStatus === "PAID"
                      ? "bg-green-100 text-green-700"
                      : order.paymentStatus === "PENDING"
                      ? "bg-yellow-100 text-yellow-700"
                      : "bg-red-100 text-red-700"
                  }`}
                >
                  {order.paymentStatus}
                </span>
              </div>
              <div className="pt-2 flex items-center gap-2 text-sm text-primary-600">
                <Calendar size={16} />
                <span>
                  Ordered on{" "}
                  {new Date(order.createdAt).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </span>
              </div>
            </div>
          </div>

          {/* Customer Notes */}
          {order.customerNotes && (
            <div className="bg-white rounded-xl shadow-sm border border-primary-100 p-6 mb-6">
              <h3 className="text-lg font-semibold text-primary-900 mb-3">
                Order Notes
              </h3>
              <p className="text-primary-600 bg-primary-50 p-4 rounded-lg">
                {order.customerNotes}
              </p>
            </div>
          )}

          {/* Actions */}
          <div className="bg-white rounded-xl shadow-sm border border-primary-100 p-6">
            <div className="flex flex-wrap gap-3">
              {order.status === "DELIVERED" && (
                <Button variant="secondary">Leave Review</Button>
              )}
              {["PENDING", "CONFIRMED"].includes(order.status) && (
                <Button
                  variant="secondary"
                  className="text-red-600 hover:bg-red-50"
                  onClick={handleCancelOrder}
                >
                  Cancel Order
                </Button>
              )}
              {order.trackingNumber && (
                <Button variant="secondary">Track Package</Button>
              )}
              <Button variant="secondary" className="ml-auto">
                <Download size={16} className="mr-2" />
                Download Invoice
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}


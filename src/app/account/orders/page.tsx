"use client";

import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { motion } from "framer-motion";
import { Package, Truck, CheckCircle, XCircle, Eye } from "lucide-react";
import Link from "next/link";
import Button from "@/components/ui/Button";

// Mock orders data - replace with real API call
const mockOrders = [
  {
    id: "1",
    orderNumber: "ORD-2024-001",
    date: "2024-01-15",
    status: "DELIVERED",
    total: 299.99,
    items: [
      {
        id: "1",
        name: "Classic White T-Shirt",
        quantity: 2,
        price: 49.99,
        image:
          "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=300",
      },
      {
        id: "2",
        name: "Denim Jeans",
        quantity: 1,
        price: 199.99,
        image:
          "https://images.unsplash.com/photo-1542272604-787c3835535d?w=300",
      },
    ],
  },
  {
    id: "2",
    orderNumber: "ORD-2024-002",
    date: "2024-01-20",
    status: "SHIPPED",
    total: 549.99,
    trackingNumber: "TRK123456789",
    items: [
      {
        id: "3",
        name: "Leather Jacket",
        quantity: 1,
        price: 549.99,
        image:
          "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=300",
      },
    ],
  },
  {
    id: "3",
    orderNumber: "ORD-2024-003",
    date: "2024-01-22",
    status: "PROCESSING",
    total: 129.99,
    items: [
      {
        id: "4",
        name: "Casual Sneakers",
        quantity: 1,
        price: 129.99,
        image:
          "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=300",
      },
    ],
  },
];

const statusConfig = {
  PENDING: {
    icon: Package,
    color: "text-yellow-600",
    bg: "bg-yellow-100",
    label: "Pending",
  },
  CONFIRMED: {
    icon: CheckCircle,
    color: "text-blue-600",
    bg: "bg-blue-100",
    label: "Confirmed",
  },
  PROCESSING: {
    icon: Package,
    color: "text-purple-600",
    bg: "bg-purple-100",
    label: "Processing",
  },
  SHIPPED: {
    icon: Truck,
    color: "text-indigo-600",
    bg: "bg-indigo-100",
    label: "Shipped",
  },
  DELIVERED: {
    icon: CheckCircle,
    color: "text-green-600",
    bg: "bg-green-100",
    label: "Delivered",
  },
  CANCELLED: {
    icon: XCircle,
    color: "text-red-600",
    bg: "bg-red-100",
    label: "Cancelled",
  },
};

export default function OrdersPage() {
  const { user, isLoading } = useAuth();
  const [selectedStatus, setSelectedStatus] = useState<string>("all");

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
        <p className="text-primary-600">Please log in to view your orders.</p>
      </div>
    );
  }

  const filteredOrders =
    selectedStatus === "all"
      ? mockOrders
      : mockOrders.filter((order) => order.status === selectedStatus);

  return (
    <div className="min-h-screen bg-luxury-cream py-12">
      <div className="container-luxury max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-serif text-primary-900 mb-2">
              My Orders
            </h1>
            <p className="text-primary-600">Track and manage your orders</p>
          </div>

          {/* Status Filter */}
          <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
            <button
              onClick={() => setSelectedStatus("all")}
              className={`px-4 py-2 rounded-lg whitespace-nowrap transition-colors ${
                selectedStatus === "all"
                  ? "bg-primary-900 text-white"
                  : "bg-white text-primary-600 hover:bg-primary-50"
              }`}
            >
              All Orders
            </button>
            {Object.entries(statusConfig).map(([status, config]) => (
              <button
                key={status}
                onClick={() => setSelectedStatus(status)}
                className={`px-4 py-2 rounded-lg whitespace-nowrap transition-colors flex items-center gap-2 ${
                  selectedStatus === status
                    ? `${config.bg} ${config.color}`
                    : "bg-white text-primary-600 hover:bg-primary-50"
                }`}
              >
                <config.icon size={16} />
                {config.label}
              </button>
            ))}
          </div>

          {/* Orders List */}
          <div className="space-y-4">
            {filteredOrders.length === 0 ? (
              <div className="bg-white rounded-xl p-12 text-center">
                <Package size={64} className="mx-auto text-primary-300 mb-4" />
                <h3 className="text-xl font-serif text-primary-900 mb-2">
                  No orders found
                </h3>
                <p className="text-primary-600 mb-6">
                  {selectedStatus === "all"
                    ? "You haven't placed any orders yet."
                    : `No ${statusConfig[selectedStatus as keyof typeof statusConfig]?.label.toLowerCase()} orders.`}
                </p>
                <Link href="/pages/shop">
                  <Button>Start Shopping</Button>
                </Link>
              </div>
            ) : (
              filteredOrders.map((order) => {
                const StatusIcon =
                  statusConfig[order.status as keyof typeof statusConfig].icon;
                const statusColor =
                  statusConfig[order.status as keyof typeof statusConfig].color;
                const statusBg =
                  statusConfig[order.status as keyof typeof statusConfig].bg;
                const statusLabel =
                  statusConfig[order.status as keyof typeof statusConfig].label;

                return (
                  <motion.div
                    key={order.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow"
                  >
                    {/* Order Header */}
                    <div className="flex justify-between items-start mb-4 pb-4 border-b border-primary-200">
                      <div>
                        <h3 className="text-lg font-semibold text-primary-900 mb-1">
                          {order.orderNumber}
                        </h3>
                        <p className="text-sm text-primary-600">
                          Placed on{" "}
                          {new Date(order.date).toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          })}
                        </p>
                        {order.trackingNumber && (
                          <p className="text-sm text-primary-600 mt-1">
                            Tracking:{" "}
                            <span className="font-mono">
                              {order.trackingNumber}
                            </span>
                          </p>
                        )}
                      </div>
                      <div className="text-right">
                        <div
                          className={`inline-flex items-center gap-2 px-3 py-1 rounded-full ${statusBg} ${statusColor} mb-2`}
                        >
                          <StatusIcon size={16} />
                          <span className="text-sm font-medium">
                            {statusLabel}
                          </span>
                        </div>
                        <p className="text-lg font-semibold text-primary-900">
                          ${order.total.toFixed(2)}
                        </p>
                      </div>
                    </div>

                    {/* Order Items */}
                    <div className="space-y-3 mb-4">
                      {order.items.map((item) => (
                        <div key={item.id} className="flex gap-4">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-20 h-20 object-cover rounded"
                          />
                          <div className="flex-1">
                            <h4 className="font-medium text-primary-900">
                              {item.name}
                            </h4>
                            <p className="text-sm text-primary-600">
                              Quantity: {item.quantity}
                            </p>
                            <p className="text-sm font-semibold text-primary-900">
                              ${item.price.toFixed(2)}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Actions */}
                    <div className="flex gap-3 pt-4 border-t border-primary-200">
                      <Link
                        href={`/account/orders/${order.id}`}
                        className="flex-1"
                      >
                        <Button
                          variant="secondary"
                          className="w-full flex items-center justify-center gap-2"
                        >
                          <Eye size={18} />
                          View Details
                        </Button>
                      </Link>
                      {order.status === "DELIVERED" && (
                        <Button variant="secondary" className="flex-1">
                          Leave Review
                        </Button>
                      )}
                      {["PENDING", "CONFIRMED"].includes(order.status) && (
                        <Button
                          variant="secondary"
                          className="flex-1 text-red-600 hover:bg-red-50"
                        >
                          Cancel Order
                        </Button>
                      )}
                    </div>
                  </motion.div>
                );
              })
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
}

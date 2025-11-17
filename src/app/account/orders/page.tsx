"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";
import { motion, AnimatePresence } from "framer-motion";
import {
  Package,
  Truck,
  CheckCircle,
  XCircle,
  Eye,
  Search,
  Calendar,
  DollarSign,
  MapPin,
  CreditCard,
  Download,
  RefreshCw,
  ChevronRight,
  AlertCircle,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
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

export default function OrdersPage() {
  const { user, isLoading: authLoading } = useAuth();
  const router = useRouter();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedStatus, setSelectedStatus] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    if (!authLoading && user) {
      fetchOrders();
    }
  }, [authLoading, user, selectedStatus, page]);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const params: any = {
        page: page.toString(),
        limit: "10",
      };

      if (selectedStatus !== "all") {
        params.status = selectedStatus;
      }

      const response = await ordersAPI.getAll(params);
      setOrders(response.orders || []);
      setTotalPages(response.pagination?.pages || 1);
    } catch (error) {
      console.error("Error fetching orders:", error);
      toast.error("Failed to load orders");
    } finally {
      setLoading(false);
    }
  };

  const handleCancelOrder = async (orderId: string) => {
    if (!confirm("Are you sure you want to cancel this order?")) {
      return;
    }

    try {
      await ordersAPI.cancel(orderId);
      toast.success("Order cancelled successfully");
      fetchOrders();
      setIsDetailsOpen(false);
    } catch (error: any) {
      toast.error(error.message || "Failed to cancel order");
    }
  };

  const filteredOrders = orders.filter((order) => {
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      return (
        order.orderNumber.toLowerCase().includes(query) ||
        order.items.some((item) =>
          item.productName.toLowerCase().includes(query)
        )
      );
    }
    return true;
  });

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
          <p className="text-primary-600 mb-4">Please log in to view your orders.</p>
          <Link href="/auth">
            <Button>Sign In</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-luxury-cream py-8 md:py-12">
      <div className="container-luxury max-w-7xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl md:text-4xl font-serif text-primary-900 mb-2">
              Order History
            </h1>
            <p className="text-primary-600">
              Track and manage all your orders in one place
            </p>
          </div>

          {/* Search Bar */}
          <div className="mb-6">
            <div className="relative max-w-md">
              <Search
                size={20}
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-primary-400"
              />
              <input
                type="text"
                placeholder="Search by order number or product name..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-primary-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white"
              />
            </div>
          </div>

          {/* Status Filter */}
          <div className="flex gap-2 mb-6 overflow-x-auto pb-2 scrollbar-hide">
            <button
              onClick={() => {
                setSelectedStatus("all");
                setPage(1);
              }}
              className={`px-4 py-2 rounded-lg whitespace-nowrap transition-all ${
                selectedStatus === "all"
                  ? "bg-primary-900 text-white shadow-md"
                  : "bg-white text-primary-600 hover:bg-primary-50 border border-primary-200"
              }`}
            >
              All Orders
            </button>
            {Object.entries(statusConfig).map(([status, config]) => (
              <button
                key={status}
                onClick={() => {
                  setSelectedStatus(status);
                  setPage(1);
                }}
                className={`px-4 py-2 rounded-lg whitespace-nowrap transition-all flex items-center gap-2 ${
                  selectedStatus === status
                    ? `${config.bg} ${config.color} border-2 shadow-md`
                    : "bg-white text-primary-600 hover:bg-primary-50 border border-primary-200"
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
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-white rounded-xl p-12 text-center shadow-sm"
              >
                <Package size={64} className="mx-auto text-primary-300 mb-4" />
                <h3 className="text-xl font-serif text-primary-900 mb-2">
                  {searchQuery ? "No orders found" : "No orders yet"}
                </h3>
                <p className="text-primary-600 mb-6">
                  {searchQuery
                    ? "Try adjusting your search terms"
                    : selectedStatus === "all"
                    ? "Start shopping to see your orders here"
                    : `You don't have any ${statusConfig[selectedStatus as keyof typeof statusConfig]?.label.toLowerCase()} orders`}
                </p>
                {!searchQuery && (
                  <Link href="/pages/shop">
                    <Button>Start Shopping</Button>
                  </Link>
                )}
              </motion.div>
            ) : (
              filteredOrders.map((order) => {
                const StatusIcon =
                  statusConfig[order.status as keyof typeof statusConfig]?.icon ||
                  Package;
                const statusConfigItem =
                  statusConfig[order.status as keyof typeof statusConfig] ||
                  statusConfig.PENDING;

                return (
                  <motion.div
                    key={order.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all border border-primary-100 overflow-hidden"
                  >
                    {/* Order Header */}
                    <div className="p-6 border-b border-primary-100">
                      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="text-lg font-semibold text-primary-900">
                              {order.orderNumber}
                            </h3>
                            <span
                              className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium border ${statusConfigItem.bg} ${statusConfigItem.color}`}
                            >
                              <StatusIcon size={14} />
                              {statusConfigItem.label}
                            </span>
                          </div>
                          <div className="flex flex-wrap items-center gap-4 text-sm text-primary-600">
                            <div className="flex items-center gap-1.5">
                              <Calendar size={14} />
                              <span>
                                {new Date(order.createdAt).toLocaleDateString(
                                  "en-US",
                                  {
                                    year: "numeric",
                                    month: "long",
                                    day: "numeric",
                                  }
                                )}
                              </span>
                            </div>
                            <div className="flex items-center gap-1.5">
                              <DollarSign size={14} />
                              <span className="font-semibold text-primary-900">
                                ${order.total.toFixed(2)}
                              </span>
                            </div>
                            {order.trackingNumber && (
                              <div className="flex items-center gap-1.5">
                                <Truck size={14} />
                                <span className="font-mono text-xs">
                                  {order.trackingNumber}
                                </span>
                              </div>
                            )}
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button
                            variant="secondary"
                            onClick={() => {
                              setSelectedOrder(order);
                              setIsDetailsOpen(true);
                            }}
                            className="flex items-center gap-2"
                          >
                            <Eye size={16} />
                            View Details
                          </Button>
                        </div>
                      </div>
                    </div>

                    {/* Order Items Preview */}
                    <div className="p-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {order.items.slice(0, 3).map((item) => {
                          const imageUrl =
                            item.productImage ||
                            item.product?.images?.[0]?.url ||
                            "/placeholder-product.jpg";

                          return (
                            <div
                              key={item.id}
                              className="flex gap-3 p-3 rounded-lg hover:bg-primary-50 transition-colors"
                            >
                              <img
                                src={imageUrl}
                                alt={item.productName}
                                className="w-16 h-16 object-cover rounded border border-primary-200"
                                onError={(e) => {
                                  (e.target as HTMLImageElement).src =
                                    "/placeholder-product.jpg";
                                }}
                              />
                              <div className="flex-1 min-w-0">
                                <h4 className="font-medium text-primary-900 text-sm truncate">
                                  {item.productName}
                                </h4>
                                {item.variant && (
                                  <p className="text-xs text-primary-500">
                                    {item.variant.value}
                                  </p>
                                )}
                                <p className="text-xs text-primary-600">
                                  Qty: {item.quantity}
                                </p>
                                <p className="text-sm font-semibold text-primary-900">
                                  ${item.total.toFixed(2)}
                                </p>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                      {order.items.length > 3 && (
                        <p className="text-sm text-primary-600 mt-4 text-center">
                          +{order.items.length - 3} more item
                          {order.items.length - 3 > 1 ? "s" : ""}
                        </p>
                      )}
                    </div>

                    {/* Actions */}
                    <div className="px-6 py-4 bg-primary-50 border-t border-primary-100 flex flex-wrap gap-2">
                      {order.status === "DELIVERED" && (
                        <Button variant="secondary" size="sm">
                          Leave Review
                        </Button>
                      )}
                      {["PENDING", "CONFIRMED"].includes(order.status) && (
                        <Button
                          variant="secondary"
                          size="sm"
                          className="text-red-600 hover:bg-red-50"
                          onClick={() => handleCancelOrder(order.id)}
                        >
                          Cancel Order
                        </Button>
                      )}
                      {order.trackingNumber && (
                        <Button variant="secondary" size="sm">
                          Track Package
                        </Button>
                      )}
                      <Button
                        variant="secondary"
                        size="sm"
                        onClick={() => {
                          setSelectedOrder(order);
                          setIsDetailsOpen(true);
                        }}
                        className="ml-auto"
                      >
                        View Full Details
                        <ChevronRight size={16} className="ml-1" />
                      </Button>
                    </div>
                  </motion.div>
                );
              })
            )}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center items-center gap-2 mt-8">
              <Button
                variant="secondary"
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page === 1}
              >
                Previous
              </Button>
              <span className="text-primary-600 px-4">
                Page {page} of {totalPages}
              </span>
              <Button
                variant="secondary"
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
              >
                Next
              </Button>
            </div>
          )}
        </motion.div>
      </div>

      {/* Order Details Modal */}
      <AnimatePresence>
        {isDetailsOpen && selectedOrder && (
          <OrderDetailsModal
            order={selectedOrder}
            onClose={() => {
              setIsDetailsOpen(false);
              setSelectedOrder(null);
            }}
            onCancel={handleCancelOrder}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

// Order Details Modal Component
function OrderDetailsModal({
  order,
  onClose,
  onCancel,
}: {
  order: Order;
  onClose: () => void;
  onCancel: (orderId: string) => void;
}) {
  const statusConfigItem =
    statusConfig[order.status as keyof typeof statusConfig] ||
    statusConfig.PENDING;
  const StatusIcon = statusConfigItem.icon;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        onClick={(e) => e.stopPropagation()}
        className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
      >
        {/* Modal Header */}
        <div className="sticky top-0 bg-white border-b border-primary-200 p-6 z-10">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-serif text-primary-900 mb-1">
                Order Details
              </h2>
              <p className="text-primary-600">{order.orderNumber}</p>
            </div>
            <button
              onClick={onClose}
              className="text-primary-400 hover:text-primary-600 transition-colors"
            >
              <XCircle size={24} />
            </button>
          </div>
        </div>

        {/* Modal Content */}
        <div className="p-6 space-y-6">
          {/* Order Status */}
          <div
            className={`p-4 rounded-lg border-2 ${statusConfigItem.bg} ${statusConfigItem.color}`}
          >
            <div className="flex items-center gap-3 mb-2">
              <StatusIcon size={24} />
              <div>
                <h3 className="font-semibold text-lg">{statusConfigItem.label}</h3>
                <p className="text-sm opacity-80">
                  {statusConfigItem.description}
                </p>
              </div>
            </div>
            {order.trackingNumber && (
              <div className="mt-3 pt-3 border-t border-current border-opacity-20">
                <p className="text-sm font-medium">Tracking Number:</p>
                <p className="font-mono text-lg">{order.trackingNumber}</p>
              </div>
            )}
          </div>

          {/* Order Items */}
          <div>
            <h3 className="text-lg font-semibold text-primary-900 mb-4">
              Order Items ({order.items.length})
            </h3>
            <div className="space-y-3">
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
                    <img
                      src={imageUrl}
                      alt={item.productName}
                      className="w-20 h-20 object-cover rounded border border-primary-200"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src =
                          "/placeholder-product.jpg";
                      }}
                    />
                    <div className="flex-1">
                      <h4 className="font-medium text-primary-900 mb-1">
                        {item.productName}
                      </h4>
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
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-primary-600">
                          Quantity: {item.quantity}
                        </span>
                        <span className="font-semibold text-primary-900">
                          ${item.total.toFixed(2)}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Order Summary */}
          <div className="grid md:grid-cols-2 gap-6">
            {/* Shipping Address */}
            {order.shippingAddress && (
              <div>
                <h3 className="text-lg font-semibold text-primary-900 mb-3 flex items-center gap-2">
                  <MapPin size={20} />
                  Shipping Address
                </h3>
                <div className="bg-primary-50 p-4 rounded-lg text-sm text-primary-700">
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
                    <p className="mt-2">Phone: {order.shippingAddress.phone}</p>
                  )}
                </div>
              </div>
            )}

            {/* Order Summary */}
            <div>
              <h3 className="text-lg font-semibold text-primary-900 mb-3 flex items-center gap-2">
                <CreditCard size={20} />
                Order Summary
              </h3>
              <div className="bg-primary-50 p-4 rounded-lg space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-primary-600">Subtotal:</span>
                  <span className="font-medium">${order.subtotal.toFixed(2)}</span>
                </div>
                {order.shippingCost > 0 && (
                  <div className="flex justify-between">
                    <span className="text-primary-600">Shipping:</span>
                    <span className="font-medium">
                      ${order.shippingCost.toFixed(2)}
                    </span>
                  </div>
                )}
                {order.tax > 0 && (
                  <div className="flex justify-between">
                    <span className="text-primary-600">Tax:</span>
                    <span className="font-medium">${order.tax.toFixed(2)}</span>
                  </div>
                )}
                <div className="border-t border-primary-300 pt-2 mt-2 flex justify-between">
                  <span className="font-semibold text-primary-900">Total:</span>
                  <span className="font-bold text-lg text-primary-900">
                    ${order.total.toFixed(2)}
                  </span>
                </div>
                <div className="pt-2 border-t border-primary-300">
                  <span className="text-primary-600">Payment Status: </span>
                  <span
                    className={`font-medium ${
                      order.paymentStatus === "PAID"
                        ? "text-green-600"
                        : "text-yellow-600"
                    }`}
                  >
                    {order.paymentStatus}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Customer Notes */}
          {order.customerNotes && (
            <div>
              <h3 className="text-lg font-semibold text-primary-900 mb-2">
                Order Notes
              </h3>
              <p className="text-primary-600 bg-primary-50 p-4 rounded-lg">
                {order.customerNotes}
              </p>
            </div>
          )}

          {/* Actions */}
          <div className="flex flex-wrap gap-3 pt-4 border-t border-primary-200">
            {order.status === "DELIVERED" && (
              <Button variant="secondary">Leave Review</Button>
            )}
            {["PENDING", "CONFIRMED"].includes(order.status) && (
              <Button
                variant="secondary"
                className="text-red-600 hover:bg-red-50"
                onClick={() => onCancel(order.id)}
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
    </motion.div>
  );
}

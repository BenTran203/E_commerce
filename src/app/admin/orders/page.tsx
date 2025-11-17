"use client";

import { useEffect, useState } from "react";
import { Eye, Download, Filter, Search } from "lucide-react";
import toast from "react-hot-toast";

/**
 * ORDERS MANAGEMENT PAGE
 * 
 * This page allows admins to:
 * 1. View all customer orders
 * 2. Track sales and revenue
 * 3. Update order status
 * 4. Filter orders by status
 * 5. Search orders
 * 
 * HOW IT WORKS:
 * - Fetches orders from backend API
 * - Displays in sortable table
 * - Shows order totals and status
 * - Allows status updates
 */

interface Order {
  id: string;
  orderNumber: string;
  user?: {
    firstName: string;
    lastName: string;
  };
  customerEmail: string;
  total: number;
  status: string;
  paymentStatus: string;
  createdAt: string;
  items: { quantity: number }[];
}

export default function OrdersPage() {
  // STATE MANAGEMENT
  // Store all orders from backend
  const [orders, setOrders] = useState<Order[]>([]);
  
  // Track loading state for spinner
  const [loading, setLoading] = useState(true);
  
  // Search query for filtering by order number or email
  const [searchQuery, setSearchQuery] = useState("");
  
  // Filter by order status (all, pending, delivered, etc.)
  const [statusFilter, setStatusFilter] = useState("all");

  // LIFECYCLE: Fetch orders when page loads
  useEffect(() => {
    fetchOrders();
  }, []);

  /**
   * FETCH ORDERS FROM BACKEND
   * Gets all orders to display in the table
   * 
   * Called when: Page loads or after updating an order
   */
  const fetchOrders = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      
      // Get orders from API
      // Note: For admin, ideally use /orders/all endpoint
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001/api"}/orders`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();
      
      if (data.status === "success") {
        setOrders(data.data.orders || []);
      }
    } catch (error) {
      console.error("Error fetching orders:", error);
      toast.error("Failed to load orders");
    } finally {
      setLoading(false);
    }
  };

  /**
   * UPDATE ORDER STATUS
   * Changes order status (e.g., PENDING → SHIPPED → DELIVERED)
   * 
   * @param orderId - The order to update
   * @param newStatus - New status value from dropdown
   * 
   * Called when: Admin selects new status from dropdown
   */
  const handleStatusChange = async (orderId: string, newStatus: string) => {
    try {
      const token = localStorage.getItem("token");
      
      // Send PUT request to update status
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001/api"}/orders/${orderId}/status`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ status: newStatus }),
        }
      );

      if (response.ok) {
        toast.success("Order status updated");
        fetchOrders(); // Refresh the list
      } else {
        toast.error("Failed to update status");
      }
    } catch (error) {
      console.error("Error updating order:", error);
      toast.error("Error updating order");
    }
  };

  /**
   * FILTER ORDERS
   * Filters orders based on search query and status filter
   * Recalculates automatically when orders, searchQuery, or statusFilter changes
   */
  const filteredOrders = orders.filter((order) => {
    // CHECK 1: Does order match search query?
    const matchesSearch =
      order.orderNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.customerEmail.toLowerCase().includes(searchQuery.toLowerCase());

    // CHECK 2: Does order match status filter?
    const matchesFilter = statusFilter === "all" || order.status === statusFilter;

    // Must match both conditions
    return matchesSearch && matchesFilter;
  });

  // CALCULATE STATISTICS from filtered orders
  const totalRevenue = filteredOrders.reduce((sum, order) => sum + order.total, 0);
  const totalOrders = filteredOrders.length;

  /**
   * GET STATUS COLOR
   * Returns Tailwind classes for status badge styling
   */
  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      PENDING: "bg-yellow-100 text-yellow-800",
      CONFIRMED: "bg-blue-100 text-blue-800",
      PROCESSING: "bg-purple-100 text-purple-800",
      SHIPPED: "bg-indigo-100 text-indigo-800",
      DELIVERED: "bg-green-100 text-green-800",
      CANCELLED: "bg-red-100 text-red-800",
    };
    return colors[status] || "bg-gray-100 text-gray-800";
  };

  /**
   * GET PAYMENT STATUS COLOR
   * Returns color classes for payment status text
   */
  const getPaymentStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      PENDING: "text-yellow-600",
      PAID: "text-green-600",
      FAILED: "text-red-600",
      REFUNDED: "text-gray-600",
    };
    return colors[status] || "text-gray-600";
  };

  return (
    <div>
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Orders</h1>
        <p className="text-gray-600 mt-2">
          Manage and track all customer orders
        </p>
      </div>

      {/* STATISTICS CARDS */}
      {/* Shows key metrics calculated from filtered orders */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        {/* Total number of orders */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-sm font-medium text-gray-600 mb-2">Total Orders</h3>
          <p className="text-3xl font-bold text-gray-900">{totalOrders}</p>
        </div>
        
        {/* Sum of all order totals */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-sm font-medium text-gray-600 mb-2">Total Revenue</h3>
          <p className="text-3xl font-bold text-green-600">
            ${totalRevenue.toFixed(2)}
          </p>
        </div>
        
        {/* Average order value (revenue ÷ orders) */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-sm font-medium text-gray-600 mb-2">Average Order</h3>
          <p className="text-3xl font-bold text-blue-600">
            ${totalOrders > 0 ? (totalRevenue / totalOrders).toFixed(2) : "0.00"}
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow mb-6 p-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Search */}
          <div className="relative">
            <Search
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              size={20}
            />
            <input
              type="text"
              placeholder="Search orders..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Status Filter */}
          <div className="relative">
            <Filter
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              size={20}
            />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none"
            >
              <option value="all">All Status</option>
              <option value="PENDING">Pending</option>
              <option value="CONFIRMED">Confirmed</option>
              <option value="PROCESSING">Processing</option>
              <option value="SHIPPED">Shipped</option>
              <option value="DELIVERED">Delivered</option>
              <option value="CANCELLED">Cancelled</option>
            </select>
          </div>

          {/* Export */}
          <button className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors flex items-center justify-center gap-2 font-medium">
            <Download size={20} />
            Export
          </button>
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        {loading ? (
          <div className="flex items-center justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Order #
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Customer
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Items
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Total
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Payment
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredOrders.length === 0 ? (
                  <tr>
                    <td colSpan={8} className="px-6 py-12 text-center text-gray-500">
                      {searchQuery || statusFilter !== "all"
                        ? "No orders found matching your filters"
                        : "No orders yet"}
                    </td>
                  </tr>
                ) : (
                  filteredOrders.map((order) => (
                    <tr key={order.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-blue-600">
                        {order.orderNumber}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {order.user
                            ? `${order.user.firstName} ${order.user.lastName}`
                            : "Guest"}
                        </div>
                        <div className="text-sm text-gray-500">
                          {order.customerEmail}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {order.items?.length || 0} items
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        ${order.total.toFixed(2)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`text-sm font-medium ${getPaymentStatusColor(
                            order.paymentStatus
                          )}`}
                        >
                          {order.paymentStatus}
                        </span>
                      </td>
                      {/* STATUS DROPDOWN - Allows quick status updates */}
                      <td className="px-6 py-4 whitespace-nowrap">
                        <select
                          value={order.status}
                          onChange={(e) =>
                            handleStatusChange(order.id, e.target.value)
                          }
                          className={`text-xs font-medium rounded-full px-3 py-1 border-0 ${getStatusColor(
                            order.status
                          )}`}
                        >
                          <option value="PENDING">PENDING</option>
                          <option value="CONFIRMED">CONFIRMED</option>
                          <option value="PROCESSING">PROCESSING</option>
                          <option value="SHIPPED">SHIPPED</option>
                          <option value="DELIVERED">DELIVERED</option>
                          <option value="CANCELLED">CANCELLED</option>
                        </select>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {new Date(order.createdAt).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <button
                          onClick={() => {
                            // View order details
                            toast("Order details coming soon");
                          }}
                          className="text-blue-600 hover:text-blue-900"
                          title="View Details"
                        >
                          <Eye size={18} />
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

/**
 * HOW THIS PAGE WORKS:
 * 
 * 1. LOAD: Fetch all orders from backend
 * 2. DISPLAY: Show orders in table with stats
 * 3. FILTER: User can search or filter by status
 * 4. CALCULATE: Stats update based on filtered orders
 * 5. UPDATE: Admin can change order status via dropdown
 * 6. REFRESH: Table refreshes after status change
 * 
 * KEY FEATURES:
 * - Real-time statistics (revenue, average order)
 * - Search by order number or customer email
 * - Filter by order status
 * - Quick status updates via dropdown
 * - Color-coded status badges
 */

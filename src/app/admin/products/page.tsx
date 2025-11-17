"use client";

/**
 * SUMMARY OF HOW THIS PAGE WORKS:
 * 
 * 1. LOAD: Component loads → useEffect calls fetchProducts()
 * 2. FETCH: fetchProducts() gets data from backend API
 * 3. DISPLAY: Products shown in table
 * 4. FILTER: User types in search or selects filter
 * 5. UPDATE: filteredProducts automatically recalculates
 * 6. RE-RENDER: Table updates to show filtered results
 * 7. ACTIONS: User can view, edit, or delete products
 * 8. DELETE: handleDelete() removes product and refreshes list
 * 
 * KEY CONCEPTS:
 * - State (useState): Stores data that can change
 * - Effects (useEffect): Runs code when component loads
 * - Async/Await: Waits for API responses
 * - Filtering: Computed value that updates when dependencies change
 * - Conditional Rendering: Shows different UI based on state
 */


import { useEffect, useState } from "react";
import Link from "next/link";
import {
  Plus,
  Search,
  Edit,
  Trash2,
  Eye,
  Filter,
  Download,
} from "lucide-react";
import toast from "react-hot-toast";

interface Product {
  id: string;
  name: string;
  sku: string;
  price: number;
  stock: number;
  category: {
    name: string;
  };
  isActive: boolean;
  images: { url: string; isPrimary: boolean }[];
}

export default function ProductsPage() {
  // STATE MANAGEMENT
  // Store all products fetched from the backend
  const [products, setProducts] = useState<Product[]>([]);
  
  // Track loading state to show spinner while fetching data
  const [loading, setLoading] = useState(true);
  
  // Store the search query typed by user (for filtering products by name/SKU)
  const [searchQuery, setSearchQuery] = useState("");
  
  // Store the selected filter option (all, active, inactive, low-stock)
  const [filter, setFilter] = useState("all");

  // LIFECYCLE: Fetch products when component first loads
  useEffect(() => {
    fetchProducts();
  }, []);

  /**
   * FETCH PRODUCTS FROM BACKEND
   * 
   * This function:
   * 1. Gets the auth token from localStorage
   * 2. Makes a GET request to the backend API
   * 3. Updates the products state with the response
   * 4. Shows error message if request fails
   * 
   * Called when: Component loads, or after deleting a product
   */
  const fetchProducts = async () => {
    try {
      // Show loading spinner
      setLoading(true);
      
      // Get authentication token (required for API calls)
      const token = localStorage.getItem("token");
      
      // Make API request to get all products
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001/api"}/products`,
        {
          headers: {
            Authorization: `Bearer ${token}`, // Include token in request header
          },
        }
      );

      // Convert response to JSON
      const data = await response.json();
      
      // Check if request was successful
      if (data.status === "success") {
        // Update state with fetched products
        setProducts(data.data.products);
      } else {
        // Show error notification
        toast.error("Failed to fetch products");
      }
    } catch (error) {
      // Handle network errors or other exceptions
      console.error("Error fetching products:", error);
      toast.error("Error loading products");
    } finally {
      // Always hide loading spinner (whether success or error)
      setLoading(false);
    }
  };

  /**
   * DELETE PRODUCT
   * 
   * This function:
   * 1. Shows confirmation dialog
   * 2. Makes DELETE request to backend
   * 3. Refreshes the product list if successful
   * 
   * @param id - The product ID to delete
   * 
   * Called when: User clicks the trash icon on a product
   */
  const handleDelete = async (id: string) => {
    // Ask user to confirm deletion (prevents accidental deletions)
    if (!confirm("Are you sure you want to delete this product?")) {
      return; 
    }

    try {
      // Get auth token
      const token = localStorage.getItem("token");
      
      // Send DELETE request to backend API
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001/api"}/products/${id}`,
        {
          method: "DELETE", // HTTP method for deletion
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Check if deletion was successful
      if (response.ok) {
        // Show success message
        toast.success("Product deleted successfully");
        
        // Refresh the product list to remove deleted item
        fetchProducts();
      } else {
        // Show error if deletion failed
        toast.error("Failed to delete product");
      }
    } catch (error) {
      // Handle any errors during deletion
      console.error("Error deleting product:", error);
      toast.error("Error deleting product");
    }
  };

  /**
   * FILTER PRODUCTS
   * 
   * This computed value filters the products array based on:
   * 1. Search query (matches product name or SKU)
   * 2. Filter selection (all, active, inactive, low-stock)
   * 
   * Recalculates whenever: products, searchQuery, or filter changes

   */
  const filteredProducts = products.filter((product) => {
    // CHECK 1: Does product match the search query?
    const matchesSearch =
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.sku.toLowerCase().includes(searchQuery.toLowerCase());

    // CHECK 2: Does product match the selected filter?
    const matchesFilter =
      filter === "all" ||                           // Show all products
      (filter === "active" && product.isActive) ||   // Show only active
      (filter === "inactive" && !product.isActive) || // Show only inactive
      (filter === "low-stock" && product.stock < 10); // Show low stock (< 10)

    // Product must match BOTH conditions to be included
    return matchesSearch && matchesFilter;
  });

  return (
    <div>
      {/* Page Header */}
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Products</h1>
          <p className="text-gray-600 mt-2">
            Manage your product catalog
          </p>
        </div>
        <Link
          href="/admin/products/new"
          className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2 font-medium"
        >
          <Plus size={20} />
          Add Product
        </Link>
      </div>

      {/* SEARCH AND FILTER BAR */}
      <div className="bg-white rounded-lg shadow mb-6 p-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          
          {/* SEARCH INPUT */}
          <div className="relative">
            <Search
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              size={20}
            />
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* FILTER DROPDOWN */}
          <div className="relative">
            <Filter
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              size={20}
            />
            {/* When user selects an option, setFilter updates the filter state */}
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none"
            >
              <option value="all">All Products</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
              <option value="low-stock">Low Stock</option>
            </select>
          </div>

          {/* EXPORT BUTTON - (Future feature to export data to CSV/Excel) */}
          <button className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors flex items-center justify-center gap-2 font-medium">
            <Download size={20} />
            Export
          </button>
        </div>
      </div>

      {/* PRODUCTS TABLE */}
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
                    Product
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    SKU
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Category
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Price
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Stock
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
                {/* Show different message based on whether filters are active */}
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredProducts.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="px-6 py-12 text-center text-gray-500">
                      {searchQuery || filter !== "all"
                        ? "No products found matching your filters"
                        : "No products yet. Add your first product!"}
                    </td>
                  </tr>
                ) : (
                  /* Loop through filtered products and create a row for each */
                  filteredProducts.map((product) => (
                    <tr key={product.id} className="hover:bg-gray-50">
                      {/* PRODUCT COLUMN - Shows image and name */}
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          {/* Product thumbnail image */}
                          <div className="h-10 w-10 flex-shrink-0">
                            {/* Show product image if available, otherwise show placeholder */}
                            {product.images && product.images[0] ? (
                              <img
                                className="h-10 w-10 rounded object-cover"
                                src={product.images[0].url}
                                alt={product.name}
                              />
                            ) : (
                              <div className="h-10 w-10 rounded bg-gray-200 flex items-center justify-center">
                                <span className="text-gray-400 text-xs">No image</span>
                              </div>
                            )}
                          </div>
                          {/* Product name */}
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">
                              {product.name}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {product.sku}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {product.category?.name || "—"}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        ${product.price.toFixed(2)}
                      </td>
                      {/* STOCK COLUMN - Highlight low stock in red */}
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`text-sm ${
                            product.stock < 10
                              ? "text-red-600 font-medium" 
                              : "text-gray-900"
                          }`}
                        >
                          {product.stock}
                        </span>
                      </td>
                      
                      {/* STATUS COLUMN - Shows if product is active/inactive */}
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`px-2 py-1 text-xs font-medium rounded-full ${
                            product.isActive
                              ? "bg-green-100 text-green-800" 
                              : "bg-red-100 text-red-800"   
                          }`}
                        >
                          {product.isActive ? "Active" : "Inactive"}
                        </span>
                      </td>
                      {/* ACTIONS COLUMN - View, Edit, Delete buttons */}
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <div className="flex items-center justify-end gap-2">
                          <Link
                            href={`/product/${product.id}`}
                            target="_blank"
                            className="text-gray-600 hover:text-gray-900"
                            title="View"
                          >
                            <Eye size={18} />
                          </Link>
                          
                          <Link
                            href={`/admin/products/${product.id}/edit`}
                            className="text-blue-600 hover:text-blue-900"
                            title="Edit"
                          >
                            <Edit size={18} />
                          </Link>
                          
                          {/* DELETE button - Calls handleDelete function */}
                          <button
                            onClick={() => handleDelete(product.id)}
                            className="text-red-600 hover:text-red-900"
                            title="Delete"
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Shows how many products are displayed vs total */}
      <div className="mt-4 text-sm text-gray-600">
        Showing {filteredProducts.length} of {products.length} products
      </div>
    </div>
  );
}




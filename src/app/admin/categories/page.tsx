"use client";

import { useEffect, useState } from "react";
import { Plus, Edit, Trash2, FolderTree } from "lucide-react";
import toast from "react-hot-toast";

/**
 * CATEGORIES/COLLECTIONS MANAGEMENT PAGE
 * 
 * This page allows admins to:
 * 1. View all categories/collections
 * 2. Create new categories
 * 3. Edit existing categories
 * 4. Delete categories
 * 5. Organize product collections
 * 
 * HOW IT WORKS:
 * - Manages categories that products are assigned to
 * - Categories are what you call "collections" in your store
 * - Each product belongs to one category/collection
 */

interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string;
  isActive: boolean;
  _count?: {
    products: number;
  };
}

export default function CategoriesPage() {
  // STATE MANAGEMENT
  // Store all categories/collections from backend
  const [categories, setCategories] = useState<Category[]>([]);
  
  // Track loading state for spinner
  const [loading, setLoading] = useState(true);
  
  // Control modal visibility (for create/edit form)
  const [showModal, setShowModal] = useState(false);
  
  // Track which category is being edited (null = creating new)
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  
  // Store form input values
  const [formData, setFormData] = useState({
    name: "",
    description: "",
  });

  // LIFECYCLE: Fetch categories when page loads
  useEffect(() => {
    fetchCategories();
  }, []);

  /**
   * FETCH CATEGORIES FROM BACKEND
   * Gets all categories/collections to display
   * 
   * Called when: Page loads, after creating/updating/deleting a category
   */
  const fetchCategories = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      
      // Get categories from API
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001/api"}/categories`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();
      
      if (data.status === "success") {
        setCategories(data.data.categories);
      } else {
        toast.error("Failed to fetch categories");
      }
    } catch (error) {
      console.error("Error fetching categories:", error);
      toast.error("Error loading categories");
    } finally {
      setLoading(false);
    }
  };

  /**
   * OPEN CREATE/EDIT MODAL
   * 
   * @param category - If provided, opens edit mode with category data
   *                   If not provided, opens create mode with empty form
   * 
   * Called when: User clicks "Add Category" or "Edit" button
   */
  const handleOpenModal = (category?: Category) => {
    if (category) {
      // EDIT MODE: Load existing category data into form
      setEditingCategory(category);
      setFormData({
        name: category.name,
        description: category.description || "",
      });
    } else {
      // CREATE MODE: Clear form for new category
      setEditingCategory(null);
      setFormData({
        name: "",
        description: "",
      });
    }
    setShowModal(true);
  };

  /**
   * CLOSE MODAL AND RESET FORM
   * Clears all form data and editing state
   */
  const handleCloseModal = () => {
    setShowModal(false);
    setEditingCategory(null);
    setFormData({ name: "", description: "" });
  };

  /**
   * SUBMIT FORM (CREATE OR UPDATE)
   * Handles both creating new categories and updating existing ones
   * 
   * Called when: User submits the create/edit form
   */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // VALIDATION: Check if name is provided
    if (!formData.name.trim()) {
      toast.error("Category name is required");
      return;
    }

    try {
      const token = localStorage.getItem("token");
      
      // DETERMINE ACTION: Are we editing or creating?
      // If editingCategory exists, use PUT with category ID
      // If not, use POST to create new
      const url = editingCategory
        ? `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001/api"}/categories/${editingCategory.id}`
        : `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001/api"}/categories`;

      const response = await fetch(url, {
        method: editingCategory ? "PUT" : "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok && data.status === "success") {
        toast.success(
          editingCategory
            ? "Category updated successfully"
            : "Category created successfully"
        );
        handleCloseModal(); // Close modal
        fetchCategories(); // Refresh the list
      } else {
        toast.error(data.message || "Failed to save category");
      }
    } catch (error) {
      console.error("Error saving category:", error);
      toast.error("An error occurred");
    }
  };

  /**
   * DELETE CATEGORY
   * Removes a category from the database
   * 
   * @param id - The category ID to delete
   * 
   * Called when: User clicks delete button and confirms
   */
  const handleDelete = async (id: string) => {
    // CONFIRMATION: Ask user before deleting
    if (!confirm("Are you sure you want to delete this category?")) {
      return;
    }

    try {
      const token = localStorage.getItem("token");
      
      // Send DELETE request
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001/api"}/categories/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.ok) {
        toast.success("Category deleted successfully");
        fetchCategories(); // Refresh the list
      } else {
        toast.error("Failed to delete category");
      }
    } catch (error) {
      console.error("Error deleting category:", error);
      toast.error("Error deleting category");
    }
  };

  return (
    <div>
      {/* Page Header */}
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Categories & Collections</h1>
          <p className="text-gray-600 mt-2">
            Organize your products into collections
          </p>
        </div>
        <button
          onClick={() => handleOpenModal()}
          className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2 font-medium"
        >
          <Plus size={20} />
          Add Category
        </button>
      </div>

      {/* CATEGORIES GRID */}
      {/* Display all categories in a responsive grid */}
      {loading ? (
        <div className="flex items-center justify-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.length === 0 ? (
            <div className="col-span-full bg-white rounded-lg shadow p-12 text-center">
              <FolderTree className="mx-auto text-gray-400 mb-4" size={48} />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                No categories yet
              </h3>
              <p className="text-gray-600 mb-6">
                Create your first category to organize products
              </p>
              <button
                onClick={() => handleOpenModal()}
                className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors inline-flex items-center gap-2"
              >
                <Plus size={18} />
                Create Category
              </button>
            </div>
          ) : (
            categories.map((category) => (
              <div
                key={category.id}
                className="bg-white rounded-lg shadow hover:shadow-lg transition-shadow p-6"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">
                      {category.name}
                    </h3>
                    {category.description && (
                      <p className="text-sm text-gray-600 line-clamp-2">
                        {category.description}
                      </p>
                    )}
                  </div>
                  <div
                    className={`px-2 py-1 text-xs font-medium rounded-full ${
                      category.isActive
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {category.isActive ? "Active" : "Inactive"}
                  </div>
                </div>

                {/* CATEGORY ACTIONS */}
                <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                  {/* Shows how many products are in this category */}
                  <div className="text-sm text-gray-600">
                    <span className="font-medium">
                      {category._count?.products || 0}
                    </span>{" "}
                    products
                  </div>
                  
                  {/* Edit and Delete buttons */}
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleOpenModal(category)}
                      className="text-blue-600 hover:text-blue-900 p-1"
                      title="Edit"
                    >
                      <Edit size={18} />
                    </button>
                    <button
                      onClick={() => handleDelete(category.id)}
                      className="text-red-600 hover:text-red-900 p-1"
                      title="Delete"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {/* CREATE/EDIT MODAL */}
      {/* Modal for creating new or editing existing categories */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">
              {editingCategory ? "Edit Category" : "Add New Category"}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Category Name *
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, name: e.target.value }))
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="e.g., Winter Collection"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      description: e.target.value,
                    }))
                  }
                  rows={3}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Brief description of this collection"
                />
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="flex-1 bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium"
                >
                  {editingCategory ? "Update" : "Create"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}


"use client";

/**
 * ADD NEW PRODUCT PAGE
 *
 * This comprehensive form allows admins to:
 * 1. Add product basic info (name, description, SKU)
 * 2. Set pricing (regular price, sale price)
 * 3. Assign to collection/category
 * 4. Add color variants
 * 5. Manage inventory/stock
 * 6. Upload product images
 *
 * HOW IT WORKS:
 * - Form state management with React useState
 * - Fetches categories from backend
 * - Submits data to POST /api/products
 * - Handles image uploads
 * - Validates form data before submission
 */

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { Save, ArrowLeft, Upload, Plus, X, AlertCircle, ImageIcon } from "lucide-react";
import toast from "react-hot-toast";

interface Category {
  id: string;
  name: string;
}

interface ColorVariant {
  name: string;
  hex: string;
  stock: number;
}

interface ProductImage {
  url: string;
  alt: string;
}

// SECURITY: Sanitize user input to prevent XSS attacks
const sanitizeInput = (input: string): string => {
  return input
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#x27;")
    .replace(/\//g, "&#x2F;");
};

// SECURITY: Validate image URL to prevent malicious links
const isValidImageUrl = (url: string): boolean => {
  try {
    const urlObj = new URL(url);
    const validProtocols = ["http:", "https:"];
    const validExtensions = [".jpg", ".jpeg", ".png", ".gif", ".webp", ".svg"];
    
    if (!validProtocols.includes(urlObj.protocol)) {
      return false;
    }
    
    const hasValidExtension = validExtensions.some(ext => 
      urlObj.pathname.toLowerCase().endsWith(ext)
    );
    
    return hasValidExtension || urlObj.hostname.includes("unsplash.com") || 
           urlObj.hostname.includes("images.pexels.com");
  } catch {
    return false;
  }
};

// COMMON TAGS from existing products for quick selection
const SUGGESTED_TAGS = [
  "essential", "cotton", "basic", "casual", "puffer", "jacket", "winter", 
  "outerwear", "suit", "tailored", "formal", "business", "watch", "accessory", 
  "timeless", "luxury", "linen", "summer", "breathable", "cargo", "streetwear", 
  "urban", "utility", "leather", "bag", "messenger", "minimalist", "blazer", 
  "professional", "scarf", "wool", "cashmere", "dress shirt", "white", 
  "denim", "vintage", "dress", "floral", "feminine", "sneakers", "comfortable", 
  "pocket square", "silk", "socks", "bamboo", "eco-friendly", "thermal", 
  "base layer", "performance", "jeans", "high-waisted", "crossbody", "tech-wear"
];

// PREDEFINED COLLECTIONS - User can choose from these
const PREDEFINED_COLLECTIONS = [
  { id: "casual-everyday", name: "Casual Everyday" },
  { id: "formal-excellence", name: "Formal Excellence" },
  { id: "premium-accessories", name: "Premium Accessories" },
  { id: "winter-warmth", name: "Winter Warmth" },
  { id: "street-style-culture", name: "Street Style Culture" },
  { id: "summer-breeze", name: "Summer Breeze" },
];

export default function NewProductPage() {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);

  // STATE MANAGEMENT
  // Track loading state while submitting form
  const [loading, setLoading] = useState(false);

  // Store available categories/collections from backend
  const [categories, setCategories] = useState<Category[]>([]);

  // MAIN FORM DATA - Stores all product fields
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    shortDescription: "",
    sku: "",
    price: "",
    originalPrice: "",
    stock: "",
    categoryId: "",
    tags: "",
    isOnSale: false,
    isFeatured: false,
    isActive: true,
  });

  // COLOR VARIANTS - Store added color options with stock
  const [colorVariants, setColorVariants] = useState<ColorVariant[]>([]);
  const [newColor, setNewColor] = useState({
    name: "",
    hex: "#000000",
    stock: "",
  });

  // PRODUCT IMAGES - Store image URLs
  const [images, setImages] = useState<ProductImage[]>([]);
  const [newImageUrl, setNewImageUrl] = useState("");

  // LIFECYCLE: Fetch categories when component loads
  useEffect(() => {
    fetchCategories();
  }, []);

  /**
   * FETCH CATEGORIES
   * Gets list of available categories/collections from backend
   * Falls back to predefined collections if backend fails
   */
  const fetchCategories = async () => {
    try {
      const token = localStorage.getItem("auth_token");
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001/api"}/categories`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();
      if (data.status === "success" && data.data.categories && data.data.categories.length > 0) {
        setCategories(data.data.categories);
      } else {
        // Use predefined collections if backend returns empty
        setCategories(PREDEFINED_COLLECTIONS as any);
        console.log("Using predefined collections");
      }
    } catch (error) {
      console.error("Error fetching categories:", error);
      // Use predefined collections as fallback
      setCategories(PREDEFINED_COLLECTIONS as any);
      console.log("Using predefined collections");
    }
  };

  /**
   * HANDLE INPUT CHANGE
   * Updates formData when user types in any field
   * Handles both text inputs and checkboxes
   * SECURITY: Sanitizes text inputs
   */
  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;

    // SECURITY: Sanitize text inputs (except for descriptions which can have some HTML)
    let sanitizedValue = value;
    if (type === "text" && name !== "description" && name !== "shortDescription") {
      sanitizedValue = sanitizeInput(value);
    }

    // Update the specific field while keeping others unchanged
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : sanitizedValue,
    }));
  };

  /**
   * ADD SUGGESTED TAG
   * Quickly add a commonly used tag
   */
  const handleAddSuggestedTag = (tag: string) => {
    const currentTags = formData.tags ? formData.tags.split(",").map(t => t.trim()) : [];
    
    if (currentTags.includes(tag)) {
      toast.error("Tag already added");
      return;
    }
    
    const newTags = currentTags.length > 0 ? `${formData.tags}, ${tag}` : tag;
    setFormData(prev => ({ ...prev, tags: newTags }));
    toast.success(`Added tag: ${tag}`);
  };

  /**
   * ADD COLOR VARIANT
   * Adds a new color option to the product
   * Each color can have its own stock level
   */
  const handleAddColor = () => {
    // Validate color inputs
    if (!newColor.name || !newColor.stock) {
      toast.error("Please fill in color name and stock");
      return;
    }

    // Add color to the list
    setColorVariants((prev) => [
      ...prev,
      {
        name: newColor.name,
        hex: newColor.hex,
        stock: parseInt(newColor.stock),
      },
    ]);

    // Clear the input fields
    setNewColor({ name: "", hex: "#000000", stock: "" });
    toast.success("Color variant added");
  };

  /**
   * REMOVE COLOR VARIANT
   * Removes a color from the list
   */
  const handleRemoveColor = (index: number) => {
    setColorVariants((prev) => prev.filter((_, i) => i !== index));
  };

  /**
   * ADD PRODUCT IMAGE (FROM URL)
   * Adds an image URL to the product gallery
   * First image becomes the primary/main image
   * SECURITY: Validates URL before adding
   */
  const handleAddImage = () => {
    if (!newImageUrl) {
      toast.error("Please enter an image URL");
      return;
    }

    // SECURITY: Validate image URL
    if (!isValidImageUrl(newImageUrl)) {
      toast.error("Invalid image URL. Please use a valid image link (jpg, png, gif, webp)");
      return;
    }

    // Add image to array
    setImages((prev) => [
      ...prev,
      {
        url: newImageUrl,
        alt: sanitizeInput(formData.name || "Product image"),
      },
    ]);

    // Clear input field
    setNewImageUrl("");
    toast.success("Image added");
  };

  /**
   * HANDLE FILE UPLOAD (LOCAL IMAGES)
   * Allows users to upload images from their computer
   * SECURITY: Validates file type and size
   */
  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const file = files[0];

    // SECURITY: Validate file type
    const validTypes = ["image/jpeg", "image/jpg", "image/png", "image/gif", "image/webp"];
    if (!validTypes.includes(file.type)) {
      toast.error("Invalid file type. Please upload JPG, PNG, GIF, or WebP images only");
      return;
    }

    // SECURITY: Validate file size (max 5MB)
    const maxSize = 5 * 1024 * 1024; // 5MB
    if (file.size > maxSize) {
      toast.error("File too large. Maximum size is 5MB");
      return;
    }

    // Convert to base64 or upload to server
    const reader = new FileReader();
    reader.onload = () => {
      const imageUrl = reader.result as string;
      setImages((prev) => [
        ...prev,
        {
          url: imageUrl,
          alt: sanitizeInput(formData.name || file.name),
        },
      ]);
      toast.success("Image uploaded successfully");
    };
    reader.onerror = () => {
      toast.error("Failed to read image file");
    };
    reader.readAsDataURL(file);

    // Reset file input
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  /**
   * REMOVE IMAGE
   * Removes an image from the gallery
   */
  const handleRemoveImage = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  /**
   * VALIDATE FORM
   * Checks all required fields before submission
   * Shows error messages for missing/invalid data
   *
   * Returns: true if valid, false if invalid
   * 
   * PERFORMANCE NOTE:
   * This uses early returns (short-circuits), so it stops checking
   * as soon as it finds the first error. This is already very fast!
   * 
   * ALTERNATIVE APPROACH: Validation rules array (cleaner code)
   */
  const validateForm = () => {
    // Define validation rules - easier to maintain and extend
    const validationRules = [
      {
        condition: !formData.name.trim(),
        message: "Product name is required",
      },
      {
        condition: !formData.description.trim(),
        message: "Product description is required",
      },
      {
        condition: !formData.sku.trim(),
        message: "SKU is required",
      },
      {
        condition: !formData.price || parseFloat(formData.price) <= 0,
        message: "Valid price is required",
      },
      {
        condition: !formData.categoryId,
        message: "Please select a category/collection",
      },
      {
        condition: images.length === 0,
        message: "Please add at least one product image",
      },
    ];

    // Find first failed validation (stops at first error)
    const failedRule = validationRules.find((rule) => rule.condition);

    if (failedRule) {
      toast.error(failedRule.message);
      return false;
    }

    return true;
  };

  /**
   * SUBMIT FORM
   * Creates a new product in the database
   *
   * Process:
   * 1. Validate all fields
   * 2. Prepare product data (format colors, images, tags)
   * 3. Send POST request to backend
   * 4. Redirect to products list on success
   */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); 

    // Stop if validation fails
    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
      const token = localStorage.getItem("auth_token");
      const userStr = localStorage.getItem("user");

      // Check if user is authenticated
      if (!token) {
        toast.error("You must be logged in to create products");
        router.push("/auth/login?redirect=/admin/products/new");
        return;
      }

      // Get user data to determine vendor
      const user = userStr ? JSON.parse(userStr) : null;
      if (!user) {
        toast.error("User data not found. Please log in again.");
        router.push("/auth/login?redirect=/admin/products/new");
        return;
      }

      // PREPARE COLOR VARIANTS
      // Convert color data to backend format
      const variants = colorVariants.map((color) => ({
        name: color.name,
        value: color.name,
        type: "COLOR",
        stock: color.stock,
        isActive: true,
      }));

      // CHECK FOR VENDORS
      // For admin users, the backend will automatically use the first available vendor
      // We just need to check if ANY vendors exist in the system
      let vendorsAvailable = false;
      
      try {
        // Check if any vendors exist
        const vendorResponse = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001/api"}/vendors`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        
        const vendorData = await vendorResponse.json();
        
        if (vendorData.status === "success" && vendorData.data.vendors && vendorData.data.vendors.length > 0) {
          vendorsAvailable = true;
          console.log("Vendors available in system:", vendorData.data.vendors.length);
        } else {
          // No vendors in the system at all
          toast.error("No vendors found in the system. Please create a vendor account first or seed the database.");
          setLoading(false);
          return;
        }
      } catch (vendorError) {
        console.error("Error checking vendors:", vendorError);
        toast.error("Failed to check vendor availability");
        setLoading(false);
        return;
      }

      // BUILD PRODUCT DATA OBJECT
      // Convert form data to format expected by backend
      // Note: vendorId is NOT included - backend auto-assigns for admins
      const productData = {
        name: formData.name,
        description: formData.description,
        shortDescription:
          formData.shortDescription || formData.description.substring(0, 150),
        sku: formData.sku,
        price: parseFloat(formData.price),
        originalPrice: formData.originalPrice
          ? parseFloat(formData.originalPrice)
          : undefined,
        stock: formData.stock ? parseInt(formData.stock) : 0,
        categoryId: formData.categoryId,
        tags: formData.tags
          .split(",")
          .map((t) => t.trim())
          .filter(Boolean), // Split by comma
        isOnSale: formData.isOnSale,
        isFeatured: formData.isFeatured,
        isActive: formData.isActive,
        images: images,
        variants: variants.length > 0 ? variants : undefined,
      };

      // SEND TO BACKEND
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001/api"}/products`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(productData),
        }
      );

      const data = await response.json();

      // Handle response
      if (response.ok && data.status === "success") {
        toast.success("Product created successfully!");
        router.push("/admin/products"); // Go back to products list
      } else {
        // Handle 401 Unauthorized specifically
        if (response.status === 401) {
          toast.error("Session expired. Please log in again.");
          router.push("/auth/login?redirect=/admin/products/new");
        } else {
          toast.error(data.message || "Failed to create product");
        }
      }
    } catch (error) {
      console.error("Error creating product:", error);
      toast.error("An error occurred while creating the product");
    } finally {
      setLoading(false); // Always hide loading spinner
    }
  };

  return (
    <div>
      {/* PAGE HEADER */}
      <div className="mb-8 flex items-center justify-between">
        <div className="flex items-center gap-4">
          {/* Back button */}
          <button
            onClick={() => router.back()}
            className="text-gray-600 hover:text-gray-900"
          >
            <ArrowLeft size={24} />
          </button>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              Add New Product
            </h1>
            <p className="text-gray-600 mt-2">
              Create a new product listing for your store
            </p>
          </div>
        </div>
      </div>

      {/* FORM - Submits to handleSubmit */}
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Two-column layout: Main content (left) + Sidebar (right) */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* LEFT COLUMN - Main product details */}
          <div className="lg:col-span-2 space-y-6">
            {/* SECTION 1: Basic Information */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                Basic Information
              </h2>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Product Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="e.g., Classic Denim Jacket"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Description *
                  </label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    rows={5}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Detailed product description..."
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Short Description
                  </label>
                  <textarea
                    name="shortDescription"
                    value={formData.shortDescription}
                    onChange={handleInputChange}
                    rows={2}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Brief summary (optional)"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      SKU *
                    </label>
                    <input
                      type="text"
                      name="sku"
                      value={formData.sku}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="e.g., DJ-001"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Stock Quantity
                    </label>
                    <input
                      type="number"
                      name="stock"
                      value={formData.stock}
                      onChange={handleInputChange}
                      min="0"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="100"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* SECTION 2: Pricing */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                Pricing
              </h2>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Regular Price * ($)
                  </label>
                  <input
                    type="number"
                    name="price"
                    value={formData.price}
                    onChange={handleInputChange}
                    min="0"
                    step="0.01"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="99.99"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Original Price ($)
                  </label>
                  <input
                    type="number"
                    name="originalPrice"
                    value={formData.originalPrice}
                    onChange={handleInputChange}
                    min="0"
                    step="0.01"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="149.99 (for sale badge)"
                  />
                </div>
              </div>

              {/* AUTO-CALCULATE DISCOUNT PERCENTAGE */}
              {/* Shows if original price is higher than regular price */}
              {formData.originalPrice &&
                parseFloat(formData.originalPrice) >
                  parseFloat(formData.price) && (
                  <div className="mt-3 p-3 bg-green-50 border border-green-200 rounded-lg">
                    <p className="text-sm text-green-800">
                      <strong>Sale!</strong>{" "}
                      {(
                        ((parseFloat(formData.originalPrice) -
                          parseFloat(formData.price)) /
                          parseFloat(formData.originalPrice)) *
                        100
                      ).toFixed(0)}
                      % off
                    </p>
                  </div>
                )}
            </div>

            {/* SECTION 3: Color Variants */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                Color Variants (Optional)
              </h2>

              {/* DISPLAY ADDED COLORS */}
              {colorVariants.length > 0 && (
                <div className="mb-4 space-y-2">
                  {/* Loop through and show each color */}
                  {colorVariants.map((color, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg"
                    >
                      <div
                        className="w-10 h-10 rounded border-2 border-gray-300"
                        style={{ backgroundColor: color.hex }}
                      ></div>
                      <div className="flex-1">
                        <p className="font-medium text-gray-900">
                          {color.name}
                        </p>
                        <p className="text-sm text-gray-600">
                          Stock: {color.stock}
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={() => handleRemoveColor(index)}
                        className="text-red-600 hover:text-red-800"
                      >
                        <X size={20} />
                      </button>
                    </div>
                  ))}
                </div>
              )}

              {/* ADD NEW COLOR FORM */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Color Name
                  </label>
                  <input
                    type="text"
                    value={newColor.name}
                    onChange={(e) =>
                      setNewColor((prev) => ({ ...prev, name: e.target.value }))
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Blue"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Hex Code
                  </label>
                  <input
                    type="color"
                    value={newColor.hex}
                    onChange={(e) =>
                      setNewColor((prev) => ({ ...prev, hex: e.target.value }))
                    }
                    className="w-full h-10 border border-gray-300 rounded-lg cursor-pointer"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Stock
                  </label>
                  <input
                    type="number"
                    value={newColor.stock}
                    onChange={(e) =>
                      setNewColor((prev) => ({
                        ...prev,
                        stock: e.target.value,
                      }))
                    }
                    min="0"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="50"
                  />
                </div>

                <div className="flex items-end">
                  <button
                    type="button"
                    onClick={handleAddColor}
                    className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
                  >
                    <Plus size={18} />
                    Add
                  </button>
                </div>
              </div>
            </div>

            {/* SECTION 4: Product Images */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                Product Images *
              </h2>

              {/* DISPLAY ADDED IMAGES */}
              {images.length > 0 && (
                <div className="mb-4 grid grid-cols-2 md:grid-cols-4 gap-4">
                  {images.map((image, index) => (
                    <div key={index} className="relative group">
                      <img
                        src={image.url}
                        alt={image.alt}
                        className="w-full h-32 object-cover rounded-lg border border-gray-300"
                      />
                      {/* Delete button (shows on hover) */}
                      <button
                        type="button"
                        onClick={() => handleRemoveImage(index)}
                        className="absolute top-2 right-2 bg-red-600 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <X size={16} />
                      </button>
                      {/* Mark first image as primary */}
                      {index === 0 && (
                        <span className="absolute bottom-2 left-2 bg-blue-600 text-white text-xs px-2 py-1 rounded">
                          Primary
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              )}

              {/* IMAGE UPLOAD OPTIONS */}
              <div className="space-y-3">
                {/* OPTION 1: Upload from computer */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Upload from Computer
                  </label>
                  <input
                    type="file"
                    ref={fileInputRef}
                    accept="image/jpeg,image/jpg,image/png,image/gif,image/webp"
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="w-full bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center gap-2"
                  >
                    <ImageIcon size={18} />
                    Choose Image File (Max 5MB)
                  </button>
                  <p className="mt-1 text-xs text-gray-500">
                    Supported: JPG, PNG, GIF, WebP
                  </p>
                </div>

                {/* DIVIDER */}
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-300"></div>
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-2 bg-white text-gray-500">OR</span>
                  </div>
                </div>

                {/* OPTION 2: URL input */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Add from URL
                  </label>
                  <div className="flex gap-3">
                    <input
                      type="url"
                      value={newImageUrl}
                      onChange={(e) => setNewImageUrl(e.target.value)}
                      className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="https://example.com/image.jpg"
                    />
                    <button
                      type="button"
                      onClick={handleAddImage}
                      className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
                    >
                      <Upload size={18} />
                      Add URL
                    </button>
                  </div>
                </div>
              </div>

              <p className="mt-3 text-sm text-gray-600">
                <AlertCircle size={14} className="inline mr-1" />
                First image will be used as the primary image
              </p>
            </div>
          </div>

          {/* RIGHT COLUMN - Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* CATEGORY/COLLECTION SELECTOR */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                Collection *
              </h2>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Select Category
                </label>
                <select
                  name="categoryId"
                  value={formData.categoryId}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                >
                  <option value="">Choose a collection...</option>
                  {categories.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
                
                {/* Show collection count */}
                <p className="mt-2 text-xs text-gray-500">
                  {categories.length} collection{categories.length !== 1 ? 's' : ''} available
                </p>
              </div>
            </div>

            {/* TAGS */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Tags</h2>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Product Tags
                </label>
                {/* Tags are comma-separated (e.g., "summer, casual, trending") */}
                <input
                  type="text"
                  name="tags"
                  value={formData.tags}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="summer, casual, trending (comma-separated)"
                />
                <p className="mt-1 text-xs text-gray-500">
                  Separate tags with commas
                </p>

                {/* SUGGESTED TAGS */}
                <div className="mt-3">
                  <p className="text-xs font-medium text-gray-700 mb-2">
                    Quick Add (Common Tags):
                  </p>
                  <div className="flex flex-wrap gap-2 max-h-40 overflow-y-auto">
                    {SUGGESTED_TAGS.slice(0, 20).map((tag) => (
                      <button
                        key={tag}
                        type="button"
                        onClick={() => handleAddSuggestedTag(tag)}
                        className="px-2 py-1 text-xs bg-gray-100 text-gray-700 rounded hover:bg-blue-100 hover:text-blue-700 transition-colors border border-gray-300"
                      >
                        + {tag}
                      </button>
                    ))}
                  </div>
                  <p className="mt-2 text-xs text-gray-500">
                    Click to add suggested tags to your product
                  </p>
                </div>
              </div>
            </div>

            {/* PRODUCT STATUS TOGGLES */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                Product Status
              </h2>

              <div className="space-y-3">
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    name="isActive"
                    checked={formData.isActive}
                    onChange={handleInputChange}
                    className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <span className="text-sm text-gray-700">
                    Active (visible in store)
                  </span>
                </label>

                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    name="isFeatured"
                    checked={formData.isFeatured}
                    onChange={handleInputChange}
                    className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <span className="text-sm text-gray-700">
                    Featured product
                  </span>
                </label>

                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    name="isOnSale"
                    checked={formData.isOnSale}
                    onChange={handleInputChange}
                    className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <span className="text-sm text-gray-700">On sale</span>
                </label>
              </div>
            </div>

            {/* SUBMIT BUTTON */}
            {/* Disabled while submitting to prevent double-clicks */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2 font-medium disabled:bg-blue-400 disabled:cursor-not-allowed"
            >
              {/* Show spinner while loading */}
              {loading ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  Creating...
                </>
              ) : (
                <>
                  <Save size={20} />
                  Create Product
                </>
              )}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}


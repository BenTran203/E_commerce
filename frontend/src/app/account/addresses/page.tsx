"use client";

import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Edit2, Trash2, MapPin, Check } from "lucide-react";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";

// Mock addresses data
const mockAddresses = [
  {
    id: "1",
    firstName: "John",
    lastName: "Doe",
    address1: "123 Main Street",
    address2: "Apt 4B",
    city: "New York",
    state: "NY",
    postalCode: "10001",
    country: "United States",
    phone: "+1 234 567 8900",
    isDefault: true,
  },
  {
    id: "2",
    firstName: "John",
    lastName: "Doe",
    address1: "456 Park Avenue",
    address2: "",
    city: "Brooklyn",
    state: "NY",
    postalCode: "11201",
    country: "United States",
    phone: "+1 234 567 8900",
    isDefault: false,
  },
];

export default function AddressesPage() {
  const { user, isLoading } = useAuth();
  const [addresses, setAddresses] = useState(mockAddresses);
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    address1: "",
    address2: "",
    city: "",
    state: "",
    postalCode: "",
    country: "United States",
    phone: "",
    isDefault: false,
  });

  const handleInputChange = (field: string) => (value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingId) {
      // Update existing address
      setAddresses((prev) =>
        prev.map((addr) =>
          addr.id === editingId ? { ...formData, id: editingId } : addr,
        ),
      );
    } else {
      // Add new address
      const newAddress = {
        ...formData,
        id: Date.now().toString(),
      };
      setAddresses((prev) => [...prev, newAddress]);
    }
    resetForm();
  };

  const handleEdit = (address: any) => {
    setFormData(address);
    setEditingId(address.id);
    setIsAddingNew(true);
  };

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this address?")) {
      setAddresses((prev) => prev.filter((addr) => addr.id !== id));
    }
  };

  const handleSetDefault = (id: string) => {
    setAddresses((prev) =>
      prev.map((addr) => ({ ...addr, isDefault: addr.id === id })),
    );
  };

  const resetForm = () => {
    setFormData({
      firstName: "",
      lastName: "",
      address1: "",
      address2: "",
      city: "",
      state: "",
      postalCode: "",
      country: "United States",
      phone: "",
      isDefault: false,
    });
    setIsAddingNew(false);
    setEditingId(null);
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
        <p className="text-primary-600">
          Please log in to manage your addresses.
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-luxury-cream py-12">
      <div className="container-luxury max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          {/* Header */}
          <div className="flex justify-between items-start mb-8">
            <div>
              <h1 className="text-3xl font-serif text-primary-900 mb-2">
                Saved Addresses
              </h1>
              <p className="text-primary-600">
                Manage your shipping and billing addresses
              </p>
            </div>
            {!isAddingNew && (
              <Button
                onClick={() => setIsAddingNew(true)}
                className="flex items-center gap-2"
              >
                <Plus size={18} />
                Add New Address
              </Button>
            )}
          </div>

          {/* Add/Edit Address Form */}
          <AnimatePresence>
            {isAddingNew && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="bg-white rounded-xl p-6 shadow-sm mb-6"
              >
                <h2 className="text-xl font-serif text-primary-900 mb-4">
                  {editingId ? "Edit Address" : "Add New Address"}
                </h2>
                <form onSubmit={handleSubmit} className="space-y-4">
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
                    label="Address Line 1"
                    value={formData.address1}
                    onChange={handleInputChange("address1")}
                    required
                  />

                  <Input
                    label="Address Line 2 (Optional)"
                    value={formData.address2}
                    onChange={handleInputChange("address2")}
                  />

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Input
                      label="City"
                      value={formData.city}
                      onChange={handleInputChange("city")}
                      required
                    />
                    <Input
                      label="State"
                      value={formData.state}
                      onChange={handleInputChange("state")}
                      required
                    />
                    <Input
                      label="ZIP Code"
                      value={formData.postalCode}
                      onChange={handleInputChange("postalCode")}
                      required
                    />
                  </div>

                  <Input
                    label="Phone Number"
                    value={formData.phone}
                    onChange={handleInputChange("phone")}
                    type="tel"
                    required
                  />

                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.isDefault}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          isDefault: e.target.checked,
                        }))
                      }
                      className="rounded border-primary-300 text-primary-900 focus:ring-primary-500"
                    />
                    <span className="text-primary-900">
                      Set as default address
                    </span>
                  </label>

                  <div className="flex gap-3 pt-4">
                    <Button type="submit" className="flex-1">
                      {editingId ? "Update Address" : "Save Address"}
                    </Button>
                    <Button
                      type="button"
                      variant="secondary"
                      onClick={resetForm}
                      className="flex-1"
                    >
                      Cancel
                    </Button>
                  </div>
                </form>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Addresses List */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {addresses.length === 0 ? (
              <div className="col-span-2 bg-white rounded-xl p-12 text-center">
                <MapPin size={64} className="mx-auto text-primary-300 mb-4" />
                <h3 className="text-xl font-serif text-primary-900 mb-2">
                  No addresses saved
                </h3>
                <p className="text-primary-600 mb-6">
                  Add an address to speed up checkout
                </p>
                <Button onClick={() => setIsAddingNew(true)}>
                  <Plus size={18} className="inline mr-2" />
                  Add Address
                </Button>
              </div>
            ) : (
              addresses.map((address) => (
                <motion.div
                  key={address.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className={`bg-white rounded-xl p-6 shadow-sm relative ${
                    address.isDefault ? "ring-2 ring-primary-900" : ""
                  }`}
                >
                  {address.isDefault && (
                    <div className="absolute top-4 right-4 flex items-center gap-1 px-2 py-1 bg-primary-900 text-white text-xs rounded-full">
                      <Check size={12} />
                      Default
                    </div>
                  )}

                  <div className="mb-4">
                    <h3 className="font-semibold text-primary-900 mb-2">
                      {address.firstName} {address.lastName}
                    </h3>
                    <p className="text-primary-600 text-sm">
                      {address.address1}
                      {address.address2 && <>, {address.address2}</>}
                    </p>
                    <p className="text-primary-600 text-sm">
                      {address.city}, {address.state} {address.postalCode}
                    </p>
                    <p className="text-primary-600 text-sm">
                      {address.country}
                    </p>
                    <p className="text-primary-600 text-sm mt-2">
                      {address.phone}
                    </p>
                  </div>

                  <div className="flex gap-2">
                    <Button
                      variant="secondary"
                      size="sm"
                      onClick={() => handleEdit(address)}
                      className="flex-1 flex items-center justify-center gap-2"
                    >
                      <Edit2 size={14} />
                      Edit
                    </Button>
                    {!address.isDefault && (
                      <Button
                        variant="secondary"
                        size="sm"
                        onClick={() => handleSetDefault(address.id)}
                        className="flex-1"
                      >
                        Set Default
                      </Button>
                    )}
                    <button
                      onClick={() => handleDelete(address.id)}
                      className="p-2 text-red-600 hover:bg-red-50 rounded transition-colors"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </motion.div>
              ))
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
}

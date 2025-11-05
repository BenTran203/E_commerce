"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Trash2,
  Plus,
  Minus,
  ShoppingBag,
  ArrowLeft,
  CreditCard,
  Lock,
} from "lucide-react";
import { useCart } from "@/hooks/useCart";
import Button from "@/components/ui/Button";
import Image from "next/image";
import Link from "next/link";
export default function CartPage() {
  const router = useRouter();
  const {
    items,
    total,
    itemCount,
    removeItem,
    updateItemQuantity,
    clearAllItems,
  } = useCart();
  const [promoCode, setPromoCode] = useState("");
  const [discount, setDiscount] = useState(0);

  const shippingCost = total > 100 ? 0 : 10;
  const tax = total * 0.1; // 10% tax
  const finalTotal = total + shippingCost + tax - discount;

  const handleApplyPromo = () => {
    // Simple promo code logic
    if (promoCode.toUpperCase() === "SAVE10") {
      setDiscount(total * 0.1);
    } else if (promoCode.toUpperCase() === "SAVE20") {
      setDiscount(total * 0.2);
    } else {
      alert("Invalid promo code");
    }
  };

  const handleCheckout = () => {
    if (items.length === 0) {
      alert("Your cart is empty!");
      return;
    }
    // Navigate to checkout page (you can create this later)
    router.push("/pages/checkout");
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-luxury-cream py-16">
        <div className="container-luxury">
          <div className="text-center max-w-md mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-8"
            >
              <ShoppingBag
                size={80}
                className="mx-auto text-primary-300 mb-4"
              />
              <h1 className="text-3xl font-serif text-primary-900 mb-4">
                Your Cart is Empty
              </h1>
              <p className="text-primary-600 mb-8">
                Looks like you haven't added any items to your cart yet.
              </p>
              <Button size="lg">
                <Link href="/pages/shop"> Continue Shopping </Link>
              </Button>
            </motion.div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-luxury-cream py-8">
      <div className="container-luxury">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <button
            onClick={() => router.back()}
            className="flex items-center gap-2 text-primary-600 hover:text-primary-900 mb-4 transition-colors"
          >
            <ArrowLeft size={20} />
            Continue Shopping
          </button>
          <h1 className="text-3xl md:text-4xl font-serif text-primary-900">
            Shopping Cart
          </h1>
          <p className="text-primary-600 mt-2">
            {itemCount} {itemCount === 1 ? "item" : "items"} in your cart
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            <AnimatePresence>
              {items.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white rounded-xl p-4 md:p-6 shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="flex gap-4 md:gap-6">
                    {/* Product Image */}
                    <div
                      className="relative w-24 h-24 md:w-32 md:h-32 flex-shrink-0 rounded-lg overflow-hidden cursor-pointer"
                      onClick={() => router.push(`/product/${item.product.id}`)}
                    >
                      <img
                        src={item.product.images[0]?.url}
                        alt={item.product.name}
                        className="w-full h-full object-cover hover:scale-105 transition-transform"
                      />
                    </div>

                    {/* Product Details */}
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-start mb-2">
                        <div className="flex-1">
                          <h3
                            className="text-lg font-semibold text-primary-900 mb-1 cursor-pointer hover:text-primary-700"
                            onClick={() =>
                              router.push(`/product/${item.product.id}`)
                            }
                          >
                            {item.product.name}
                          </h3>
                          <p className="text-sm text-primary-600 mb-2">
                            {item.product.brand.name}
                          </p>

                          {/* Size & Color */}
                          <div className="flex gap-4 text-sm text-primary-600 mb-3">
                            {item.size && (
                              <span>
                                Size:{" "}
                                <span className="font-medium text-primary-900">
                                  {item.size}
                                </span>
                              </span>
                            )}
                            {item.color && (
                              <span>
                                Color:{" "}
                                <span className="font-medium text-primary-900">
                                  {item.color}
                                </span>
                              </span>
                            )}
                          </div>
                        </div>

                        {/* Remove Button */}
                        <button
                          onClick={() => removeItem(item.id)}
                          className="p-2 text-primary-400 hover:text-red-500 transition-colors"
                          aria-label="Remove item"
                        >
                          <Trash2 size={20} />
                        </button>
                      </div>

                      {/* Quantity & Price */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <span className="text-sm text-primary-600">
                            Quantity:
                          </span>
                          <div className="flex items-center border border-primary-200 rounded-lg">
                            <button
                              onClick={() =>
                                updateItemQuantity(item.id, item.quantity - 1)
                              }
                              className="p-2 hover:bg-primary-50 transition-colors"
                              aria-label="Decrease quantity"
                            >
                              <Minus size={16} />
                            </button>
                            <span className="px-4 font-semibold">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() =>
                                updateItemQuantity(item.id, item.quantity + 1)
                              }
                              className="p-2 hover:bg-primary-50 transition-colors"
                              aria-label="Increase quantity"
                            >
                              <Plus size={16} />
                            </button>
                          </div>
                        </div>

                        <div className="text-right">
                          <p className="text-lg font-bold text-primary-900">
                            ${(item.product.price * item.quantity).toFixed(2)}
                          </p>
                          {item.quantity > 1 && (
                            <p className="text-sm text-primary-500">
                              ${item.product.price.toFixed(2)} each
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>

            {/* Clear Cart Button */}
            <Button
              variant="ghost"
              onClick={clearAllItems}
              className="w-full text-red-600 hover:bg-red-50"
            >
              <Trash2 size={18} className="mr-2" />
              Clear All Items
            </Button>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-xl p-6 shadow-sm sticky top-24"
            >
              <h2 className="text-2xl font-serif text-primary-900 mb-6">
                Order Summary
              </h2>

              {/* Promo Code */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-primary-700 mb-2">
                  Promo Code
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    placeholder="Enter code"
                    className="flex-1 px-4 py-2 border border-primary-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                  />
                  <Button
                    onClick={handleApplyPromo}
                    variant="secondary"
                    size="sm"
                  >
                    Apply
                  </Button>
                </div>
                <p className="text-xs text-primary-500 mt-2">
                  Try SAVE10 or SAVE20
                </p>
              </div>

              {/* Price Breakdown */}
              <div className="space-y-3 mb-6 pb-6 border-b border-primary-200">
                <div className="flex justify-between text-primary-600">
                  <span>Subtotal</span>
                  <span>${total.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-primary-600">
                  <span>Shipping</span>
                  <span
                    className={
                      shippingCost === 0 ? "text-green-600 font-medium" : ""
                    }
                  >
                    {shippingCost === 0
                      ? "FREE"
                      : `$${shippingCost.toFixed(2)}`}
                  </span>
                </div>
                <div className="flex justify-between text-primary-600">
                  <span>Tax (10%)</span>
                  <span>${tax.toFixed(2)}</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-green-600 font-medium">
                    <span>Discount</span>
                    <span>-${discount.toFixed(2)}</span>
                  </div>
                )}
              </div>

              {/* Total */}
              <div className="flex justify-between items-center mb-6">
                <span className="text-xl font-semibold text-primary-900">
                  Total
                </span>
                <span className="text-2xl font-bold text-primary-900">
                  ${finalTotal.toFixed(2)}
                </span>
              </div>

              {/* Free Shipping Banner */}
              {total < 100 && (
                <div className="bg-primary-50 border border-primary-200 rounded-lg p-3 mb-4">
                  <p className="text-sm text-primary-700">
                    Add{" "}
                    <span className="font-semibold">
                      ${(100 - total).toFixed(2)}
                    </span>{" "}
                    more for FREE shipping!
                  </p>
                </div>
              )}

              {/* Checkout Button */}
              <Button
                onClick={handleCheckout}
                size="lg"
                className="w-full mb-3 flex items-center justify-center gap-2"
              >
                <CreditCard size={20} />
                Proceed to Checkout
              </Button>

              {/* Security Badge */}
              <div className="flex items-center justify-center gap-2 text-sm text-primary-600">
                <Lock size={16} />
                <span>Secure Checkout</span>
              </div>

              {/* Payment Methods */}
              <div className="mt-6 pt-6 border-t border-primary-200">
                <p className="text-xs text-primary-500 text-center mb-3">
                  We Accept
                </p>
                <div className="flex justify-center gap-3 opacity-60">
                  <div className="w-12 h-8 bg-primary-200 rounded flex items-center justify-center text-xs font-bold">
                    VISA
                  </div>
                  <div className="w-12 h-8 bg-primary-200 rounded flex items-center justify-center text-xs font-bold">
                    MC
                  </div>
                  <div className="w-12 h-8 bg-primary-200 rounded flex items-center justify-center text-xs font-bold">
                    AMEX
                  </div>
                  <div className="w-12 h-8 bg-primary-200 rounded flex items-center justify-center text-xs font-bold">
                    PP
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}

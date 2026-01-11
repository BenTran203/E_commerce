"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, ShoppingBag, Star } from "lucide-react";
import { useProducts } from "@/hooks/useProducts";
import { useCart } from "@/hooks/useCart";
import { formatCurrency } from "@/utils";
import Button from "@/components/ui/Button";
import { useTranslation } from "react-i18next";
import {
  getProductName,
  getProductDescription,
} from "@/utils/productTranslation";

const FeaturedProducts: React.FC = () => {
  const { t } = useTranslation();
  const { featuredProducts, fetchFeaturedProducts, isLoading } = useProducts();
  const { addItem } = useCart();
  const [rotationIndex, setRotationIndex] = useState(0);
  const [isInteracting, setIsInteracting] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const productsToShow = 4; // Number of products to show at once

  useEffect(() => {
    fetchFeaturedProducts();
  }, [fetchFeaturedProducts]);

  // Auto-rotate: move the first product to the end every 3 seconds (shift-left rotation)
  useEffect(() => {
    if (!isInteracting && featuredProducts.length > productsToShow) {
      const timer = setInterval(() => {
        setRotationIndex((prev) =>
          featuredProducts.length === 0 ? 0 : (prev + 1) % featuredProducts.length,
        );
      }, 3000);
      return () => clearInterval(timer);
    }
  }, [featuredProducts.length, productsToShow, isInteracting]);

  // Derive a rotated list from the original array so we don't mutate `featuredProducts`.
  const rotatedProducts = useMemo(() => {
    const len = featuredProducts.length;
    if (len === 0) return [];
    const safeIndex = ((rotationIndex % len) + len) % len;
    return [
      ...featuredProducts.slice(safeIndex),
      ...featuredProducts.slice(0, safeIndex),
    ];
  }, [featuredProducts, rotationIndex]);

  // Get current visible products
  const visibleProducts = rotatedProducts.slice(0, productsToShow);
  const edgeVariants = {
    initial: (edge: "left" | "right" | "middle") =>
      edge === "right" ? { x: 40, opacity: 0 } : {}, // only the new right card slides in
    animate: {
      x: 0,
      opacity: 1,
      transition: { duration: 0.25, type: "tween" },
    },
    exit: (edge: "left" | "right" | "middle") =>
      edge === "left"
        ? { x: -40, opacity: 0, transition: { duration: 0.18, type: "tween" } }
        : {},
  };

  if (isLoading) {
    return (
      <section className="section-spacing bg-luxury-sand">
        <div className="container-luxury">
          <div className="text-center">
            <div className="animate-pulse">
              <div className="h-8 bg-primary-200 rounded w-64 mx-auto mb-4" />
              <div className="h-4 bg-primary-200 rounded w-96 mx-auto" />
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="section-spacing bg-luxury-sand overflow-hidden">
      <div className="container-luxury">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-serif font-semibold text-primary-900 mb-4">
            {t("featured.title")}
          </h2>
          <p className="text-lg text-primary-600 max-w-2xl mx-auto">
            {t("featured.description")}
          </p>
        </motion.div>

        {/* Products Grid with Animation */}
        <div className="relative overflow-hidden">
          <div
            ref={containerRef}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
            onMouseEnter={() => setIsInteracting(true)}
            onMouseLeave={() => setIsInteracting(false)}
            onFocusCapture={() => setIsInteracting(true)}
            onBlurCapture={(e) => {
              const next = e.relatedTarget;
              if (
                next instanceof Node &&
                containerRef.current &&
                containerRef.current.contains(next)
              ) {
                return;
              }
              setIsInteracting(false);
            }}
          >
            <AnimatePresence initial={false} mode="popLayout">
              {visibleProducts.map((product, idx) => {
                const isFirst = idx === 0;
                const isLast = idx === visibleProducts.length - 1;
                const edge: "left" | "right" | "middle" = isFirst
                  ? "left"
                  : isLast
                    ? "right"
                    : "middle";
                return (
                  <motion.div
                    key={product.id}
                    className="group"
                    layout="position"
                    variants={edgeVariants}
                    custom={edge}
                    initial={isLast ? "initial" : false}
                    animate="animate"
                    exit={isFirst ? "exit" : undefined}
                  >
                    <div className="card-luxury p-0 overflow-hidden">
                      {/* Product Image */}
                      <div className="relative aspect-[3/4] overflow-hidden">
                        <Image
                          src={
                            product.images[0]?.url || "/placeholder-product.jpg"
                          }
                          alt={product.name}
                          fill
                          className="object-cover transition-transform duration-700 group-hover:scale-110"
                        />

                        {/* Sale Badge */}
                        {product.isOnSale && product.salePercentage && (
                          <div className="absolute top-4 left-4 bg-primary-900 text-white px-3 py-1 text-sm font-medium">
                            -{product.salePercentage}%
                          </div>
                        )}

                        {/* Quick Actions */}
                        <div className="absolute top-4 right-4 flex flex-col space-y-2 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-2 group-hover:translate-x-0">
                          <button
                            type="button"
                            className="bg-white p-2 shadow-luxury hover:shadow-luxury-lg transition-shadow focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500"
                            aria-label={`Add to wishlist: ${getProductName(
                              product.id,
                              product.name,
                              t,
                            )}`}
                          >
                            <Heart
                              size={18}
                              className="text-primary-700 hover:text-red-500 transition-colors"
                            />
                          </button>
                          <button
                            type="button"
                            onClick={() => addItem(product)}
                            className="bg-white p-2 shadow-luxury hover:shadow-luxury-lg transition-shadow focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500"
                            aria-label={`${t("shop.addToCart")}: ${getProductName(
                              product.id,
                              product.name,
                              t,
                            )}`}
                          >
                            <ShoppingBag
                              size={18}
                              className="text-primary-700 hover:text-primary-900 transition-colors"
                            />
                          </button>
                        </div>

                        {/* Quick Shop Overlay */}
                        <div className="absolute inset-x-0 bottom-0 bg-white bg-opacity-95 backdrop-blur-sm p-4 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                          <Link href={`/product/${product.id}`}>
                            <Button variant="secondary" size="sm" fullWidth>
                              {t("featured.quickView")}
                            </Button>
                          </Link>
                        </div>
                      </div>

                      {/* Product Info */}
                      <div className="p-6">
                        <Link href={`/product/${product.id}`}>
                          <h3 className="font-semibold text-primary-900 mb-2 hover:text-primary-700 transition-colors line-clamp-2">
                            {getProductName(product.id, product.name, t)}
                          </h3>
                        </Link>

                        <p className="text-sm text-primary-600 mb-3 line-clamp-2">
                          {getProductDescription(
                            product.id,
                            product.description,
                            t,
                          )}
                        </p>

                        {/* Rating */}
                        <div className="flex items-center space-x-2 mb-3">
                          <div className="flex items-center">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                size={14}
                                className={`${
                                  i < Math.floor(product.rating)
                                    ? "text-yellow-400 fill-current"
                                    : "text-primary-300"
                                }`}
                              />
                            ))}
                          </div>
                          <span className="text-sm text-primary-600">
                            ({product.reviewCount} {t("featured.reviews")})
                          </span>
                        </div>

                        {/* Price */}
                        <div className="flex items-center space-x-2 mb-4">
                          <span className="text-lg font-semibold text-primary-900">
                            {formatCurrency(product.price)}
                          </span>
                          {product.originalPrice &&
                            product.originalPrice > product.price && (
                              <span className="text-sm text-primary-500 line-through">
                                {formatCurrency(product.originalPrice)}
                              </span>
                            )}
                        </div>

                        {/* Available Colors */}
                        {product.colors.length > 0 && (
                          <div className="flex items-center space-x-2">
                            <span className="text-xs text-primary-600">
                              {t("featured.colors")}:
                            </span>
                            <div className="flex space-x-1">
                              {product.colors.slice(0, 4).map((color) => (
                                <div
                                  key={color.id}
                                  className="w-4 h-4 rounded-full border border-primary-200"
                                  style={{ backgroundColor: color.hex }}
                                  title={color.name}
                                />
                              ))}
                              {product.colors.length > 4 && (
                                <span className="text-xs text-primary-500">
                                  +{product.colors.length - 4}
                                </span>
                              )}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>

          {/* Navigation Dots */}
          <div className="flex justify-center mt-8 space-x-2">
            {Array.from({
              length: Math.ceil(featuredProducts.length / productsToShow),
            }).map((_, idx) => (
              (() => {
                const currentPage = Math.floor(
                  (featuredProducts.length === 0
                    ? 0
                    : rotationIndex % featuredProducts.length) / productsToShow,
                );
                const isCurrent = currentPage === idx;
                return (
              <button
                key={idx}
                className={`w-2 h-2 rounded-full transition-colors ${
                  isCurrent
                    ? "bg-primary-900"
                    : "bg-primary-300"
                } focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500`}
                onClick={() => setRotationIndex(idx * productsToShow)}
                type="button"
                aria-label={`Go to page ${idx + 1}`}
                aria-current={isCurrent ? "true" : undefined}
              />
                );
              })()
            ))}
          </div>

          {/* View All Products Link */}
          <motion.div
            className="text-center mt-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <Link href="/shop">
              <Button variant="secondary" size="lg">
                {t("featured.viewAll")}
              </Button>
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;

"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Star } from "lucide-react";
import Button from "@/components/ui/Button";
import productsData from "@/data/products.json";
import { useTranslation } from "react-i18next";
import {
  getCollectionName,
  getCollectionDescription,
} from "@/utils/productTranslation";

interface Collection {
  id: string;
  name: string;
  description: string;
  slug: string;
  image: string;
  productIds: string[];
  isActive: boolean;
}

// Transform collections data and add featured flag based on product count
const collections: (Collection & {
  productCount: number;
  featured: boolean;
})[] = productsData.collections.map((collection) => ({
  ...collection,
  productCount: collection.productIds.length,
  featured: collection.productIds.length >= 3, // Collections with 3+ items are featured
}));

export default function CollectionsPage() {
  const { t } = useTranslation();
  const featuredCollections = collections.filter((c) => c.featured);
  const allCollections = collections;

  return (
    <div className="min-h-screen bg-luxury-cream">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage:
              'linear-gradient(rgba(250, 249, 246, 0.8), rgba(250, 249, 246, 0.8)), url("https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1920&h=1080&fit=crop")',
          }}
        />

        <div className="relative container-luxury text-center">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-6xl font-serif text-primary-900 mb-6"
          >
            {t("collections.title")}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-lg md:text-xl text-primary-600 max-w-3xl mx-auto leading-relaxed"
          >
            {t("collections.description")}
          </motion.p>
        </div>
      </section>

      {/* Featured Collections */}
      <section className="py-16">
        <div className="container-luxury">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-serif text-primary-900 mb-4">
              {t("collections.featured.title")}
            </h2>
            <p className="text-primary-600 max-w-2xl mx-auto">
              {t("collections.featured.description")}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {featuredCollections.map((collection, index) => (
              <motion.div
                key={collection.id}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img
                    src={collection.image}
                    alt={collection.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                </div>

                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                  <div className="flex items-center gap-2 mb-2">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm font-medium">
                      {t("collections.featured.badge")}
                    </span>
                  </div>
                  <h3 className="text-2xl font-serif mb-2">
                    {getCollectionName(collection.slug, collection.name, t)}
                  </h3>
                  <p className="text-white/90 text-sm mb-4 line-clamp-2">
                    {getCollectionDescription(
                      collection.slug,
                      collection.description,
                      t,
                    )}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-white/80">
                      {collection.productCount} {t("collections.items")}
                    </span>
                    <Link href={`/pages/collections/${collection.slug}`}>
                      <Button
                        variant="secondary"
                        size="sm"
                        className="bg-white/20 backdrop-blur-sm border-white/30 text-white hover:bg-white/30"
                      >
                        {t("collections.explore")}
                        <ArrowRight size={16} className="ml-2" />
                      </Button>
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* All Collections Grid */}
      <section className="py-16 bg-white/50">
        <div className="container-luxury">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-serif text-primary-900 mb-4">
              {t("collections.all.title")}
            </h2>
            <p className="text-primary-600 max-w-2xl mx-auto">
              {t("collections.all.description")}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {allCollections.map((collection, index) => (
              <motion.div
                key={collection.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden"
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img
                    src={collection.image}
                    alt={collection.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  {collection.featured && (
                    <div className="absolute top-3 right-3 bg-primary-900 text-white px-2 py-1 rounded-full text-xs font-medium">
                      {t("collections.featured.badge")}
                    </div>
                  )}
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-serif text-primary-900 mb-2">
                    {getCollectionName(collection.slug, collection.name, t)}
                  </h3>
                  <p className="text-primary-600 text-sm mb-4 line-clamp-3">
                    {getCollectionDescription(
                      collection.slug,
                      collection.description,
                      t,
                    )}
                  </p>

                  <div className="flex items-center justify-between mb-4">
                    <span className="text-sm text-primary-500">
                      {collection.productCount} {t("collections.items")}
                    </span>
                    <div className="flex items-center gap-1">
                      <span className="text-xs text-primary-400">
                        {t("collections.popular")}
                      </span>
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            size={12}
                            className={`${
                              i < 4
                                ? "fill-yellow-400 text-yellow-400"
                                : "text-gray-200"
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                  </div>

                  <Link href={`/pages/collections/${collection.slug}`}>
                    <Button className="w-full group">
                      {t("collections.exploreCollection")}
                      <ArrowRight
                        size={16}
                        className="ml-2 group-hover:translate-x-1 transition-transform"
                      />
                    </Button>
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="py-16">
        <div className="container-luxury">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-primary-900 rounded-2xl p-8 md:p-12 text-center text-white"
          >
            <h2 className="text-3xl md:text-4xl font-serif mb-4">
              {t("collections.newsletter.title")}
            </h2>
            <p className="text-primary-100 mb-6 max-w-2xl mx-auto">
              {t("collections.newsletter.description")}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder={t("collections.newsletter.placeholder")}
                className="flex-1 px-4 py-3 rounded-lg text-primary-900 focus:outline-none focus:ring-2 focus:ring-white/50"
              />
              <Button
                variant="secondary"
                className="bg-white text-primary-900 hover:bg-primary-50"
              >
                {t("collections.newsletter.subscribe")}
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

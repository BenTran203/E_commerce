"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useTranslation } from "react-i18next";

interface Category {
  id: string;
  slug: string;
  image: string;
  itemCount: number;
}

const Categories: React.FC = () => {
  const { t } = useTranslation();
  const categories: Category[] = [
    {
      id: "1",
      slug: "unique",
      image:
        "https://images.unsplash.com/photo-1558769132-cb1aea458c5e?q=80&w=774&auto=format&fit=crop",
      itemCount: 0,
    },
    {
      id: "2",
      slug: "outerwear",
      image:
        "https://images.unsplash.com/photo-1706765779494-2705542ebe74?w=500&auto=format&fit=crop&q=60",
      itemCount: 0,
    },
    {
      id: "3",
      slug: "formal",
      image:
        "https://images.unsplash.com/photo-1426523038054-a260f3ef5bc9?q=60&w=1545&auto=format&fit=crop",
      itemCount: 0,
    },
    {
      id: "4",
      slug: "accessories",
      image:
        "https://images.unsplash.com/3/www.madebyvadim.com.jpg?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8QWNjZXNzb3JpZXN8ZW58MHx8MHx8fDI%3D",
      itemCount: 0,
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  return (
    <section className="section-spacing bg-white">
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
            {t("categories.title")}
          </h2>
          <p className="text-lg text-primary-600 max-w-2xl mx-auto">
            {t("categories.description")}
          </p>
        </motion.div>

        {/* Categories Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {categories.map((category) => (
            <motion.div
              key={category.id}
              variants={itemVariants}
              className="group"
            >
              <Link href={`/shop/${category.slug}`}>
                <div className="relative overflow-hidden bg-primary-50 aspect-[3/4] mb-4">
                  {/* Category Image */}
                  <div
                    className="w-full h-full bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                    style={{ backgroundImage: `url(${category.image})` }}
                  />

                  {/* Overlay */}
                  <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-20 transition-opacity duration-300" />

                  {/* Hover text */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-2 group-hover:translate-x-0">
                    <div className="text-primary-600 p-2 shadow-luxury bg-white/80 rounded">
                      <span>{t("categories.lookMore")}</span>
                    </div>
                  </div>
                </div>

                {/* Category Info */}
                <div className="space-y-2">
                  <h3 className="text-xl font-semibold text-primary-900 group-hover:text-primary-700 transition-colors">
                    {t(`categories.categories.${category.slug}.name`)}
                  </h3>
                  <p className="text-sm text-primary-600 leading-relaxed">
                    {t(`categories.categories.${category.slug}.description`)}
                  </p>
                  <p className="text-xs text-primary-500 font-medium">
                    {category.itemCount} {t("categories.items")}
                  </p>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>

        {/* View All Link */}
        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <Link
            href="/shop"
            className="inline-flex items-center text-primary-700 hover:text-primary-900 font-medium group transition-colors duration-200"
          >
            {t("categories.viewAll")}
            <ArrowRight
              size={18}
              className="ml-2 group-hover:translate-x-1 transition-transform"
            />
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default Categories;

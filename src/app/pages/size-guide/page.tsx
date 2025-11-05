"use client";

import { motion } from "framer-motion";
import { Ruler, Info, TrendingUp, User } from "lucide-react";
import { useState } from "react";
import { useTranslation } from "react-i18next";

export default function SizeGuidePage() {
  const { t } = useTranslation();
  const [activeCategory, setActiveCategory] = useState("tops");

  const categories = [
    { id: "tops", name: "Tops & Shirts", icon: User },
    { id: "bottoms", name: "Pants & Jeans", icon: User },
    { id: "dresses", name: "Dresses", icon: User },
    { id: "shoes", name: "Footwear", icon: User },
  ];

  const sizeCharts = {
    tops: {
      headers: [
        "Size",
        "US",
        "UK",
        "EU",
        "Chest (in)",
        "Waist (in)",
        "Length (in)",
      ],
      rows: [
        ["XS", "0-2", "4-6", "32-34", "31-32", "24-25", "26"],
        ["S", "4-6", "8-10", "36-38", "33-34", "26-27", "27"],
        ["M", "8-10", "12-14", "40-42", "35-36", "28-29", "28"],
        ["L", "12-14", "16-18", "44-46", "37-39", "30-32", "29"],
        ["XL", "16-18", "20-22", "48-50", "40-42", "33-35", "30"],
        ["XXL", "20-22", "24-26", "52-54", "43-45", "36-38", "31"],
      ],
    },
    bottoms: {
      headers: [
        "Size",
        "US",
        "UK",
        "EU",
        "Waist (in)",
        "Hip (in)",
        "Inseam (in)",
      ],
      rows: [
        ["XS", "0-2", "4-6", "32-34", "24-25", "34-35", "30"],
        ["S", "4-6", "8-10", "36-38", "26-27", "36-37", "30"],
        ["M", "8-10", "12-14", "40-42", "28-29", "38-39", "31"],
        ["L", "12-14", "16-18", "44-46", "30-32", "40-42", "31"],
        ["XL", "16-18", "20-22", "48-50", "33-35", "43-45", "32"],
        ["XXL", "20-22", "24-26", "52-54", "36-38", "46-48", "32"],
      ],
    },
    dresses: {
      headers: [
        "Size",
        "US",
        "UK",
        "EU",
        "Bust (in)",
        "Waist (in)",
        "Hip (in)",
      ],
      rows: [
        ["XS", "0-2", "4-6", "32-34", "31-32", "24-25", "34-35"],
        ["S", "4-6", "8-10", "36-38", "33-34", "26-27", "36-37"],
        ["M", "8-10", "12-14", "40-42", "35-36", "28-29", "38-39"],
        ["L", "12-14", "16-18", "44-46", "37-39", "30-32", "40-42"],
        ["XL", "16-18", "20-22", "48-50", "40-42", "33-35", "43-45"],
        ["XXL", "20-22", "24-26", "52-54", "43-45", "36-38", "46-48"],
      ],
    },
    shoes: {
      headers: ["US Women", "US Men", "UK", "EU", "CM"],
      rows: [
        ["5", "-", "2.5", "35", "22.0"],
        ["5.5", "-", "3", "35.5", "22.5"],
        ["6", "-", "3.5", "36", "23.0"],
        ["6.5", "5", "4", "37", "23.5"],
        ["7", "5.5", "4.5", "37.5", "24.0"],
        ["7.5", "6", "5", "38", "24.5"],
        ["8", "6.5", "5.5", "39", "25.0"],
        ["8.5", "7", "6", "39.5", "25.5"],
        ["9", "7.5", "6.5", "40", "26.0"],
        ["9.5", "8", "7", "41", "26.5"],
        ["10", "8.5", "7.5", "41.5", "27.0"],
        ["10.5", "9", "8", "42", "27.5"],
        ["11", "9.5", "8.5", "43", "28.0"],
      ],
    },
  };

  const measurementTips = [
    {
      title: "Chest/Bust",
      description:
        "Measure around the fullest part of your chest, keeping the tape parallel to the floor.",
      icon: Ruler,
    },
    {
      title: "Waist",
      description:
        "Measure around your natural waistline, keeping the tape comfortably loose.",
      icon: Ruler,
    },
    {
      title: "Hip",
      description:
        "Stand with feet together and measure around the fullest part of your hips.",
      icon: Ruler,
    },
    {
      title: "Inseam",
      description:
        "Measure from the top of your inner thigh down to your ankle bone.",
      icon: Ruler,
    },
  ];

  return (
    <div className="min-h-screen bg-luxury-cream">
      {/* Hero Section */}
      <section className="py-20 bg-primary-900 text-white">
        <div className="container-luxury text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="mb-6"
          >
            <Ruler size={64} className="mx-auto text-primary-200" />
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-6xl font-serif mb-6"
          >
            Size Guide
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-lg md:text-xl text-primary-100 max-w-3xl mx-auto"
          >
            Find your perfect fit with our comprehensive sizing charts and
            measurement guides.
          </motion.p>
        </div>
      </section>

      {/* How to Measure */}
      <section className="py-16">
        <div className="container-luxury max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-serif text-primary-900 mb-4">
              How to Measure Yourself
            </h2>
            <p className="text-primary-600 max-w-2xl mx-auto">
              For the most accurate measurements, use a soft measuring tape and
              follow these guidelines.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {measurementTips.map((tip, index) => {
              const Icon = tip.icon;
              return (
                <motion.div
                  key={tip.title}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="bg-white rounded-xl p-6 shadow-sm text-center"
                >
                  <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <Icon className="text-primary-900" size={24} />
                  </div>
                  <h3 className="font-semibold text-primary-900 mb-2">
                    {tip.title}
                  </h3>
                  <p className="text-sm text-primary-600">{tip.description}</p>
                </motion.div>
              );
            })}
          </div>

          {/* Important Tips */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="bg-primary-50 border-l-4 border-primary-900 rounded-lg p-6 mb-16"
          >
            <div className="flex items-start gap-4">
              <Info className="text-primary-900 flex-shrink-0 mt-1" size={24} />
              <div>
                <h3 className="font-semibold text-primary-900 mb-2">
                  Measurement Tips
                </h3>
                <ul className="space-y-2 text-sm text-primary-700">
                  <li>• Measure over lightweight clothing for accuracy</li>
                  <li>• Keep the tape measure parallel to the floor</li>
                  <li>
                    • Don't pull the tape too tight - it should be snug but
                    comfortable
                  </li>
                  <li>
                    • If you're between sizes, we recommend sizing up for a more
                    comfortable fit
                  </li>
                  <li>
                    • All measurements are in inches unless otherwise specified
                  </li>
                </ul>
              </div>
            </div>
          </motion.div>

          {/* Category Tabs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mb-8"
          >
            <div className="flex flex-wrap gap-4 justify-center">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setActiveCategory(category.id)}
                  className={`px-6 py-3 rounded-lg font-medium transition-all ${
                    activeCategory === category.id
                      ? "bg-primary-900 text-white shadow-lg"
                      : "bg-white text-primary-700 hover:bg-primary-50"
                  }`}
                >
                  {category.name}
                </button>
              ))}
            </div>
          </motion.div>

          {/* Size Chart */}
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="bg-white rounded-2xl shadow-sm overflow-hidden"
          >
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-primary-900 text-white">
                  <tr>
                    {sizeCharts[
                      activeCategory as keyof typeof sizeCharts
                    ].headers.map((header) => (
                      <th
                        key={header}
                        className="px-6 py-4 text-left text-sm font-semibold"
                      >
                        {header}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {sizeCharts[
                    activeCategory as keyof typeof sizeCharts
                  ].rows.map((row, index) => (
                    <tr
                      key={index}
                      className={`border-b border-primary-100 ${
                        index % 2 === 0 ? "bg-white" : "bg-primary-50/30"
                      }`}
                    >
                      {row.map((cell, cellIndex) => (
                        <td
                          key={cellIndex}
                          className={`px-6 py-4 text-sm ${
                            cellIndex === 0
                              ? "font-semibold text-primary-900"
                              : "text-primary-600"
                          }`}
                        >
                          {cell}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>

          {/* Fit Guide */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16"
          >
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <TrendingUp className="text-blue-600" size={24} />
              </div>
              <h3 className="font-semibold text-primary-900 mb-2">
                Regular Fit
              </h3>
              <p className="text-sm text-primary-600">
                Our standard fit follows your body's natural lines with room for
                movement and comfort. Perfect for everyday wear.
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                <TrendingUp className="text-green-600" size={24} />
              </div>
              <h3 className="font-semibold text-primary-900 mb-2">Slim Fit</h3>
              <p className="text-sm text-primary-600">
                A closer fit that follows your body shape more precisely.
                Tailored for a modern, streamlined silhouette.
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                <TrendingUp className="text-purple-600" size={24} />
              </div>
              <h3 className="font-semibold text-primary-900 mb-2">
                Relaxed Fit
              </h3>
              <p className="text-sm text-primary-600">
                Extra room throughout for maximum comfort and ease of movement.
                Ideal for a laid-back, comfortable style.
              </p>
            </div>
          </motion.div>

          {/* Help Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="bg-primary-900 text-white rounded-2xl p-8 text-center mt-16"
          >
            <h2 className="text-2xl font-serif mb-4">Still Need Help?</h2>
            <p className="text-primary-100 mb-6 max-w-2xl mx-auto">
              Our customer service team is here to help you find the perfect
              fit. Contact us for personalized sizing advice.
            </p>
            <a
              href="/pages/contact"
              className="inline-block bg-white text-primary-900 px-6 py-3 rounded-lg font-medium hover:bg-primary-50 transition-colors"
            >
              Contact Support
            </a>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

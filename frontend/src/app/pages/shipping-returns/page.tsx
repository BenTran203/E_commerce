"use client";

import { motion } from "framer-motion";
import {
  Truck,
  Package,
  RotateCcw,
  Clock,
  MapPin,
  DollarSign,
  CheckCircle,
  AlertCircle,
} from "lucide-react";
import { useTranslation } from "react-i18next";

export default function ShippingReturnsPage() {
  const { t } = useTranslation();

  const shippingOptions = [
    {
      icon: Truck,
      name: "Standard Shipping",
      time: "5-7 Business Days",
      cost: "$10 (Free over $100)",
      description:
        "Our standard shipping option provides reliable delivery at an affordable price.",
    },
    {
      icon: Package,
      name: "Express Shipping",
      time: "2-3 Business Days",
      cost: "$25",
      description: "Get your order faster with our express shipping service.",
    },
    {
      icon: Clock,
      name: "Next Day Delivery",
      time: "1 Business Day",
      cost: "$45",
      description: "Need it urgently? Order before 2 PM for next-day delivery.",
    },
  ];

  const returnSteps = [
    {
      step: 1,
      title: "Initiate Return",
      description:
        "Log into your account and select the items you wish to return from your order history.",
    },
    {
      step: 2,
      title: "Print Label",
      description:
        "Print the prepaid return shipping label provided in your account.",
    },
    {
      step: 3,
      title: "Pack Items",
      description:
        "Securely pack the items in their original packaging with tags attached.",
    },
    {
      step: 4,
      title: "Ship Back",
      description: "Drop off your package at any authorized shipping location.",
    },
    {
      step: 5,
      title: "Refund Processed",
      description:
        "Receive your refund within 5-10 business days after we receive your return.",
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
            <Truck size={64} className="mx-auto text-primary-200" />
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-6xl font-serif mb-6"
          >
            Shipping & Returns
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-lg md:text-xl text-primary-100 max-w-3xl mx-auto"
          >
            Fast, reliable shipping and hassle-free returns. Your satisfaction
            is our priority.
          </motion.p>
        </div>
      </section>

      {/* Shipping Options */}
      <section className="py-16">
        <div className="container-luxury max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-serif text-primary-900 mb-4">
              Shipping Options
            </h2>
            <p className="text-primary-600 max-w-2xl mx-auto">
              Choose the shipping method that works best for you. All orders are
              trackable and insured.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
            {shippingOptions.map((option, index) => {
              const Icon = option.icon;
              return (
                <motion.div
                  key={option.name}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-lg transition-shadow"
                >
                  <div className="w-16 h-16 bg-primary-100 rounded-xl flex items-center justify-center mb-6">
                    <Icon className="text-primary-900" size={32} />
                  </div>
                  <h3 className="text-xl font-serif text-primary-900 mb-2">
                    {option.name}
                  </h3>
                  <div className="flex items-center gap-2 mb-4">
                    <Clock size={16} className="text-primary-500" />
                    <span className="text-sm font-medium text-primary-700">
                      {option.time}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 mb-4">
                    <DollarSign size={16} className="text-primary-500" />
                    <span className="text-sm font-semibold text-primary-900">
                      {option.cost}
                    </span>
                  </div>
                  <p className="text-sm text-primary-600">
                    {option.description}
                  </p>
                </motion.div>
              );
            })}
          </div>

          {/* Shipping Information */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="bg-white rounded-2xl p-8 shadow-sm mb-16"
          >
            <h2 className="text-2xl font-serif text-primary-900 mb-6">
              Shipping Information
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="font-semibold text-primary-900 mb-4 flex items-center gap-2">
                  <MapPin size={20} className="text-primary-500" />
                  Domestic Shipping (US)
                </h3>
                <ul className="space-y-3 text-sm text-primary-600">
                  <li className="flex items-start">
                    <CheckCircle
                      size={16}
                      className="text-green-600 mr-2 flex-shrink-0 mt-0.5"
                    />
                    <span>Free standard shipping on orders over $100</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle
                      size={16}
                      className="text-green-600 mr-2 flex-shrink-0 mt-0.5"
                    />
                    <span>
                      All orders ship from our warehouse in California
                    </span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle
                      size={16}
                      className="text-green-600 mr-2 flex-shrink-0 mt-0.5"
                    />
                    <span>Orders placed before 2 PM PST ship same day</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle
                      size={16}
                      className="text-green-600 mr-2 flex-shrink-0 mt-0.5"
                    />
                    <span>Tracking information provided for all orders</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle
                      size={16}
                      className="text-green-600 mr-2 flex-shrink-0 mt-0.5"
                    />
                    <span>Signature may be required for high-value orders</span>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="font-semibold text-primary-900 mb-4 flex items-center gap-2">
                  <MapPin size={20} className="text-primary-500" />
                  International Shipping
                </h3>
                <ul className="space-y-3 text-sm text-primary-600">
                  <li className="flex items-start">
                    <CheckCircle
                      size={16}
                      className="text-green-600 mr-2 flex-shrink-0 mt-0.5"
                    />
                    <span>We ship to over 25 countries worldwide</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle
                      size={16}
                      className="text-green-600 mr-2 flex-shrink-0 mt-0.5"
                    />
                    <span>Delivery time: 7-14 business days</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle
                      size={16}
                      className="text-green-600 mr-2 flex-shrink-0 mt-0.5"
                    />
                    <span>
                      Shipping cost calculated at checkout based on destination
                    </span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle
                      size={16}
                      className="text-green-600 mr-2 flex-shrink-0 mt-0.5"
                    />
                    <span>
                      Customs duties and taxes are customer's responsibility
                    </span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle
                      size={16}
                      className="text-green-600 mr-2 flex-shrink-0 mt-0.5"
                    />
                    <span>All international orders fully trackable</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="mt-8 p-4 bg-yellow-50 border-l-4 border-yellow-400 rounded">
              <div className="flex items-start gap-3">
                <AlertCircle
                  className="text-yellow-600 flex-shrink-0 mt-0.5"
                  size={20}
                />
                <div>
                  <p className="text-sm text-yellow-800 font-medium mb-1">
                    Holiday Shipping Notice
                  </p>
                  <p className="text-sm text-yellow-700">
                    During peak holiday seasons, shipping times may be extended.
                    Please order early to ensure timely delivery.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Returns Policy */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-center mb-12"
          >
            <RotateCcw size={48} className="mx-auto text-primary-900 mb-4" />
            <h2 className="text-3xl font-serif text-primary-900 mb-4">
              Easy Returns
            </h2>
            <p className="text-primary-600 max-w-2xl mx-auto">
              Not completely satisfied? We offer a 30-day return policy for most
              items. Here's how it works:
            </p>
          </motion.div>

          {/* Return Steps */}
          <div className="mb-16">
            <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
              {returnSteps.map((step, index) => (
                <motion.div
                  key={step.step}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.5 + index * 0.1 }}
                  className="relative"
                >
                  <div className="bg-white rounded-xl p-6 shadow-sm h-full">
                    <div className="w-10 h-10 bg-primary-900 text-white rounded-full flex items-center justify-center font-bold mb-4 mx-auto">
                      {step.step}
                    </div>
                    <h3 className="font-semibold text-primary-900 mb-2 text-center">
                      {step.title}
                    </h3>
                    <p className="text-sm text-primary-600 text-center">
                      {step.description}
                    </p>
                  </div>
                  {index < returnSteps.length - 1 && (
                    <div className="hidden md:block absolute top-1/2 -right-3 transform -translate-y-1/2 text-primary-300">
                      →
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          </div>

          {/* Return Policy Details */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.0 }}
            className="bg-white rounded-2xl p-8 shadow-sm mb-16"
          >
            <h2 className="text-2xl font-serif text-primary-900 mb-6">
              Return Policy Details
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              <div>
                <h3 className="font-semibold text-primary-900 mb-4 flex items-center gap-2">
                  <CheckCircle size={20} className="text-green-600" />
                  What Can Be Returned
                </h3>
                <ul className="space-y-2 text-sm text-primary-600">
                  <li>• Items in original condition with tags attached</li>
                  <li>• Unworn and unwashed merchandise</li>
                  <li>• Products in original packaging</li>
                  <li>• Items purchased within the last 30 days</li>
                  <li>• Sale items (store credit only)</li>
                </ul>
              </div>

              <div>
                <h3 className="font-semibold text-primary-900 mb-4 flex items-center gap-2">
                  <AlertCircle size={20} className="text-red-600" />
                  What Cannot Be Returned
                </h3>
                <ul className="space-y-2 text-sm text-primary-600">
                  <li>• Final sale items</li>
                  <li>• Intimate apparel and swimwear</li>
                  <li>• Personalized or customized items</li>
                  <li>• Items without tags or in used condition</li>
                  <li>• Gift cards</li>
                </ul>
              </div>
            </div>

            <div className="bg-primary-50 p-6 rounded-lg">
              <h3 className="font-semibold text-primary-900 mb-4">
                Important Notes
              </h3>
              <ul className="space-y-2 text-sm text-primary-700">
                <li>• Return shipping is free for US customers</li>
                <li>
                  • International customers are responsible for return shipping
                  costs
                </li>
                <li>• Refunds are issued to the original payment method</li>
                <li>• Exchanges are subject to availability</li>
                <li>• Items must pass quality inspection upon return</li>
              </ul>
            </div>
          </motion.div>

          {/* Exchange Information */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.1 }}
            className="bg-white rounded-2xl p-8 shadow-sm mb-16"
          >
            <h2 className="text-2xl font-serif text-primary-900 mb-6">
              Exchanges
            </h2>
            <p className="text-primary-600 mb-6">
              Need a different size or color? We make exchanges easy! Simply
              follow the return process and place a new order for the item you
              want. If the new item costs less, we'll refund the difference. If
              it costs more, we'll send you a payment link.
            </p>
            <div className="bg-green-50 border-l-4 border-green-400 p-4 rounded">
              <p className="text-sm text-green-800">
                <strong>Pro Tip:</strong> To ensure you get the item you want,
                place a new order before returning the original item. This
                guarantees availability, especially for popular items.
              </p>
            </div>
          </motion.div>

          {/* Contact Support */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.2 }}
            className="bg-primary-900 text-white rounded-2xl p-8 text-center"
          >
            <Package size={48} className="mx-auto mb-4 text-primary-200" />
            <h2 className="text-2xl font-serif mb-4">Need Help?</h2>
            <p className="text-primary-100 mb-6 max-w-2xl mx-auto">
              Our customer service team is here to assist with any shipping or
              return questions you may have.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/pages/contact"
                className="inline-block bg-white text-primary-900 px-6 py-3 rounded-lg font-medium hover:bg-primary-50 transition-colors"
              >
                Contact Support
              </a>
              <a
                href="/pages/faq"
                className="inline-block bg-white/10 border-2 border-white text-white px-6 py-3 rounded-lg font-medium hover:bg-white/20 transition-colors"
              >
                View FAQ
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

/**
 * AI ANALYSIS SECTION COMPONENT
 * 
 * Comprehensive 6-category analysis with Analyze button
 * Shows below Recent Orders section
 */

"use client";

import React, { useState } from 'react';
import { Sparkles, TrendingUp, Users, Package, AlertTriangle, Calendar, ShoppingBag } from 'lucide-react';
import { generateDashboardAnalysis, DashboardAnalysis } from '@/lib/aiApi';
import toast from 'react-hot-toast';

export default function AIAnalysisSection() {
  const [loading, setLoading] = useState(false);
  const [analysis, setAnalysis] = useState<DashboardAnalysis | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleAnalyze = async () => {
    setLoading(true);
    setError(null);

    try {
      const data = await generateDashboardAnalysis();
      setAnalysis(data);
      toast.success('Analysis generated successfully');
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || 'Failed to generate analysis';
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const categories = analysis ? [
    {
      key: 'salesTrendsAndAnomalies',
      title: 'Sales Trends & Anomalies',
      icon: TrendingUp,
      color: 'text-green-600',
      bgColor: 'bg-green-50',
    },
    {
      key: 'customerBehaviorPatterns',
      title: 'Customer Behavior Patterns',
      icon: Users,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
    },
    {
      key: 'productPerformanceInsights',
      title: 'Product Performance Insights',
      icon: Package,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
    },
    {
      key: 'inventoryRecommendations',
      title: 'Inventory Recommendations',
      icon: ShoppingBag,
      color: 'text-orange-600',
      bgColor: 'bg-orange-50',
    },
    {
      key: 'seasonalPatterns',
      title: 'Seasonal Patterns',
      icon: Calendar,
      color: 'text-indigo-600',
      bgColor: 'bg-indigo-50',
    },
    {
      key: 'riskAlerts',
      title: 'Risk Alerts',
      icon: AlertTriangle,
      color: 'text-red-600',
      bgColor: 'bg-red-50',
    },
  ] : [];


  return (
    <div className="bg-white rounded-lg shadow p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
            <Sparkles className="text-blue-600" size={28} />
            AI Dashboard Analysis
          </h2>
          <p className="text-sm text-gray-600 mt-1">
            Comprehensive insights powered by artificial intelligence
          </p>
        </div>

        <button
          onClick={handleAnalyze}
          disabled={loading}
          className={`
            px-6 py-3 bg-blue-600 text-white font-medium rounded-lg
            hover:bg-blue-700 transition-colors
            focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600
            disabled:opacity-50 disabled:cursor-not-allowed
            flex items-center gap-2
          `}
        >
          <Sparkles size={20} />
          {loading ? 'Analyzing...' : 'Analyze'}
        </button>
      </div>

      {/* Loading State */}
      {loading && (
        <div className="flex flex-col items-center justify-center py-16">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mb-4"></div>
          <p className="text-gray-600 font-medium">AI is analyzing your dashboard data...</p>
          <p className="text-sm text-gray-500 mt-1">This may take 20-30 seconds</p>
        </div>
      )}

      {/* Error State */}
      {error && !loading && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <div className="flex items-start gap-3">
            <AlertTriangle className="text-red-600 mt-0.5" size={20} />
            <div>
              <p className="text-red-800 font-medium">{error}</p>
              <button
                onClick={handleAnalyze}
                className="text-sm text-red-700 underline mt-2"
              >
                Try again
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Analysis Results */}
      {analysis && !loading && !error && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {categories.map((category) => {
            const data = analysis[category.key as keyof DashboardAnalysis];
            const Icon = category.icon;

            // Skip if data is not available for this category
            if (!data || typeof data !== 'object') {
              return null;
            }

            return (
              <div
                key={category.key}
                className={`${category.bgColor} border border-gray-200 rounded-lg p-5`}
              >
                {/* Category Header */}
                <div className="flex items-center gap-2 mb-4">
                  <Icon className={category.color} size={24} />
                  <h3 className="text-lg font-semibold text-gray-900">
                    {category.title}
                  </h3>
                </div>

                {/* Summary */}
                {data.summary && (
                  <p className="text-sm text-gray-700 mb-4 leading-relaxed">
                    {data.summary}
                  </p>
                )}

                {/* Insights */}
                {data.insights && data.insights.length > 0 && (
                  <ul className="space-y-2">
                    {data.insights.map((insight, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-sm text-gray-700">
                        <span className="text-blue-600 mt-0.5">•</span>
                        <span>{insight}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* Initial State */}
      {!analysis && !loading && !error && (
        <div className="text-center py-16">
          <Sparkles className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-600 mb-2">No analysis generated yet</p>
          <p className="text-sm text-gray-500">
            Click "Analyze" to generate AI-powered insights about your dashboard data
          </p>
        </div>
      )}
    </div>
  );
}

/**
 * DYNAMIC GRAPH SECTION COMPONENT
 * 
 * Shows AI-generated graphs (line + column charts) for selected metric
 * Displays between Stats Grid and Recent Orders
 */

"use client";

import React, { useEffect, useState } from 'react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { TrendingUp, BarChart3, Sparkles } from 'lucide-react';
import { generateGraphData, GraphData } from '@/lib/aiApi';
import toast from 'react-hot-toast';

interface DynamicGraphSectionProps {
  selectedMetric: 'sales' | 'orders' | 'products' | 'customers' | null;
}

export default function DynamicGraphSection({ selectedMetric }: DynamicGraphSectionProps) {
  const [loading, setLoading] = useState(false);
  const [graphData, setGraphData] = useState<GraphData | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (selectedMetric) {
      fetchGraphData(selectedMetric);
    }
  }, [selectedMetric]);

  const fetchGraphData = async (metric: 'sales' | 'orders' | 'products' | 'customers') => {
    setLoading(true);
    setError(null);

    try {
      const data = await generateGraphData(metric);
      setGraphData(data);
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || 'Failed to generate graph';
      setError(errorMessage);
      
      // Don't show toast if interceptor already handled it
      if (!err.response) {
        toast.error(errorMessage);
      }
    } finally {
      setLoading(false);
    }
  };

  // Don't render if no metric selected
  if (!selectedMetric) {
    return null;
  }

  return (
    <div className="bg-white rounded-lg shadow p-6 mb-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
            <Sparkles className="text-blue-600" size={28} />
            AI-Powered {selectedMetric.charAt(0).toUpperCase() + selectedMetric.slice(1)} Analysis
          </h2>
          <p className="text-sm text-gray-600 mt-1">
            Trend tracking and comparative analysis
          </p>
        </div>
        
        {graphData && (
          <button
            onClick={() => fetchGraphData(selectedMetric)}
            className="text-sm text-blue-600 hover:text-blue-700 font-medium"
          >
            Refresh
          </button>
        )}
      </div>

      {/* Loading State */}
      {loading && (
        <div className="flex flex-col items-center justify-center py-16">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mb-4"></div>
          <p className="text-gray-600">AI is analyzing {selectedMetric} data...</p>
          <p className="text-sm text-gray-500 mt-1">This may take a few seconds</p>
        </div>
      )}

      {/* Error State */}
      {error && !loading && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <div className="flex items-start gap-3">
            <svg
              className="w-5 h-5 text-red-600 mt-0.5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <div>
              <p className="text-red-800 font-medium">{error}</p>
              <button
                onClick={() => fetchGraphData(selectedMetric)}
                className="text-sm text-red-700 underline mt-2"
              >
                Try again
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Graph Data */}
      {graphData && !loading && !error && (
        <div className="space-y-8">
          {/* AI Insight */}
          {graphData.insight && (
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <Sparkles className="text-blue-600 mt-0.5" size={20} />
                <div>
                  <p className="text-sm font-medium text-blue-900 mb-1">AI Insight</p>
                  <p className="text-sm text-blue-800">{graphData.insight}</p>
                </div>
              </div>
            </div>
          )}

          {/* Line Chart - Trend Tracking */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <TrendingUp className="text-gray-700" size={20} />
              <h3 className="text-lg font-semibold text-gray-900">Trend Over Time</h3>
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={graphData.chartData.lineData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis
                  dataKey="date"
                  stroke="#6b7280"
                  fontSize={12}
                  tick={{ fill: '#6b7280' }}
                />
                <YAxis
                  stroke="#6b7280"
                  fontSize={12}
                  tick={{ fill: '#6b7280' }}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#fff',
                    border: '1px solid #e5e7eb',
                    borderRadius: '8px',
                    padding: '8px 12px',
                  }}
                />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="value"
                  stroke="#3b82f6"
                  strokeWidth={2}
                  dot={{ fill: '#3b82f6', r: 4 }}
                  activeDot={{ r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Column Chart - Comparative Analysis */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <BarChart3 className="text-gray-700" size={20} />
              <h3 className="text-lg font-semibold text-gray-900">Comparative Analysis</h3>
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={graphData.chartData.columnData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis
                  dataKey="category"
                  stroke="#6b7280"
                  fontSize={12}
                  tick={{ fill: '#6b7280' }}
                />
                <YAxis
                  stroke="#6b7280"
                  fontSize={12}
                  tick={{ fill: '#6b7280' }}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#fff',
                    border: '1px solid #e5e7eb',
                    borderRadius: '8px',
                    padding: '8px 12px',
                  }}
                />
                <Legend />
                <Bar
                  dataKey="value"
                  fill="#10b981"
                  radius={[8, 8, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Metadata */}
          {graphData.metadata && (
            <div className="text-xs text-gray-500 text-right">
              Generated at {new Date(graphData.metadata.generatedAt).toLocaleString()} • 
              Processing time: {graphData.metadata.duration}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

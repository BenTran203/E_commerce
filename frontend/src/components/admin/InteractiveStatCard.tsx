/**
 * INTERACTIVE STAT CARD COMPONENT
 * 
 * Clickable stat card that triggers graph generation
 * Shows metric value with change percentage
 */

"use client";

import React from 'react';
import { LucideIcon } from 'lucide-react';

interface InteractiveStatCardProps {
  title: string;
  value: string;
  change: number;
  icon: LucideIcon;
  color: string;
  isActive?: boolean;
  isLoading?: boolean;
  onClick: () => void;
}

export default function InteractiveStatCard({
  title,
  value,
  change,
  icon: Icon,
  color,
  isActive = false,
  isLoading = false,
  onClick,
}: InteractiveStatCardProps) {
  return (
    <button
      onClick={onClick}
      disabled={isLoading}
      className={`
        w-full bg-white rounded-lg shadow p-6 text-left
        transition-all duration-200
        hover:shadow-lg hover:scale-[1.02]
        focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600
        disabled:opacity-50 disabled:cursor-not-allowed
        ${isActive ? 'ring-2 ring-blue-500 shadow-lg' : ''}
      `}
    >
      <div className="flex items-center justify-between mb-4">
        {/* Icon */}
        <div className={`${color} p-3 rounded-lg`}>
          <Icon className="text-white" size={24} />
        </div>

        {/* Change Indicator */}
        <div
          className={`flex items-center gap-1 text-sm font-medium ${
            change >= 0 ? 'text-green-600' : 'text-red-600'
          }`}
        >
          {change >= 0 ? (
            <svg
              className="w-4 h-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 10l7-7m0 0l7 7m-7-7v18"
              />
            </svg>
          ) : (
            <svg
              className="w-4 h-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 14l-7 7m0 0l-7-7m7 7V3"
              />
            </svg>
          )}
          {Math.abs(change).toFixed(1)}%
        </div>
      </div>

      {/* Title */}
      <h3 className="text-gray-600 text-sm font-medium mb-1">{title}</h3>

      {/* Value */}
      <p className="text-2xl font-bold text-gray-900">{value}</p>

      {/* Context */}
      <p className="text-xs text-gray-500 mt-2">
        {isActive ? 'Showing graph below' : 'Click to view graph'}
      </p>

      {/* Loading Indicator */}
      {isLoading && (
        <div className="mt-3">
          <div className="w-full bg-gray-200 rounded-full h-1.5 overflow-hidden">
            <div className="bg-blue-600 h-1.5 rounded-full animate-pulse" style={{ width: '60%' }}></div>
          </div>
          <p className="text-xs text-gray-500 mt-1">Generating graph...</p>
        </div>
      )}
    </button>
  );
}

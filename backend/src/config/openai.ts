/**
 * OPENAI CONFIGURATION
 * 
 * Secure OpenAI API setup with environment variable validation
 * This file should NEVER contain hardcoded API keys
 */

import OpenAI from 'openai';

// Validate that API key is set
if (!process.env.OPENAI_API_KEY) {
  console.error('OPENAI_API_KEY is not set in environment variables');
  throw new Error('OPENAI_API_KEY is required. Please add it to your .env file');
}

// Initialize OpenAI client with API key from environment
export const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// OpenAI configuration constants
export const OPENAI_CONFIG = {
  // Model selection (can be overridden by environment variable)
  model: process.env.OPENAI_MODEL || 'gpt-3.5-turbo',
  
  // Maximum tokens per request (cost control)
  maxTokens: parseInt(process.env.OPENAI_MAX_TOKENS || '1500'),
  
  // Temperature for response creativity (0.0 - 2.0)
  // Lower = more focused, Higher = more creative
  temperature: parseFloat(process.env.OPENAI_TEMPERATURE || '0.7'),
  
  // Alternative models for different use cases
  models: {
    basic: 'gpt-3.5-turbo',      // Fast, cheap - for chat and quick insights
    advanced: 'gpt-4-turbo',      // Better quality - for deep analysis
    premium: 'gpt-4',             // Best quality - for critical analysis
  },
  
  // Cost per 1K tokens (approximate, update based on current OpenAI pricing)
  costPer1KTokens: {
    'gpt-3.5-turbo': 0.002,      // $0.002 per 1K tokens (input + output combined)
    'gpt-4-turbo': 0.01,         // $0.01 per 1K tokens
    'gpt-4': 0.03,               // $0.03 per 1K tokens
  },
  
  // Timeout for API calls (milliseconds)
  timeout: parseInt(process.env.OPENAI_TIMEOUT || '60000'), // 60 seconds
  
  // Budget limits
  dailyBudgetPerUser: parseFloat(process.env.DAILY_AI_BUDGET_PER_USER || '5.0'), // $5 per user per day
  monthlyBudgetTotal: parseFloat(process.env.MONTHLY_AI_BUDGET_TOTAL || '500.0'), // $500 per month total
};

/**
 * Get cost estimate for a given number of tokens
 */
export const estimateCost = (tokens: number, model: string = OPENAI_CONFIG.model): number => {
  const costPer1K = OPENAI_CONFIG.costPer1KTokens[model as keyof typeof OPENAI_CONFIG.costPer1KTokens] || 0.002;
  return (tokens / 1000) * costPer1K;
};

/**
 * Validate OpenAI configuration on startup
 */
export const validateOpenAIConfig = () => {
  console.log('OpenAI Configuration:');
  console.log(`   - Model: ${OPENAI_CONFIG.model}`);
  console.log(`   - Max Tokens: ${OPENAI_CONFIG.maxTokens}`);
  console.log(`   - Temperature: ${OPENAI_CONFIG.temperature}`);
  console.log(`   - Daily Budget per User: $${OPENAI_CONFIG.dailyBudgetPerUser}`);
  console.log(`   - Monthly Budget Total: $${OPENAI_CONFIG.monthlyBudgetTotal}`);
};

// Log configuration on import (development only)
if (process.env.NODE_ENV === 'development') {
  validateOpenAIConfig();
}

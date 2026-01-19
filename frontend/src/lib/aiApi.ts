/**
 * AI API UTILITIES
 * 
 * Type-safe API calls for AI analysis and chatbot features
 * Includes error handling and interceptors
 */

import axios, { AxiosError, AxiosInstance } from 'axios';
import toast from 'react-hot-toast';

// API Base URL
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

/**
 * Helper function to get auth token from Redux persisted state
 */
function getAuthToken(): string | null {
  if (typeof window === 'undefined') return null;
  
  try {
    // Get from redux-persist store (same as api.ts)
    const persistedState = localStorage.getItem('persist:timeless-root');
    if (persistedState) {
      const parsed = JSON.parse(persistedState);
      if (parsed.auth) {
        const authState = JSON.parse(parsed.auth);
        return authState.token;
      }
    }
  } catch (error) {
    console.error('Failed to get auth token:', error);
  }
  
  return null;
}

/**
 * Create AI API client with interceptors
 */
const createAIApiClient = (): AxiosInstance => {
  const client = axios.create({
    baseURL: `${API_BASE_URL}/admin`,
    timeout: 60000, // 60 seconds for AI operations
    headers: {
      'Content-Type': 'application/json',
    },
    withCredentials: true, // Include cookies for auth
  });

  // Request interceptor - add auth token
  client.interceptors.request.use(
    (config) => {
      // Get token from Redux persist store
      const token = getAuthToken();
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  // Response interceptor - handle errors
  client.interceptors.response.use(
    (response) => response,
    (error: AxiosError<any>) => {
      handleApiError(error);
      return Promise.reject(error);
    }
  );

  return client;
};

/**
 * Handle API errors with user-friendly messages
 */
function handleApiError(error: AxiosError<any>) {
  if (error.response) {
    const { status, data } = error.response;

    switch (status) {
      case 401:
        toast.error('Please log in to continue');
        // Redirect to login if needed
        if (typeof window !== 'undefined') {
          window.location.href = '/auth/login';
        }
        break;

      case 403:
        toast.error('You do not have permission for this action');
        break;

      case 429:
        const retryAfter = data.retryAfter || 60;
        const minutes = Math.ceil(retryAfter / 60);
        toast.error(
          `Rate limit exceeded. Please wait ${minutes} minute${minutes > 1 ? 's' : ''}.`,
          { duration: 5000 }
        );
        break;

      case 503:
        toast.error('Service temporarily unavailable. Please try again later.');
        break;

      case 500:
        toast.error(data.message || 'An error occurred. Please try again.');
        break;

      default:
        toast.error(data.message || 'An error occurred');
    }
  } else if (error.request) {
    // Network error
    toast.error('Network error. Please check your connection.');
  } else {
    toast.error('Unexpected error occurred');
  }
}

// Create API client instance
const aiApiClient = createAIApiClient();

// ============================================
// TYPE DEFINITIONS
// ============================================

export interface DashboardAnalysis {
  salesTrendsAndAnomalies: AnalysisCategory;
  customerBehaviorPatterns: AnalysisCategory;
  productPerformanceInsights: AnalysisCategory;
  inventoryRecommendations: AnalysisCategory;
  seasonalPatterns: AnalysisCategory;
  riskAlerts: AnalysisCategory;
}

export interface AnalysisCategory {
  summary: string;
  insights: string[];
  priority: 'high' | 'medium' | 'low';
}

export interface GraphData {
  metric: 'sales' | 'orders' | 'products' | 'customers';
  chartData: {
    lineData: Array<{ date: string; value: number }>;
    columnData: Array<{ category: string; value: number }>;
  };
  insight: string;
  metadata: {
    generatedAt: string;
    duration: string;
  };
}

export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
  timestamp?: string;
}

export interface ChatResponse {
  message: string;
  conversationId: string;
  timestamp: string;
}

export interface FileAnalysisResponse {
  filename: string;
  fileType: string;
  fileSize: number;
  analysis: string;
  timestamp: string;
}

// ============================================
// API FUNCTIONS
// ============================================

/**
 * Generate comprehensive dashboard analysis
 */
export async function generateDashboardAnalysis(): Promise<DashboardAnalysis> {
  try {
    const response = await aiApiClient.post('/ai-analysis/dashboard');
    return response.data.data.analysis;
  } catch (error) {
    throw error;
  }
}

/**
 * Generate graph data for specific metric
 */
export async function generateGraphData(
  metric: 'sales' | 'orders' | 'products' | 'customers'
): Promise<GraphData> {
  try {
    const response = await aiApiClient.post(`/ai-analysis/graph/${metric}`);
    return response.data.data;
  } catch (error) {
    throw error;
  }
}

/**
 * Send message to AI chatbot
 */
export async function sendChatMessage(message: string): Promise<ChatResponse> {
  try {
    const response = await aiApiClient.post('/ai-analysis/chatbot/message', { message });
    return response.data.data;
  } catch (error) {
    throw error;
  }
}

/**
 * Upload and analyze file
 */
export async function analyzeFile(file: File): Promise<FileAnalysisResponse> {
  try {
    const formData = new FormData();
    formData.append('file', file);

    const response = await aiApiClient.post('/ai-analysis/chatbot/analyze-file', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    return response.data.data;
  } catch (error) {
    throw error;
  }
}

/**
 * Get chat history
 */
export async function getChatHistory(): Promise<ChatMessage[]> {
  try {
    const response = await aiApiClient.get('/ai-analysis/chatbot/history');
    return response.data.data.history;
  } catch (error) {
    throw error;
  }
}

/**
 * Clear chat history
 */
export async function clearChatHistory(): Promise<void> {
  try {
    await aiApiClient.delete('/ai-analysis/chatbot/history');
    toast.success('Chat history cleared');
  } catch (error) {
    throw error;
  }
}

/**
 * Check AI service health
 */
export async function checkAIServiceHealth(): Promise<boolean> {
  try {
    await aiApiClient.get('/ai-analysis/health');
    return true;
  } catch (error) {
    return false;
  }
}

// Export client for custom requests
export { aiApiClient };

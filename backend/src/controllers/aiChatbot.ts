/**
 * AI CHATBOT CONTROLLER
 * 
 * Handles AI chatbot interactions with context awareness
 * Supports file upload and analysis
 */

import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { openai, OPENAI_CONFIG } from '../config/openai';
import { asyncHandler, AppError } from '../utils/errorHandler';
import pdf from 'pdf-parse';
import ExcelJS from 'exceljs';

const prisma = new PrismaClient();

// Store conversation history in memory (in production, use database or Redis)
const conversationHistory: Map<string, any[]> = new Map();

/**
 * Send Message to AI Chatbot
 * POST /api/admin/ai-chatbot/message
 * 
 * Context-aware chatbot that can answer questions about dashboard data
 */
export const sendChatbotMessage = asyncHandler(
  async (req: Request, res: Response) => {
    const { message } = req.body;
    const userId = req.user?.id;

    if (!userId) {
      throw new AppError('Authentication required', 401, 'UNAUTHORIZED');
    }

    try {
      console.log(`💬 Chatbot message from ${req.user?.email}: ${message.substring(0, 50)}...`);

      // Get conversation history for this user
      const history = conversationHistory.get(userId) || [];

      // Fetch current dashboard context
      const dashboardContext = await fetchDashboardContext();

      // Build messages for OpenAI
      const messages: any[] = [
        {
          role: 'system',
          content: `You are a helpful e-commerce business assistant. You have access to the admin's dashboard data.
          
Current dashboard data:
${JSON.stringify(dashboardContext, null, 2)}

Help the admin understand their business metrics, answer questions about trends, and provide actionable recommendations.
Be concise, friendly, and data-driven. If asked about specific numbers, refer to the dashboard data provided.`,
        },
        ...history,
        {
          role: 'user',
          content: message,
        },
      ];

      // Call OpenAI
      const completion = await openai.chat.completions.create({
        model: OPENAI_CONFIG.models.basic, // Use GPT-3.5 for faster, cheaper chat
        max_tokens: 500,
        temperature: 0.7,
        messages,
      });

      const aiResponse = completion.choices[0]?.message?.content || 'Sorry, I could not generate a response.';

      // Update conversation history (keep last 10 messages)
      history.push(
        { role: 'user', content: message },
        { role: 'assistant', content: aiResponse }
      );

      if (history.length > 20) {
        history.splice(0, 2); // Remove oldest pair
      }

      conversationHistory.set(userId, history);

      res.status(200).json({
        status: 'success',
        data: {
          message: aiResponse,
          conversationId: userId,
          timestamp: new Date().toISOString(),
        },
      });

    } catch (error: any) {
      console.error('❌ Chatbot error:', error);

      if (error.status === 429) {
        throw new AppError(
          'Chat service temporarily busy. Please try again in a moment.',
          429,
          'OPENAI_RATE_LIMIT'
        );
      }

      throw new AppError(
        'Failed to process chat message',
        500,
        'CHATBOT_ERROR',
        { originalError: error.message }
      );
    }
  }
);

/**
 * Analyze Uploaded File
 * POST /api/admin/ai-chatbot/analyze-file
 * 
 * Accepts CSV, PDF, Excel files and provides AI analysis
 */
export const analyzeUploadedFile = asyncHandler(
  async (req: Request, res: Response) => {
    const file = req.file;

    if (!file) {
      throw new AppError('No file uploaded', 400, 'NO_FILE');
    }

    try {
      console.log(`📄 Analyzing file: ${file.originalname} (${file.mimetype})`);

      // Extract file content based on type
      let fileContent: string;

      switch (file.mimetype) {
        case 'text/csv':
        case 'text/plain':
          fileContent = file.buffer.toString('utf-8');
          break;

        case 'application/pdf':
          const pdfData = await pdf(file.buffer);
          fileContent = pdfData.text;
          break;

        case 'application/vnd.ms-excel':
        case 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet':
          const workbook = new ExcelJS.Workbook();
          await workbook.xlsx.load(file.buffer);
          const worksheet = workbook.worksheets[0];
          
          // Convert worksheet to CSV format
          const rows: string[] = [];
          worksheet.eachRow((row) => {
            const values = row.values as any[];
            // Skip the first undefined element and convert to CSV
            rows.push(values.slice(1).join(','));
          });
          fileContent = rows.join('\n');
          break;

        case 'application/json':
          fileContent = file.buffer.toString('utf-8');
          break;

        default:
          throw new AppError('Unsupported file type', 400, 'UNSUPPORTED_FILE_TYPE');
      }

      // Limit content size for OpenAI (max ~8000 tokens)
      const MAX_CONTENT_LENGTH = 20000; // characters
      if (fileContent.length > MAX_CONTENT_LENGTH) {
        fileContent = fileContent.substring(0, MAX_CONTENT_LENGTH) + '\n\n[Content truncated due to size...]';
      }

      console.log(`📊 Extracted ${fileContent.length} characters from file`);

      // Send to OpenAI for analysis
      const completion = await openai.chat.completions.create({
        model: OPENAI_CONFIG.models.advanced, // Use GPT-4 for complex file analysis
        max_tokens: 1000,
        temperature: 0.7,
        messages: [
          {
            role: 'system',
            content: `You are a data analyst. Analyze the uploaded file and provide:
1. Summary of what the file contains
2. Key insights and patterns
3. Actionable recommendations

Be specific and data-driven.`,
          },
          {
            role: 'user',
            content: `Analyze this file (${file.originalname}):\n\n${fileContent}`,
          },
        ],
      });

      const analysis = completion.choices[0]?.message?.content || 'Could not analyze file.';

      res.status(200).json({
        status: 'success',
        data: {
          filename: file.originalname,
          fileType: file.mimetype,
          fileSize: file.size,
          analysis,
          timestamp: new Date().toISOString(),
        },
      });

    } catch (error: any) {
      console.error('❌ File analysis error:', error);

      if (error.code === 'context_length_exceeded') {
        throw new AppError(
          'File too large or complex to analyze. Please try a smaller file.',
          400,
          'FILE_TOO_COMPLEX'
        );
      }

      throw new AppError(
        'Failed to analyze uploaded file',
        500,
        'FILE_ANALYSIS_ERROR',
        { originalError: error.message }
      );
    }
  }
);

/**
 * Clear Chat History
 * DELETE /api/admin/ai-chatbot/history
 * 
 * Clears conversation history for current user
 */
export const clearChatHistory = asyncHandler(
  async (req: Request, res: Response) => {
    const userId = req.user?.id;

    if (!userId) {
      throw new AppError('Authentication required', 401, 'UNAUTHORIZED');
    }

    conversationHistory.delete(userId);

    res.status(200).json({
      status: 'success',
      message: 'Chat history cleared',
    });
  }
);

/**
 * Get Chat History
 * GET /api/admin/ai-chatbot/history
 * 
 * Retrieves conversation history for current user
 */
export const getChatHistory = asyncHandler(
  async (req: Request, res: Response) => {
    const userId = req.user?.id;

    if (!userId) {
      throw new AppError('Authentication required', 401, 'UNAUTHORIZED');
    }

    const history = conversationHistory.get(userId) || [];

    res.status(200).json({
      status: 'success',
      data: {
        history,
        messageCount: history.length,
      },
    });
  }
);

// ============================================
// HELPER FUNCTIONS
// ============================================

/**
 * Fetch dashboard context for chatbot
 */
async function fetchDashboardContext() {
  const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);

  try {
    const [orders, products, users] = await Promise.all([
      prisma.order.aggregate({
        where: { createdAt: { gte: thirtyDaysAgo } },
        _sum: { total: true },
        _count: { id: true },
      }),

      prisma.product.aggregate({
        where: { isActive: true },
        _count: { id: true },
      }),

      prisma.user.aggregate({
        where: { role: 'CUSTOMER' },
        _count: { id: true },
      }),
    ]);

    return {
      sales: {
        total: orders._sum.total || 0,
        ordersCount: orders._count.id,
        averageOrderValue: orders._count.id > 0 
          ? (orders._sum.total || 0) / orders._count.id 
          : 0,
      },
      products: {
        total: products._count.id,
      },
      customers: {
        total: users._count.id,
      },
      period: 'last 30 days',
    };
  } catch (error) {
    console.error('Error fetching dashboard context:', error);
    return {
      sales: { total: 0, ordersCount: 0, averageOrderValue: 0 },
      products: { total: 0 },
      customers: { total: 0 },
      period: 'last 30 days',
    };
  }
}

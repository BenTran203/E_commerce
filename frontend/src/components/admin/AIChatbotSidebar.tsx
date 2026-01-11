/**
 * AI CHATBOT SIDEBAR COMPONENT
 * 
 * Persistent sidebar on right side of dashboard
 * Features: Chat interface, file upload, context-aware responses
 */

"use client";

import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, Send, Paperclip, X, Trash2, Loader } from 'lucide-react';
import { sendChatMessage, analyzeFile, clearChatHistory, ChatMessage } from '@/lib/aiApi';
import toast from 'react-hot-toast';

export default function AIChatbotSidebar() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [fileLoading, setFileLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Auto-scroll to bottom when new messages arrive
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!input.trim() || loading) return;

    const userMessage: ChatMessage = {
      role: 'user',
      content: input.trim(),
      timestamp: new Date().toISOString(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setLoading(true);

    try {
      const response = await sendChatMessage(userMessage.content);
      
      const aiMessage: ChatMessage = {
        role: 'assistant',
        content: response.message,
        timestamp: response.timestamp,
      };

      setMessages(prev => [...prev, aiMessage]);
    } catch (error) {
      // Error already handled by API interceptor
      const errorMessage: ChatMessage = {
        role: 'assistant',
        content: 'Sorry, I encountered an error. Please try again.',
        timestamp: new Date().toISOString(),
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setLoading(false);
    }
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Reset input
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }

    setFileLoading(true);

    try {
      const response = await analyzeFile(file);

      // Add file upload message
      const fileMessage: ChatMessage = {
        role: 'user',
        content: `📎 Uploaded file: ${response.filename} (${(response.fileSize / 1024).toFixed(1)} KB)`,
        timestamp: new Date().toISOString(),
      };

      // Add AI analysis response
      const aiMessage: ChatMessage = {
        role: 'assistant',
        content: response.analysis,
        timestamp: response.timestamp,
      };

      setMessages(prev => [...prev, fileMessage, aiMessage]);
      toast.success('File analyzed successfully');
    } catch (error) {
      // Error already handled by API interceptor
    } finally {
      setFileLoading(false);
    }
  };

  const handleClearHistory = async () => {
    if (!confirm('Are you sure you want to clear chat history?')) return;

    try {
      await clearChatHistory();
      setMessages([]);
    } catch (error) {
      // Error handled by interceptor
    }
  };

  return (
    <div className="fixed right-0 top-0 h-screen w-80 bg-white border-l border-gray-200 shadow-lg flex flex-col z-40">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 p-4 text-white">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <MessageCircle size={24} />
            <h3 className="font-semibold text-lg">AI Assistant</h3>
          </div>
          {messages.length > 0 && (
            <button
              onClick={handleClearHistory}
              className="p-1.5 hover:bg-blue-500 rounded transition-colors"
              title="Clear history"
            >
              <Trash2 size={18} />
            </button>
          )}
        </div>
        <p className="text-xs text-blue-100">
          Ask me anything about your dashboard data
        </p>
      </div>

      {/* Messages Container */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center px-4">
            <MessageCircle className="w-16 h-16 text-gray-300 mb-4" />
            <p className="text-gray-600 text-sm mb-2">
              Start a conversation
            </p>
            <p className="text-gray-500 text-xs">
              Ask questions about your sales, orders, products, or customers
            </p>
          </div>
        ) : (
          <>
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[85%] rounded-lg px-4 py-2 ${
                    message.role === 'user'
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-900'
                  }`}
                >
                  <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                  {message.timestamp && (
                    <p
                      className={`text-xs mt-1 ${
                        message.role === 'user' ? 'text-blue-100' : 'text-gray-500'
                      }`}
                    >
                      {new Date(message.timestamp).toLocaleTimeString()}
                    </p>
                  )}
                </div>
              </div>
            ))}

            {loading && (
              <div className="flex justify-start">
                <div className="bg-gray-100 rounded-lg px-4 py-2">
                  <div className="flex items-center gap-2">
                    <Loader className="animate-spin text-gray-500" size={16} />
                    <span className="text-sm text-gray-600">Thinking...</span>
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </>
        )}
      </div>

      {/* File Upload Loading */}
      {fileLoading && (
        <div className="px-4 py-2 bg-blue-50 border-t border-blue-100">
          <div className="flex items-center gap-2 text-sm text-blue-700">
            <Loader className="animate-spin" size={16} />
            <span>Analyzing file...</span>
          </div>
        </div>
      )}

      {/* Input Area */}
      <div className="border-t border-gray-200 p-4">
        <form onSubmit={handleSendMessage} className="space-y-2">
          <div className="flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your message..."
              disabled={loading || fileLoading}
              className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 disabled:bg-gray-100"
            />
            <button
              type="submit"
              disabled={!input.trim() || loading || fileLoading}
              className="p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <Send size={20} />
            </button>
          </div>

          {/* File Upload Button */}
          <div>
            <input
              ref={fileInputRef}
              type="file"
              onChange={handleFileUpload}
              accept=".csv,.txt,.pdf,.xls,.xlsx,.json"
              className="hidden"
            />
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              disabled={fileLoading || loading}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 transition-colors"
            >
              <Paperclip size={16} />
              Upload File for Analysis
            </button>
            <p className="text-xs text-gray-500 mt-1">
              CSV, PDF, Excel, TXT, JSON (max 10MB)
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}

'use client';

import React, { useState, useRef, useEffect } from 'react';
import { useChat } from 'ai/react';
import { Search, ArrowRight, Loader2, RefreshCw, ExternalLink } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Alert, AlertDescription } from '@/components/ui/alert';

export default function PerplexityStyle() {
  const [isExpanded, setIsExpanded] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  const { 
    messages, 
    input, 
    handleInputChange, 
    handleSubmit,
    isLoading,
    error,
    reload
  } = useChat({
    api: '/api/chat',
    initialMessages: [
      {
        id: 'system-1',
        role: 'system',
        content: 'You are a knowledgeable search engine assistant. Provide direct, comprehensive answers with clear sourcing when possible. Focus on accuracy and clarity.'
      }
    ],
  });

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!input.trim()) return;
    setIsExpanded(true);
    handleSubmit(e);
  };

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  const generateSources = (content: string) => {
    if (!content) return [];
    return [
      {
        title: "Related Research Paper",
        url: "#",
        snippet: "Key findings from academic research...",
        confidence: 0.92
      },
      {
        title: "Recent Publication",
        url: "#",
        snippet: "Latest developments in the field...",
        confidence: 0.87
      }
    ];
  };

  return (
    <div className={`w-full transition-all duration-300 ${
      isExpanded ? 'h-screen p-4' : 'h-screen flex items-center justify-center p-4'
    }`}>
      <div className={`w-full max-w-3xl mx-auto transition-all duration-300 ${
        isExpanded ? 'mt-4' : ''
      }`}>
        <form onSubmit={handleFormSubmit} className="relative mb-6">
          <Input
            type="text"
            placeholder="Ask anything..."
            value={input}
            onChange={handleInputChange}
            className="w-full pl-10 pr-14 h-12 text-lg rounded-full border-2 border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
          />
          <Search className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
          <Button 
            type="submit"
            size="sm"
            className="absolute right-2 top-2 rounded-full"
            disabled={isLoading}
          >
            {isLoading ? (
              <Loader2 className="h-5 w-5 animate-spin" />
            ) : (
              <ArrowRight className="h-5 w-5" />
            )}
          </Button>
        </form>

        {isExpanded && (
          <div className="space-y-6 animate-fadeIn overflow-y-auto max-h-[calc(100vh-200px)]">
            {error ? (
              <Alert variant="destructive">
                <AlertDescription>
                  Failed to get response. Please try again.
                  <Button 
                    onClick={reload}
                    variant="outline" 
                    size="sm" 
                    className="ml-2"
                  >
                    <RefreshCw className="h-4 w-4 mr-1" />
                    Retry
                  </Button>
                </AlertDescription>
              </Alert>
            ) : (
              <>
                {messages.filter(m => m.role !== 'system').map((message, index) => (
                  <Card key={message.id}>
                    <CardContent className="p-6">
                      <div className="prose max-w-none">
                        <h2 className="text-xl font-semibold mb-4">
                          {message.role === 'user' ? 'Question' : 'Answer'}
                        </h2>
                        <div className="whitespace-pre-wrap">{message.content}</div>
                      </div>
                      {message.role === 'assistant' && (
                        <div className="mt-4 space-y-4">
                          <h3 className="text-lg font-semibold">Sources & Citations</h3>
                          {generateSources(message.content).map((source, sourceIndex) => (
                            <Alert key={sourceIndex} className="flex items-start gap-4">
                              <div className="flex-grow">
                                <h4 className="font-semibold flex items-center gap-2">
                                  {source.title}
                                  <span className="text-sm text-gray-500">
                                    {(source.confidence * 100).toFixed(0)}% relevance
                                  </span>
                                </h4>
                                <AlertDescription className="mt-1">
                                  {source.snippet}
                                </AlertDescription>
                              </div>
                              <Button variant="ghost" size="sm">
                                <ExternalLink className="h-4 w-4" />
                              </Button>
                            </Alert>
                          ))}
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))}
                {isLoading && (
                  <div className="flex items-center gap-2 text-gray-600">
                    <Loader2 className="h-5 w-5 animate-spin" />
                    <span>Searching and analyzing...</span>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
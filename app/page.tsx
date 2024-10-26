"use client";

import { useChat, Message } from "ai/react";
import { useEffect, useRef, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Send, Image as ImageIcon, Video, Plus } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { SourceCard } from "@/components/source-card";
import { SourceCardSkeleton } from "@/components/source-card-skeleton";
import { MarkdownContent } from "@/components/markdown-content";
import { ContentSkeleton } from "@/components/content-skeleton";

/**
 * Main Chat Interface Component
 * 
 * This component implements a full-featured chat interface with:
 * - Real-time message streaming
 * - Loading states with skeletons
 * - Source cards for reference materials
 * - Media search capabilities
 * - Responsive layout
 */
export default function Page() {
  // Track which message is currently being streamed
  const [pendingMessageId, setPendingMessageId] = useState<string | null>(null);
  // Reference to the input area for scrolling
  const inputRef = useRef<HTMLDivElement | null>(null);
  // Track if we're waiting for an initial response
  const [waitingForResponse, setWaitingForResponse] = useState(false);
  
  /**
   * Initialize chat functionality with vercel/ai
   * Handles message state, input management, and loading states
   */
  const { messages, input, handleInputChange, isLoading, append } = useChat({
    api: "/api/chat",
    onResponse: () => {
      // When we get a response, track the message being streamed
      const lastMessage = messages[messages.length - 1];
      if (lastMessage?.role === 'assistant') {
        setPendingMessageId(lastMessage.id);
      }
      setWaitingForResponse(false);
    },
    onFinish: () => {
      // Clean up after streaming finishes
      setPendingMessageId(null);
      setWaitingForResponse(false);
      // Scroll to input
      if (inputRef.current) {
        inputRef.current.scrollIntoView({ behavior: "smooth" });
      }
    },
  });

  /**
   * Handle form submission for new messages
   * Prevents empty submissions and manages loading states
   */
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!input.trim()) return;

    setWaitingForResponse(true);
    await append({
      role: 'user',
      content: input.trim(),
    });
  };

  /**
   * Render a user message
   * Displays the user's input as a large heading
   */
  const renderUserMessage = (content: string) => (
    <div className="mb-8">
      <h1 className="text-3xl font-semibold text-zinc-100">{content}</h1>
    </div>
  );

  /**
   * Render an assistant message with loading states
   * Includes sources, answer content, and media search options
   */
  const renderAssistantMessage = (message: Message) => {
    // Determine loading states
    const isStreaming = message.id === pendingMessageId;
    const isLastMessage = message.id === messages[messages.length - 1]?.id;
    
    // Show skeleton for the latest message that's not yet streaming
    const shouldShowSkeleton = (waitingForResponse || isLoading) && 
      isLastMessage && 
      !isStreaming && 
      messages[messages.length - 1]?.role === 'user';

    return (
      <div className="grid grid-cols-12 gap-6">
        {/* Left Column - Sources and Answer */}
        <div className="col-span-8">
          {/* Sources Section */}
          <div className="mb-6">
            <div className="flex items-center gap-2 text-zinc-400 mb-3">
              <Plus className="h-4 w-4" />
              <span className="text-sm font-medium">Sources</span>
            </div>
            <ScrollArea className="w-full whitespace-nowrap pb-4">
              <div className="flex gap-4">
                {shouldShowSkeleton ? (
                  Array.from({ length: 4 }, (_, i) => (
                    <SourceCardSkeleton key={i} />
                  ))
                ) : (
                  Array.from({ length: 6 }, (_, i) => (
                    <SourceCard
                      key={i}
                      title={`Source Title ${i + 1}`}
                      domain={`source${i + 1}.com`}
                      imageUrl="/api/placeholder/280/158"
                      index={i}
                    />
                  ))
                )}
              </div>
            </ScrollArea>
          </div>

          {/* Answer Section */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-zinc-400">
              <Plus className="h-4 w-4" />
              <span className="text-sm font-medium">Answer</span>
            </div>
            {shouldShowSkeleton ? (
              <ContentSkeleton />
            ) : (
              <MarkdownContent content={message.content} />
            )}
          </div>
        </div>

        {/* Right Column - Media Preview and Search */}
        <div className="col-span-4 space-y-4">
          {/* Preview Area */}
          <div className="aspect-video bg-zinc-800 rounded-lg overflow-hidden">
            {shouldShowSkeleton ? (
              <div className="w-full h-full bg-zinc-800 animate-pulse" />
            ) : (
              <img
                src="/temporary.svg"
                alt="Content preview"
                className="object-cover"
              />
            )}
          </div>
          {/* Media Search Buttons */}
          <div className="space-y-2">
            <Button
              variant="outline"
              className="w-full justify-start gap-2 text-zinc-400 border-zinc-800 hover:bg-zinc-800/50"
              disabled={shouldShowSkeleton}
            >
              <ImageIcon className="h-4 w-4" />
              Search Images
            </Button>
            <Button
              variant="outline"
              className="w-full justify-start gap-2 text-zinc-400 border-zinc-800 hover:bg-zinc-800/50"
              disabled={shouldShowSkeleton}
            >
              <Video className="h-4 w-4" />
              Search Videos
            </Button>
          </div>
        </div>
      </div>
    );
  };

  /**
   * Render initial loading state
   * Shows when waiting for the first response
   */
  const renderInitialSkeleton = () => {
    const isFirstMessage = messages.length === 1 && messages[0].role === 'user';
    if (!waitingForResponse || !isFirstMessage) return null;
    
    return (
      <div className="grid grid-cols-12 gap-6">
        <div className="col-span-8">
          {/* Sources Section Skeleton */}
          <div className="mb-6">
            <div className="flex items-center gap-2 text-zinc-400 mb-3">
              <Plus className="h-4 w-4" />
              <span className="text-sm font-medium">Sources</span>
            </div>
            <ScrollArea className="w-full whitespace-nowrap pb-4">
              <div className="flex gap-4">
                {Array.from({ length: 4 }, (_, i) => (
                  <SourceCardSkeleton key={i} />
                ))}
              </div>
            </ScrollArea>
          </div>
          
          {/* Answer Section Skeleton */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-zinc-400">
              <Plus className="h-4 w-4" />
              <span className="text-sm font-medium">Answer</span>
            </div>
            <ContentSkeleton />
          </div>
        </div>

        {/* Right Side Skeleton */}
        <div className="col-span-4 space-y-4">
          <div className="aspect-video bg-zinc-800 rounded-lg overflow-hidden">
            <div className="w-full h-full bg-zinc-800 animate-pulse" />
          </div>
          <div className="space-y-2">
            <Button
              variant="outline"
              className="w-full justify-start gap-2 text-zinc-400 border-zinc-800 hover:bg-zinc-800/50"
              disabled={true}
            >
              <ImageIcon className="h-4 w-4" />
              Search Images
            </Button>
            <Button
              variant="outline"
              className="w-full justify-start gap-2 text-zinc-400 border-zinc-800 hover:bg-zinc-800/50"
              disabled={true}
            >
              <Video className="h-4 w-4" />
              Search Videos
            </Button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="flex flex-col justify-between min-h-screen bg-black">
      {/* Main Chat Area */}
      <ScrollArea className="flex-grow px-6 py-8 pb-32">
        {/* Render Messages */}
        {messages.map((message) => (
          <div key={message.id}>
            {message.role === "user"
              ? renderUserMessage(message.content)
              : renderAssistantMessage(message)}
          </div>
        ))}
        
        {/* Initial Loading State */}
        {renderInitialSkeleton()}
        
        {/* Scroll Anchor */}
        <div ref={inputRef} />
      </ScrollArea>

      {/* Input Form */}
      <form
        onSubmit={handleSubmit}
        className={cn(
          "w-full transition-all duration-300",
          messages.length === 0
            ? "absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 max-w-2xl w-full px-4"
            : "fixed bottom-0 left-0 bg-gradient-to-t from-black via-black/90 to-transparent backdrop-blur-sm p-4"
        )}
      >
        <div className="flex gap-2 max-w-2xl mx-auto">
          <Input
            name="prompt"
            value={input}
            onChange={handleInputChange}
            placeholder="Ask anything..."
            className="flex-grow bg-zinc-900 border-zinc-800 text-zinc-100 placeholder:text-zinc-500 focus:border-zinc-700"
            disabled={isLoading}
          />
          <Button
            type="submit"
            size="icon"
            className="bg-zinc-800 hover:bg-zinc-700 text-zinc-100"
            disabled={isLoading}
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </form>
    </div>
  );
}
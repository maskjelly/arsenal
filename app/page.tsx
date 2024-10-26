"use client";

import { useChat } from "ai/react";
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

export default function Page() {
  const { messages, input, handleInputChange, handleSubmit } = useChat({
    api: "/api/chat",
    keepLastMessageOnError: false,
  });

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const inputRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (messages.length > 0 && inputRef.current) {
      inputRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    await handleSubmit(e); // Wait for the submission to complete
    setIsLoading(false);
  };

  const renderUserMessage = (content: string) => (
    <div className="mb-8">
      <h1 className="text-3xl font-semibold text-zinc-100">{content}</h1>
    </div>
  );

  const renderAssistantMessage = (messageContent: string) => (
    <div className="grid grid-cols-12 gap-6">
      <div className="col-span-8">
        {/* Sources Section */}
        <div className="mb-6">
          <div className="flex items-center gap-2 text-zinc-400 mb-3">
            <Plus className="h-4 w-4" />
            <span className="text-sm font-medium">Sources</span>
          </div>
          <ScrollArea className="w-full whitespace-nowrap pb-4">
            <div className="flex gap-4">
              {isLoading ? (
                Array.from({ length: 4 }, (_, i) => (
                  <SourceCardSkeleton key={i} />
                ))
              ) : (
                Array.from({ length: 6 }, (_, i) => (
                  <SourceCard
                    key={i}
                    title={`Source Title ${i + 1} - With a longer description that might wrap to two lines`}
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
          {isLoading ? (
            <ContentSkeleton />
          ) : (
            <MarkdownContent content={messageContent} />
          )}
        </div>
      </div>

      {/* Right Side Content */}
      <div className="col-span-4 space-y-4">
        <div className="aspect-video bg-zinc-800 rounded-lg overflow-hidden">
          {isLoading ? (
            <div className="w-full h-full bg-zinc-800 animate-pulse" />
          ) : (
            <img
              src="/api/placeholder/800/450"
              alt="Content preview"
              className="w-full h-full object-cover"
            />
          )}
        </div>
        <div className="space-y-2">
          <Button
            variant="outline"
            className="w-full justify-start gap-2 text-zinc-400 border-zinc-800 hover:bg-zinc-800/50"
          >
            <ImageIcon className="h-4 w-4" />
            Search Images
          </Button>
          <Button
            variant="outline"
            className="w-full justify-start gap-2 text-zinc-400 border-zinc-800 hover:bg-zinc-800/50"
          >
            <Video className="h-4 w-4" />
            Search Videos
          </Button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="flex flex-col justify-between min-h-screen bg-black">
      <ScrollArea className="flex-grow px-6 py-8 pb-32">
        {messages.map((message) => (
          <div key={message.id}>
            {message.role === "user"
              ? renderUserMessage(message.content)
              : renderAssistantMessage(message.content)}
          </div>
        ))}
        <div ref={inputRef} />
      </ScrollArea>

      <form
        onSubmit={handleFormSubmit}
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

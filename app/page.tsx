"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { searchTavily } from "@/app/actions/action";
import { useChat } from "ai/react";
import { TavilySearchResponse } from "./lib/types";

const ImageItem = ({
  imageUrl,
  imageDescription,
  index,
}: {
  imageUrl: string;
  imageDescription: string | null;
  index: number;
}) => {
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  if (isError) {
    return (
      <div className="h-48 w-full bg-gray-800 rounded-lg flex items-center justify-center">
        <p className="text-sm text-gray-400">Failed to load image</p>
      </div>
    );
  }

  return (
    <div className="group overflow-hidden rounded-lg transition-all hover:ring-2 hover:ring-white/50">
      <div className="relative h-48 w-full">
        <Image
          src={imageUrl}
          alt={imageDescription || `Search result image ${index + 1}`}
          fill
          className={`object-cover transition-transform group-hover:scale-105 ${
            isLoading ? "blur-sm" : "blur-0"
          }`}
          onError={() => {
            console.error(`Failed to load image: ${imageUrl}`);
            setIsError(true);
          }}
          onLoad={() => setIsLoading(false)}
          unoptimized
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>
      {imageDescription && (
        <div className="p-3">
          <p className="line-clamp-2 text-sm text-gray-300">
            {imageDescription}
          </p>
        </div>
      )}
    </div>
  );
};

const ImageGallery = ({ images }: { images: any[] }) => {
  if (!images?.length) return null;

  return (
    <div className="mt-6">
      <h3 className="text-sm font-medium text-gray-400 mb-4">Related Images</h3>
      <div className="grid grid-cols-2 gap-4">
        {images.map((image, idx) => {
          const imageUrl = typeof image === "string" ? image : image?.url;
          const imageDescription =
            typeof image === "string" ? null : image?.description;

          if (!imageUrl) return null;

          return (
            <ImageItem
              key={`${idx}-${imageUrl}`}
              imageUrl={imageUrl}
              imageDescription={imageDescription}
              index={idx}
            />
          );
        })}
      </div>
    </div>
  );
};

const SourceCard = ({ title, url }: { title: string; url: string }) => (
  <a 
    href={url} 
    target="_blank" 
    rel="noopener noreferrer" 
    className="block p-3 rounded-lg bg-[#1C1C1C] hover:bg-[#252525] transition-colors"
  >
    <h3 className="text-sm font-medium text-gray-200 line-clamp-2 mb-1">{title}</h3>
    <div className="text-xs text-gray-500 line-clamp-1">{url}</div>
  </a>
);

const SkeletonLoader = () => (
  <div className="space-y-6">
    <div className="animate-pulse space-y-4 bg-[#1C1C1C] rounded-lg p-4">
      <div className="flex items-center gap-2 mb-2">
        <div className="h-2 w-2 rounded-full bg-green-500/50"></div>
        <div className="h-4 w-20 bg-gray-800 rounded"></div>
      </div>
      <div className="space-y-2">
        <div className="h-4 bg-gray-800 rounded w-3/4"></div>
        <div className="h-4 bg-gray-800 rounded w-5/6"></div>
        <div className="h-4 bg-gray-800 rounded w-2/3"></div>
      </div>
    </div>
    
    <div className="space-y-2">
      <div className="h-4 w-20 bg-gray-800 rounded"></div>
      <div className="grid gap-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="animate-pulse p-4 rounded-lg bg-[#1C1C1C]">
            <div className="h-4 bg-gray-800 rounded w-3/4 mb-2"></div>
            <div className="h-3 bg-gray-800 rounded w-5/6 mb-2"></div>
            <div className="h-3 bg-gray-800 rounded w-1/2"></div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

export default function SearchPage() {
  const { messages, input, handleInputChange, handleSubmit } = useChat();
  const [isLoading, setIsLoading] = useState(false);
  const [searchResults, setSearchResults] = useState<TavilySearchResponse | null>(
    null
  );

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    setIsLoading(true);
    setSearchResults(null);

    try {
      const result = await searchTavily(input, "advanced");
      if (result.success && result.data) {
        setSearchResults(result.data);
      }
      handleSubmit(e);
    } catch (err) {
      console.error("Search error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#111111]">
      <header className="border-b border-gray-800 bg-[#111111]">
        <div className="mx-auto max-w-4xl px-4 py-3">
          <form onSubmit={handleSearch}>
            <div className="relative">
              <Input
                type="text"
                value={input}
                onChange={handleInputChange}
                placeholder="Ask anything..."
                className="w-full rounded-lg border-gray-800 bg-[#1C1C1C] pl-10 pr-4 py-2 text-gray-100 placeholder-gray-500 focus:border-gray-700 focus:ring-1 focus:ring-gray-700"
              />
              <Search
                className="absolute left-3 top-1/2 -translate-y-1/2 transform text-gray-500"
                size={18}
              />
              <Button
                type="submit"
                disabled={isLoading}
                className="absolute right-2 top-1/2 -translate-y-1/2 transform rounded-md bg-gray-800 px-3 py-1 text-sm text-gray-300 hover:bg-gray-700"
              >
                {isLoading ? "Searching..." : "Search"}
              </Button>
            </div>
          </form>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          <div className="md:col-span-3 space-y-4">
            <h3 className="text-sm font-medium text-gray-400">Sources</h3>
            {isLoading ? (
              <div className="space-y-3">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="animate-pulse p-3 rounded-lg bg-[#1C1C1C]">
                    <div className="h-4 bg-gray-800 rounded w-3/4 mb-2"></div>
                    <div className="h-3 bg-gray-800 rounded w-1/2"></div>
                  </div>
                ))}
              </div>
            ) : (
              searchResults?.results && (
                <div className="space-y-3 sticky top-4">
                  {searchResults.results.map((result, idx) => (
                    <SourceCard
                      key={idx}
                      title={result.title}
                      url={result.url}
                    />
                  ))}
                </div>
              )
            )}
          </div>

          <div className="md:col-span-6 space-y-6">
            {messages.map((message, index) => (
              <div
                key={message.id}
                className={`rounded-lg p-4 ${
                  message.role === "user"
                    ? "bg-[#1C1C1C] text-gray-300"
                    : "bg-[#1C1C1C] text-gray-100"
                }`}
              >
                {message.role === "user" ? (
                  <div className="flex items-center gap-2 mb-2">
                    <div className="h-2 w-2 rounded-full bg-blue-500"></div>
                    <span className="text-sm font-medium text-gray-400">
                      Question
                    </span>
                  </div>
                ) : (
                  <div className="flex items-center gap-2 mb-2">
                    <div className="h-2 w-2 rounded-full bg-green-500"></div>
                    <span className="text-sm font-medium text-gray-400">
                      Answer
                    </span>
                  </div>
                )}
                <div className="prose prose-invert max-w-none">
                  <p className="text-sm leading-relaxed">{message.content}</p>
                </div>
              </div>
            ))}

            {(isLoading || (messages.length > 0 && messages[messages.length - 1]?.role === "user")) && (
              <div className="animate-pulse space-y-4 bg-[#1C1C1C] rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <div className="h-2 w-2 rounded-full bg-green-500/50"></div>
                  <div className="h-4 w-20 bg-gray-800 rounded"></div>
                </div>
                <div className="space-y-2">
                  <div className="h-4 bg-gray-800 rounded w-3/4"></div>
                  <div className="h-4 bg-gray-800 rounded w-5/6"></div>
                  <div className="h-4 bg-gray-800 rounded w-2/3"></div>
                </div>
              </div>
            )}
          </div>

          <div className="md:col-span-3">
            {isLoading ? (
              <div className="sticky top-4 space-y-4">
                <div className="h-4 w-32 bg-gray-800 rounded"></div>
                <div className="grid grid-cols-1 gap-4">
                  {[1, 2].map((i) => (
                    <div key={i} className="aspect-square bg-[#1C1C1C] rounded-lg animate-pulse" />
                  ))}
                </div>
              </div>
            ) : (
              searchResults?.images && (
                <div className="sticky top-4">
                  <ImageGallery images={searchResults.images} />
                </div>
              )
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

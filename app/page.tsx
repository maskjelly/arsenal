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
      <div className="h-48 w-full bg-neutral-50 rounded-lg flex items-center justify-center">
        <p className="text-sm text-neutral-500">Failed to load image</p>
      </div>
    );
  }

  return (
    <div className="group overflow-hidden rounded-lg transition-all hover:ring-2 hover:ring-black/50">
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
          <p className="line-clamp-2 text-sm text-neutral-600">
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
      <h3 className="text-sm font-medium text-neutral-500 uppercase tracking-wider mb-4">Related Images</h3>
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
    className="block p-3 rounded-lg bg-neutral-50 border border-neutral-200 hover:bg-neutral-100 transition-colors"
  >
    <h3 className="text-sm font-medium text-neutral-600 line-clamp-2 mb-1">{title}</h3>
    <div className="text-xs text-neutral-500 line-clamp-1">{url}</div>
  </a>
);

const SkeletonLoader = () => (
  <div className="space-y-6">
    <div className="animate-pulse space-y-4 bg-neutral-50 border border-neutral-200 rounded-lg p-4">
      <div className="flex items-center gap-2 mb-2">
        <div className="h-2 w-2 rounded-full bg-emerald-500/50"></div>
        <div className="h-4 w-20 bg-neutral-200 rounded"></div>
      </div>
      <div className="space-y-2">
        <div className="h-4 bg-neutral-200 rounded w-3/4"></div>
        <div className="h-4 bg-neutral-200 rounded w-5/6"></div>
        <div className="h-4 bg-neutral-200 rounded w-2/3"></div>
      </div>
    </div>
    
    <div className="space-y-2">
      <div className="h-4 w-20 bg-neutral-200 rounded"></div>
      <div className="grid gap-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="animate-pulse p-4 rounded-lg bg-neutral-50 border border-neutral-100" />
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
    <div className="min-h-screen bg-neutral-50">
      <header className="border-b border-neutral-200 bg-white sticky top-0 z-10">
        <div className="mx-auto max-w-5xl px-4 py-4">
          <form onSubmit={handleSearch}>
            <div className="relative max-w-2xl mx-auto">
              <Input
                type="text"
                value={input}
                onChange={handleInputChange}
                placeholder="Ask anything..."
                className="w-full rounded-2xl border-2 border-neutral-200 bg-white pl-12 pr-20 py-4 text-lg text-neutral-900 placeholder-neutral-500 focus:border-black focus:ring-0 shadow-sm hover:border-neutral-300 transition-colors"
              />
              <Search
                className="absolute left-4 top-1/2 -translate-y-1/2 transform text-neutral-400"
                size={20}
              />
              <Button
                type="submit"
                disabled={isLoading}
                className="absolute right-2 top-1/2 -translate-y-1/2 transform rounded-xl bg-black px-6 py-2 text-sm font-medium text-white hover:bg-neutral-800 transition-colors"
              >
                {isLoading ? "Searching..." : "Ask"}
              </Button>
            </div>
          </form>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-4 py-8">
        <div className="grid grid-cols-12 gap-8">
          {/* Main chat column */}
          <div className="col-span-12 lg:col-span-8 space-y-6">
            <div className="bg-white rounded-2xl border-2 border-neutral-200 p-6 space-y-6">
              {messages.map((message, index) => (
                <div
                  key={message.id}
                  className={`${
                    message.role === "user"
                      ? "bg-neutral-50 border border-neutral-200 rounded-xl p-4"
                      : "relative"
                  }`}
                >
                  {message.role === "assistant" && (
                    <div className="absolute -left-3 top-0 w-6 h-6 rounded-full bg-black text-white flex items-center justify-center text-xs font-medium">
                      AI
                    </div>
                  )}
                  <div className={message.role === "assistant" ? "pl-6" : ""}>
                    {message.role === "user" ? (
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium text-neutral-900">
                          {message.content}
                        </span>
                      </div>
                    ) : (
                      <div className="prose prose-neutral max-w-none">
                        <p className="text-base leading-relaxed">{message.content}</p>
                      </div>
                    )}
                  </div>
                </div>
              ))}

              {(isLoading || (messages.length > 0 && messages[messages.length - 1]?.role === "user")) && (
                <div className="animate-pulse relative">
                  <div className="absolute -left-3 top-0 w-6 h-6 rounded-full bg-black/50 flex items-center justify-center">
                    <div className="w-4 h-4 rounded-full border-2 border-white border-t-transparent animate-spin"></div>
                  </div>
                  <div className="pl-6 space-y-3">
                    <div className="h-4 bg-neutral-100 rounded-full w-3/4"></div>
                    <div className="h-4 bg-neutral-100 rounded-full w-5/6"></div>
                    <div className="h-4 bg-neutral-100 rounded-full w-2/3"></div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Sidebar with sources and images */}
          <div className="col-span-12 lg:col-span-4 space-y-6">
            {/* Sources section */}
            <div className="bg-white rounded-2xl border-2 border-neutral-200 p-6">
              <h3 className="text-xs font-medium text-neutral-500 uppercase tracking-wider mb-4">Sources</h3>
              {isLoading ? (
                <div className="space-y-4">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="animate-pulse rounded-xl bg-neutral-50 p-4">
                      <div className="h-4 bg-neutral-200 rounded-full w-3/4 mb-2"></div>
                      <div className="h-3 bg-neutral-200 rounded-full w-1/2"></div>
                    </div>
                  ))}
                </div>
              ) : (
                searchResults?.results && (
                  <div className="space-y-3">
                    {searchResults.results.map((result, idx) => (
                      <a
                        key={idx}
                        href={result.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block p-4 rounded-xl bg-neutral-50 hover:bg-neutral-100 transition-colors border border-transparent hover:border-neutral-200"
                      >
                        <h4 className="text-sm font-medium text-neutral-900 line-clamp-2 mb-1">
                          {result.title}
                        </h4>
                        <p className="text-xs text-neutral-500 line-clamp-2">
                          {result.content}
                        </p>
                      </a>
                    ))}
                  </div>
                )
              )}
            </div>

            {/* Images section */}
            {(searchResults?.images?.length ?? 0) > 0 && (
              <div className="bg-white rounded-2xl border-2 border-neutral-200 p-6">
                <h3 className="text-xs font-medium text-neutral-500 uppercase tracking-wider mb-4">Related Images</h3>
                <div className="grid grid-cols-2 gap-3">
                  {searchResults?.images?.slice(0, 4).map((image, idx) => {
                    const imageUrl = typeof image === "string" ? image : image?.url;
                    const imageDescription = typeof image === "string" ? null : image?.title;
                    
                    return (
                      <div key={idx} className="group relative aspect-square rounded-xl overflow-hidden bg-neutral-100 border border-neutral-200">
                        <Image
                          src={imageUrl || ""}
                          alt={imageDescription || `Related image ${idx + 1}`}
                          fill
                          className="object-cover transition-transform group-hover:scale-105"
                          unoptimized
                        />
                        {imageDescription && (
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                            <p className="absolute bottom-0 left-0 right-0 p-4 text-xs text-white line-clamp-2">
                              {imageDescription}
                            </p>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

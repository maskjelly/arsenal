"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { searchTavily } from "@/app/actions/action";
import { TavilySearchResponse } from "./lib/types";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Alert } from "@/components/ui/alert";
import { Toast } from "@/components/ui/toast";
import { toast, useToast } from "@/hooks/use-toast"
import Updates from "@/components/updates";

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
    <div className="mb-6">
      <h2 className="mb-4 font-bold text-white">
        Related Images ({images.length}):
      </h2>
      <div className="grid grid-cols-1 gap-4">
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

const SkeletonLoader = () => (
  <div className="animate-pulse space-y-6">
    <div className="h-8 w-3/4 bg-gray-700 rounded"></div>
    <div className="space-y-4">
      <div className="h-4 bg-gray-700 rounded"></div>
      <div className="h-4 bg-gray-700 rounded w-5/6"></div>
      <div className="h-4 bg-gray-700 rounded w-4/6"></div>
    </div>
    <div className="space-y-4">
      <div className="h-4 bg-gray-700 rounded"></div>
      <div className="h-4 bg-gray-700 rounded w-5/6"></div>
      <div className="h-4 bg-gray-700 rounded w-4/6"></div>
    </div>
  </div>
);

export default function SearchPage() {
  const [query, setQuery] = useState<string>("");
  const [results, setResults] = useState<TavilySearchResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [strength, setStrength] = useState<string>("advanced");

  const handleSearch = async (e: React.FormEvent) => {
    
    e.preventDefault();

    if (!query.trim()) {


      // toast({
      //   title: "Please enter a search query",
      //   description: "The search field cannot be empty.",
      //   variant: "destructive",
      // });
      // return;
    }
    setIsLoading(true);
    setError(null);
    setResults(null);

    try {
      const result = await searchTavily(query, strength);

      console.log(strength);

      if (result.success && result.data) {
        console.log("Search Results:", result.data);
        setResults(result.data);
      } else {
        setError(result.error);
      }
    } catch (err) {
      setError("An error occurred during search");
      console.error("Search error:", err);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="min-h-screen bg-black text-white">
      <div className="mx-auto max-w-7xl p-4">

        <form onSubmit={handleSearch} className="mb-8">
          <div className="relative mx-auto max-w-2xl">
            <Input
              type="text"
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
              }}
              placeholder="Ask anything..."
              className="w-full rounded-full border-gray-700 bg-gray-900 pl-10 pr-4 py-2 text-white placeholder-gray-400 focus:border-transparent focus:ring-2 focus:ring-white/50"
            />
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 transform text-gray-400"
              size={20}
            />
            <Button
              type="submit"
              disabled={isLoading}
              className="absolute right-2 top-1/2 -translate-y-1/2 transform rounded-full bg-white px-4 py-1 text-sm text-black hover:bg-gray-200"
            >
              {isLoading ? "Searching..." : "Search"}
            </Button>
          </div>
          <div className="mt-4 flex items-center justify-center">
            <div className="flex items-center space-x-2">
              <Switch
                id="advanced-mode"
                checked={strength === "advanced"}
                onCheckedChange={(checked) =>
                  setStrength(checked ? "advanced" : "basic")
                }
                className="bg-gray-700 data-[state=checked]:bg-white"
                disabled={isLoading}
              />
              <Label htmlFor="advanced-mode" className="text-sm text-gray-300">
                Advanced Mode
              </Label>
            </div>
          </div>
          <p className="mt-2 text-center text-xs text-gray-500">
            Query is now in {strength} search mode (advanced mode will take
            longer to load)
          </p>
        </form>

        {error && (
          <div className="mb-4 rounded-lg border border-gray-700 bg-gray-900 p-4 text-white">
            {error}
          </div>
        )}

        {isLoading ? (
          <div className="flex flex-col gap-8 md:flex-row">
            <div className="flex-grow space-y-6 md:w-2/3">
              <SkeletonLoader />
            </div>
            <div className="md:w-1/3">
              <div className="mb-6">
                <div className="h-8 w-1/2 bg-gray-700 rounded mb-4"></div>
                <div className="grid grid-cols-1 gap-4">
                  <div className="h-48 bg-gray-700 rounded"></div>
                  <div className="h-48 bg-gray-700 rounded"></div>
                </div>
              </div>
            </div>
          </div>
        ) : results ? (
          <div className="flex flex-col gap-8 md:flex-row">
            <div className="flex-grow space-y-6 md:w-2/3">
              <h1 className="break-words text-4xl font-bold md:text-6xl">
                {query}
              </h1>

              {results.answer && (
                <div className="rounded-lg bg-gray-900 p-6 shadow-md">
                  <h2 className="mb-2 text-xl font-bold">Answer:</h2>
                  <p className="text-gray-300">{results.answer}</p>
                </div>
              )}

              <div className="rounded-lg bg-gray-900 p-6 shadow-md">
                <h2 className="mb-4 text-xl font-bold">Sources</h2>
                <div className="space-y-4">
                  {results.results.map((result, index) => (
                    <div
                      key={index}
                      className="rounded-lg border border-gray-700 bg-gray-800 p-4 transition-colors hover:border-gray-500"
                    >
                      <h3 className="mb-2 text-lg font-bold">
                        <a
                          href={result.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-white hover:underline hover:text-blue-300"
                        >
                          {result.title}
                        </a>
                      </h3>
                      <p className="mb-2 text-gray-300">{result.content}</p>
                      <div className="text-sm text-gray-400">
                        Relevance score: {(result.score * 100).toFixed(1)}%
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="text-sm text-gray-400">
                Response time: {results.response_time.toFixed(2)}s
              </div>
            </div>

            {results.images && (
              <div className="md:w-1/3">
                <ImageGallery images={results.images} />
              </div>
            )}
          </div>
        ) : null}
      </div>
    </div>
  );
}

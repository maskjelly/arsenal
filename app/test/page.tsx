'use client'
import { useState } from 'react'
import Image from 'next/image'
import { searchTavily } from './actions/getUrl'
import type { TavilySearchResponse } from './lib/types'

// ImageItem Component
const ImageItem = ({ imageUrl, imageDescription, index }: { 
  imageUrl: string; 
  imageDescription: string | null; 
  index: number;
}) => {
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  if (isError) return null;
  if (!imageUrl) return null;

  return (
    <div className="group rounded-lg overflow-hidden shadow-md bg-white transition-all hover:shadow-lg">
      <div className="relative w-full h-48">
        <Image
          src={imageUrl}
          alt={imageDescription || `Search result image ${index + 1}`}
          fill
          className={`object-cover transition-transform group-hover:scale-105 ${
            isLoading ? 'blur-sm' : 'blur-0'
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
          <p className="text-sm text-gray-600 line-clamp-2">
            {imageDescription}
          </p>
        </div>
      )}
    </div>
  );
};

// ImageGallery Component
const ImageGallery = ({ images } : { images: any[] }) => {
  if (!images?.length) return null;

  return (
    <div className="mb-6">
      <h2 className="font-bold mb-4">Related Images ({images.length}):</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {images.map((image, idx) => {
          const imageUrl = typeof image === 'string' ? image : image?.url;
          const imageDescription = typeof image === 'string' ? null : image?.description;
          
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

// Main SearchPage Component
export default function SearchPage() {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<TavilySearchResponse | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [debug, setDebug] = useState<string>('')

  async function handleSearch(e: React.FormEvent) {
    e.preventDefault()
    setIsLoading(true)
    setError(null)
    setDebug('')

    try {
      const result = await searchTavily(query)
      
      if (result.success && result.data) {
        console.log('Search Results:', result.data)
        setResults(result.data)
        setDebug(JSON.stringify(result.data, null, 2))
      } else {
        setError(result.error)
      }
    } catch (err) {
      setError('An error occurred during search')
      console.error('Search error:', err)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <form onSubmit={handleSearch} className="mb-8">
        <div className="flex gap-2">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Enter your search query..."
            className="flex-1 p-2 border rounded"
          />
          <button
            type="submit"
            disabled={isLoading}
            className="px-4 py-2 bg-blue-500 text-white rounded disabled:bg-blue-300"
          >
            {isLoading ? 'Searching...' : 'Search'}
          </button>
        </div>
      </form>

      {error && (
        <div className="p-4 mb-4 bg-red-100 text-red-700 rounded">
          {error}
        </div>
      )}

      {results && (
        <div className="space-y-6">
          <div className="text-sm text-gray-500">
            Response time: {results.response_time.toFixed(2)}s
          </div>

          {results.answer && (
            <div className="p-4 bg-blue-50 rounded">
              <h2 className="font-bold mb-2">Answer:</h2>
              <p>{results.answer}</p>
            </div>
          )}

          {/* Image Gallery */}
          {results.images && <ImageGallery images={results.images} />}

          <div className="space-y-4">
            {results.results.map((result, index) => (
              <div key={index} className="p-4 border rounded hover:bg-gray-50">
                <h2 className="text-xl font-bold mb-2">
                  <a 
                    href={result.url} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="text-blue-600 hover:underline"
                  >
                    {result.title}
                  </a>
                </h2>
                <p className="text-gray-600 mb-2">{result.content}</p>
                <div className="text-sm text-gray-500">
                  Relevance score: {(result.score * 100).toFixed(1)}%
                </div>
              </div>
            ))}
          </div>

          {debug && (
            <div className="mt-8">
              <div className="mb-4 p-4 bg-gray-100 rounded overflow-auto">
                <h3 className="font-bold mb-2">API Response Debug:</h3>
                <pre className="text-xs">{debug}</pre>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
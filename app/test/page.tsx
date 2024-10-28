'use client'

import { useState } from 'react'
import { searchTavily } from './actions/getUrl'  // Fixed import path
import type { TavilySearchResponse } from './lib/types'

export default function SearchPage() {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<TavilySearchResponse | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function handleSearch(e: React.FormEvent) {
    e.preventDefault()
    setIsLoading(true)
    setError(null)

    const result = await searchTavily(query)

    if (result.success && result.data) {
      setResults(result.data)
    } else {
      setError(result.error)
    }

    setIsLoading(false)
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

          {results.follow_up_questions && results.follow_up_questions.length > 0 && (
            <div className="mt-6">
              <h3 className="font-bold mb-2">Follow-up Questions:</h3>
              <ul className="list-disc pl-5 space-y-1">
                {results.follow_up_questions.map((question, index) => (
                  <li key={index} className="text-blue-600 cursor-pointer hover:underline"
                      onClick={() => {
                        setQuery(question);
                        handleSearch(new Event('submit') as any);
                      }}>
                    {question}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
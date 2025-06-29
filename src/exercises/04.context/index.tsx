import React, { useCallback, useEffect, useState } from 'react'
import { BlogPost, getMatchingPosts } from '../../shared/blog-posts'

function getQueryParam(params: URLSearchParams): string {
  return params.get("query") || ''
}

type SearchParamsType = readonly [
  URLSearchParams,
  typeof updateQueryParams
]

const SearchParamsContext = React.createContext<SearchParamsType | null>(
  [
    new URLSearchParams(window.location.search),
    updateQueryParams
  ]
)

function SearchParamsProvider({ children }: { children: React.ReactNode }) {
  const [queryParamsState, setQueryParamsState] = useState(new URLSearchParams(window.location.search))
  useEffect(() => {
    const handlePopState = () => {
      setQueryParamsState((prev) => {
        const newParams = new URLSearchParams(window.location.search)
        return prev.toString() === newParams.toString() ? prev : newParams
      })
    }
    window.addEventListener('popstate', handlePopState)
    return () => {
      window.removeEventListener('popstate', handlePopState)
    }
  }, [])

  const setSearchQuery = useCallback(
    (...args: Parameters<typeof updateQueryParams>) => {
      const updatedParams = updateQueryParams(...args)
      setQueryParamsState((prev) => {
        return prev.toString() === updatedParams.toString()
          ? prev
          : updatedParams
      })
      return updatedParams
    }, [])
  const value = [queryParamsState, setSearchQuery] as const
  
  return (
    <SearchParamsContext.Provider value={value}>
      {children}
    </SearchParamsContext.Provider>
  )
}

function App() {
  return (
    <div>
      <SearchParamsProvider>
        <div>
          <SearchForm />
        </div>
      </SearchParamsProvider>
      <MatchingPosts />
    </div>
  )
}

function useSearchParams() {
  const context = React.useContext(SearchParamsContext)
  if (!context) {
    throw new Error('useSearchParams must be used within a SearchParamsProvider')
  }
  return context
}
function SearchForm() {
  const [queryParams, setQuery] = useSearchParams()
  console.log('SearchForm queryParams:', queryParams.toString())
  const query = getQueryParam(queryParams)
  const words = query.split(' ')
  const isCheckDog = words.includes('dog')
  const isCheckCat = words.includes('cat')
  const isCheckCaterpillar = words.includes('caterpillar')

  function handleCheck(tag: string, checked: boolean) {
    const currentTags = query.split(' ').filter(Boolean)
    if (checked) {
      if (!currentTags.includes(tag)) {
        currentTags.push(tag)
      }
    } else {
      const index = currentTags.indexOf(tag)
      if (index > -1) {
        currentTags.splice(index, 1)
      }
    }
    setQuery({ query: currentTags.join(' ') }, { replace: true })
  }

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault()
    setQuery({ query: query }, { replace: false })
  }
  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-4">
        <label className="block text-gray-700 mb-2" htmlFor="search">
          Search:
        </label>
        <input
          type="text"
          id="search"
          className="w-full p-2 border rounded"
          placeholder="Search posts..."
          value={query}
          onChange={(e) => setQuery({ query: e.target.value }, { replace: true })}
        />
      </div>
      <div className="mb-4">
        <div className="flex space-x-4">
          <label>
            <input type="checkbox" value="cat" className='mr-1'
              onChange={(e) => handleCheck("cat", e.target.checked)}
              checked={isCheckCat} />
            Cat
          </label>
          <label>
            <input type="checkbox" value="dog" className='mr-1'
              onChange={(e) => handleCheck("dog", e.target.checked)}
              checked={isCheckDog} />
            Dog
          </label>
          <label>
            <input type="checkbox" value="caterpillar" className='mr-1'
              onChange={(e) => handleCheck("caterpillar", e.target.checked)}
              checked={isCheckCaterpillar} />
            Caterpillar
          </label>
        </div>
      </div>
      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded mb-8"
      >
        Search
      </button>
    </form>
  )
}
function MatchingPosts() {
  const [queryParams] = useSearchParams()
  console.log('MatchingPosts queryParams:', queryParams.toString())
  const query = getQueryParam(queryParams)
  const posts = getMatchingPosts(query)
  return (
    <div className="space-y-4">
      {posts.map(post => (
        <Post
          key={post.id}
          post={post}
        />
      ))}
    </div>
  )
}

function Post({ post }: { post: BlogPost }) {
  const [isFavorite, setFavorite] = useState<boolean>(false)
  return (
    <div
      key={post.id}
      className="p-4 rounded-lg"
      style={{ backgroundColor: post.color }}
    >
      <div>
        {isFavorite ? (
          <button
            className="text-red-500 mr-2"
            onClick={() => setFavorite(false)}
          >
            ❤️
          </button>
        ) : (
          <button
            className="text-gray-500 mr-2"
            onClick={() => setFavorite(true)}
          >
            🤍
          </button>
        )}
      </div>
      <h2 className="text-xl font-bold">{post.title}</h2>
      <p className="text-gray-700">{post.description}</p>
      <div className="mt-2">
        {post.tags.map(tag => (
          <span
            key={tag}
            className="inline-block bg-gray-200 text-gray-800 px-2 py-1 rounded-full text-sm mr-2"
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  )
}

function updateQueryParams(params: Record<string, string | null>, options?: { replace?: boolean }): URLSearchParams {
  const urlParams = new URLSearchParams(window.location.search)

  for (const [key, value] of Object.entries(params)) {
    if (value === null) {
      urlParams.delete(key)
    } else {
      urlParams.set(key, value)
    }
  }

  if (options?.replace) {
    window.history.replaceState({}, '', `?${urlParams.toString()}`)
  } else {
    window.history.pushState({}, '', `?${urlParams.toString()}`)
  }

  return urlParams
}

export default App


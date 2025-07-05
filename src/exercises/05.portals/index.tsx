import React, { useCallback, useEffect, useState, } from 'react'
import { BlogPost, getMatchingPosts } from '../../shared/blog-posts'
import { createPortal } from 'react-dom'

function getQueryParam(params: URLSearchParams): string {
  return params.get("query") || ''
}

type SearchParamsType = readonly [
  URLSearchParams,
  typeof updateQueryParams
]

const SearchParamsContext = React.createContext<SearchParamsType | null>(null)

function SearchParamsProvider({ children }: { children: React.ReactNode }) {
  const [params, setParams] = useState(new URLSearchParams(window.location.search))
  useEffect(() => {
    const handlePopState = () => {
      setParams((prevParams) => {
        const newParams = new URLSearchParams(window.location.search)
        if (prevParams.toString() !== newParams.toString()) {
          return newParams
        }
        return prevParams
      })
    }
    window.addEventListener('popstate', handlePopState)
    return () => {
      window.removeEventListener('popstate', handlePopState)
    }
  }, [])

  const setQueryParams = useCallback((...args: Parameters<typeof updateQueryParams>) => {
    const newParams = updateQueryParams(...args)
    setParams((prevParams) => {
      if (prevParams.toString() !== newParams.toString()) {
        return newParams
      }
      return prevParams
    })
    return newParams
  }, [])

  const value = [params, setQueryParams] as SearchParamsType

  return (
    <SearchParamsContext.Provider value={value}>
      {children}
    </SearchParamsContext.Provider>
  )
}

function useSearchParams() {
  const context = React.useContext(SearchParamsContext)
  if (!context) {
    throw new Error('useSearchParams must be used within a SearchParamsProvider')
  }
  return context
}

function App() {
  return (
    <SearchParamsProvider>
      <div>
        <SearchForm />
        <MatchingPosts />
      </div>
    </SearchParamsProvider>
  )
}

function SearchForm() {
  const [params, setQueryParams] = useSearchParams()
  const query = getQueryParam(params)
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
    setQueryParams({ query: currentTags.join(' ') }, { replace: true })
  }

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault()
    setQueryParams({ query }, { replace: false })
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
          onChange={(e) => setQueryParams({ query: e.target.value }, { replace: true })}
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

type Position = {
  top: number
  left: number
  right: number
  bottom: number
}
function ButtonWithTooltip({ tooltipContent, ...buttonProps }: { tooltipContent: string } & React.ButtonHTMLAttributes<HTMLButtonElement>) {
  const buttonRef = React.useRef<HTMLButtonElement>(null)
  const toolRef = React.useRef<HTMLDivElement>(null)
  const [buttonPosition, setButtonPosition] = useState<Position | null>(null)
  const [tooltipHeight, setTooltipHeight] = useState(0)
  useEffect(() => {
    const tool = toolRef.current
    const rect = tool?.getBoundingClientRect()
    if (rect) {
      setTooltipHeight(rect.height)
    }
  }, [buttonPosition])

  function displayTooltip() {
    const button = buttonRef.current
    if (!button) return
    const rect = button.getBoundingClientRect()
    setButtonPosition({
      top: rect.top,
      left: rect.left,
      right: rect.right,
      bottom: rect.bottom,
    })
  }

  function hideTooltip() {
    setButtonPosition(null)
  }

  let tooltipX = 0
  let tooltipY = 0
  if (buttonPosition) {
    tooltipX = buttonPosition.left
    tooltipY = buttonPosition.top - tooltipHeight
    if (tooltipY < 0) {
      tooltipY = buttonPosition.bottom // If it goes off the top, position it below the button
    }
    tooltipX += window.scrollX
    tooltipY += window.scrollY
  }

  return (
    <div
      onMouseEnter={displayTooltip}
      onMouseLeave={hideTooltip}>
      <button
        className="text-gray-500 mr-2"
        {...buttonProps}
        ref={buttonRef}
      >
      </button>
      {
        buttonPosition && (
          createPortal(
            <div className=" bg-gray-700 text-white text-sm rounded p-2 shadow-lg"
              style={{
                position: 'absolute',
                top: tooltipY, // Adjust to position below the button
                left: tooltipX,
                zIndex: 1000,
              }}
              ref={toolRef}>
              {tooltipContent}
            </div>, document.body,
          )
        )
      }
    </div>
  )
}
function MatchingPosts() {
  const [params] = useSearchParams()
  const query = getQueryParam(params)
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
          <ButtonWithTooltip
            tooltipContent='Remove from favorites'
            onClick={() => setFavorite(false)}
          >
            ❤️
          </ButtonWithTooltip>
        ) : (
          <ButtonWithTooltip tooltipContent='Add to favorites'
            onClick={() => setFavorite(true)}
          >
            🤍
          </ButtonWithTooltip>
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
    </div >
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

  const newUrl = `?${urlParams.toString()}`
  if (options?.replace) {
    window.history.replaceState({}, '', newUrl)
  } else {
    window.history.pushState({}, '', newUrl)
  }

  return urlParams
}

export default App


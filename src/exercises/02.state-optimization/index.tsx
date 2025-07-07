import React, { useEffect, useState } from 'react'
import { BlogPost, getMatchingPosts } from '../../shared/blog-posts'

function getQueryParam(params: URLSearchParams): string {
	return params.get("query") || ''
}

function App() {
	const [params, setParams] = useState(new URLSearchParams(window.location.search))
	const query = getQueryParam(params)
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

	function setQuery(...args: Parameters<typeof updateQueryParams>) {
		console.log('setQuery called with:', ...args)
		const newParams = updateQueryParams(...args)
		setParams((prevParams) => {
			if (prevParams.toString() !== newParams.toString()) {
				return newParams
			}
			return prevParams
		})
		return newParams
	}

	console.log('App rendered with query:', query)
	return (
		<div className='p-6'>
			<SearchForm query={query} setQuery={setQuery} />
			<MatchingPosts query={query} />
		</div>
	)
}

function SearchForm({ query, setQuery }: { query: string; setQuery: typeof updateQueryParams }) {
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
		setQuery({ query }, { replace: false })
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
function MatchingPosts({ query }: { query: string }) {
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

// Write a TypeScript function that updates the current browser URL’s query parameters (search params) without reloading the page. The function should:
// Accept an object of key-value pairs where each value is either a string or null.
// If a key's value is null, remove that query parameter from the URL.
// If a key's value is a string, add or update the query parameter in the URL.
// Accept an optional options object with a replace boolean flag:
// 	- If replace is true, use window.history.replaceState to update the URL.
// 	- Otherwise, use window.history.pushState.
// Return the updated URLSearchParams object.
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


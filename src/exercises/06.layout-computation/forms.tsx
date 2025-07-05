
import React from 'react'
import { useSearchParams } from './handleForm'
import { getQueryParam } from './utils'

export function SearchForm() {
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


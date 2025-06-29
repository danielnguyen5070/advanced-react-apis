import React, { useState, useEffect, useCallback } from 'react'
import { updateQueryParams } from './utils'

function getQueryParam(params: URLSearchParams): string {
    return params.get("query") || ''
}

type SearchParamsType = readonly [
    URLSearchParams,
    typeof updateQueryParams
]

const SearchParamsContext = React.createContext<SearchParamsType | null>(null)


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

function useSearchParams() {
    const context = React.useContext(SearchParamsContext)
    if (!context) {
        throw new Error('useSearchParams must be used within a SearchParamsProvider')
    }
    return context
}

export { useSearchParams, SearchParamsContext, SearchParamsProvider, getQueryParam }
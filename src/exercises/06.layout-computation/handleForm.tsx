import React, { useState, useEffect, useCallback } from 'react'
import { updateQueryParams } from './utils'

type SearchParamsType = readonly [
    URLSearchParams,
    typeof updateQueryParams
]

const SearchParamsContext = React.createContext<SearchParamsType | null>(null)

export function SearchParamsProvider({ children }: { children: React.ReactNode }) {
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

export function useSearchParams() {
    const context = React.useContext(SearchParamsContext)
    if (!context) {
        throw new Error('useSearchParams must be used within a SearchParamsProvider')
    }
    return context
}

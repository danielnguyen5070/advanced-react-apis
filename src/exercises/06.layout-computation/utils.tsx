
export function updateQueryParams(params: Record<string, string | null>, options?: { replace?: boolean }): URLSearchParams {
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


export function getQueryParam(params: URLSearchParams): string {
    return params.get("query") || ''
}
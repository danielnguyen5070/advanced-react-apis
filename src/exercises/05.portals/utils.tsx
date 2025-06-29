export function updateQueryParams(params: Record<string, string | null>, options?: { replace?: boolean }): URLSearchParams {
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
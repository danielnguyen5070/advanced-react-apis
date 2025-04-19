import { useSyncExternalStore } from 'react'


export function makeMediaQueryStore(mediaQuery: string) {
	function getSnapshot() {
		return window.matchMedia(mediaQuery).matches
	}

	function subscribe(callback: () => void) {
		const mediaQueryList = window.matchMedia(mediaQuery)
		mediaQueryList.addEventListener('change', callback)
		return () => {
			mediaQueryList.removeEventListener('change', callback)
		}
	}

	return function useMediaQuery() {
		return useSyncExternalStore(subscribe, getSnapshot)
	}
}

const useNarrowMediaQuery = makeMediaQueryStore('(max-width: 600px)')

function NarrowScreenNotifier() {
	const isNarrow = useNarrowMediaQuery()
	return isNarrow ? 'You are on a narrow screen' : 'You are on a wide screen'
}

function App() {
	return <NarrowScreenNotifier />
}

export default App

// @ts-expect-error 🚨 this is for the test
window.__epicReactRoot = root

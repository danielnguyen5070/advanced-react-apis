import { useSyncExternalStore } from 'react'


const mediaQuery = '(max-width: 600px)'
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

function NarrowScreenNotifier() {
	const isNarrow = useSyncExternalStore(subscribe, getSnapshot)
	return isNarrow ? 'You are on a narrow screen' : 'You are on a wide screen'
}

function App() {
	return <NarrowScreenNotifier />
}

export default App

// @ts-expect-error 🚨 this is for the test
window.__epicReactRoot = root

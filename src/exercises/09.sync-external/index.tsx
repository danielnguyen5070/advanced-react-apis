
import React, { useSyncExternalStore } from 'react'
const mediaQuery = '(max-width: 600px)'
type Callback = () => void

function getSnapshot() {
	return window.matchMedia(mediaQuery).matches
}

function subscribe(callback: Callback) {
	const matchQueryList = window.matchMedia(mediaQuery)
	matchQueryList.addEventListener('change', callback)
	return () => {
		matchQueryList.removeEventListener('change', callback)
	}
}
function NarrowScreenNotifier() {
	const isNarrow = useSyncExternalStore(
		subscribe,
		getSnapshot
	)
	return isNarrow ? <div className='bg-amber-300'>You are on a narrow screen</div> : <div className='bg-blue-300'>you are on wide screen</div>
}

function App() {
	return <NarrowScreenNotifier />
}

export default App
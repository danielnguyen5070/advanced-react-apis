import { useEffect, useReducer } from 'react'
import { ErrorBoundary } from 'react-error-boundary'

const defaultState = {
	history: [Array(9).fill(null)],
	currentStep: 0,
}

type Player = 'X' | 'O'
type Squares = Array<Player | null>
type GameState = {	
	history: Array<Squares>
	currentStep: number
}

function initReducer() {
	const storedSquares = localStorage.getItem('state')
	try {
		return storedSquares ? JSON.parse(storedSquares) : defaultState
	} catch {
		return defaultState
	}
}

type GameAction= 
	| { type: "SELECT_SQUARE", index: number } | { type: "RESTART" }
	| { type: "GO_TO_STEP", step: number }
	| { type: "RESTART" }

function reducerHandle(state: GameState, action: GameAction): GameState {
	const { type } = action
	switch (type) {
		case "SELECT_SQUARE": {
			const { index } = action
			const squares = state.history[state.currentStep]
			if (squares[index] || calculateWinner(squares)) return state
			
			const newSquares = squares.slice()
			newSquares[index] = calculateNextValue(squares)
			const newHistory = state.history.slice(0, state.currentStep + 1)
			newHistory.push(newSquares)

			return {
				history: newHistory,
				currentStep: newHistory.length - 1,
			}
		}
		case "RESTART": {
			return defaultState
		}
		case "GO_TO_STEP": {
			const { step } = action
			return {
				...state,
				currentStep: step,
			}
		}
		default:
			return state
	}
}
function Board() {
	const [state, setState] = useReducer(reducerHandle, null, initReducer)
	const { history, currentStep } = state
	const squares = history[currentStep]
	const status = calculateStatus(squares)

	useEffect(() => {
		localStorage.setItem('state', JSON.stringify(state))
	}, [state])

	function renderSquare(i: number) {
		return (
			<button
				onClick={() => {
					setState({ type: "SELECT_SQUARE", index: i })
				}}
				className="w-20 h-20 text-2xl font-semibold border border-gray-300 hover:bg-gray-100 flex items-center justify-center transition-all duration-150"
			>
				{squares[i]}
			</button>
		)
	}
	
	return (
		<div className="flex flex-col items-center gap-4">
			<div className="text-xl font-bold text-gray-700">{status}</div>

			<div className="grid grid-cols-3 gap-2">
				{renderSquare(0)}
				{renderSquare(1)}
				{renderSquare(2)}
				{renderSquare(3)}
				{renderSquare(4)}
				{renderSquare(5)}
				{renderSquare(6)}
				{renderSquare(7)}
				{renderSquare(8)}
			</div>

			<button
				onClick={() => setState({ type: "RESTART" })}
				className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
			>
				Restart
			</button>

			<div className='mt-4 flex flex-col gap-2'>
				{
					history.map((_, step) => (
						<button
							key={step}
							onClick={() => setState({ type: "GO_TO_STEP", step })}
							className={`px-2 py-1 ${step === currentStep ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'} rounded hover:bg-blue-600 hover:text-white transition`}
						>
							{step === 0 ? 'Go to Start' : `Go to Move #${step}`}
						</button>
					))
				}
			</div>
		</div>
	)
}

function Fallback({ error, resetErrorBoundary }: { error: Error, resetErrorBoundary: () => void }) {
	function handleRetry() {
		localStorage.setItem('state', JSON.stringify(defaultState))
		resetErrorBoundary()	
	}
	return (
		<div className="text-red-500">
			An error occurred. Please try refreshing the page.
			{error.message && <div className="mt-2">Error: {error.message}</div>}
			<button
				onClick={handleRetry}
				className="mt-4 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
			>
				Try again
			</button>
		</div>
	)	
}

function App() {
	return (
		<div className="min-h-screen flex items-start justify-center bg-gray-50">
			<div className="p-6 bg-white rounded-lg shadow-md">
				<ErrorBoundary FallbackComponent={Fallback}>
					<Board />
				</ErrorBoundary>
			</div>
		</div>
	)
}

function calculateNextValue(squares: Squares): Player {
	const xCount = squares.filter(square => square === 'X').length
	const oCount = squares.filter(square => square === 'O').length
	return xCount === oCount ? 'X' : 'O'
}

function calculateWinner(squares: Squares): Player | null {
	const lines = [
		[0, 1, 2],
		[3, 4, 5],
		[6, 7, 8],
		[0, 3, 6],
		[1, 4, 7],
		[2, 5, 8],
		[0, 4, 8],
		[2, 4, 6],
	]

	for (let i = 0; i < lines.length; i++) {
		const [a, b, c] = lines[i]
		if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
			return squares[a]
		}
	}
	return null
}

function calculateStatus(squares: Squares): string {
	const winner = calculateWinner(squares)
	if (winner) {
		return `Winner: ${winner}`
	} else if (squares.every(square => square !== null)) {
		return 'Draw'
	} else {
		return `Next player: ${calculateNextValue(squares)}`
	}
}

export default App

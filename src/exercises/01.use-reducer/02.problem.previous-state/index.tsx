import { useReducer, useState } from 'react'


// 🐨 rename the "state" variable "count" and the "newState" should be "change"
// 🐨 then the function should return the sum of "count" and "change"
const countReducer = (state: unknown, newState: number) => newState

function Counter({ initialCount = 0, step = 1 }) {
	// 🐨 change the dispatch function "setCount" to "changeCount" here
	const [count, setCount] = useReducer(countReducer, initialCount)
	// 🐨 update these to simply pass the change we want to make to the state rather
	// than the new state itself.
	const increment = () => setCount(count + step)
	const decrement = () => setCount(count - step)
	return (
		<div className="counter">
			<output>{count}</output>
			<div>
				<button onClick={decrement}>⬅️</button>
				<button onClick={increment}>➡️</button>
			</div>
		</div>
	)
}

function App() {
	const [step, setStep] = useState(1)

	return (
		<div className="app">
			<h1>Counter:</h1>
			<form>
				<div>
					<label htmlFor="step-input">Step</label>
					<input
						id="step-input"
						type="number"
						value={step}
						onChange={(e) => setStep(Number(e.currentTarget.value))}
					/>
				</div>
			</form>
			<Counter step={step} />
		</div>
	)
}

export default App

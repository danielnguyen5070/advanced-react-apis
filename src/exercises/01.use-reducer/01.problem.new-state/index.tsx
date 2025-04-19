import { useState } from 'react'


// 🐨 here's where you'll implement your countReducer function.

function Counter({ initialCount = 0, step = 1 }) {
	// 🐨 replace useState with useReducer.
	// 💰 useReducer(countReducer, initialCount)
	const [count, setCount] = useState(initialCount)

	// 💰 you can write the countReducer function above so you don't have to make
	// any changes to the next two lines of code! Remember:
	// The 1st argument is called "state" - the current value of count
	// The 2nd argument is called "newState" - the value passed to setCount
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

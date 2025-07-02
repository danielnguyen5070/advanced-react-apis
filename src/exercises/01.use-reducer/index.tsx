import React, { useState, useReducer } from 'react'

type CounterType = {
	count: number,
	otherState: string
}

type CounterAction = {
	type: string,
	step: number,
}

const initialState = {
	count: 0,
	otherState: 'initial'
}

const counterReducer = (value: CounterType, action: CounterAction) => {
	switch (action.type) {
		case 'INCREMENT':
			return { ...value, count: value.count + action.step }
		case 'DECREMENT':
			return { ...value, count: value.count - action.step }
		default:
			return value
	}
}

function Counter({ step }: { step: number }) {
	const [state, dispatch] = useReducer(counterReducer, initialState)

	const increment = () => {
		dispatch({ type: 'INCREMENT', step: step })
	}

	const decrement = () => {
		dispatch({ type: 'DECREMENT', step: step })
	}

	return (
		<div className="w-full flex flex-col items-center gap-4 p-4 rounded-xl border border-gray-200 shadow-md bg-white max-w-xs mx-auto">
			<output className="text-9xl text-blue-600">{state.count}</output>
			<div className="flex gap-4">
				<button
					className=""
					onClick={decrement}
				>
					⬅️
				</button>
				<button
					className=""
					onClick={increment}
				>
					➡️
				</button>
			</div>
		</div>
	)
}

function App() {
	const [step, setStep] = useState(1)
	return (
		<div className="bg-gray-100 flex flex-col items-center justify-top p-6">
			<form className="mb-6">
				<div className="flex items-center gap-3">
					<label htmlFor="step-input" className="text-lg text-gray-700">
						Step:
					</label>
					<input
						id="step-input"
						type="number"
						value={step}
						onChange={(e) => setStep(Number(e.target.value))}
						className="w-24 px-3 bg-white py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
					/>
				</div>
			</form>
			<Counter step={step} />
		</div>
	)
}

export default App


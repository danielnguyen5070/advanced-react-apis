function Counter() {
	// useReducer hook to manage the counter state
	return (
		<div className="w-full flex flex-col items-center gap-4 p-4 rounded-xl border border-gray-200 shadow-md bg-white max-w-xs mx-auto">
			<output className="text-9xl text-blue-600">0</output>
			<div className="flex gap-4">
				<button
					className=""
				>
					⬅️
				</button>
				<button
					className=""
				>
					➡️
				</button>
			</div>
		</div>
	)
}

function App() {
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
						className="w-24 px-3 bg-white py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
					/>
				</div>
			</form>
			<Counter />
		</div>
	)
}

export default App


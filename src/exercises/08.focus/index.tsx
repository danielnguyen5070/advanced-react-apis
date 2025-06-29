import { useState } from 'react'

function EditableText({
	id,
	initialValue = '',
	fieldName,
	inputLabel,
	buttonLabel,
}: {
	id?: string
	initialValue?: string
	fieldName: string
	inputLabel: string
	buttonLabel: string
}) {
	const [edit, setEdit] = useState(false)
	const [value,] = useState(initialValue)

	return edit ? (
		<form
			method="post"
		>
			<input
				required
				type="text"
				id={id}
				aria-label={inputLabel}
				name={fieldName}
				autoFocus
				onBlur={() => setEdit(false)}
				className="border rounded px-2 py-1 w-full text-gray-900"
			/>
		</form>
	) : (
		<button
			aria-label={buttonLabel}
			onClick={() => setEdit(true)}
			type="button"
			className="text-blue-600 hover:underline focus:outline-none"
		>
			{value || 'Edit'}
		</button>
	)
}

function App() {
	return (
		<main className="p-4 space-y-4 font-sans">
			<button className="px-3 py-1 bg-gray-200 rounded">Focus before</button>

			<div className="editable-text">
				<EditableText
					initialValue="Unnamed"
					fieldName="name"
					inputLabel="Edit project name"
					buttonLabel="Edit project name"
				/>
			</div>

			<button className="px-3 py-1 bg-gray-200 rounded">Focus after</button>
		</main>
	)
}

export default App

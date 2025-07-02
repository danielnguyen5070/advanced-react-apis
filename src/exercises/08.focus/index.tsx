import { useRef, useState } from 'react'
import { flushSync } from 'react-dom'

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
	const inputRef = useRef<HTMLInputElement | null>(null)
	const buttonRef = useRef<HTMLButtonElement | null>(null)
	return edit ? (
		<form
			method="post"
		>
			<input
				required
				type="text"
				id={id}
				ref={inputRef}
				defaultValue={value}
				aria-label={inputLabel}
				name={fieldName}
				autoFocus
				onBlur={() => {
					flushSync(() => {
						setEdit(false)
					})
					console.log('blur input', inputRef.current)
					buttonRef.current?.focus()
				}}
				className="border rounded px-2 py-1 w-full text-gray-900"
			/>
		</form>
	) : (
		<button
			ref={buttonRef}
			aria-label={buttonLabel}
			onClick={() => {
				flushSync(() => {
					setEdit(true)
				})
				console.log('focus input', inputRef.current)
				inputRef.current?.select()
			}}
			type="button"
			className="text-blue-600 hover:underline focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded px-2 py-1"
		>
			{value || 'Edit'}
		</button>
	)
}

function App() {
	return (
		<main className="p-4 space-y-4 font-sans">
			<button className="px-3 py-1 bg-gray-200 rounded"
			>Focus before</button>

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

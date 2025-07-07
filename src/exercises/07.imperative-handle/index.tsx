import React, { useRef, useState } from 'react'
import { allMessages } from './messages'

function Scrollable({ children }: { children: React.ReactNode }) {
	return (
		<div
			role="log"
			className="h-64 overflow-y-auto rounded-md border border-gray-300 bg-white p-4 shadow-inner space-y-4"
		>
			{children}
		</div>
	)
}

function App() {
	const [messages, setMessages] = useState(allMessages.slice(0, 8))
	return (
		<div className="flex flex-col items-center justify-between h-screen">
			<div className="max-w-md mx-auto p-4 space-y-4 font-sans">
				<div className="flex gap-2">
					<button className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300">
						Scroll to Top
					</button>
					<button className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300">
						Scroll to Bottom
					</button>
				</div>

				<Scrollable>
					{messages.map((message, index, array) => (
						<div key={message.id} className="space-y-1">
							<p>
								<strong className="text-blue-700">{message.author}</strong>:{' '}
								<span>{message.content}</span>
							</p>
							{array.length - 1 === index ? null : <hr className="border-gray-200" />}
						</div>
					))}
				</Scrollable>

				<div className="flex gap-2">
					<button className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
						onClick={() => {
							const nextMessage = allMessages[Math.floor(Math.random() * allMessages.length)]
							setMessages((prev) => [...prev, nextMessage])
						}}
					>
						Add Message
					</button>
				</div>
				<div className="">
					<EditableText
						id="author"
						initialValue="John Doe"
					/>
				</div>
			</div>
			<Footer />
		</div>
	)
}

function EditableText({
	id,
	initialValue = '',
}: {
	id?: string
	initialValue?: string
}) {
	const [edit, setEdit] = useState(false)
	const [value,] = useState(initialValue)
	const buttonRef = useRef<HTMLButtonElement | null>(null)
	return edit ? (
		<form
			method="post"
			onSubmit={(e) => {
				e.preventDefault()
			}}
		>
			<input
				required
				type="text"
				id={id}
				defaultValue={value}
				autoFocus
				className="border rounded px-2 py-1 w-full text-gray-900"
			/>
		</form>
	) : (
		<button
			ref={buttonRef}
			type="button"
			onClick={() => {
				setEdit(true)
			}}
			className="text-blue-600 hover:underline focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded px-2 py-1"
		>
			{value || 'Edit'}
		</button>
	)
}

function Footer() {
	const isMobile = true
	return (
		<div className='bottom-0 right-0 bg-white p-4'>
			{
				isMobile ? (
					<p className="text-sm text-gray-500">
						Note: This example is a simplified version of a chat application. The "Scroll to Top" and "Scroll to Bottom" buttons are placeholders and do not have functionality implemented. The "Focus Messages" button is also a placeholder and does not perform any action. The messages are randomly generated from a predefined list.
					</p>
				) : (
					<p className="text-sm text-gray-500">
						Note: This example is a simplified version of a chat application.
					</p>
				)
			}
		</div>
	)
}

export default App

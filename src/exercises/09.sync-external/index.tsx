import React, { useRef, useState, useSyncExternalStore } from 'react'
import { allMessages } from './messages'

type ScrollableRef = {
	scrollToTop: () => void
	scrollToBottom: () => void
}
function Scrollable({ children, ref }: { children: React.ReactNode, ref: React.Ref<ScrollableRef> }) {
	const scrollableRef = useRef<HTMLDivElement>(null)

	React.useImperativeHandle(ref, () => ({
		scrollToTop: () => {
			if (scrollableRef.current) {
				scrollableRef.current.scrollTop = 0
			}
		},
		scrollToBottom: () => {
			if (scrollableRef.current) {
				scrollableRef.current.scrollTop = scrollableRef.current.scrollHeight
			}
		},
	}))
	return (
		<div
			role="log"
			ref={scrollableRef}
			className="h-64 overflow-y-auto rounded-md border border-gray-300 bg-white p-4 shadow-inner space-y-4"
		>
			{children}
		</div>
	)
}

function App() {
	const [messages, setMessages] = useState(allMessages.slice(0, 8))
	const scrollableRef = useRef<ScrollableRef>(null)

	const scrollToTop = () => {
		scrollableRef.current?.scrollToTop()
	}
	const scrollToBottom = () => {
		scrollableRef.current?.scrollToBottom()
	}

	return (
		<div className="flex flex-col items-center justify-between h-screen">
			<div className="max-w-md mx-auto p-4 space-y-4 font-sans">
				<div className="flex gap-2">
					<button className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
						onClick={scrollToTop}>
						Scroll to Top
					</button>
					<button className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
						onClick={scrollToBottom}>
						Scroll to Bottom
					</button>
				</div>

				<Scrollable ref={scrollableRef}>
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
	const [value, setValue] = useState(initialValue)
	const buttonRef = useRef<HTMLButtonElement | null>(null)
	const editRef = useRef<HTMLInputElement | null>(null)

	return edit ? (
		<form
			method="post"
			onSubmit={(e) => {
				e.preventDefault()
				setEdit(false)
				buttonRef.current?.focus()
			}}
		>
			<input
				required
				type="text"
				id={id}
				value={value}
				ref={editRef}
				onChange={(e) => {
					setValue(e.target.value)
					buttonRef.current?.focus()
				}}
				onBlur={() => {
					setEdit(false)
				}}
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
				editRef.current?.focus()
			}}
			className="text-blue-600 hover:underline focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded px-2 py-1"
		>
			{value || 'Edit'}
		</button>
	)
}

const queryStr = '(max-width: 648px)'
function useMediaQuery(query: string) {
	const mediaQuery = window.matchMedia(query)

	function subcribe(callback: () => void) {
		mediaQuery.addEventListener('change', callback)
		return () => {
			mediaQuery.removeEventListener('change', callback)
		}
	}

	function getSnapshot() {
		console.log('getSnapshot called')
		return mediaQuery.matches
	}

	return useSyncExternalStore(subcribe, getSnapshot)
}


function Footer() {
	const isMobile = useMediaQuery(queryStr)
	return (
		<div className='bottom-0 right-0 bg-white p-4'>
			{
				isMobile ? (
					<p className="text-sm text-gray-500">
						Note: This example is a simplified version of a chat application.
					</p>
				) : (
					<p className="text-sm text-gray-500">
						Note: This example is a simplified version of a chat application. The "Scroll to Top" and "Scroll to Bottom" buttons are placeholders and do not have functionality implemented. The "Focus Messages" button is also a placeholder and does not perform any action. The messages are randomly generated from a predefined list.
					</p>
				)
			}
		</div>
	)
}

export default App

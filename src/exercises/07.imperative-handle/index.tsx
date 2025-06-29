import { useState } from 'react'
import { allMessages } from './messages'

function Scrollable({
	children,
}: {
	children: React.ReactNode
}) {
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
	const [messages,] = useState(allMessages.slice(0, 8))

	return (
		<div className="max-w-md mx-auto p-4 space-y-4 font-sans">
			<div className="flex gap-2">
				<button className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600">
					Add Message
				</button>
				<button className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600">
					Remove Message
				</button>
			</div>

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
		</div>
	)
}

export default App

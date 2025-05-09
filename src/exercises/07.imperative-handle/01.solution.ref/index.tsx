import { useImperativeHandle, useLayoutEffect, useRef, useState } from 'react'

import { allMessages } from './messages'

type ScrollableImperativeAPI = {
	scrollToTop: () => void
	scrollToBottom: () => void
}

function Scrollable({
	children,
	scrollableRef,
}: { children: React.ReactNode } & {
	scrollableRef: React.RefObject<ScrollableImperativeAPI | null>
}) {
	const containerRef = useRef<HTMLDivElement>(null)

	useLayoutEffect(() => {
		scrollToBottom()
	})

	function scrollToTop() {
		if (!containerRef.current) return
		containerRef.current.scrollTop = 0
	}

	function scrollToBottom() {
		if (!containerRef.current) return
		containerRef.current.scrollTop = containerRef.current.scrollHeight
	}

	useImperativeHandle(scrollableRef, () => ({
		scrollToTop,
		scrollToBottom,
	}))

	return (
		<div ref={containerRef} role="log">
			{children}
		</div>
	)
}

function App() {
	const scrollableRef = useRef<ScrollableImperativeAPI>(null)
	const [messages, setMessages] = useState(allMessages.slice(0, 8))
	function addMessage() {
		if (messages.length < allMessages.length) {
			setMessages(allMessages.slice(0, messages.length + 1))
		}
	}
	function removeMessage() {
		if (messages.length > 0) {
			setMessages(allMessages.slice(0, messages.length - 1))
		}
	}

	const scrollToTop = () => scrollableRef.current?.scrollToTop()
	const scrollToBottom = () => scrollableRef.current?.scrollToBottom()

	return (
		<div className="messaging-app">
			<div style={{ display: 'flex', justifyContent: 'space-between' }}>
				<button onClick={addMessage}>add message</button>
				<button onClick={removeMessage}>remove message</button>
			</div>
			<hr />
			<div>
				<button onClick={scrollToTop}>scroll to top</button>
			</div>
			<Scrollable scrollableRef={scrollableRef}>
				{messages.map((message, index, array) => (
					<div key={message.id}>
						<strong>{message.author}</strong>: <span>{message.content}</span>
						{array.length - 1 === index ? null : <hr />}
					</div>
				))}
			</Scrollable>
			<div>
				<button onClick={scrollToBottom}>scroll to bottom</button>
			</div>
		</div>
	)
}

export default App

/*
eslint
	@typescript-eslint/no-unused-vars: "off",
*/

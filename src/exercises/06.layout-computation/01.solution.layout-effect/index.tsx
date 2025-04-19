
import { Form } from './form'
import { SearchParamsProvider } from './params'
import { MatchingPosts } from './posts'

export function App() {
	return (
		<SearchParamsProvider>
			<div className="app">
				<Form />
				<MatchingPosts />
			</div>
		</SearchParamsProvider>
	)
}

export default App

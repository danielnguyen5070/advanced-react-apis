import React from 'react'
import { SearchParamsProvider } from './handleForm'
import { SearchForm } from './forms'
import { MatchingPosts } from './posts'
function App() {
  return (
    <SearchParamsProvider>
      <div>
        <SearchForm />
        <MatchingPosts />
      </div>
    </SearchParamsProvider>
  )
}

export default App


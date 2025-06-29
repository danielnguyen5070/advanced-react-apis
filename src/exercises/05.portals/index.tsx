import React from 'react'
import SearchForm from './form'
import { MatchingPosts } from './post'
import { SearchParamsProvider } from './params'

function App() {
  return (
    <div>
      <SearchParamsProvider>
        <div>
          <SearchForm />
          <MatchingPosts />
        </div>
      </SearchParamsProvider>
    </div>
  )
}

export default App


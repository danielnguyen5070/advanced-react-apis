import React from 'react'
import { SearchParamsProvider } from './handleForm'
import { SearchForm } from './forms'
import { MatchingPosts } from './posts'
function App() {
  return (
    <SearchParamsProvider>
      <div className='p-6'>
        <SearchForm />
        <MatchingPosts />
      </div>
    </SearchParamsProvider>
  )
}

export default App


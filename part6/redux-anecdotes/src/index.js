import React from 'react'
import ReactDOM from 'react-dom/client'
// import { createStore } from 'redux'
import { Provider } from 'react-redux'
import App from './App'
import anecdoteReducer from './reducers/anecdoteReducer'
import { configureStore } from '@reduxjs/toolkit'

// const store = createStore(reducer)

const store = configureStore({
	reducer: {
		anecdotes: anecdoteReducer,
	}
})

// console.log(store.getState())

ReactDOM.createRoot(document.getElementById('root')).render(
	<Provider store={store}>
		<App />
	</Provider>
)

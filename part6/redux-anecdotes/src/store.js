import { configureStore, combineReducers } from '@reduxjs/toolkit'
import anecdoteReducer from './reducers/anecdoteReducer'
import notificationReducer from './reducers/notificationReducer'
// import store from './reducers/store'

// const reducer = combineReducers({
// 	anecdotes: anecdoteReducer,
// 	notification: notificationReducer
// })

const store = configureStore({
	reducer: {
		anecdotes: anecdoteReducer,
		notification: notificationReducer
	}
})

console.log(store.getState())

export default store


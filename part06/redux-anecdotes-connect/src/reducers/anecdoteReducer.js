import { createSlice } from "@reduxjs/toolkit"
import anecdoteService from '../services/anecdotes'

const anecdoteSlice = createSlice({
	name: 'anecdotes',
	initialState: [],
	reducers: {
		addAnecdote(state, action) {
			state.push({
				content: action.payload,
				votes: 0
			})
		},

		voteAnecdote(state, action) {
			const id = action.payload
			const anecdoteToVote = state.find(a => a.id === id)
			const changedAnecdote = {
				...anecdoteToVote,
				votes: anecdoteToVote.votes += 1
			}
			state.map((a) => a.id === anecdoteToVote.id ? changedAnecdote : a)
		},

		appendAnecdote(state, action) {
			state.push(action.payload)
		},

		setAnecdotes(state, action) {
			return action.payload
		}
	}
})

export const { addAnecdote, voteAnecdote, appendAnecdote, setAnecdotes } = anecdoteSlice.actions

export const initializeAnecdotes = () => {
	return async dispatch => {
		const anecdotes = await anecdoteService.getAll()
		dispatch(setAnecdotes(anecdotes))
	}
}

export const createAnecdote = anecdote => {
	return async dispatch => {
		const newAnecdote = await anecdoteService.createNew(anecdote)
		dispatch(appendAnecdote(newAnecdote))
	}
}

export const updateVote = anecdote => {
	return async dispatch => {
		const updatedAnecdote = await anecdoteService.updateVote(anecdote)
		dispatch(voteAnecdote(updatedAnecdote.id))
	}
}

export default anecdoteSlice.reducer

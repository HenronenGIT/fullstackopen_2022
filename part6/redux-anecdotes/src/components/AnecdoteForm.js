import { useDispatch } from 'react-redux'
import { appendAnecdote } from '../reducers/anecdoteReducer'
import anecdoteService from '../services/anecdotes'

const AnecdoteForm = () => {
	const dispatch = useDispatch()

	const add = async (event) => {
		event.preventDefault()
		const anecdote = event.target.anecdote.value
		event.target.anecdote.value = ''
		const newAnecdote = await anecdoteService.createNew(anecdote)
		dispatch(appendAnecdote(newAnecdote))

		// dispatch({ type: 'anecdotes/addAnecdote', payload: anecdote })
		dispatch({ type: 'notification/addNotification', payload: anecdote })
		setTimeout(() => {
			dispatch({ type: 'notification/resetNotification' })
		}, 5000)
	}

	return (
		<div>
			<h2>create new</h2>
			<form onSubmit={add}>
				<div>
					<input name='anecdote'></input>
				</div>
				<button type='submit'>create</button>
			</form>
		</div >
	)
}

export default AnecdoteForm
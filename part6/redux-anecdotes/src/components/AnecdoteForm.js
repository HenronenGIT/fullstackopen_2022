import { useDispatch } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'

const AnecdoteForm = () => {
	const dispatch = useDispatch()

	const add = async (event) => {
		event.preventDefault()
		const anecdote = event.target.anecdote.value
		event.target.anecdote.value = ''

		dispatch(createAnecdote(anecdote))
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
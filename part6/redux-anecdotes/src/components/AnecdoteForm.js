import { useDispatch } from 'react-redux'

const AnecdoteForm = () => {
	const dispatch = useDispatch()

	const add = (event) => {
		event.preventDefault()
		const anecdote = event.target.anecdote.value
		event.target.anecdote.value = ''
		dispatch({ type: 'anecdotes/addAnecdote', payload: anecdote })
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
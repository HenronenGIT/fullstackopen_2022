import { useDispatch, useSelector } from 'react-redux'

const AnecdoteList = () => {

	const dispatch = useDispatch()

	const anecdotes = useSelector(reducer => {
		return [...reducer.anecdotes]
			.sort((a, b) => {
				return b.votes - a.votes
			})
	})

	const vote = (anecdote) => {
		dispatch({ type: 'anecdotes/voteAnecdote', payload: anecdote.id })
		dispatch({ type: 'notification/voteNotification', payload: anecdote.content})
		setTimeout(() => {
			dispatch({ type: 'notification/resetNotification'})
		}, 5000)
	}

	return (
		anecdotes.map(anecdote =>
			<div key={anecdote.id}>
				<div>
					{anecdote.content}
				</div>
				<div>
					has {anecdote.votes}
					<button onClick={() => vote(anecdote)}>vote</button>
				</div>
			</div>
		)
	)
}

export default AnecdoteList
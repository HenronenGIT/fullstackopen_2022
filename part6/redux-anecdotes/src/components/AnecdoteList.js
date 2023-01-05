import { useDispatch, useSelector } from 'react-redux'
import { updateVote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const AnecdoteList = () => {

	const dispatch = useDispatch()

	const anecdotes = useSelector(reducer => {
		return [...reducer.anecdotes]
			.sort((a, b) => {
				return b.votes - a.votes
			})
	})

	const voteAnecdote = (anecdote) => {
		dispatch(updateVote(anecdote))
		dispatch(setNotification(`you voted '${anecdote.content}'`, 5))
	}

	return (
		anecdotes.map(anecdote =>
			<div key={anecdote.id}>
				<div>
					{anecdote.content}
				</div>
				<div>
					has {anecdote.votes}
					<button onClick={() => voteAnecdote(anecdote)}>vote</button>
				</div>
			</div>
		)
	)
}

export default AnecdoteList
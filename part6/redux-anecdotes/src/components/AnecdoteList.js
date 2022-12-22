import { useDispatch, useSelector } from 'react-redux'
import { voteAnecdote } from '../reducers/anecdoteReducer'

const AnecdoteList = () => {

	const dispatch = useDispatch()

	const anecdotes = useSelector(anecdotes => {
		return [...anecdotes].sort((a, b) => {
			return b.votes - a.votes
		})
	})

	const vote = (id) => {
		dispatch(voteAnecdote(id))
		console.log('vote', id)
	}

	return (
		anecdotes.map(anecdote =>
			<div key={anecdote.id}>
				<div>
					{anecdote.content}
				</div>
				<div>
					has {anecdote.votes}
					<button onClick={() => vote(anecdote.id)}>vote</button>
				</div>
			</div>
		)
	)
}

export default AnecdoteList
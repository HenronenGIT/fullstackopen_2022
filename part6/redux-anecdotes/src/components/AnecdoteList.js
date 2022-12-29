import { useDispatch, useSelector } from 'react-redux'
// import { voteAnecdote } from '../reducers/anecdoteReducer'

const AnecdoteList = () => {

	const dispatch = useDispatch()

	const anecdotes = useSelector(reducer => {
		return [...reducer.anecdotes]
			.sort((a, b) => {
				return b.votes - a.votes
			})
	})

	const vote = (id) => {
		dispatch({ type: 'anecdotes/voteAnecdote', payload: id })
		// console.log('vote', id)
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
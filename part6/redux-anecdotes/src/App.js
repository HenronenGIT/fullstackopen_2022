import { useSelector, useDispatch } from 'react-redux'
import { voteAnecdote, addAnecdote } from './reducers/anecdoteReducer'

const App = () => {
	const anecdotes = useSelector(state => state)
	const dispatch = useDispatch()

	const vote = (id) => {
		dispatch(voteAnecdote(id))
		console.log('vote', id)
	}

	const add = (event) => {
		event.preventDefault()
		const anecdote = event.target.anecdote.value
		event.target.anecdote.value = ''
		dispatch(addAnecdote(anecdote))
	}

	return (
		<div>
			<h2>Anecdotes</h2>
			{anecdotes.map(anecdote =>
				<div key={anecdote.id}>
					<div>
						{anecdote.content}
					</div>
					<div>
						has {anecdote.votes}
						<button onClick={() => vote(anecdote.id)}>vote</button>
					</div>
				</div>
			)}
			<h2>create new</h2>
			<form onSubmit={add}>
				<div>
					<input name='anecdote'></input>
				</div>
				<button type='submit'>create</button>
			</form>
		</div>
	)
}

export default App
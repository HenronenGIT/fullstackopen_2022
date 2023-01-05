import AnecdoteForm from './components/AnecdoteForm'
import AnecdoteList from './components/AnecdoteList'
import Notification from './components/Notification'
import { useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { setAnecdotes } from './reducers/anecdoteReducer'
import anecdoteService from './services/anecdotes'

const App = () => {

	const dispatch = useDispatch()

	useEffect(() => {
		anecdoteService.getAll().then(anecdotes =>
			dispatch(setAnecdotes(anecdotes))
		)
	}, [dispatch])

	return (
		<div>
			<h2>Anecdotes</h2>
			<Notification />
			<AnecdoteList />
			<AnecdoteForm />
		</div>
	)
}

export default App

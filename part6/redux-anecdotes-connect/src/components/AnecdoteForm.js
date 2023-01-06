import { createAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'
import { connect } from 'react-redux'

const AnecdoteForm = (props) => {
	const add = async (event) => {
		event.preventDefault()
		const anecdote = event.target.anecdote.value
		event.target.anecdote.value = ''
		props.createAnecdote(anecdote)
		props.setNotification(`you created new anecdote '${anecdote}'`, 5)
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

const mapStateToProps = (state) => {
	return {
		anecdotes: state.anecdotes
	}
}

const mapDispatchToProps = {
	createAnecdote,
	setNotification
}

const ConnectedAnecdotes = connect(
	mapStateToProps,
	mapDispatchToProps
)(AnecdoteForm)

export default ConnectedAnecdotes

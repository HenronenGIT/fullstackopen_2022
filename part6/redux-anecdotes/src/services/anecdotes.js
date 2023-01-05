import axios from "axios"

const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = async () => {
	const response = await axios.get(baseUrl)
	return response.data
}

const createNew = async (content) => {
	const object = { content, votes: 0 }
	const response = await axios.post(baseUrl, object)
	return response.data
}

const updateAnecdote = async anecdote => {
	const newVote = anecdote.votes + 1
	const response = await axios.put(`${baseUrl}/${anecdote.id}`, {votes: newVote})
	return response.data
}

const anecdoteService = {
	getAll,
	createNew,
	updateAnecdote
}

export default anecdoteService

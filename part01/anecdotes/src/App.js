import { useState } from "react";

const App = () => {
	const anecdotes = [
		"If it hurts, do it more often.",
		"Adding manpower to a late software project makes it later!",
		"The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
		"Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
		"Premature optimization is the root of all evil.",
		"Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
		"Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.",
	];

	const [selected, setSelected] = useState(0);
	const [votes, setVotes] = useState(Array(anecdotes.length).fill(0));

	const changeAnecdote = () => {
		const max = anecdotes.length
		setSelected(Math.floor(Math.random() * max))
	}

	const voteAnecdote = () => {
		const copy = [...votes]
		copy[selected] += 1
		setVotes(copy)
	}

	const indexOfMax = arr => arr.indexOf(Math.max(...arr));

	return (
		<div>
			<Header text="Anecdotes of the day"></Header>
			<p>{anecdotes[selected]}</p>
			<p>has {votes[selected]} votes</p>
			<button onClick={voteAnecdote}>vote</button>
			<button onClick={changeAnecdote}>next anecdote</button>
			<Header text="Anecdote with most votes"></Header>
			<Best anecdotes={anecdotes} votes={votes} index={indexOfMax(votes)}></Best>
		</div>
	);
};

const Header = ({ text }) => <h1>{text}</h1>

const Best = ({ anecdotes, votes, index }) => {
	return (
		<div>
			{anecdotes[index]}
			<p>has {votes[index]} votes</p>
		</div>
	)
}

export default App;
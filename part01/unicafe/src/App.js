import { useState } from 'react'

const StatisticsLine = (props) => {
	return (

			<tr>
				<td>{props.text}</td>
				<td>{props.value}</td>
			</tr>
		)
}

const Statistics = (props) => {
	if (props.allClicks === 0 ) {
		return (
			<p>No feedback given</p>
		)
	}
		return (
			<table>
				<tbody>
				<StatisticsLine text="good" value={props.good} />
				<StatisticsLine text="neutral" value={props.neutral} />
				<StatisticsLine text="bad" value={props.bad} />
				<StatisticsLine text="all" value={props.allClicks} />
				<StatisticsLine text="average" value={(props.good - props.bad) / (props.allClicks)} />
				<StatisticsLine text="positive" value={props.good / (props.allClicks) * 100 + " %"}/>
				</tbody>	
			</table>
	)
}

const Button = (props) => {
	return(
		<button onClick={props.handleClick}>{props.text}</button>
	)

}

const App = () => {
	// save clicks of each button to its own state
	const [good, setGood] = useState(0)
	const [neutral, setNeutral] = useState(0)
	const [bad, setBad] = useState(0)
	const allClicks = good + neutral + bad

	return (
		<div>
			<h1>give feedback</h1>
			<Button handleClick={() => setGood(good + 1)} text="good" />
			<Button handleClick={() => setNeutral(neutral + 1)} text="neutral" />
			<Button handleClick={() => setBad(bad + 1)} text="bad" />
			<h1>statistics</h1>
			<Statistics good={good} neutral={neutral} bad={bad} allClicks={allClicks} ></Statistics>
		</div>
  )
}

export default App
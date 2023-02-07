import React from 'react'

const Part = (props) => {
	return (
		<p>{props.name} {props.exercises}</p>
	)
}

const Content = ({ parts }) => {
	return (
		<div>
			{parts.map(part =>
				<Part key={part.id} name={part.name} exercises={part.exercises} />)}
		</div>
	)
}

const Header = ({ name }) => {
	return (
		<h1>{name}</h1>
	)
}

const Course = ({ course }) => {
	const exercises = course.parts.map(part => part.exercises)
	const total = exercises.reduce((s, p) => s + p, 0);

	return (
		<div>
			<Header name={course.name}></Header>
			<Content parts={course.parts}></Content>
			<strong>total of {total} exercises</strong>
		</div>
	)
}

export default Course
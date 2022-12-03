import axios from 'axios';
import React, { useEffect, useState } from 'react';

const App = () => {
	const [countries, setCountries] = useState([])
	const [filter, setFilter] = useState('');

	return (
		<div>
			<Fetch setCountries={setCountries}></Fetch>
			<Form setFilter={setFilter}></Form>
			<Countries countries={countries} filter={filter}></Countries>
		</div>
	)
}

const Fetch = ({ setCountries }) => {

	useEffect(() => {
		axios
			.get('https://restcountries.com/v3.1/all')
			.then(response => {
				setCountries(response.data)
			})
	}, [])
}

const Form = ({ setFilter }) => {

	const handleFilterChange = (event) => {
		setFilter(event.target.value)
	};

	return (
		<div>
			<form>
				find countries:
				<input onChange={handleFilterChange}></input>
			</form>
		</div>
	);
};

const Countries = ({ countries, filter }) => {
	const filtered = countries.filter((country) =>
		country.name.common.toLowerCase().includes(filter.toLowerCase()))

	const filteredCount = filtered.length

	if (filteredCount > 10)
		return <p>Too many matches, specify another filter</p>
	else if (filteredCount < 10 && filteredCount > 1)
		return (
			<div>
				{filtered.map((country, index) =>
					<p key={index} >{country.name.common}</p>
				)}
			</div>
		)
	else if (filteredCount === 1)
		return <Country country={filtered[0]}></Country>
	else
		return <p>no matches</p>
}

const Country = ({ country }) => {
	const languages = Object.values(country.languages)

	return (
		<div>
			<h1>{country.name.common}</h1>
			<p>capital: {country.capital}</p>
			<p>area: {country.area}</p>
			<h2>languages</h2>
			{languages.map((language, index) =>
				<li key={index} >{language}</li>)}
			<img alt="flag" src={country.flags.png} width="150"></img>
		</div>
	)
}

export default App
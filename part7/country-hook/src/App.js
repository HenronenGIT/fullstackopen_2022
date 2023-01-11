import { useState, useEffect } from 'react'
import axios from 'axios'

const useField = (type) => {
	const [value, setValue] = useState('')

	const onChange = (event) => {
		setValue(event.target.value)
	}

	return {
		type,
		value,
		onChange
	}
}

const useCountry = (name) => {
	const [country, setCountry] = useState(null)
	const baseUrl = 'https://restcountries.com/v3.1/name/'
	const extension = '?fullText=true'

	//? could this be done with async
	useEffect(() => {

		const fetchCountry = async () => {
			try {
				const response = await axios.get(`${baseUrl}${name}${extension}`)
				setCountry(response.data[0])
			}
			catch (error) {
				setCountry(null)
				console.log(error.response.status)
			}
		}
		if (name)
			fetchCountry()
	}, [name])
	return country
}

const Country = ({ country }) => {
	if (!country) {
		return <div>not found...</div>
	}
	return (
		<div>
			<h3>{country.name.common}</h3>
			<div>capital {country.capital}</div>
			<div>population {country.population}</div>
			<img src={country.flags.png} height='100' alt={`flag of ${country.name.common}`} />
		</div>
	)
}

const App = () => {
	const nameInput = useField('text')
	const [name, setName] = useState('')
	const country = useCountry(name)

	const fetch = (e) => {
		e.preventDefault()
		setName(nameInput.value)
	}

	return (
		<div>
			<form onSubmit={fetch}>
				<input {...nameInput} />
				<button>find</button>
			</form>

			<Country country={country} />
		</div>
	)
}

export default App

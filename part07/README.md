# Part 7 - React router, custom hooks, styling app with CSS and webpack

> 

## Tech used

<div display="inline-block">
	<img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB"></img>
	<img src="https://img.shields.io/badge/JavaScript-323330?style=for-the-badge&logo=javascript&logoColor=F7DF1E"></img>
</div>

## What I learned

### Custom hooks

Great way to call two different endpoints with same useResource custom hook.
<details>
<summary>Code snippet from `useResource` custom hook</summary>

```JavaScript
const App = () => {
	//...
	const [notes, noteService] = useResource('http://localhost:3005/notes')
	const [persons, personService] = useResource('http://localhost:3005/persons')

	const handleNoteSubmit = (event) => {
		event.preventDefault()
		noteService.create({ content: content.value })
			.then((response) => {
				noteService.setResources(notes.concat(response.data))
			})
//...
```

```JavaScript
const useResource = (baseUrl) => {
	const [resources, setResources] = useState([])

	const getAll = async () => {
		try {
			const response = await axios.get(baseUrl)
			setResources(response.data)
		}
		catch (error) {
			console.log(error)
		}
	}

	useEffect(() => {
		getAll()
	}, [])

	const create = async (resource) => {
		try {
			const response = await axios.post(`${baseUrl}`, resource)
			return response
		}
		catch (error) {
			console.log('Post error')
		}
	}

	const service = {
		create,
		setResources
	}

	return [
		resources, service
	]
}
```

</details>

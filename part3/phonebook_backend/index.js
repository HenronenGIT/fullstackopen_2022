const express = require('express');
const morgan = require('morgan');

require('dotenv').config();
const app = express();
const cors = require('cors');
const Person = require('./models/person');

// const { json, response } = require('express');
// const { findById } = require('./models/person');

app.use(express.json());
app.use(morgan('tiny'));
app.use(cors());
app.use(express.static('build'));

app.get('/api/persons', (request, response) => {
	Person.find({}).then((persons) => {
		response.json(persons);
	});
});

app.get('/api/info', (request, response) => {
	const today = new Date();

	Person.countDocuments({}, (err, count) => {
		response.send(`Phonebook has info for ${count} people</br>Today: ${today}`);
	});
});

app.get('/api/persons/:id', (request, response, next) => {
	Person.findById(request.params.id)
		.then((person) => {
			if (person) {
				response.json(person);
			} else {
				response.status(404).end();
			}
		})
		.catch((error) => {
			next(error);
			response.status(400).send({ error: 'malformatted id' });
		});
});

app.delete('/api/persons/:id', (request, response, next) => {
	Person.findByIdAndRemove(request.params.id)
		.then(() => {
			response.status(204).end();
		})
		.catch((error) => next(error));
});

// const generateId = () => Math.floor(Math.random() * 1000);

// const person_exists = (newName) => {
// 	for (var i = 0; i < persons.length; i++) {
// 		if (persons[i].name == newName) return true;
// 	}
// 	return false;
// };

app.post('/api/persons/', (request, response, next) => {
	const body = request.body;

	//! Does not work like it whould be - respond is correct, but still adds the user
	Person.find({ name: body.name })
		.then((returnedUser) => {
			if (returnedUser.length > 0) {
				response.status(303).send({ error: 'temp' });
			}

		});
	const person = new Person({
		name: body.name,
		number: body.number,
	});

	person
		.save()
		.then((savedPerson) => {
			response.json(savedPerson);
		})
		.catch((error) => {
			next(error);
		});
});

app.put('/api/persons/:id', (request, response, next) => {
	const body = request.body;

	const person = {
		name: body.name,
		number: body.number,
	};

	Person.findByIdAndUpdate(request.params.id, person)
		.then((updatedPerson) => {
			response.json(updatedPerson);
		})
		.catch((error) => next(error));
});

const unknownEndpoint = (request, response) => {
	response.status(404).send({ error: 'Unknow endpoint' })
}

app.use(unknownEndpoint)

const errorHandler = (error, request, response, next) => {
	console.error(error.message);

	if (error.name === 'CastError') {
		return response.status(400).send({ error: 'malformatted id' });
	} else if (error.name === 'ValidationError') {
		return response.status(400).json({ error: error.message });
	}

	next(error);
};

app.use(errorHandler);

// eslint-disable-next-line no-undef
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});

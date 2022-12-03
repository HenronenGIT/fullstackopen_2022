/* eslint-disable no-undef */
const mongoose = require('mongoose');

const url = process.env.MONGODB_URI;

// const password = process.argv[2];
// const newName = process.argv[3];
// const newNumber = process.argv[4];


const checkFormat = (number) => {
	const containsOnlyNumbers = (str) => /^\d+$/.test(str);

	if (number.search('-') === -1) {
		return true
	}
	const explodedNumber = number.split('-')

	if (explodedNumber.length > 2)
		return false
	if (explodedNumber[0].length < 2 || explodedNumber[0].length > 3)
		return false
	if (containsOnlyNumbers(explodedNumber[1]) === false)
		return false
};

const validateNumber = [
	{ validator: checkFormat, msg: 'Invalid number formatting' }
];

const personSchema = new mongoose.Schema({
	name: {
		type: String,
		minLength: 3,
		required: true,
	},
	number: { type: String,
		minLength: 8,
		required: true,
		validate: validateNumber }
});

// const Person = mongoose.model('Person', personSchema);

console.log('connecting to', url);

mongoose
	.connect(url)
	.then(() => {
		console.log('connected to MongoDB');
	})
	.catch((error) => {
		console.log('error connecting to MongoDB:', error.message);
	});

personSchema.set('toJSON', {
	transform: (document, returnedObject) => {
		returnedObject.id = returnedObject._id.toString();
		delete returnedObject._id;
		delete returnedObject.__v;
	},
});

module.exports = mongoose.model('Person', personSchema);

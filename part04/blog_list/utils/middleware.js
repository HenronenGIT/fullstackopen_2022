const { response } = require("../app")

const unknownEndpoint = (request, response) => {
	response.status(404).send({error: 'unknown endpoint'})
}

const errorHandler = (error, request, response, next) => {
	if (error.name === 'JsonWebTokenError') {
		return response.status(401).json({
			error: 'invalid token'
		})
	}
	else if (error.name === 'TokenExpiredError') {
		return response.status(401).json({error: 'token expired'})
	}
}

module.exports = {
	unknownEndpoint,
	errorHandler
}
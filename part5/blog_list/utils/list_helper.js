const e = require("cors")

const dummy = blogs => {
	return (1)
}

const totalLikes = blogs => {
	let totalLikes = 0
	
	blogs.forEach(blog => {
			totalLikes += blog.likes
		})
		return (totalLikes)
}

const favoriteBlog = blogs => {
	const maxLike = Math.max(...blogs.map(like => like.likes))
	var obj = blogs.find(blog => blog.likes === maxLike);
	return (obj)
}

module.exports = {
	dummy,
	totalLikes,
	favoriteBlog
}
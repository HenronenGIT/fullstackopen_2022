const Blog = require('./blog')
const User = require('./user')
const ReadingList = require('./reading_list')

User.hasMany(Blog)
Blog.belongsTo(User)
// Blog.sync({alter: true})
// User.sync({alter: true})

// ReadingList.belongsToMany(User, {through: Blog})


module.exports = {
	Blog,
	User,
	ReadingList
}

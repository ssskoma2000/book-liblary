const { User } = require('../models/users.model')
const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')
dotenv.config()

async function checkToken(req, res, next) {
	try {
		const SECRET_KEY = process.env.SECRET_KEY
		let token = req.headers['authorization']
		if (!token)
			return res.json({
				status: 401,
				message: 'Unauthorized',
			})
		token = token.split(' ')[1]
		const data = jwt.verify(token, SECRET_KEY)

		req.user = data
		next()
	} catch (error) {
		res.json({
			status: 401,
			message: error.message
		})
	}
}
module.exports = { checkToken }

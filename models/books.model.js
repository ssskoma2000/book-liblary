const mongoose = require('mongoose')

const BookSchema = new mongoose.Schema({
	title: { type: String, required: true },
	author: { type: String, required: true },
	price: { type: Number, required: true },
	isBooked: { type: Boolean, required: true, default: false },
	user: {
		type: mongoose.Types.ObjectId,
		ref: 'users',
	},
})

const Book = mongoose.model('books', BookSchema)

module.exports = { Book }

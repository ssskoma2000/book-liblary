const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
	name: { type: String, required: true },
	age: { type: Number, required: true },
	phone: { type: Number, required: true },
	password: { type: String, required: true },

	books: [
		{
			type: mongoose.Types.ObjectId,
			ref: 'books',
		},
	],
})

const User = mongoose.model("users", UserSchema)

module.exports = {
    User
}

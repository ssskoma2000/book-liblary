const { User } = require("../models/users.model.js");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const dotenv = require("dotenv");
dotenv.config();
const SECRET_KEY = process.env.SECRET_KEY;

const REGISTER = async (req, res) => {
  const { name, age, phone, password } = req.body;
  if (!(name && age && phone && password))
    return res.json({
      message: "All fields are requiered",
    });

  const newUser = await User.create({
    name,
    age,
    phone,
    password: await bcrypt.hash(password, 12),
  });
  res.json({
    message: "Successfully registered",
    data: newUser,
  });
};

const LOGIN = async (req, res) => {
  const { phone, password } = req.body;
  let foundUser = await User.findOne({ phone });
  if (!foundUser) return res.json({ message: "User not found" });
  const isCorrectPassword = await bcrypt.compare(password, foundUser.password);
  if (!isCorrectPassword)
    return res.json({
      message: "Wrong password",
    });
  const payload = {
    _id: foundUser._id,
    phone: foundUser.phone,
    name: foundUser.name,
  };
  const token = jwt.sign(payload, SECRET_KEY);
  res.json({
    message: "Successfully logged in",
    token,
  });
};

module.exports = {
  LOGIN,
  REGISTER,
};

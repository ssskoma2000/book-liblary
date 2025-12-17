const { Book } = require("../models/books.model");
const { User } = require("../models/users.model");

const CREATE_BOOK = async (req, res) => {
  const { title, author, price } = req.body;

  const newBook = await Book.create({
    title,
    author,
    price,
  });

  return res.json({
    message: "OK",
    data: newBook,
  });
};
const UPDATE_BOOK = async (req, res) => {
  const { title, author, price } = req.body;
  const book = await Book.findById(req.params.id);
  if (!book) {
    return res.json({
      message: "Kitob topilmadi",
    });
  }
  const updatedBook = await Book.findByIdAndUpdate(
    req.params.id,
    { title, author, price },
    { new: true }
  );
  return res.json({ message: "OK", data: updatedBook });
};
const RETURN_BOOK = async (req, res) => {
  const bookdId = req.params.id;
  const book = await Book.findById(bookdId);
  if (!book)
    return res.json({
      message: "Kitob topilmadi",
    });
  if (book.isBooked == false)
    return res.json({
      message: "Bu kitob qaytarilgan",
    });

  await Book.findOneAndUpdate(
    { _id: bookdId },
    {
      isBooked: false,
      user: null,
    }
  );
  await User.findByIdAndUpdate(
    { _id: req.user._id },
    {
      $pull: {
        books: book._id,
      },
    }
  );

  res.json({
    message: "Kitob qaytarildi",
  });
};
const ORDER_BOOK = async (req, res) => {
  const bookdId = req.params.id;

  const book = await Book.findById(bookdId);
  if (!book)
    return res.json({
      message: "Kitob topilmadi",
    });
  if (book.isBooked == true)
    return res.json({
      message: "Bu kitob band",
    });
  await Book.findOneAndUpdate(
    { _id: bookdId },
    {
      isBooked: true,
      user: req.user._id,
    }
  );
  await User.findByIdAndUpdate(
    { _id: req.user._id },
    {
      $push: {
        books: book._id,
      },
    }
  );

  return res.json({
    message: "Kitob band qilindi",
  });
};
const GET_BOOKS = async (req, res) => {
  const books = await Book.find();
  return res.json({
    message: "OK",
    data: books,
  });
};
const GET_BY_ID = async (req, res) => {
  const book = await Book.findById(req.params.id);
  if (!book) {
    return res.json({
      message: "Kitob topilmadi",
    });
  }
  return res.json({ message: "OK", data: book });
};
const DELETE_BOOK = async (req, res) => {
  const book = await Book.findById(req.params.id);
  if (!book) {
    return res.json({ message: "Kitob topilmadi" });
  }
  if (book.isBooked) {
    return res.json({ message: "Kitob band qilingan, o`chirib bo`lmaydi" });
  }
  await Book.findByIdAndDelete(req.params.id);
  return res.json({ message: "Kitob o`chirildi" });
};
const GET_USER_BOOKS = async (req, res) => {
  const userWithBooks = await User.findById(req.user._id).populate("books");

  if (!userWithBooks) {
    return res.json({ message: "Foydalanuvchi topilmadi" });
  }

  return res.json({
    message: "OK",
    data: userWithBooks.books,
  });
};
module.exports = {
  CREATE_BOOK,
  UPDATE_BOOK,
  GET_BOOKS,
  GET_BY_ID,
  DELETE_BOOK,
  RETURN_BOOK,
  ORDER_BOOK,
  GET_USER_BOOKS,
};

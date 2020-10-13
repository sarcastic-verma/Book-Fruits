const {validationResult} = require('express-validator');
const RequestError = require('../middleware/request-error');
const Book = require('../models/book');

const getBookById = async (req, res, next) => {
    const bookId = req.params.bookId;
    let book;
    try {
        book = await Book.findById(bookId);
    } catch (err) {
        const error = new RequestError('Fetching book failed, please try again later.', 500, err);
        return next(error);
    }
    if (!book) {
        const error = new RequestError('book not found', 500);
        return next(error);
    }
    await res.json({"status": "success", book: book});
};

const getAllBooks = async (req, res, next) => {
    let books;
    try {
        books = await Book.find({});
    } catch (err) {
        const error = new RequestError('Fetching books failed, please try again later.', 500, err);
        return next(error);
    }
    await res.json({"status": "success", "books": books.map(book => book.toObject({getters: true}))});
}

const addBook = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        let params = "";
        errors.array().forEach((e) => {
            params += `${e.param}, `
        });
        params += "triggered the error!!";
        return next(
            new RequestError(params, 422)
        );
    }
    const {name,author,numberOfReaders} = req.body;
    const book = new Book({
        name,
        author,
        numberOfReaders
    });
    try {
        await book.save();
    } catch (err) {
        const error = new RequestError("Error creating book", 500, err);
        return next(error);
    }
    res.json({"status": "success", "book": book});

}

exports.getBookById = getBookById;
exports.getAllBooks = getAllBooks;
exports.addBook = addBook;

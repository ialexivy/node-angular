const Book = require('./bookModel');

var booksController = function() {
    var getBooks = function(req, res) {
        res.json(Book.books);
    };
    var findBook = function(id, cb) {
        Book.findById(id, (err, book) => cb(err, book));
    };
    var getBook = function(req, res) {
        findBook(req.params.bookId, (err, book) => {
            if (err) {
                res.status(500).send('Not Found');
            } else {
                res.json(book);
            }
        });
    };
    var postBook = function(req, res) {
        var book = new Book(req.body);
        book.save();
        res.status(201).send();
    };
    var putBook = function(req, res) {
        findBook(req.params.bookId, (err, book) => {
            if (err) {
                res.status(500).send('Not Found');
            } else {
                console.log(book);
                console.log(req.body);
                book.title = req.body.title;
                book.author = req.body.author;
                book.genre = req.body.genre;
                book.read = req.body.read;
                book.save();
                res.json(book);
            }
        });
    };
    return {
        getBooks: getBooks,
        getBook: getBook,
        postBook: postBook,
        putBook: putBook
    };
};

module.exports = booksController;
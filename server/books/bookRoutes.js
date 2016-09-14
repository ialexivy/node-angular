const express = require('express');
//const passport = require('passport');
const bookRouter = express.Router();


var router = function(nav) {

    let booksController = require('./booksController')();

    //bookRouter.use(passport.authenticationMiddleware());
    bookRouter.route('/')
        .get(booksController.getBooks)
        .post(booksController.postBook);

    bookRouter.route('/:bookId')
        .get(booksController.getBook)
        .put(booksController.putBook);
    return bookRouter;
};
module.exports = router;
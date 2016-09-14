const sinon = require('sinon');
const chai = require('chai');
const expect = require('chai').expect;


describe('Book controller Tests', function() {
    describe('Post', function() {
        it('Should not allow an empty title on post', function(done) {
            var Book = function(book) {
                this.save = () => {};
            };

            var req = {
                body: {
                    author: 'Jon'
                }
            };

            var res = {
                status: sinon.spy(),
                send: sinon.spy()
            };
            var bookController = require('../app/books/booksController');
            res.status.calledWith(400).should.equal(true, 'Bad Status ' + res.status.args[0][0]);
            res.send.calledWith('Title is required').should.equal(true);
        });
    });
});
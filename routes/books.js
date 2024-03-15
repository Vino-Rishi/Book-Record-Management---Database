const express = require('express');
const {
    getAllBooks,
    getSingleBooksById,
    getAllIssuedBooks,
    addNewBook,
    updateBookById,
    } = require('../controllers/book-controller');
const { users } = require('../data/users.json');
const { books } = require('../data/books.json');
const router = express.Router();
const {UserModel,BookModel} = require('../modals/index');
/**
*Routes: books
*Method: GET
*Description: Get all Books
*Access : Public
*Parameters: None
*/
router.get('/books',getAllBooks)

/**
*Routes: books/:id
*Method: GET
*Description: Get all Books by usind ID
*Access : Public
*Parameters: id
*/
router.get('/books/:id',getSingleBooksById);

/**
*Routes: books
*Method: POST
*Description: Creating a new Books
*Access : Public
*Data: id,name,author,genre,price,publisher
*/
router.post('/books',addNewBook);

/**
*Routes: books/id
*Method: PUT
*Description: Updating a Books data
*Access : Public
*Parameters: ID
*/
router.put('/books/:id',updateBookById)

/**
 * Route: /books/issued
 * Method: GET
 * Description: Get all issued books
 * Access: Public
 * Parameters: None
 */
router.get('/books/issued/by-user',getAllIssuedBooks)

/**
 * Route: /books/issued
 * Method: GET
 * Description: Get all issued books with their fine
 * Access: Public
 * Parameters: ID
 */  

module.exports = router;

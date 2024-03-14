const express = require('express');
const { users } = require('../data/users.json');
const { books } = require('../data/books.json');
const router = express.Router();
/**
*Routes: books
*Method: GET
*Description: Get all Books
*Access : Public
*Parameters: None
*/
router.get('/books',(req,res)=>{
    res.status(200).json({
        data: books,
    });
})

/**
*Routes: books/:id
*Method: GET
*Description: Get all Books by usind ID
*Access : Public
*Parameters: id
*/
router.get('/books/:id',(req,res)=>{
    const {id} = req.params;
    console.log({id});
    const book = books.find((each)=>each.id===id);
    if(!book){
        res.status(404).json({
            success:false,
            message:"Book ID not exists"
        });
    }
    return res.status(200).json({
        success:true,
        message:"Book Details Found!!",
        data: books,
    });
});

/**
*Routes: books
*Method: POST
*Description: Creating a new Books
*Access : Public
*Data: id,name,author,genre,price,publisher
*/
router.post('/books',(req,res)=>{
    const {data} = req.body;
    if(!data){
        res.status(404).json({
            success:false,
            message:"No Data To add a Book",
        });
    }
    const book = books.find((each)=>each.id===data.id);

    if(book){
        res.status(404).json({
            success:false,
            message:"Book ID already Exists"
        });
    }
    //Using Spread Operator
    const allBooks = {...books,data};
    return res.status(201).json({
        success:true,
        message:"Added Books Successfully",
        data: allBooks,
    });    
});

/**
*Routes: books/id
*Method: PUT
*Description: Updating a Books data
*Access : Public
*Parameters: ID
*/
router.put('/books/:id',(req,res)=>{
    const {id} = req.params;
    console.log({id});
    const {data} = req.body;
    console.log({data});
    const book = books.find((each)=>each.id===id);
    if(!book){
        res.status(404).json({
            success:false,
            message:"Book ID doesn't exists"
        });
    }
    const updateBookData = books.map((each)=>{
        if(each.id===id){
            return{
                ...each,
                ...data,
            }
        };
        return each;
    });
    return res.status(200).json({
        success:true,
        message:"Updating a book by their ID",
        data: updateBookData
    });
});

/**
 * Route: /books/issued
 * Method: GET
 * Description: Get all issued books
 * Access: Public
 * Parameters: None
 */
router.get('/books/issued/by-user', (req, res) => {
    const usersWithTheIssuedBook = users.filter((each) => {
      if (each.issuedBook) return each;
    });
    const issuedBooks = [];
  
    usersWithTheIssuedBook.forEach((each) => {
      const book = books.find((book) => book.id === each.issuedBook);
  
      book.issuedBy = each.name;
      book.issuedDate = each.issuedDate;
      book.returnDate = each.returnDate;
  
      issuedBooks.push(book);
    });
    if (issuedBooks.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No Book Have Been Issued Yet..",
      });
    }
    return res.status(200).json({
      success: true,
      message: "Users With The Issued Books...",
      data: issuedBooks,
    });
  });

/**
 * Route: /books/issued
 * Method: GET
 * Description: Get all issued books with their fine
 * Access: Public
 * Parameters: ID
 */  

module.exports = router;

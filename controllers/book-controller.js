const {UserModel,BookModel} = require('../modals/index')
const IssuedBook = require('../dtos/book-dto');

// Getting All Info about Books
exports.getAllBooks = async(req,res)=>{
const books = await BookModel.find()
if(books.length === 0){
    return res.status(404).json({
        success:false,
        message:"No Books Found"
    });
}
return res.status(200).json({
    success:true,
    data:books
});
};

// Getting Info using BookID
exports.getSingleBooksById = async(req,res)=>{
    const {id} = req.params;
    console.log({id});
    const book = await BookModel.findById(id);

    if(!book){
        res.status(404).json({
            success:false,
            message:"Book ID not exists"
        });
    }
    return res.status(200).json({
        success:true,
        message:"Book Details Found!!",
        data: book,
    });
}

// Getting info of IssuedBook byID -(Using Foreign Key aspects)
exports.getAllIssuedBooks = async(req,res)=>{
    const users = await UserModel.find({
        issuedBook: {$exists: true},
    }).populate("issuedBook");
    
    //Data Transfer Object (DTO)
    const issuedBooks = users.map((each)=> new IssuedBook(each))

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
}

// Adding a new Book to DB
exports.addNewBook = async(req,res)=> {
    const { data } = req.body;
    console.log({data});

    if (!data) {
      return res.status(400).json({
        sucess: false,
        message: "No Data To Add A Book",
      });
    }
    await BookModel.create(data);
    const allBooks = await BookModel.find();
  
    return res.status(201).json({
      success: true,
      message: "Added Book Succesfully",
      data: allBooks,
    });
}

exports.updateBookById = async(req,res)=>{
    const {id} = req.params;
    console.log({id});
    const {data} = req.body;
    console.log({data});

    const updatedBook = await BookModel.findOneAndUpdate(
        {
            _id: id
        },
        data,
        {
            new: true,
        }
    );
    return res.status(200).json({
        success:true,
        message:"Updating a book by their ID",
        data: updatedBook
    });
}

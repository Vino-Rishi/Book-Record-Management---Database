const {UserModel,BookModel} = require('../modals/index')

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


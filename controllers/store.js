const Book = require("../models/book")
const BookCopy = require("../models/bookCopy")


var getAllBooks = (req, res) => {
    //TODO: access all books from the book model and render book list page
    Book.find({},function(err,foundBooks) {
        if(foundBooks.length>0){
            res.render("book_list", { books: foundBooks, title: "Books | Library" });
        }   
    })
}


var getBook = (req, res) => {
    const bookId=req.params.id
   

    Book.findById(bookId,function(err,selectedBook) {
        if (err){
            console.log(err);
        }
        else{
             BookCopy.countDocuments({status:false,book:bookId}).then((count)=>{
                const currentCopiesAvailable=selectedBook.available_copies-count;
                res.render("book_detail", { book: selectedBook, title: selectedBook.title,num_available:currentCopiesAvailable });

            });
            
        }
    })
    //TODO: access the book with a given id and render book detail page
    
}

var getLoanedBooks = (req, res) => {

    const userId=req.user.id;
    BookCopy.find({borowwer:userId},function(err,borrowedBooks){
        res.render("loaned_books",{books:borrowedBooks,title:"Borrowed books"})
    })

    //TODO: access the books loaned for this user and render loaned books page
}

var issueBook = async (req, res) => {
    const {bid,num_available_copies}=req.body
    const userId=req.user.id

    const date=new Date()
    const borrowDate= date.toDateString()
    
    // console.log(req.user.id)

    await BookCopy.count({status:false,book:bid}).then((count)=>{
        console.log("True status: "+count)
        console.log("Total copies: "+num_available_copies)
        const currentCopiesAvailable=num_available_copies-count;
        if (currentCopiesAvailable>0){

            const bookInstance = new BookCopy({book:bid,status:false,borrow_date:borrowDate,borrower:userId})
            bookInstance.save();
            res.redirect("/book/"+bid)

    }});
    // TODO: Extract necessary book details from request
    // return with appropriate status
    // Optionally redirect to page or display on same
}

var searchBooks = (req, res) => {
    // TODO: extract search details
    // query book model on these details
    // render page with the above details
    const {title,author,genre} = req.body

    Book.find({"title":{$regex:title, "$options" : "i"},"author":{$regex:author, "$options" : "i"},"genre":{$regex:genre, "$options" : "i"}},function(err,foundBooks){
 
            res.render("book_list", { books: foundBooks, title: "Books | Library" });

    })
}

module.exports = {
    getAllBooks,
    getBook,
    getLoanedBooks,
    issueBook,
    searchBooks
}
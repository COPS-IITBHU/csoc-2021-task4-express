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
             BookCopy.countDocuments({status:false,book:bookId}).then((alreadyBorrowed)=>{
                const currentCopiesAvailable=selectedBook.available_copies-alreadyBorrowed;
                res.render("book_detail", { book: selectedBook, title: selectedBook.title,num_available:currentCopiesAvailable });

            });
            
        }
    })
    //TODO: access the book with a given id and render book detail page
    
}

var getLoanedBooks = (req, res) => {

    const userId=req.user
    BookCopy.find({borrower:userId},function(err,books){
        Book.populate(books,{path:'book'},function(err,borrowedBooks){
            res.render('loaned_books',{books:borrowedBooks,title:'Borrowed books'})
        })
    })
    

    //TODO: access the books loaned for this user and render loaned books page
}


var returnBook = async (req, res) => {
    const userId=req.user
    const {bid}= req.body
    await BookCopy.findByIdAndUpdate(bid,{status:true,borrower:null,borrow_date:null})
    res.redirect("/books/loaned")

}

var issueBook = async (req, res) => {
    const {bid,total_copies}=req.body
    const userId=req.user.id
    const date=new Date()
    const borrowDate= date.toDateString()

    await BookCopy.countDocuments({status:false,book:bid}).then((alreadyBorrowed)=>{

        const currentCopiesAvailable=total_copies-alreadyBorrowed;

        if (currentCopiesAvailable>0){


             BookCopy.countDocuments({book:bid}).then((totalInstances)=>{


                if(totalInstances<total_copies){
                    const bookInstance = new BookCopy({book:bid,status:false,borrow_date:borrowDate,borrower:userId}).populate('book')
                    bookInstance.save();
                    res.redirect("/book/"+bid)
                }else{
                    BookCopy.find({book:bid,status:true},function(err,bookInstances){
                        if(err){
                            console.log(err)
                        }else{
                            bookInstances[0].status=false
                            bookInstances[0].borrower=userId
                            bookInstances[0].borrow_date=borrowDate
                            bookInstances[0].save(function(){
                                res.redirect("/book/"+bid)
                            })
                        }

                    })
                 // BookCopy.findOneAndUpdate({book:bid},{status:false,borrower:userId,borrow_date:borrowDate})
                }
               }
          )
        }
    })
    
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
    searchBooks,
    returnBook
}
var Book=require("../models/book")
var BookCopy=require("../models/bookCopy")
var User=requre
var Books=[]
var getAllBooks = (req, res) => {
    //TODO: access all books from the book model and render book list page
    Book.find()
    .then((arr)=>{
        Books=arr;
        res.render("book_list", { books: Books, title: "Books | Library" });   
    })
    .catch((err)=>{
        console.log(err);
        res.end();
    })
}
var idBook;
var getBook = (req, res) => {
   Book.findById(req.params.id,((err,res)=>{
       idBook=res;
       if(err)
       {
           console.log(err);
       };
       
   })).then(() => {
       res.render("book_detail",{book:idBook, title:"Book details"});
   })
//    res.render("book_detail",{book:"",title:""}); 
    //TODO: access the book with a given id and render book detail page
}

var getLoanedBooks = (req, res) => {

    //TODO: access the books loaned for this user and render loaned books page
}

var issueBook = (req, res) => {
    const id=req.body.bid;
    const title = "";
    Book.findById(id)
    .then((book) => {
        title=book.title;
        console.log(title);
        BookCopy.find({status:true,book:title},((err,List) => {
            if(err) {
                console.log(err);
            }
            else{
                if(List!==[]) {
                    await List[0].updateOne({status:false,borrow_data:new Date().toLocaleString(),borrower:req.user.username});
                    User.
                }else{

                }
            }
        }));
    })
    .catch((err) => {
        console.log(err);
    });
    // Book.findById(req.body.bid)
    // .then((book) =>{
    //    const newBookCopy=new BookCopy({
    //         book:book.title,
    //         status:(book.available_copies>0)?true:false,

    //    }); 
    // })
    // .catch((err) =>{
    //     console.log(err);
    // });
    // TODO: Extract necessary book details from request
    // return with appropriate status
    // Optionally redirect to page or display on same
}

var searchBooks = (req, res) => {
    if(req.body.title!=='' && req.body.author!==''&& req.body.genre!=='')
    {
        Book.find({title:req.body.title, author:req.body.author, genre:req.body.genre},(err,resPar)=>{
            if(err){
                console.log(err);
            }else{
                    res.render("book_list",{books:resPar, title:"Searched List"})
            }
        });
    }
    else if(req.body.title==='' && req.body.author!==''&& req.body.genre!=='')
    {
        Book.find({ author:req.body.author, genre:req.body.genre},(err,resPar)=>{
            if(err){
                console.log(err);
            }else{
                res.render("book_list",{books:resPar, title:"Searched List"})
            }
        });
    }
    else if(req.body.title!=='' && req.body.author===''&& req.body.genre!=='')
    {
        Book.find({title:req.body.title, genre:req.body.genre},(err,resPar)=>{
            if(err){
                console.log(err);
            }else{
                res.render("book_list",{books:resPar, title:"Searched List"})
            }
        });
    }
    else if(req.body.title!=='' && req.body.author!==''&& req.body.genre==='')
    {
        Book.find({title:req.body.title, author:req.body.author},(err,resPar)=>{
            if(err){
                console.log(err);
            }else{
                res.render("book_list",{books:resPar, title:"Searched List"})
            }
        });
    }
    else if(req.body.title==='' && req.body.author===''&& req.body.genre!=='')
    {
        Book.find({ genre:req.body.genre},(err,resPar)=>{
            if(err){
                console.log(err);
            }else{
                res.render("book_list",{books:resPar, title:"Searched List"})
            }
        });
    }
    else if(req.body.title==='' && req.body.author!==''&& req.body.genre==='')
    {
        Book.find({ author:req.body.author},(err,resPar)=>{
            if(err){
                console.log(err);
            }else{
                res.render("book_list",{books:resPar, title:"Searched List"})
            }
        });
    }
    else if(req.body.title!=='' && req.body.author===''&& req.body.genre==='')
    {
        Book.find({title:req.body.title},(err,resPar)=>{
            if(err){
                console.log(err);
            }else{
                res.render("book_list",{books:resPar, title:"Searched List"})
            }
        });
    }
    else{
        res.redirect("/books");
    }
    // TODO: extract search details
    // query book model on these details
    // render page with the above details
}

module.exports = {
    getAllBooks,
    getBook,
    getLoanedBooks,
    issueBook,
    searchBooks
}
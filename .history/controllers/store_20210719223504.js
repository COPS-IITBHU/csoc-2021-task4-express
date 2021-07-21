var Book=require("../models/book")
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
       console.log(idBook);
       console.log(idBook.title);
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
                console.log(resPar);
            }
        });
    }
    else if(req.body.title==='' && req.body.author!==''&& req.body.genre==='')
    {
        Book.find({ author:req.body.author},(err,resPar)=>{
            if(err){
                console.log(err);
            }else{
                console.log(resPar);
            }
        });
    }
    else if(req.body.title!=='' && req.body.author===''&& req.body.genre==='')
    {
        Book.find({title:req.body.title},(err,resPar)=>{
            if(err){
                console.log(err);
            }else{
                console.log(resPar);
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
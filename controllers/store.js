const Book = require("../models/book");
const Bookcopy = require("../models/bookCopy");
const User = require("../models/user");

let num_available, copy_num_available;
copy_num_available = num_available;

var getAllBooks = (req, res) => {
    //TODO: access all books from the book model and render book list page
    Book.find()
        .then((result) => res.render("book_list", { books: result, title: "Books | Librar" }))
        .catch((err) => console.log(err))

}

var getBook = (req, res) => {
    //TODO: access the book with a given id and render book detail page
    const id = req.params.id;
    Book.findById(id)
        .then((result) => {
            const copy = result.available_copies;
            res.render("book_detail", { book: result, title: result.title, num_available: result.available_copies })
        })
        .catch((err) => console.log(err))
}


var getLoanedBooks = (req, res) => {

    Bookcopy.find({
        borrower: req.user.id
    })
        .populate('book')
        .exec()
        .then((result) => {
            res.render('loaned_books', { title: "loaned_books", books: result })
        })
        .catch((err) => console.log(err))
}



var issueBook = (req, res) => {

    // TODO: Extract necessary book details from request
    // return with appropriate status
    // Optionally redirect to page or display on same

    const ids = req.body.bid;
    const userid = req.user.id;

    const bookcopy = new Bookcopy({
        book: req.body.bid,
        borrower: req.user.id
    });


    Book.findById(ids)
        .then((result) => {
            if ((result.available_copies) > 0) {
                num_available = (result.available_copies) - 1;
                bookcopy.status = true,

                    bookcopy.save()
                        .then((result) => {

                            Bookcopy.find({
                                borrower: req.user.id
                            })

                                .then((result) => {
                                    let loaned_books = [];
                                    result.forEach(element => {
                                        loaned_books.push(element.id)
                                    })

                                    loaned_books.forEach(element => console.log("loaned   ", element))

                                    User.findByIdAndUpdate(userid, { $set: { loaned_books: loaned_books } })
                                        .then((result) => console.log("loane_books updated"))
                                        .catch((err) => console.log("error ", err))


                                })
                                .catch((err) => console.log(err));
                        })
                        .catch((err) => console.log("ebbbrror = " + err));
            }
            else {
                num_available = 0;
                bookcopy.status = false
            }

            let updatecopy = {
                available_copies: num_available,
            }
            Book.findByIdAndUpdate(ids, { $set: updatecopy })
                .then((result) => {
                    res.redirect('/books/loaned')
                })
                .catch(err => console.log("erroe = ", err));


        })
        .catch((err) => console.log(err))

}




var searchBooks = (req, res) => {

    // TODO: extract search details
    // query book model on these details
    // render page with the above details
    Book.find({
        $or: [
            {
                title: req.body.title,
                author: req.body.author,
                genre: req.body.genre
            },
            { title: req.body.title },
            { author: req.body.author },
            { genre: req.body.genre }
        ]
    })
        .then((result) => {
            res.render("book_list", { books: result, title: "Books | Librar" })
        })
        .catch((err) => console.log(err))

}


var removeBooks = (req, res) => {
    console.log("delete = ", req.body);

    Bookcopy.findByIdAndDelete(req.body.bookcopyid)
        .populate('book')
        .exec()
        .then((result) => {
            const ids = result.book.id


            Book.findById(ids)
                .then((result) => {
                    num_available = (result.available_copies) + 1;
                    let updatecopy = {
                        available_copies: num_available
                    }

                    Book.findByIdAndUpdate(ids, { $set: updatecopy })
                        .then((result) => {
                            res.redirect('/books/loaned')
                        })
                        .catch(err => console.log("erroe = ", err));

                })
                .catch(err => console.log("erroe = ", err));
        })
        .catch((err) => console.log("error = ", err))
}




module.exports = {
    getAllBooks,
    getBook,
    getLoanedBooks,
    issueBook,
    searchBooks,
    removeBooks
}
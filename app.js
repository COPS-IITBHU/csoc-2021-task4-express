const express = require("express");
const app = express();
var mongoose = require("mongoose");
var passport = require("passport");
var auth = require("./controllers/auth");
var store = require("./controllers/store");
var User = require("./models/user");
var localStrategy = require("passport-local");
//importing the middleware object to use its functions
var middleware = require("./middleware"); //no need of writing index.js as directory always calls index.js by default
var port = process.env.PORT || 3000;

app.use(express.static("public"));
app.use(express.urlencoded({ extended : false }));

/*  CONFIGURE WITH PASSPORT */
app.use(
  require("express-session")({
    secret: "decryptionkey", //This is the secret used to sign the session ID cookie.
    resave: false,
    saveUninitialized: false,
  })
);

app.use(passport.initialize()); //middleware that initialises Passport.
app.use(passport.session());
passport.use(new localStrategy(User.authenticate())); // used to authenticate User model with passport
passport.serializeUser(User.serializeUser()); // used to serialize the user for the session
passport.deserializeUser(User.deserializeUser()); // used to deserialize the user

app.use(express.urlencoded({ extended: true })); //parses incoming url encoded data from forms to json objects
app.set("view engine", "ejs");

//THIS MIDDLEWARE ALLOWS US TO ACCESS THE LOGGED IN USER AS currentUser in all views
app.use(function (req, res, next) {
  res.locals.currentUser = req.user;
  next();
});

/* CONNECTING TO MONGODB SERVER  */
mongoose.connect("mongodb+srv://spunky:spunky12345@cluster0.jhtks.mongodb.net/library-system?retryWrites=true&w=majority", {
  useNewUrlParser : true,
  useCreateIndex : true
});

app.get("/", (req, res) => {
  res.render("index", { title: "Library" });
});

/* STORE ROUTES */

app.get("/books", store.getAllBooks);

app.get("/book/:id", store.getBook);

app.get("/books/loaned",
    middleware.isLoggedIn,
    store.getLoanedBooks
);

app.post("/books/issue", 
    middleware.isLoggedIn,
    store.issueBook
);

app.post("/books/search-book", store.searchBooks);

app.post('/books/return',
    middleware.isLoggedIn,
    store.returnBook
);

/* AUTH ROUTES */

app.get("/login", auth.getLogin);

app.post("/login", auth.postLogin);

app.get("/register", auth.getRegister);

app.post("/register", auth.postRegister);

app.get("/logout", auth.logout);

app.listen(port, () => {
  console.log(`App listening on port ${port}!`);
});


// Import express modules
const express = require("express");

// Import path modules
const path = require("path");

// Import books module from routes
const booksRouts = require("./routing/books");

// Import body parser modules/ Expresss comes with it but we add a third party version just incase they remove theirs.
const bodyParser = require("body-parser");

const app = express();  // Initializes the background modules that will be handled by express, that we no longer need to worry about

// Register ejs templating engine 
app.set("view engine", "ejs");

// Tell EJS where the views are located.
// If in views as in this folder, this line isn't necessary
// it is set internally to this by default. No need to repeat.
app.set('views','views');

// Parse body before all other middleware 
app.use(bodyParser.urlencoded({extended:false}));

// serve static content using middleware that gives read access to specified content
app.use(express.static(path.join(__dirname,'public')));

app.use(booksRouts.router);


// 404 page. Only request to come after the '/' path request: called a catch all route
app.use((req, res, next)=>{

    res.status(404).render('page-not-found', {pageTitle:'Page Not Fount', path:'page-not-found'}); // chained the page status to the response.

});

port = process.env.PORT || 3000;

app.listen(port);
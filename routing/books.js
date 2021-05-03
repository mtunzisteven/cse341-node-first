'use strict';

const fs = require('fs');

const express = require('express');

// Add book into an array books

const router = express.Router();

const book = [];

router.post("/books",(req, res, next)=>{

    book.push({bookTitle:req.body.bookTitle, summary: req.body.summary});  
    console.log(book);
    

    if(fs.existsSync('books.json')){
        let json = fs.readFileSync('books.json'); // open and read books hson file
        let books = JSON.parse(json);   // parse json object to get data as string
        console.log(books);
        books.push({bookTitle:req.body.bookTitle, summary: req.body.summary}); // Add current book to books
         
        let data = JSON.stringify(books); // convert data back into a json object
        fs.writeFileSync('books.json', data);

    }else{
        let data = JSON.stringify(book); // convert data back into a json object
        fs.writeFileSync('books.json', data);
    }

    res.redirect('/book');

});

router.get('/book',(req, res, next)=>{

    if(fs.existsSync('books.json')){

        let data = fs.readFileSync('books.json');
        let books = JSON.parse(data);
        console.log(books);

        res.render('book-display', {
            pageTitle:'Display Books',
            books: books,
            hasBooks:true,
            path: '/book-display'
        });
    }

});

router.get("/",(req, res, next)=>{
       
        res.render('add-book-info', {
            pageTitle:'Add A Book',
            path: '/add-book-info',
        });
    
});

exports.router = router;

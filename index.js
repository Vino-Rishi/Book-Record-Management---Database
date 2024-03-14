const express = require('express');
const dotenv = require('dotenv');
const dbConnection  = require('./databaseConnection');
const userRouter = require ('./routes/users');
const bookRouter = require('./routes/books');

dotenv.config();

const app = express();

dbConnection();

const PORT = 3500;

app.use(express.json());
//All methods=> CRUD Operation done in Router Folder->users.js & books.js
app.use('/',userRouter);
app.use('/',bookRouter);

// Display home directory message
app.get('/',(req,res)=> {
    res.status(200).json({
        "message": "Node server is up and running :-)"
    });
});

// If user try to load a page with undefined name it shows an error
app.get("*",(req,res)=> {
    res.status(404).json({
        "message": "This page doesn't exists"
    });
});

//Displays running PORT Details

app.listen(PORT, ()=> {
    console.log(`Node Server Running PORT on ${PORT}`);
})
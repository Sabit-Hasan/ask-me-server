const dotenv = require('dotenv');
const express = require('express');
const mongoose = require('mongoose');
const app = express();

// DOTENV
dotenv.config({ path: './config.env' });

// MONGODB CONFIG
const DB = process.env.DATABASE;
const PORT = process.env.PORT;

mongoose.connect(DB).then(() => {
    console.log('Connected to MongoDB Database');
}).catch(err => { console.error(err); });

// Middleware
const middleware = (req, res, next) => {
    console.log("Hello My Middleware");
    next();
}

app.get('/', (req, res) => {
    res.send("Hello World");
});

app.get('/about', middleware, (req, res) => {
    console.log("About Middleware");
    res.send("This is about page.");
});

app.get('/contact', (req, res) => {
    res.send("This is contact page.");
});


app.listen(PORT, () => {
    console.log(`Responding on port ${PORT}`)
})
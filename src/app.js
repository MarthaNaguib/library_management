// src/app.js

const express = require('express');
const booksRouter = require('./routes/booksRouter');
const borrowersRouter = require('./routes/borrowersRouter');

const app = express();

app.use(express.json());

app.use('/books', booksRouter);
app.use('/borrowers', borrowersRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

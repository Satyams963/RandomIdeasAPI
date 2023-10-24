const path = require('path');
const express = require("express");
require('dotenv').config();
const port = process.env.PORT || 8000;
const connectDB = require('./config/db');

connectDB();

const app = express();

// Static Folder
app.use(express.static(path.join(__dirname, 'public')))

// body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false}))

app.get('/', (req, res) => {
    res.json({message: 'Welcome to the Random Ideas Api'})
});

const ideasRouter = require('./routes/ideas');
app.use('/api/ideas', ideasRouter);

app.listen(port, () => console.log(`listening at port, ${port}`));

const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const authRoutes = require('./routes/authRoutes')
const cookieParser = require('cookie-parser')
const { requireAuth, checkUser } = require('./middleware/authMiddleware')

const app = express();

// middleware
app.use(express.static('public'));
app.use(express.json());
app.use(cookieParser());
app.use(authRoutes);

// load the environment variable
dotenv.config();

// view engine
app.set('view engine', 'ejs');

const PORT = process.env.PORT;
const dbURI = process.env.dbURI;


// database connection
mongoose.connect(dbURI).then((result) => {
    console.log('database is connected');
    app.listen(PORT, () => {
      console.log(`Server is connected on Port ${PORT}`)
    })
  }).catch((err) => console.log(err))


// routes
app.get('*', checkUser)
app.get('/', (req, res) => res.render('home'));
app.get('/cakes', requireAuth, (req, res) => res.render('cakes'));

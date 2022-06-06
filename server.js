if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

const express = require('express');
const app = express();
const expressLayouts = require('express-ejs-layouts');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');


const dbURI = 'mongodb+srv://joethompson:Thojoe12@cluster0.sw8hl.mongodb.net/soulbounder';
mongoose.connect(dbURI, { useUnifiedTopology: true })
  .then((result) => app.listen(process.env.PORT || 3000))
  .catch((err) => console.log(err));



const homeRouter = require('./routes/homeRoutes');



// Set Templating Engine
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');
app.set('layout', 'layouts/layout');
app.use(expressLayouts);
app.use(express.static('public/'));
app.use(bodyParser.urlencoded({ extended: false })); // limit: '10mb'
app.use(cookieParser());
app.use(express.json());



// Static Files
app.use('/', homeRouter);
app.use('/home', homeRouter);


module.exports = app;
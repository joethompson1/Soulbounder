// if (process.env.NODE_ENV !== 'production') {
//   require('dotenv').config();
// }


import express from 'express';
const app = express();
import expressLayouts from 'express-ejs-layouts';
import bodyParser from 'body-parser';
import bcrypt from 'bcrypt';
import cookieParser from 'cookie-parser';
import mongoose from 'mongoose';
import path from 'path';
const __dirname = path.resolve();

// const dbURI = 'mongodb+srv://joethompson:Thojoe12@cluster0.sw8hl.mongodb.net/soulbounder';
// mongoose.connect(dbURI, { useUnifiedTopology: true })
//   .then((result) => app.listen(process.env.PORT || 3000))
//   .catch((err) => console.log(err));

app.listen(process.env.PORT || 3000);

import homeRouter from './routes/homeRoutes.js'
import createSBTRouter from './routes/createSBTRoutes.js';



// Set Templating Engine
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');
app.set('layout', 'layouts/layout');
app.use(expressLayouts);
app.use(express.static('public/'));
app.use(bodyParser.json({limit: '50mb', extended: true}));
app.use(bodyParser.urlencoded({limit: "50mb", extended: true, parameterLimit:50000}));
app.use(bodyParser.text({ limit: '200mb' }));
app.use(cookieParser());
app.use(express.json());



// Static Files
app.use('/', homeRouter);
app.use('/home', homeRouter);
app.use('/createSBT', createSBTRouter);


export default app;
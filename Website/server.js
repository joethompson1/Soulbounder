

import express from 'express';
const app = express();
import expressLayouts from 'express-ejs-layouts';
import bodyParser from 'body-parser';
import path from 'path';
const __dirname = path.resolve();


app.listen(process.env.PORT || 3000);

import homeRouter from './routes/homeRoutes.js'
import createSBTRouter from './routes/createSBTRoutes.js';
import libraryRouter from './routes/libraryRoutes.js';
import profileRouter from './routes/profileRoutes.js';


// Set Templating Engine
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');
app.set('layout', 'layouts/layout');
app.use(expressLayouts);
app.use(express.static('public/'));
app.use(bodyParser.json({limit: '50mb', extended: true}));
app.use(bodyParser.urlencoded({limit: "50mb", extended: true, parameterLimit:50000}));
app.use(bodyParser.text({ limit: '200mb' }));
app.use(express.json());



// Static Files
app.use('/', homeRouter);
app.use('/home', homeRouter);
app.use('/createSBT', createSBTRouter);
app.use('/library', libraryRouter);
app.use('/profile', profileRouter);



// IPFS Connection
import * as IPFS from 'ipfs-core';

const ifpsConfig = {
  host: "ipfs.infura.io",
  port: 5001,
  protocol: "https"
};

export const node = await IPFS.create(ifpsConfig);


export default app;
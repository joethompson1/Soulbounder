import express from 'express';
const router = express.Router();

import { library_get } from '../controllers/libraryController.js';


router.get('/viewSBT', library_get);


export default router;
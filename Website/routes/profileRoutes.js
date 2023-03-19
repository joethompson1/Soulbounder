import express from 'express';
const router = express.Router();

import { profile_get, viewSBT_get } from '../controllers/profileController.js';


router.get('/', profile_get);
router.get('/viewSBT', viewSBT_get);


export default router;
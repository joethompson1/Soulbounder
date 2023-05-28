import express from 'express';
const router = express.Router();

import { profile_get } from '../controllers/profileController.js';


router.get('/', profile_get);


export default router;
import express from 'express';
const router = express.Router();

import { home_get } from '../controllers/homeController.js';

router.get('/home', home_get);
router.get('/', home_get);


export default router;
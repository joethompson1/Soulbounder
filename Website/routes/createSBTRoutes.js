import express from 'express';
const router = express.Router();

import { createSBT_get, createSBT_post } from '../controllers/createSBTController.js';


router.get('/', createSBT_get);
router.post('/', createSBT_post);


export default router;
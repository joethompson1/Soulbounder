import express from 'express';
const router = express.Router();

import { createSBT_get, blockchain_post } from '../controllers/createSBTController.js';


router.get('/', createSBT_get);
router.post('/blockchain', blockchain_post);

export default router;
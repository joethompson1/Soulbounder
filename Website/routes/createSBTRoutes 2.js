import express from 'express';
const router = express.Router();

import { createSBT_get, createSBT_post, blockchain_get } from '../controllers/createSBTController.js';


router.get('/', createSBT_get);
router.post('/', createSBT_post);

router.get('/blockchain', blockchain_get);

export default router;
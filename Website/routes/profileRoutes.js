import express from 'express';
const router = express.Router();

import { profile_get, decryptAuthToken } from '../controllers/profileController.js';


router.get('/', profile_get);
router.post('/decryptAuthToken', decryptAuthToken);

export default router;
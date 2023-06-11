import express from 'express';
const router = express.Router();

import { profile_get, decryptAuthToken, edit_get, edit_post } from '../controllers/profileController.js';


router.get('/', profile_get);
router.post('/decryptAuthToken', decryptAuthToken);
router.get('/edit', edit_get);
router.post('/edit', edit_post);

export default router;
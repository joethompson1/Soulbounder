import express from 'express';
const router = express.Router();

import { profile_get, edit_get, edit_post } from '../controllers/profileController.js';


router.get('/', profile_get);
router.get('/edit', edit_get);
router.post('/edit', edit_post);

export default router;
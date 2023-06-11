import express from 'express';
const router = express.Router();

import { getAuthToken } from '../controllers/apiController.js';


router.get('/getAuthToken/:userWalletAddress', getAuthToken);


export default router;
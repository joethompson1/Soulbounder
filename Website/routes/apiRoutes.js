import express from 'express';
const router = express.Router();

import { getAuthToken, decryptAttribute } from '../controllers/apiController.js';


router.get('/getAuthToken/:userWalletAddress', getAuthToken);
router.post('/decryptAttribute', decryptAttribute);



export default router;
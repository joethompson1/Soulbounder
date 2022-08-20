const { Router } = require('express');
const createSBTController = require('../controllers/createSBTController');

const router = Router();

router.get('/', createSBTController.createSBT_get);




module.exports = router;
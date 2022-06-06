const { Router } = require('express');
const homeController = require('../controllers/homeController');

const router = Router();

router.get('/home', homeController.home_get);
router.get('/', homeController.home_get);





module.exports = router;
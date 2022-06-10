const { Router } = require('express');
const createEventController = require('../controllers/createEventController');

const router = Router();

router.get('/', createEventController.createEvent_get);




module.exports = router;
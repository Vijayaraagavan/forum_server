const express = require('express');
const router = express.Router();
const communityController = require('../controllers/communityController');

router.post('/', communityController.create);
// router.get('/:id', userController.getUserByUid);

module.exports = router;

// app/routes/userRoutes.js

const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.post('/', userController.createUser);
router.get('/:id', userController.getUserByUid);
// Define other user routes as needed

module.exports = router;

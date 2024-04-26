const express = require('express');
const router = express.Router();
const communityController = require('../controllers/communityController');

router.post('/', communityController.create);
router.post('/post', communityController.createPost);
router.post('/posts', communityController.getPosts);
router.post('/posts/vote', communityController.vote);
router.get('/recent', communityController.getRecent);
router.post('/:id/join', communityController.join);
router.post('/:id/leave', communityController.leave);
router.post('/page', communityController.communityPage);
// router.get('/:id', userController.getUserByUid);

module.exports = router;

const express = require('express');
const router = express.Router();
const postsController = require('../controllers/postsController')
router.route('/')
.get(postsController.getPosts)
.post(postsController.createPost);
router.route('/:id')
.get(postsController.getPostById)
.put(postsController.updatePost)
.delete(postsController.deletePost);
module.exports = router;

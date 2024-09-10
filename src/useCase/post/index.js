const express = require('express');
const router = express.Router();
const { getAllPostController, getPostByIdController, deletePostController, createPostController, deletePostImageController, updatePostController } = require('./post.controller');
const setCache = require('../../utils/cache/setCache');
const clearCache = require('../../utils/cache/clearCache');
const uploadCloudinary = require('../../utils/uploadCloudinary');
const { verificationAdmin } = require('../../middleware/adminVerification');

router.get('/', setCache(172800), getAllPostController)
router.get('/:id', setCache(172800), getPostByIdController)
router.delete('/:id', verificationAdmin, clearCache('post'), deletePostController)
router.post('/', verificationAdmin, clearCache('post'), uploadCloudinary('post').array('image', 20), createPostController)
router.delete('/image/:id', verificationAdmin, clearCache('post'), deletePostImageController)
router.put('/:id', verificationAdmin, clearCache('post'), updatePostController)


module.exports = router
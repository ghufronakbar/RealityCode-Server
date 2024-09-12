const express = require('express');
const router = express.Router();
const { getAllMessageController, getMessageByIdController, deleteMessageController, createMessageController, replyMailController } = require('./message.controller');
const setCache = require('../../utils/cache/setCache');
const clearCache = require('../../utils/cache/clearCache');
const { verificationAdmin } = require('../../middleware/adminVerification');
const uploadCloudinary = require('../../utils/uploadCloudinary');

router.get('/', verificationAdmin, setCache(172800), getAllMessageController)
router.get('/:id', verificationAdmin, setCache(172800), getMessageByIdController)
router.delete('/:id', verificationAdmin, clearCache('message'), deleteMessageController)
router.post('/', uploadCloudinary("message").single('image'), clearCache('message'), createMessageController)
router.post('/reply', verificationAdmin, replyMailController)


module.exports = router
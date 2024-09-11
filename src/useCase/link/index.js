const express = require('express');
const router = express.Router();
const { getLinkController, createLinkController, deleteLinkController, updateLinkController } = require('./link.controller');
const setCache = require('../../utils/cache/setCache');
const clearCache = require('../../utils/cache/clearCache');
const { verificationAdmin } = require('../../middleware/adminVerification');

router.get('/', setCache(172800), getLinkController)
router.post('/', verificationAdmin, clearCache('link'), createLinkController)
router.put('/:id', verificationAdmin, clearCache('link'), updateLinkController)
router.delete('/:id', verificationAdmin, clearCache('link'), deleteLinkController)

module.exports = router
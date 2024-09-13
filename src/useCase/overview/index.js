const express = require('express');
const router = express.Router();
const setCache = require('../../utils/cache/setCache');
const clearCache = require('../../utils/cache/clearCache');
const { getOverviewController } = require('./overview.controller');
const { verificationAdmin } = require('../../middleware/adminVerification');

router.get('/', setCache(259200), getOverviewController)
router.post('/', verificationAdmin, clearCache('overview'), setCache(259200), getOverviewController)

module.exports = router
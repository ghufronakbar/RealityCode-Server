const express = require('express');
const router = express.Router();
const setCache = require('../../utils/cache/setCache');
const clearCache = require('../../utils/cache/clearCache');
const { getOverviewController } = require('./overview.controller');

router.get('/', setCache(172800), getOverviewController)
router.post('/', clearCache('overview'), setCache(172800), getOverviewController)

module.exports = router
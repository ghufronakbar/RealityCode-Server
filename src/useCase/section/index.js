const express = require('express');
const router = express.Router();
const { sections, createSection, createSubSection, editSection, editSubSection, deleteSubSection } = require('./section.controller');
const setCache = require('../../utils/cache/setCache');
const clearCache = require('../../utils/cache/clearCache');
const { verificationAdmin } = require('../../middleware/adminVerification');

router.get('/', setCache(172800), sections)
router.post('/', verificationAdmin, clearCache('section'), setCache(172800), createSection)
router.post('/subsection', verificationAdmin, clearCache('section'), setCache(172800), createSubSection)
router.put('/:id', verificationAdmin, clearCache('section'), editSection)
router.put('/subsection/:id', verificationAdmin, clearCache('section'), editSubSection)
router.delete('/:id', verificationAdmin, clearCache('section'), deleteSubSection)

module.exports = router
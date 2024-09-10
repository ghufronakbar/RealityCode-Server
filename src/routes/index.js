const express = require('express');
const router = express.Router();

router.use('/account', require('../useCase/account'));
router.use('/link', require('../useCase/link'));
router.use('/message', require('../useCase/message'));
router.use('/post', require('../useCase/post'));


module.exports = router
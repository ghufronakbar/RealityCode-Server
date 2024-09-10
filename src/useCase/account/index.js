const express = require('express');
const { login, refresh } = require('./account.controller');
const router = express.Router();

router.post('/login', login)

module.exports = router
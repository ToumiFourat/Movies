const express = require('express');
const { create} = require('../controllers/user');

const router = express.Router()

router.post("/create",create)

module.exports = router;
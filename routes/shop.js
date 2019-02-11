const express = require('express');

const path = require('path');

const router = express.Router();
const rootDir = require('../util/path');
const shopController = require('../controllers/shop')


router.get('/', shopController.getProducts);

module.exports = router;
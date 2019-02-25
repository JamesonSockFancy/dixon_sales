const express = require('express');

const path = require('path');

const router = express.Router();
const rootDir = require('../util/path');
const shopController = require('../controllers/shop')


router.get('/', shopController.getProducts);

router.post('/send-sale', shopController.postSale);


module.exports = router;
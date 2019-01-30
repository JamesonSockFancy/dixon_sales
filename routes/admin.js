const express = require('express');

const path = require('path');

const router = express.Router();

const adminController = require('../controllers/admin');

const rootDir = require('../util/path');



router.get('/add-product', (req, res, next) => {
    res.sendFile(path.join(rootDir, 'views', 'add-product.html'));
});

router.post('/add-product', adminController.postGetProducts);

exports.routes = router;
exports.sales = sales;
const express = require('express');

const path = require('path');

const router = express.Router();
const rootDir = require('../util/path');
const adminData = require('./admin')


router.get('/', (req, res, next) => {
    const sales = adminData.sales;
    res.render('shop', {sales});
});

module.exports = router;
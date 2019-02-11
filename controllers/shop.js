const fs = require('fs');
const path = require('path');

const Sales = require('../models/sales');


exports.getProducts = (req, res, next) => {
  Sales.fetchAll(sales => {
    res.render('shop', {
      sales: sales,
      pageTitle: 'sales',
      path: '/'
    });
  }) 
 };

 // exports.getProducts = (req, res, next) => {
//     Sales.fetchAll(sales => {
//       res.render('/', {
//         sales: sales,
//         pageTitle: 'sales',
//         path: '/'
//       });
//     });
//   };
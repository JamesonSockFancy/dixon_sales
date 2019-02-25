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

 exports.postSale = (req, res, next) => {
  // console.log(req.body.customerId)
  const customerID = req.body.customerId;
  Sales.getSaleById(customerID)
  res.redirect('/');
}

 // exports.getProducts = (req, res, next) => {
//     Sales.fetchAll(sales => {
//       res.render('/', {
//         sales: sales,
//         pageTitle: 'sales',
//         path: '/'
//       });
//     });
//   };
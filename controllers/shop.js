const fs = require('fs');
const path = require('path');
var request = require('request-promise');
var qs = require('qs');
var parseString = require('xml2js').parseString;

var getAuth = {
  
  method: 'POST',
  body: qs.stringify({
   'refresh_token': 'ad801fd268d63e30299c28f257c2bec7d32dd2a8',
   'client_secret': 'c5e4af85bda04d99e69c8121bb52866407d580e07fba7ca8a7cc2798e63f6aae',
   'client_id': '1d9252b179e2180935270c3f66ccac118a9f81142c616a5faa886ee6fa3c5422',
   'grant_type': 'refresh_token'
 }),
  headers:
    {
      'Content-type': "application/x-www-form-urlencoded"
    },
  url: 'https://cloud.merchantos.com/oauth/access_token.php'
 
 
 };


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
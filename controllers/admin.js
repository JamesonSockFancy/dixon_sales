var request = require('request-promise');
var qs = require('qs');
var parseString = require('xml2js').parseString;
const fs = require('fs');
const path = require('path');

let sales = [];

const p = path.join(
  path.dirname(process.mainModule.filename),
  'data',
  'sales.json'
);

var getOrders = {
  
    method: 'GET',
    url: 'https://api.squarespace.com/1.0/commerce/orders',
    headers:
      {
        'Authorization': 'Bearer 63780558-bd3a-44ca-9b54-66cc777abfe7',
        'Content-Type': 'application/json',
        'User-Agent': 'Mozilla/5.0'
      },
      rejectUnauthorized: false
  };
  
  var getAuth = {
    
    method: 'POST',
    body: qs.stringify({
     'refresh_token': 'ad801fd268d63e30299c28f257c2bec7d32dd2a8',
     'client_secret': 'c5e4af85bda04d99e69c8121bb52866407d580e07fba7ca8a7cc2798e63f6aae',
     'client_id': '1d9252b179e2180935270c3f66ccac118a9f81142c616a5faa886ee6fa3c5422',
     'grant_type': 'refresh_token',
   }),
    headers:
      {
        'Content-type': "application/x-www-form-urlencoded"
      },
    url: 'https://cloud.merchantos.com/oauth/access_token.php'
   
   
   };

   exports.postGetProducts = (req, res, next) => {
    let orders; 
      request(getOrders)
       .then(ordersResponse => {
        var orders = JSON.parse(ordersResponse)
        orders.result.forEach((order) => {
          if (order.fulfillmentStatus == 'FULFILLED') {
            sales.push({
                "employeeID": 15,
                "registerID": 2,
                "shopID": 1,
                "customerID": Math.floor(Math.random() * 10000),
                "completed": true,
                "SaleLines": {
                    "SaleLine": [
                    {
                        "itemID": order.lineItems[0].sku,
                        "unitQuantity": order.lineItems[0].quantity
                    },
                    ]
                },
                "SalePayments": {
                  "SalePayment": {
                    "amount": order.grandTotal.value,
                    "paymentTypeID": 3
                  }
                }
              })
          }
        })
       }
       )
       .then(fs.writeFile(p, JSON.stringify(sales), err => {}))
      //  .then(res.redirect('/'));                   
};

exports.deleteFileContents = (req, res, next) => {
  sales = [];
  fs.writeFile(p, '', err => {});
}


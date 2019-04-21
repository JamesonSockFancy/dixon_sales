var request = require('request-promise');
var qs = require('qs');
const fs = require('fs');
const path = require('path');
const download = require('download-csv')
var jsonToCSV = require('json2csv').parse;
const json2csv = require('json2csv');
const Product = require('../models/product');
const fast_csv = require('fast-csv');


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
        console.log(orders.shippingLines)
        orders.result.forEach((order) => {
          if (order.fulfillmentStatus == 'FULFILLED') {
            sales.push({
                "employeeID": 15,
                "registerID": 1,
                "shopID": 1,
                "customerID": 2370,
                "completed": false,
                "SaleLines": {
                    "SaleLine": [
                    {
                        "itemID": order.lineItems[0].sku,
                        "unitQuantity": order.lineItems[0].quantity
                    }
                    ]
                },
                "SalePayments": {
                  "SalePayment": {
                    "amount": order.grandTotal.value,
                    "paymentTypeID": 10
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
  fs.writeFile(p, '[]', err => {});
}

exports.getInventoryPage = (req, res, next) => {
  res.render('inventory', {
    pageTitle: 'inventory',
    path: '/inventory'
  });
}

exports.getInventory = (req, res, next) => {
let authToken; 
const offset = req.body.offset
const offsetString = offset.toString();
console.log(offset)
request(getAuth)
 .then(authResponse => {
  var authData = JSON.parse(authResponse)
  authToken = authData.access_token
  console.log(authToken);
 })
 .then(getNewItems => {
  request({
    method: 'GET',
    headers: {
      'Authorization': 'Bearer ' + authToken
    },
    url: 'https://api.lightspeedapp.com/API/Account/117289/Item.json?load_relations=["ItemShops"]&offset=' + offsetString
  })
  .then(getNewItemsResponse => {
    var newItems = JSON.parse(getNewItemsResponse)
    var newItemsArray = newItems.Item
    csv = jsonToCSV(newItemsArray)
    fs.writeFile('items.csv', csv, function(err) {
      if (err) throw err;
      console.log('Saved')
    })
    res.setHeader('Content-disposition', 'attachment; filename=items.csv');
    res.set('Content-Type', 'text/csv');
    res.status(200).send(csv);
    })
 })
}

exports.getInventoryByDate = (req, res, next) => {
  let authToken; 
  request(getAuth)
   .then(authResponse => {
    var authData = JSON.parse(authResponse)
    authToken = authData.access_token
    console.log(authToken);
   })
   .then(getNewItems => {
    request({
      method: 'GET',
      headers: {
        'Authorization': 'Bearer ' + authToken
      },
      url: 'https://api.lightspeedapp.com/API/Account/117289/Item.json?load_relations=["ItemShops"]&orderby=createTime&orderby_desc=1'
    })
    .then(getNewItemsResponse => {
      var newItems = JSON.parse(getNewItemsResponse)
      var newItemsArray = newItems.Item
      csv = jsonToCSV(newItemsArray)
      fs.writeFile('items.csv', csv, function(err) {
        if (err) throw err;
        console.log('Saved')
      })
      res.setHeader('Content-disposition', 'attachment; filename=items.csv');
      res.set('Content-Type', 'text/csv');
      res.status(200).send(csv);
      res.redirect('/inventory')
      })

   })
  }

  exports.uploadProducts = (req, res, next) => {
    fs.createReadStream("csv/2019-04-21T05:04:10.356Z-products.csv")  
    .pipe(fast_csv())
    .on('data', (row) => {
      const product = new Product({
        title: row[2],
        sku: row[9],
        quantity: row[23]
      })
      product.save()
      .then(result => {
        console.log('done')
      }).catch(err => {
        console.log(err)
      })
    })
    .on('end', () => {
      console.log('CSV file successfully processed');
    });
    res.redirect('/inventory')


    // const stream = fs.createReadStream(ssProducts);
 
    // const csvStream = csv()
    //   .on("data", function(data){
    //       console.log(data);
    //   })
    //   .on("end", function(){
    //       console.log("done");
    //   });
 
    // stream.pipe(csvStream);

  }


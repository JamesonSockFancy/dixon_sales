const fs = require('fs');
const path = require('path');
var parseString = require('xml2js').parseString;
var request = require('request-promise');
var qs = require('qs');


const p = path.join(
    path.dirname(process.mainModule.filename),
    'data',
    'sales.json'
  );

  const getSalesFromFile = cb => {
    fs.readFile(p, (err, fileContent) => {
      if (err) {
        cb([]);
      } else {
        cb(JSON.parse(fileContent));
      }
    });
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

  module.exports = class Sales {
    constructor(employeeID, registerID, shopID, customerID, price) {
      this.employeeID = employeeID;
      this.registerID = registerID;
      this.shopID = shopID;
      this.customerID = customerID;
      this.price = price;
    }

  save() {

  }

  static fetchAll(cb) {
    getSalesFromFile(cb);
  }

  static getSaleById(customerID, cb) {
    getSalesFromFile(sales => {
      console.log(customerID)
      const sale = sales[customerID];
      console.log(sale);

      let authToken; 
      
      request(getAuth)
      .then(authResponse => {
        var authData = JSON.parse(authResponse);
        authToken = authData.access_token
        console.log(authToken);
      })
      .then(getNewItems => {
        request({
          method: 'POST',
          headers: {
            'Authorization': 'Bearer ' + authToken
          },
          url: 'https://api.lightspeedapp.com/API/Account/117289/Sale.json',
          body: sale,
          json: true
        })
        .then(result => {
          console.log('success')
        })
      // // cb(sale);
    })
  })
  
  }
}
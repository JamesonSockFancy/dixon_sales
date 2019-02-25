const fs = require('fs');
const path = require('path');

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
      
      // console.log(sale);
      // // cb(sale);
    })
  }

}
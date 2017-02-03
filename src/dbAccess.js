var Sequelize = require('sequelize');
var dbTables = require('./dbTables');
/*
sequelize=database.sequelize;
User=database.User;
*/


  var object = [];
  function fdInsert(array) {
    sequelize.sync().then(function () {
      return foodItem
        .findOrCreate({
          where: {
            name: array.name
          },
          defaults:
          {
            type: array.type,
            quantity: array.quantity,
            lastEntryDate: array.lastEntryDate,
            lastDrawingDate: array.lastDrawingDate,
            minReOrderLimit: array.minReOrderLimit,
            unit: array.unit
          }
        })
        .spread(function (foodItem, created) {

          console.log(created)
        });

    });


  }

  function fdFind(name) {
    foodItem.findOne({ where: { username: name } }).then(function (found) {
      if (found) {
        object = found.get({
          plain: true
        });
      }
      else {
        console.log("Data not found");
      }
    }).then(function () {
      console.log(JSON.stringify(object));
      console.log("hellop");
    })

  }






sequelize = dbTables.sequelize;
User = dbTables.User;
paymentVoucher = dbTables.paymentVoucher;
purchaceOrder = dbTables.purcahseOrder;
purcahseOrderItems = dbTables.purcahseOrderItems;
supplier = dbTables.supplier;
foodItem = dbTables.foodItem;
typeOfFood = dbTables.typeOfFood;

dbaccess();

var Sequelize = require('sequelize');
var dbTables = require('./dbTables');
/*
sequelize=database.sequelize;
User=database.User;
*/


function dbaccess() {
  console.log("in .then");
  var array = "newuser";
  var object = [];
  sequelize.sync().then(function () {
    return User
      .findOrCreate({ where: { username: array, password: 'hello' } })
      .spread(function (user, created) {

        console.log(created)
      });

  });

  User.findOne({ where: { username: 'world' } }).then(function (user) {
    if (user) {
      object = user.get({
        plain: true
      });
    }
    else {
      console.log("Data not found");
    }
  }).then(function () {
    console.log(object.password);
    console.log("hellop")
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

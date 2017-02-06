var Sequelize = require('sequelize');
var dbTables = require('./dbTables');
/*
sequelize=database.sequelize;
User=database.User;
*/

var object = [];

sequelize = dbTables.sequelize;
User = dbTables.User;
paymentVoucher = dbTables.paymentVoucher;
purchaceOrder = dbTables.purcahseOrder;
purcahseOrderItems = dbTables.purcahseOrderItems;
supplier = dbTables.supplier;
foodItem = dbTables.foodItem;
typeOfFood = dbTables.typeOfFood;

var abc = {}
abc['paymentVoucher'] = dbTables.paymentVoucher;
abc['purcahseOrder'] = dbTables.purcahseOrder;
abc['purcahseOrderItems'] = dbTables.purcahseOrderItems;
abc['supplier'] = dbTables.supplier;
abc['foodItem'] = dbTables.foodItem;
abc['typeOfFood'] = dbTables.typeOfFood;

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

function find(name, tableName) {
    return abc[tableName].findOne({ where: { name: name } })
        .then(function (found, res) {
            if (found) {
                object = found.get({
                    plain: true
                });
                console.log(object);
                return object;
            }
            else {
                console.log("Data not found");
            }
        })
}

function fAll(tableName) {
    abc[tableName].findAll().then(function (response) {
        console.log(JSON.stringify(response));
    })
}

exports.fdInsert = fdInsert;
exports.find = find;
exports.fAll = fAll;
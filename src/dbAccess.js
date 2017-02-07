var Sequelize = require('sequelize');
var dbTables = require('./dbTables');

var object = [];

sequelize = dbTables.sequelize;
User = dbTables.User;
drawingsTable = dbTables.drawingsTable;
entriesLog = dbTables.entriesLog;
foodItem = dbTables.foodItem;
paymentVoucher = dbTables.paymentVoucher;
purchaseOrder = dbTables.purchaseOrder;
purchaseOrderItems = dbTables.purchaseOrderItems;
supplier = dbTables.supplier;
typeOfFood = dbTables.typeOfFood;

var abc = {};
abc['drawingsTable'] = dbTables.drawingsTable;
abc['entriesLog'] = dbTables.entriesLog;
abc['foodItem'] = dbTables.foodItem;
abc['paymentVoucher'] = dbTables.paymentVoucher;
abc['purchaseOrder'] = dbTables.purchaseOrder;
abc['purchaseOrderItems'] = dbTables.purchaseOrderItems;
abc['supplier'] = dbTables.supplier;
abc['typeOfFood'] = dbTables.typeOfFood;

function dtInsert(array) {
    sequelize.sync().then(function () {
        return drawingsTable.findOrCreate({
                where: {
                    date: array.date,
                    foodItemId: array.foodItemId
                },
                defaults:
                {
                    quantity: array.quantity,
                }
            })
            .spread(function (drawingsTable, created) {

                console.log(created)
            });
    });
}

function elInsert(array) {
    sequelize.sync().then(function () {
        return entriesLog.findOrCreate({
                where: {
                    date: array.date,
                    foodItemId: array.foodItemId,
                    purchaseOrderItemId: array.purchaseOrderItemId
                },
                defaults:
                {
                    quantity: array.quantity,
                    paid: array.paid
                }
            })
            .spread(function (entriesLog, created) {

                console.log(created)
            });
    });
}

function fdInsert(array) {
    sequelize.sync().then(function () {
        return foodItem.findOrCreate({
                where: {
                    name: array.name
                },
                defaults:
                {
                    typeOfFoodId: array.typeOfFoodId,
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

function pvInsert(array) {
    sequelize.sync().then(function () {
        return paymentVoucher.findOrCreate({
                where: {
                    date: array.date,
                    purchaseOrderId: array.purchaseOrderId,
                    supplierSID: array.supplierSID
                },
                defaults:
                {
                }
            })
            .spread(function (paymentVoucher, created) {

                console.log(created)
            });
    });
}

function poInsert(array) {
    sequelize.sync().then(function () {
        return purchaseOrder.findOrCreate({
                where: {
                    deliveryDate: array.deliveryDate,
                    issueDate: array.issueDate,
                },
                defaults:
                {
                    supplierSID: array.supplierSID
                }
            })
            .spread(function (purchaseOrder, created) {

                console.log(created)
            });
    });
}

function poiInsert(array) {
    sequelize.sync().then(function () {
        return purchaseOrderItems.findOrCreate({
                where: {
                    
                    quantityDemanded: array.quantityDemanded,
                    quantityReceived: array.quantityReceived,
                    
                },
                defaults:
                {
                    delivered: array.delivered,
                    purchaseOrderId: array.purchaseOrder,
                    rate: array.rate,
                    foodItemId: array.foodItemId
                }
            })
            .spread(function (purchaseOrderItems, created) {

                console.log(created)
            });
    });
}

function sInsert(array) {
    sequelize.sync().then(function () {
        return supplier.findOrCreate({
                where: {
                    name: array.name
                },
                defaults:
                {
                    contactNO: array.contactNO,
                    address: array.address,
                }
            })
            .spread(function (supplier, created) {

                console.log(created)
            });
    });
}

function tofInsert(array) {
    sequelize.sync().then(function () {
        return typeOfFood.findOrCreate({
                where: {
                    name: array.name
                },
                defaults:
                {
                }
            })
            .spread(function (typeOfFood, created) {

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

exports.fdInsert = dtInsert;
exports.fdInsert = elInsert;
exports.fdInsert = fdInsert;
exports.fdInsert = pvInsert;
exports.fdInsert = poInsert;
exports.fdInsert = poiInsert;
exports.fdInsert = sInsert;
exports.fdInsert = tofInsert;
exports.find = find;
exports.fAll = fAll;

var firstFoodItem={
    name: 'cabbage',
    quantity: 150,
    lastEntryDate: '2017-02-02',
    lastDrawingDate: '2017-02-08',
    minReOrderLimit: 50,
    unit: 'Kilograms',
    typeOfFoodId: 1
}

var firstpaymentVoucher={
    date: '2017-02-15',
    purchaseOrderId: 01,
    supplierSID: 01
}

var firstpurchaseOrder={
    issueDate: '2017-02-05',
    deliveryDate: '2017-02-15',
    supplierSID: 01
}

var firstpurchaseOrderItems={
    delivered: false,
    quantityDemanded: 200,
    quantityReceived: 0,
    rate: 30,
    foodItemId: 01,
    purchaseOrderId: 01
}

var firstsupplier={
    name: 'Naswar Khan',
    contactNO: 03331234567,
    address: 'Centrel Perk'
}

var firstTypeOfFood={
    name: 'Dry'
}

var secondTypeOfFood={
    name: 'Fresh'
}

sInsert(firstsupplier);
tofInsert(firstTypeOfFood);
tofInsert(secondTypeOfFood);
fdInsert(firstFoodItem);
poInsert(firstpurchaseOrder);
poiInsert(firstpurchaseOrderItems);
pvInsert(firstpaymentVoucher);
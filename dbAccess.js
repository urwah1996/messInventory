var Sequelize = require('sequelize');
var dbTables = require('./dbTables');
var validator = require('validator');
var datetime = require('node-datetime');
var bcrypt = require('bcrypt-nodejs');

var object = [];

// sequelize = dbTables.sequelize;
// User = dbTables.User;
// drawingsTable = dbTables.drawingsTable;
// entriesLog = dbTables.entriesLog;
foodItem = dbTables.foodItem;
// paymentVoucher = dbTables.paymentVoucher;
// purchaseOrder = dbTables.purchaseOrder;
// purchaseOrderItems = dbTables.purchaseOrderItems;
// supplier = dbTables.supplier;
// typeOfFood = dbTables.typeOfFood;

var abc = {};
// abc['drawingsTable'] = dbTables.drawingsTable;
// abc['entriesLog'] = dbTables.entriesLog;
abc['foodItem'] = dbTables.foodItem;
// abc['paymentVoucher'] = dbTables.paymentVoucher;
// abc['purchaseOrder'] = dbTables.purchaseOrder;
// abc['purchaseOrderItems'] = dbTables.purchaseOrderItems;
// abc['supplier'] = dbTables.supplier;
// abc['typeOfFood'] = dbTables.typeOfFood;
// abc['UserModel']=dbTables.UserModel;
// abc['demandedItems']=dbTables.demandedItems;
/*function dtInsert(array) {
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
function checkvalidity(tableName, q) {
    return sequelize.sync().then(function () {
        var query1 = "SELECT * FROM " + tableName + " WHERE ";
        var key = Object.keys(q);

        // console.log(abc[tableName].rawAttributes[key[1]].type.key);
        for (var i = 0; i < key.length; i++) {
            //  console.log(abc[tableName]);
            //  console.log(abc[tableName].rawAttributes);
            //  console.log(abc[tableName].rawAttributes.name.type.key);


            if (abc[tableName].rawAttributes[key[i]].type.key == 'INTEGER' || abc[tableName].rawAttributes[key[i]].type.key == 'BIGINT') {
                if (validator.isInt(q[key[i]])) {
                    query1 += key[i] + " = " + q[key[i]] + " ";
                }
                else {
                    var a = 'Wrong format! for ' + key[i];
                    console.log(a);
                    return a;
                }
            }
            if (abc[tableName].rawAttributes[key[i]].type.key == 'FLOAT') {
                if (validator.isFloat(q[key[i]])) {
                    query1 += key[i] + " = " + q[key[i]] + " ";
                }
                else {
                    var a = 'Wrong format! for ' + key[i];
                    console.log(a);
                    return a;
                }
            }
            else if (abc[tableName].rawAttributes[key[i]].type.key == 'STRING') {
                if (validator.isAscii(q[key[i]])) {
                    query1 += key[i] + " = " + '\'' + q[key[i]] + '\' ';
                }
                else {
                    var a = 'Wrong format! for ' + key[i];
                    console.log(a);
                    return a;
                }
            }
            else if (abc[tableName].rawAttributes[key[i]].type.key == 'DATEONLY' || abc[tableName].rawAttributes[key[i]].type.key == 'DATE') {
                if (validator.isDate(q[key[i]])) {
                    query1 += key[i] + " = " + '\'' + q[key[i]] + '\' ';
                }
                else {
                    var a = 'Wrong format! for ' + key[i];
                    console.log(a);
                    return a;
                }
            }
            else if (abc[tableName].rawAttributes[key[i]].type.key == 'BOOLEAN') {
                if (validator.isBoolean(q[key[i]])) {
                    query1 += key[i] + " = " + '\'' + q[key[i]] + '\' ';
                }
                else {
                    var a = 'Wrong format! for ' + key[i];
                    console.log(a);
                    return a;
                }
            }

            if (i != key.length - 1)
                query1 += "OR ";
        }
        console.log(query1);
        return sequelize.query(query1).spread(function (results, metadata) {
            // Results will be an empty array and metadata will contain the number of affected rows.
            console.log(results);
            console.log(metadata);

            if (metadata == '')
                return 'No data found';
            else
                return 'Something found'
        })
    })
}
*/
function Insert(tableName, q) {
    return sequelize.sync().then(function () {
        var query1 = "SELECT * FROM " + tableName + " WHERE ";
        var key = Object.keys(q);

        // console.log(abc[tableName].rawAttributes[key[1]].type.key);
        for (var i = 0; i < key.length; i++) {
            //  console.log(abc[tableName]);
            //  console.log(abc[tableName].rawAttributes);
            //  console.log(abc[tableName].rawAttributes);
            

            if (abc[tableName].rawAttributes[key[i]].type.key == 'INTEGER' || abc[tableName].rawAttributes[key[i]].type.key == 'BIGINT') {
                if (validator.isInt(q[key[i]])) {
                    query1 += key[i] + " = " + q[key[i]] + " ";
                }
                else {
                    var a = 'Wrong format! for ' + key[i];
                    console.log(a);
                    return a;
                }
            }
            if (abc[tableName].rawAttributes[key[i]].type.key == 'FLOAT') {
                if (validator.isFloat(q[key[i]])) {
                    query1 += key[i] + " = " + q[key[i]] + " ";
                }
                else {
                    var a = 'Wrong format! for ' + key[i];
                    console.log(a);
                    return a;
                }
            }
            else if (abc[tableName].rawAttributes[key[i]].type.key == 'STRING') {
                if (validator.isAscii(q[key[i]])) {
                    query1 += key[i] + " = " + '\'' + q[key[i]] + '\' ';
                }
                else {
                    var a = 'Wrong format! for ' + key[i];
                    console.log(a);
                    return a;
                }
            }
            else if (abc[tableName].rawAttributes[key[i]].type.key == 'DATEONLY' || abc[tableName].rawAttributes[key[i]].type.key == 'DATE') {
                if (validator.isDate(q[key[i]])) {
                    query1 += key[i] + " = " + '\'' + q[key[i]] + '\' ';
                }
                else {
                    var a = 'Wrong format! for ' + key[i];
                    console.log(a);
                    return a;
                }
            }
            else if (abc[tableName].rawAttributes[key[i]].type.key == 'BOOLEAN') {
                if (validator.isBoolean(q[key[i]])) {
                    query1 += key[i] + " = " + '\'' + q[key[i]] + '\' ';
                }
                else {
                    var a = 'Wrong format! for ' + key[i];
                    console.log(a);
                    return a;
                }
            }

            if (i != key.length - 1)
                query1 += "AND ";
        }
        console.log(query1);
        return sequelize.query(query1).spread(function (results, metadata) {
            // Results will be an empty array and metadata will contain the number of affected rows.
            console.log(results);
            console.log(metadata);

            if (metadata == '') {
                console.log('in if')
                var query2 = "INSERT INTO " + tableName + " (";
                var key = Object.keys(q);
                for (var i = 0; i < key.length; i++) {
                    query2 += key[i];
                    if (i != key.length - 1)
                        query2 += ", ";
                }
                query2 += ', createdAt, updatedAt'
                query2 += ') VALUES (';
                for (var i = 0; i < key.length; i++) {
                    if (typeof (q[key[i]]) === 'number')
                        query2 += q[key[i]];
                    else
                        query2 += '\'' + q[key[i]] + '\'';
                    if (i != key.length - 1)
                        query2 += ", ";
                }

                var d = new Date().toISOString().
                    replace(/T/, ' ').      // replace T with a space
                    replace(/\..+/, '')
                console.log(d)
                query2 += ', \'' + d + '\', \'' + d + '\'';
                query2 += ')'
                console.log(query2);
                return sequelize.query(query2).spread(function (results, metadata) {
                    // Results will be an empty array and metadata will contain the number of affected rows.
                    console.log(results);
                    console.log(metadata);

                    return 'successfully added';
                })
            }
            else {
                return 'Already present';
            }
        })
    })
}

function find(tableName, idInput) {
    return abc[tableName].findOne({ where: { id: idInput } })
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
                return ("Data not found");
            }
        })
}

function Update(tableName, q, id) {
    return sequelize.sync().then(function () {
        var key = Object.keys(q);
        var query1 = "UPDATE " + tableName + " SET ";
        var i = 0;


        for (i = 0; i < key.length; i++) {

            if (abc[tableName].rawAttributes[key[i]].type.key == 'INTEGER' || abc[tableName].rawAttributes[key[i]].type.key == 'BIGINT') {
                if (validator.isInt(q[key[i]])) {
                    query1 += key[i] + " = " + q[key[i]] + " ";
                }
                else {
                    var a = 'Wrong format! for ' + key[i];
                    console.log(a);
                    return a;
                }
            }
            if (abc[tableName].rawAttributes[key[i]].type.key == 'FLOAT') {
                if (validator.isFloat(q[key[i]])) {
                    query1 += key[i] + " = " + q[key[i]] + " ";
                }
                else {
                    var a = 'Wrong format! for ' + key[i];
                    console.log(a);
                    return a;
                }
            }
            else if (abc[tableName].rawAttributes[key[i]].type.key == 'STRING') {
                if (validator.isAscii(q[key[i]])) {
                    query1 += key[i] + " = " + '\'' + q[key[i]] + '\' ';
                }
                else {
                    var a = 'Wrong format! for ' + key[i];
                    console.log(a);
                    return a;
                }
            }
            else if (abc[tableName].rawAttributes[key[i]].type.key == 'DATEONLY' || abc[tableName].rawAttributes[key[i]].type.key == 'DATE') {
                if (validator.isDate(q[key[i]])) {
                    query1 += key[i] + " = " + '\'' + q[key[i]] + '\' ';
                }
                else {
                    var a = 'Wrong format! for ' + key[i];
                    console.log(a);
                    return a;
                }
            }
            else if (abc[tableName].rawAttributes[key[i]].type.key == 'BOOLEAN') {
                if (validator.isBoolean(q[key[i]])) {
                    query1 += key[i] + " = " + '\'' + q[key[i]] + '\' ';
                }
                else {
                    var a = 'Wrong format! for ' + key[i];
                    console.log(a);
                    return a;
                }
            }
            if (i != key.length - 1)
                query1 += ", ";
        }
        var d = new Date().toISOString().
            replace(/T/, ' ').      // replace T with a space
            replace(/\..+/, '')
      
        query1 += ', updatedAt =  \'' + d + '\'';
        console.log(query1);
        return sequelize.query(query1 + " WHERE id = " + id, { type: sequelize.QueryTypes.UPDATE }).then(function (err, results) {
            // Results will be an empty array and metadata will contain the number of affected rows.
            if (err) {
                console.log('ee');
            }
            console.log(results);

            var done = "updated";
            return done;
        })





        //return abc;
    })
}

function fAll(tableName, offset, limit) {
    return abc[tableName].findAll({ offset: offset, limit: limit }).then(function (response) {
        // if(err){
        //     return (err,null);
        // }
        if (!response) {
            response = 'Error';
        }
        console.log(JSON.stringify(response));
        return (response);
    })
}
function countall(tableName) {
    return abc[tableName].count().then(function (metadata) {
        console.log('metadata');
        console.log(metadata);
        return metadata;
    })
}
function remove(idInput, tableName) {
    console.log(tableName + " hello\n\n");
    return abc[tableName].destroy({ where: { id: idInput } })
        .then(function (found) {
            if (found) {
                console.log("\nDeleted.\n");
                done = "Deleted";
            }
            else {
                console.log("\nData not found.\n");
                done = "Data not found";
            }
            return done;
        })
}
function stock(obj, status) {
    return foodItem.findOne({
        where: {
            id: obj.id
        }
    }).then(function (res) {
        if (status == 'out')
            res.quantity -= obj.quantity;
        else if (status == 'in')
            res.quantity += obj.quantity;
        var d = new Date().toISOString().
            replace(/T/, ' ').      // replace T with a space
            replace(/\..+/, '')
        return foodItem.update({
            quantity: res.quantity,
            updatedAt: d
        }, {
                where: {
                    id: obj.id
                }
            }).then(function (a) {
                if (a)
                    return 'Updated';
            })
    })
}
function findbyname(tableName, name) {
    abc[tableName].findOne({
        where: {
            name: name
        }
    }).then(function (a) {
        if (a)
            return a
        else {
            return 'Error'
        }
    })
}
function findpoi(id){
    return purchaseOrderItems.findAll({
        where:{
            purchaseOrderId:id
        }
    }).then(function(res){
        return res;
    })
}
/*exports.dtInsert = dtInsert;
exports.elInsert = elInsert;
exports.fdInsert = fdInsert;
exports.pvInsert = pvInsert;
exports.poInsert = poInsert;
exports.poiInsert = poiInsert;
exports.sInsert = sInsert;
exports.tofInsert = tofInsert;*/
exports.Insert = Insert;
exports.Update = Update;
exports.find = find;
exports.fAll = fAll;
exports.remove = remove;
exports.countall = countall;
exports.stock = stock;
exports.findbyname = findbyname;
exports.findpoi=findpoi;
var firstFoodItem = {
    name: 'cabbage',
    quantity: 150,
    lastEntryDate: '2017-02-02',
    lastDrawingDate: '2017-02-08',
    minReOrderLimit: 50,
    unit: 'Kilograms',
    typeOfFoodId: 1
}

var secondFoodItem = {
    name: 'potato',
    quantity: 200,
    lastEntryDate: '2017-02-09',
    lastDrawingDate: '2017-02-05',
    minReOrderLimit: 50,
    unit: 'Kilograms',
    typeOfFoodId: 1
}

var thirdFoodItem = {
    name: 'tomato',
    quantity: 300,
    lastEntryDate: '2017-02-09',
    lastDrawingDate: '2017-02-05',
    minReOrderLimit: 100,
    unit: 'Kilograms',
    typeOfFoodId: 1
}

var firstPaymentVoucher = {
    date: '2017-02-15',
    purchaseOrderId: 01,
    supplierId: 01
}

var firstPurchaseOrder = {
    issueDate: '2017-02-05',
    deliveryDate: '2017-02-15',
    supplierId: 01
}

var firstPurchaseOrderItems = {
    delivered: false,
    quantityDemanded: 200,
    quantityReceived: 0,
    rate: 30,
    foodItemId: 02,
    purchaseOrderId: 01
}

var firstSupplier = {
    name: 'ak kh3an',
    contactNO: '5324',
    address: 'Ctrel Perk'
}

var secondSupplier = {
    name: 'Ali Khan',
    contactNO: '03337654321',
    address: 'Centrel Pk'
}

var thirdSupplier = {
    name: 'Ahmed Khan',
    contactNO: '02134567123',
    address: 'Centrel Park'
}

var firstTypeOfFood = {
    name: 'Dry'
}

var secondTypeOfFood = {
    name: 'Fresh'
}
var user={
    usename:'ahmed',
    password: 'checking'
}

// abc['UserModel'].create({
//   usename: 'john-doe',
//   password: 'i-am-so-great'
// }).then(function(){
//     console.log('done');
// })
function authenticate(id,pass){
abc['UserModel'].findById(id).then(function (a) {
  
  console.log(a.validPassword(pass));
})
}

/*
Insert('supplier', firstSupplier);


Insert('supplier', secondSupplier);
Insert('supplier', thirdSupplier);
Insert('typeOfFood', firstTypeOfFood);
Insert('typeOfFood', secondTypeOfFood);
Insert('foodItem', firstFoodItem);
Insert('foodItem', secondFoodItem);
Insert('foodItem', thirdFoodItem);
//Insert('purchaseOrder', firstPurchaseOrder);
//Insert('purchaseOrderItems', firstPurchaseOrderItems);
//Insert('paymentVoucher', firstPaymentVoucher);
*/
//remove(1, 'foodItem');
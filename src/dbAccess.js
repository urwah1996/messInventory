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


function find(id, tableName) {
    return abc[tableName].findOne({ where: { id: id } })
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

var xyz = {};
function Insert(tableName, q) {
    sequelize.sync().then(function () {
        var query1 = "SELECT * FROM " + tableName + " WHERE ";
        var key = Object.keys(q);
        for (var i = 0; i < key.length; i++) {
            if (typeof (q[key[i]]) === 'number')
                query1 += key[i] + " = " + q[key[i]] + " ";
            else
                query1 += key[i] + " = " + '\'' + q[key[i]] + '\' ';


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
                query2 += ') VALUES (';
                for (var i = 0; i < key.length; i++) {

                    if (typeof (q[key[i]]) === 'number')
                        query2 += q[key[i]];
                    else
                        query2 += '\'' + q[key[i]] + '\'';


                    if (i != key.length - 1)
                        query2 += ", ";

                }
                query2 += ')'
                console.log(query2);

                return sequelize.query(query2).spread(function (results, metadata) {
                    // Results will be an empty array and metadata will contain the number of affected rows.
                    console.log(results);
                    console.log(metadata);
                    return results;
                })

            }
        })
    })

}
function Update(tableName, q, id) {
    var key = Object.keys(q);
    var query1 = "UPDATE " + tableName + " SET ";
    var i = 0;
    for (i = 0; i < key.length; i++) {
        if (typeof (q[key[i]]) === 'number')
            var query2 = query1 + key[i] + " = " + q[key[i]];
        else
            var query2 = query1 + key[i] + " = " + '\'' + q[key[i]] + '\'';
        console.log(query2);
        sequelize.query(query2 + " WHERE id = " + id).spread(function (results, metadata) {
            // Results will be an empty array and metadata will contain the number of affected rows.
            console.log(results);
            console.log(metadata);
        })
    }

}
function fdDelete(name) {
    foodItem.destroy(
        { where: { name: name } }
    ).then(function (rowsDestroyed) {
        console.log(rowsDestroyed);
    })
}

var food = {
    name: 'potato',
    typeOfFoodId: 5,
    quantity: 100,
    lastEntryDate: '2017-01-02',
    lastDrawingDate: '2017-02-01',
    minReOrderLimit: '2.65',
    unit: 'kg'

}
//fdInsert(food);
/*typeInsert({
    name: 'Fresh'
});*/
var xyz = {

    name: 'usman',
    contactNO: 03332352238 ,
    address: 'f-37'

}


var a = Object.keys(xyz);
console.log(xyz[a[0]])
//Update('foodItem', xyz, 'name', 'tomato');
//fdDelete('tomato');
Insert('supplier', xyz)


//Insert('foodItem', food);

exports.fdInsert = fdInsert;
exports.find = find;
exports.fAll = fAll;

var dbTables = require('./dbTables');
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
abc['UserModel'] = dbTables.UserModel;
abc['demandedItems'] = dbTables.demandedItems;


var data = {

    "supplier": {
        "model": supplier,
        "attributes": ["id", "name","contactNo","address"]
    },
    "purchaseOrder": {
        "model": purchaseOrder,
        "attributes": ["id", "issueDate", "deliveryDate", "supplierId"],
        "include": [
            {
                "model": supplier,
                "attributes": ["id", "name"],
                as: 'Supplier',

            },
            {
                model: purchaseOrderItems,
                as: 'Items',
                attributes: ["id", "rate", "delivered", "quantityDemanded"],
                include: [
                    {
                        "model": foodItem,
                        "attributes": ["id", "unit", "name"],
                    }
                ]
            }]
    },
    "purchaseOrderItems": {
        "model": purchaseOrderItems,
        "attributes": ["id", "rate", "delivered", "quantityDemanded", "quantityReceived","pOId"],
        "include": [
            {
                "model": purchaseOrder,
                as:'Order',
               "attributes": ["id", "issueDate", "deliveryDate", "supplierId"],
                "include": [
                    {
                        "model": supplier,
                        "attributes": ["id", "name"],
                        "as": 'Supplier',

                    },]
            }]
    },
    "foodItem": {
        "model": foodItem,
        "attributes": ["id", "unit", "name","quantity","lastEntryDate","lastDrawingDate","minReOrderLimit","type"],
        "include": [
            {
                model:typeOfFood,
                attributes:["id","name"]
                
            }
        ]
    },
    "typeOfFood": {
        "model": typeOfFood,
        "attributes": ["id", "name"]
    },
    
    




}
//data.purchaseOrderItems.include.push(data.foodItem);
//data.purchaseOrder.include.push(data.supplier);
//data.purchaseOrder.include.push(data.purchaseOrderItems);

function attributes(model) {
    var att = [];
    var key2 = Object.keys(abc[model].rawAttributes);
    for (var j = 0; j < key2.length; j++) {
        if (abc[model].rawAttributes[key2[j]].allowNull == false &&
            abc[model].rawAttributes[key2[j]].fieldName != 'createdAt'
            && abc[model].rawAttributes[key2[j]].fieldName != 'updatedAt') {
            att.push(abc[model].rawAttributes[key2[j]].fieldName);

        }
    }
    return att;
}
function referenceModel(tableName, enc) {

    return new Promise(function (fulfill, reject) {
        var key = Object.keys(abc[tableName].rawAttributes);
        var ref = [];
        for (var i = 0; i < key.length; i++) {
            if (abc[tableName].rawAttributes[key[i]].references) {
                console.log(abc[tableName].rawAttributes[key[i]].references.model);
                var model = abc[tableName].rawAttributes[key[i]].references.model;
                ref.push(model);
            }
        }
        console.log(ref);
        fulfill(ref)
        //return ref
    })

}
function reference(tableName) {
    var key = Object.keys(abc[tableName].rawAttributes);
    var include = [];
    var inside = {};
    var promise = [];
    return new Promise(function (fulfill, reject) {
        
        var ab = data[tableName];
        if (ab)
            fulfill(data[tableName])

        else
           {
               console.log('else mi')
               referenceModel(tableName).then(function (rm) {

                for (var a = 0; a < rm.length; a++) {
                    var inside={}
                    console.log('ggggdsfghklj');
                    console.log(rm[a].toString())


                    inside.model = abc[rm[a]];

                    inside.attributes = attributes(rm[a]);
                    console.log(inside)
                    include.push(inside);
                    console.log(include)
                }
                console.log(include);
                var a={
                    include:include
                }
                
                return a
            }).then(function(a){
                fulfill(a)
            })
             

           } 
       
    })
}
exports.data = data;
exports.reference=reference
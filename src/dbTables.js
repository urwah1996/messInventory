var Sequelize = require('sequelize');
var other = "hellow";
//function database() {
console.log("in dbTables/database")
var sequelize = new Sequelize('centralMessInventory', 'sa', '1234', {
  dialect: 'mssql',
  host: 'localhost',
  port: 1433, // Default port
  pool: {
    max: 5,
    min: 0,
    idle: 10000
  },
  //omitNull: true,
  //timestamps: false,
  dialectOptions: {
    instanceName: 'MSSQLSERVER'
  }
});
sequelize.authenticate().then(function(errors) { console.log(errors) });


var foodItem = sequelize.define('foodItem', {
  /*foodId: {
    type: Sequelize.INTEGER,
  },*/
  name: {
    type: Sequelize.STRING,
  },
  /*type: {
    type: Sequelize.INTEGER,
  },*/
  quantity: {
    type: Sequelize.FLOAT,
  },
  lastEntryDate: {
    type: Sequelize.DATE,
  },
  lastDrawingDate: {
    type: Sequelize.DATE,
  },
  minReOrderLimit: {
    type: Sequelize.FLOAT,
  },
  unit: {
    type: Sequelize.STRING,
  }
}, {
    freezeTableName: true, // Model tableName will be the same as the model name
    timestamps: false
  });

var paymentVoucher = sequelize.define('paymentVoucher', {
  /*paymentVId: {
    type: Sequelize.INTEGER
  },*/
  /*PONumber: {
    type: Sequelize.INTEGER
  },*/
  Date: {
    type: Sequelize.DATE
  }
}, {
    freezeTableName: true // Model tableName will be the same as the model name
  });

var purchaseOrder = sequelize.define('purchaseOrder', {
  /*ID: {
    type: Sequelize.INTEGER
  },*/
  /*supplier: {
    type: Sequelize.INTEGER
  },*/
  issueDate: {
    type: Sequelize.DATE
  },
  deliveryDate: {
    type: Sequelize.DATE
  }
}, {
    freezeTableName: true // Model tableName will be the same as the model name
  });

var purchaseOrderItems = sequelize.define('purchaseOrderItems', {
  /*ID: {
    type: Sequelize.INTEGER
  },*/
  /*food: {
    type: Sequelize.INTEGER
  },
  purchaseOrder: {
    type: Sequelize.INTEGER
  },*/
  delivered: {
    type: Sequelize.BOOLEAN
  },
  quantityDemanded: {
    type: Sequelize.FLOAT
  },
  quantityReceived: {
    type: Sequelize.FLOAT
  },
  Rate: {
    type: Sequelize.FLOAT
  },
}, {
    freezeTableName: true // Model tableName will be the same as the model name
  });

var drawingsTable = sequelize.define('drawingsTable', {
  /*foodId: {
    type: Sequelize.INTEGER
  },*/
  quantity: {
    type: Sequelize.FLOAT
  },
  date: {
    type: Sequelize.DATE
  }
},
  {
    freezeTableName: true
  });

var entriesLog = sequelize.define('entriesLog', {
  /*foodId: {
    type: Sequelize.INTEGER
  },*/
  quantity: {
    type: Sequelize.FLOAT
  },
  date: {
    type: Sequelize.DATE
  },
  /*purchaseOrderItemNo: {
    type: Sequelize.INTEGER
  },*/
  paid: {
    type: Sequelize.BOOLEAN
  }
},
  {
    freezeTableName: true
  });


var supplier = sequelize.define('supplier', {
  sID: {
    type: Sequelize.INTEGER,
    primaryKey: true,

    allowNull: false,
    unique: true,
    autoIncrement: true
  },
  name: {
    type: Sequelize.STRING,
    unique: true
  },
  contactNO: {
    type: Sequelize.INTEGER,
    unique: true
  },
  address: {
    type: Sequelize.STRING,
    unique: true
  }
}, {
    freezeTableName: true, // Model tableName will be the same as the model name
    initialAutoIncrement: 1
  });

var typeOfFood = sequelize.define('typeOfFood', {
  /*ID: {
    type: Sequelize.INTEGER
  },*/
  name: {
    type: Sequelize.STRING
  }
}, {
    freezeTableName: true // Model tableName will be the same as the model name
  });


//}
/*
purchaseOrder.belongsTo(supplier);
purchaseOrderItems.belongsTo(foodItem);
purchaseOrderItems.belongsTo(purchaseOrder);
paymentVoucher.belongsTo(purchaseOrder);
drawingsTable.belongsTo(foodItem);
entriesLog.belongsTo(foodItem);
entriesLog.belongsTo(purchaseOrderItems);
foodItem.belongsTo(typeOfFood);
*/

supplier.hasMany(purchaseOrder)
purchaseOrder.hasMany(paymentVoucher);
foodItem.hasMany(entriesLog);
purchaseOrderItems.hasMany(entriesLog);
foodItem.hasMany(drawingsTable);
foodItem.hasMany(purchaseOrderItems);
purchaseOrder.hasMany(purchaseOrderItems);
supplier.hasMany(purchaseOrder);
typeOfFood.hasMany(foodItem);

console.log("in dbTables");
sequelize.sync();
exports.sequelize = sequelize;
exports.foodItem = foodItem;
exports.paymentVoucher = paymentVoucher;
exports.purchaseOrder = purchaseOrder;
exports.purchaseOrderItems = purchaseOrderItems;
exports.supplier = supplier;
exports.typeOfFood = typeOfFood;
exports.drawingsTable=drawingsTable;
exports.entriesLog=entriesLog;
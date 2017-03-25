var Sequelize = require('sequelize');
//var sequelize = null;
var bcrypt = require('bcrypt-nodejs');
var other = "hellow";
//var Type = require('type-of-is');
//function database() {
console.log("in dbTables/database")
// var sequelize = new Sequelize('centralMessInventory', 'sa', '1234', {
//   dialect: 'mssql',
//   host: 'localhost',
//   port: 1433, // Default port
//   pool: {
//     max: 5,
//     min: 0,
//     idle: 10000
//   },
//   //omitNull: true,
//   //timestamps: false,
//   dialectOptions: {
//     instanceName: 'MSSQLSERVER'
//   }
// });

if (process.env.DATABASE_URL) {
  // the application is executed on Heroku ... use the postgres database
  var match = process.env.DATABASE_URL.match(/postgres:\/\/([^:]+):([^@]+)@([^:]+):(\d+)\/(.+)/)
  var sequelize = new Sequelize(process.env.DATABASE_URL, {
    dialect: 'postgres',
    protocol: 'postgres',
    port: match[4],
    host: match[3],
    logging: false,
    dialectOptions: {
      ssl: true
    }
  })
} else {
  // the application is executed on the local machine ... use mysql
  var sequelize = sequelize = new Sequelize('centralMessInventory', 'sa', '1234', {
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
}

// global.db = {
//   Sequelize: Sequelize,
//   sequelize: sequelize,
//   UserModel: sequelize.define('UserModel', {
//     usename: {
//       type: Sequelize.STRING
//     },
//     password: {
//       type: Sequelize.STRING
//     }
//   },
//     {
//       freezeTableName: true, // Model tableName will be the same as the model name
//       hooks: {
//         beforeCreate: function (password) {
//           password.password = bcrypt.hashSync(password.password, bcrypt.genSaltSync(8), null);
//         }
//       },
//       instanceMethods: {
//         validPassword: function (password) {
//           return bcrypt.compareSync(password, this.password);
//         }

//       }
//     })

// add your other models here
//}
// var sequelize = new Sequelize('centralMessInventory', 'sa', '1234', {
//   dialect: 'mssql',
//   host: 'localhost',
//   port: 1433, // Default port
//   pool: {
//     max: 5,
//     min: 0,
//     idle: 10000
//   },
//   //omitNull: true,
//   //timestamps: false,
//   dialectOptions: {
//     instanceName: 'MSSQLSERVER'
//   }
// });

sequelize.authenticate().then(function (errors) { console.log(errors) });


var foodItem = sequelize.define('foodItem', {
  /*foodId: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    allowNull: false,
    unique: true,
    autoIncrement: true
  },*/
  name: {
    type: Sequelize.STRING,
    allowNull: false
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
    allowNull:false
  }
}, {
    freezeTableName: true, // Model tableName will be the same as the model name
    
  });

var paymentVoucher = sequelize.define('paymentVoucher', {
  /*paymentVId: {
    type: Sequelize.INTEGER
  },*/
  /*PONumber: {
    type: Sequelize.INTEGER
  },*/
  date: {
    type: Sequelize.DATEONLY
  }
}, {
    freezeTableName: true, // Model tableName will be the same as the model name

  });

var purchaseOrder = sequelize.define('purchaseOrder', {
  /*ID: {
    type: Sequelize.INTEGER
  },*/
  /*supplier: {
    type: Sequelize.INTEGER
  },*/
  issueDate: {
    type: Sequelize.DATEONLY,
    allowNull:false
  },
  deliveryDate: {
    type: Sequelize.DATEONLY,
    allowNull:false
  }
}, {
    freezeTableName: true, // Model tableName will be the same as the model name
    
    
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
    type: Sequelize.BOOLEAN,
    allowNull:false
  },
  quantityDemanded: {
    type: Sequelize.FLOAT,
    allowNull:false
  },
  quantityReceived: {
    type: Sequelize.FLOAT
  },
  rate: {
    type: Sequelize.FLOAT,
    allowNull:false
  },
}, {
    freezeTableName: true, // Model tableName will be the same as the model name

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
    freezeTableName: true,

  });

var entriesLog = sequelize.define('entriesLog', {
  /*foodId: {
    type: Sequelize.INTEGER
  },*/
  quantity: {
    type: Sequelize.FLOAT
  },
 
  /*purchaseOrderItemNo: {
    type: Sequelize.INTEGER
  },*/
  paid: {
    type: Sequelize.BOOLEAN
  }
},
  {
    freezeTableName: true,

  });

var supplier = sequelize.define('supplier', {
  /*sID: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    allowNull: false,
    unique: true,
    autoIncrement: true
  },*/
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  contactNO: {
    type: Sequelize.BIGINT(11),


  },
  address: {
    type: Sequelize.STRING,

  }
}, {
    freezeTableName: true, // Model tableName will be the same as the model name
    //initialAutoIncrement: 1,
    
  });
//supplier.removeAttribute(contactNO);
// supplier.define('supplier',{
//   contactno: {
//     type: Sequelize.BIGINT(11),

//   }
// })
var typeOfFood = sequelize.define('typeOfFood', {
  /*ID: {
    type: Sequelize.INTEGER
  },*/
  name: {
    type: Sequelize.STRING,
    allowNull: false
  }
}, {
    freezeTableName: true, // Model tableName will be the same as the model name
    
  });

var demandedItems = sequelize.define('demandedItems', {
  /*ID: {
    type: Sequelize.INTEGER
  },*/
  quantity: {
    type: Sequelize.FLOAT
  }
}, {
    freezeTableName: true, // Model tableName will be the same as the model name

  });

var studentInfo = sequelize.define('studentInfo', {
  /*ID: {
    type: Sequelize.INTEGER
  },*/
  name: {
    type: Sequelize.STRING
  },
  faculty: {
    type: Sequelize.STRING
  },
  room: {
    type: Sequelize.INTEGER
  },

}, {
    freezeTableName: true, // Model tableName will be the same as the model name

  });

var messLog = sequelize.define('messLog', {
  /*ID: {
    type: Sequelize.INTEGER
  },*/
  regNo: {
    type: Sequelize.INTEGER
  },
  date: {
    type: Sequelize.DATEONLY
  },

}, {
    freezeTableName: true, // Model tableName will be the same as the model name

  });

var hostelMess = sequelize.define('hostelMess', {
  /*ID: {
    type: Sequelize.INTEGER
  },*/
  hostel: {
    type: Sequelize.STRING
  },
  date: {
    type: Sequelize.DATEONLY
  },

}, {
    freezeTableName: true, // Model tableName will be the same as the model name

  });

var UserModel = sequelize.define('UserModel', {
  usename: {
    type: Sequelize.STRING
  },
  password: {
    type: Sequelize.STRING
  }
},
  {
    freezeTableName: true, // Model tableName will be the same as the model name
    hooks: {
      beforeCreate: function (password) {
        password.password = bcrypt.hashSync(password.password, bcrypt.genSaltSync(8), null);
      }
    },
    instanceMethods: {
      validPassword: function (password) {
        return bcrypt.compareSync(password, this.password);
      }

    }
  });

//  UserModel.create({
//     usename: 'usename',
//     password: 'pass'
// }).then(function () {
//     console.log('done');
//    // return 'Successfully Created!'
// })

// /*
 purchaseOrder.belongsTo(supplier,{foreignKey:'supplierId',as:'Supplier'});
 purchaseOrderItems.belongsTo(foodItem,{foreignKey: 'foodId'});
purchaseOrderItems.belongsTo(purchaseOrder,{foreignKey: 'pOId',as:'Items'});
purchaseOrderItems.belongsTo(purchaseOrder,{foreignKey: 'pOId',as:'Order'});
paymentVoucher.belongsTo(purchaseOrder,{foreignKey: 'pOId'});
drawingsTable.belongsTo(foodItem,{foreignKey: 'foodId'});
entriesLog.belongsTo(foodItem,{foreignKey: 'foodId'});
entriesLog.belongsTo(purchaseOrderItems,{foreignKey: 'pOItemNo'});
foodItem.belongsTo(typeOfFood,{foreignKey: 'type'});
paymentVoucher.belongsTo(supplier,{foreignKey:'supplierId'});



typeOfFood.hasMany(foodItem,{foreignKey: 'type'});
supplier.hasMany(purchaseOrder,{foreignKey: 'supplierId',as:'Supplier'})
purchaseOrder.hasMany(paymentVoucher,{foreignKey: 'pOId'});
foodItem.hasMany(entriesLog,{foreignKey: 'foodId'});
purchaseOrderItems.hasMany(entriesLog,{foreignKey: 'pOItemNo'});
foodItem.hasMany(drawingsTable,{foreignKey: 'foodId'});
foodItem.hasMany(purchaseOrderItems,{foreignKey: 'foodId'});
purchaseOrder.hasMany(purchaseOrderItems,{foreignKey: 'pOId',as:'Items'});
purchaseOrder.hasMany(purchaseOrderItems,{foreignKey: 'pOId',as:'Order'});
supplier.hasMany(paymentVoucher,{foreignKey: 'supplierId'});
hostelMess.hasMany(studentInfo);

console.log("in dbTables");
 //console.log(supplier.rawAttributes);

sequelize.sync();
exports.sequelize = sequelize;
exports.foodItem = foodItem;
exports.paymentVoucher = paymentVoucher;
exports.purchaseOrder = purchaseOrder;
exports.purchaseOrderItems = purchaseOrderItems;
exports.supplier = supplier;
exports.typeOfFood = typeOfFood;
exports.drawingsTable = drawingsTable;
exports.entriesLog = entriesLog;
exports.demandedItems = demandedItems;
exports.UserModel = UserModel;

// paymentVoucher.drop().then(function () {
//   sequelize.sync();
// })

// purchaseOrderItems.drop().then(function () {
//   sequelize.sync();
// })

// purchaseOrder.drop().then(function () {
//   sequelize.sync();
// })

// supplier.drop().then(function () {
//   sequelize.sync();
// })
// module.exports = UserModel;
// module.exports = global.db;
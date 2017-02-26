var server = require("./server");
var router = require("./router");
var requestHandlers = require("./requestHandlers");
var dbTables=require("./dbTables");
var handle = {}
handle["/"] = requestHandlers.start;
handle["/start"] = requestHandlers.start;
handle["/upload"] = requestHandlers.upload;
handle["/foodItem"] = requestHandlers.foodItem;
handle["/supplier"] = requestHandlers.supplier;


dbTables.sequelize;
dbTables.User;
dbTables.paymentVoucher;
dbTables.purcahseOrder;
dbTables.purcahseOrderItems;
dbTables.supplier;
dbTables.foodItem;
dbTables.typeOfFood;

server.start(router.route, handle);
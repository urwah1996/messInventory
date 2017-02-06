var dbAccess = require("./dbAccess");
var exec = require("child_process").exec;

function start(response) {
    console.log("Request handler 'start' was called.");

    exec("ls -lah",
        { timeout: 10000, maxBuffer: 20000 * 1024 },
        function (error, stdout, stderr) {
            response.writeHead(200, { "Content-Type": "text/plain" });
            response.write(stdout);
            response.end();
        });
}

function upload(response) {
    console.log("Request handler 'upload' was called.");
    response.writeHead(200, { "Content-Type": "text/plain" });
    response.write("Hello Upload");
    response.end();
}

function hey(){
    var hi = {
        name: 'tomato',
        type: 2,
        quantity: 52.1,
        lastEntryDate: '2017-05-22',
        lastDrawingDate: '2018-08-23',
        minReOrderLimit: 2.3,
        unit: 'kg'

    };
    dbAccess.fdInsert(hi);
    
    var st="done";

    return st;
}

function foodItem(response) {
    console.log("Request handler 'foodItem' was called.");
    response.writeHead(200, { "Content-Type": "text/plain" });
    response.write("Hello foodItem");
    dbAccess.fdFind('tomato').then(function(val){
        response.write(val.name);
        response.end();
    });
    dbAccess.fall('foodItem');
}

function supplier(response) {
    console.log("Request handler 'supplier' was called.");
    response.writeHead(200, { "Content-Type": "text/plain" });
    response.write("Hello supplier");
    dbAccess.suppFind('lol').then(function(val){
        response.write(val.name);
        response.end();
    });
    dbAccess.fall('supplier');
}

//exports.insert = insert;
exports.start = start;
exports.upload = upload;
exports.foodItem = foodItem;
exports.supplier = supplier;
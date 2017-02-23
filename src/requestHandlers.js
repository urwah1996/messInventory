var dbAccess = require("./dbAccess");
var exec = require("child_process").exec;
var url = require("url");
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

function foodItem(response) {
    console.log("Request handler 'foodItem' was called.");
    response.writeHead(200, { "Content-Type": "text/plain" });
    response.write("Hello foodItem");
    dbAccess.find('tomato').then(function (val) {
        response.write(val.name);
        response.end();
    });
    dbAccess.fAll('foodItem');
}

function supplier(response) {
    console.log("Request handler 'supplier' was called.");
    response.writeHead(200, { "Content-Type": "text/plain" });
    response.write("Hello supplier");
    dbAccess.find(1,'supplier').then(function (val) {
        response.write(val.name);
        response.end();
    });
    dbAccess.fAll('supplier');
}

//exports.insert = insert;
exports.start = start;
exports.upload = upload;
exports.foodItem = foodItem;
exports.supplier = supplier;
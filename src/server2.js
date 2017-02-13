// server.js

// BASE SETUP
// =============================================================================

// call the packages we need
var express = require('express');        // call express
var app = express();                 // define our app using express
var bodyParser = require('body-parser');
var dbAccess = require('./dbAccess.js');
// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 8080;        // set our port

// ROUTES FOR OUR API
// =============================================================================
var router = express.Router();              // get an instance of the express Router

// middleware to use for all requests
router.use(function (req, res, next) {
    // do logging
    console.log('Something is happening.');
    next(); // make sure we go to the next routes and don't stop here
});
// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.get('/', function (req, res) {
    res.json({ message: 'hooray! welcome to our api!' });
});

// more routes for our API will happen here
var pathname = {
    foodItem: 'foodItem'
};

var abc = {};
abc['drawingsTable'] = true;
abc['entriesLog'] = true;
abc['foodItem'] = true;
abc['paymentVoucher'] = true;
abc['purchaseOrder'] = true;
abc['purchaseOrderItems'] = true;
abc['supplier'] = true;
abc['typeOfFood'] = true;


router.route('/:tableName')
    .post(function (req, res) {


        console.log(req.body.name);
        console.log(req.path);
        var path = req.params.tableName;


        console.log(path);
        console.log(req.body);
        if (!abc[path]) {
            console.log('rerouting');
            next();

        }
        else {
            dbAccess.Insert(path, req.body).then(function (value) {
                res.json(value);
            });
        }
        


    })
    .get(function (req, res, next) {
        var path = req.params.tableName;
        
        console.log(path);
        if (!abc[path]) {
            console.log('rerouting');
            next();

        }
        else {
            dbAccess.fAll(path).then(function (err, bears) {
                if (err)
                    res.send(err);

                res.json({ message: "done" });
            });
        }
    });

router.route('/:tableName/:_id')


    .get(function (req, res) {
        console.log("req.path=" + req.path);
        var path = "";
        for (var i = 1; req.path[i] != '/'; i++) {
            path += req.path[i];
        }
        console.log("path=" + path);
        console.log('find_id:' + req.params.tableName);
        dbAccess.find(req.params.tableName, req.params._id).then(function (err, bear) {
            if (err)
                res.send(err);
            res.json(bear);
        });
    })
    .put(function (req, res) {

   
        dbAccess.Update(req.params.tableName, req.body, req.params._id).then(function (err, bear) {

            if (err)
                res.send(err);

            res.json({ message: 'updated' });
        });

    })
    .delete(function (req, res) {

        dbAccess.remove(req.params._id, req.params.tableName).then(function (err, bear) {
            if (err)
                res.send(err);

            res.json({ message: 'Successfully deleted' });
        });

    });



// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/api', router);

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Magic happens on port ' + port);

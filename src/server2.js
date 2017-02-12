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


router.route('/:tableName')
    // create a bear (accessed at POST http://localhost:8080/api/bears)
    .post(function (req, res) {
        console.log(req.body.name);
        console.log(req.path);
        var path = req.params.tableName;

        /*var path = "";
        for (var i = 1; i < req.path.length; i++) {
            path += req.path[i];
        }*/
        console.log(path);
        console.log(req.body);
        /*
        var foodItem = {
            name: req.body.name,
            quantity: req.body.quantity,
            lastEntryDate: req.body.lastEntryDate,
            lastDrawingDate: req.body.lastDrawingDate,
            minReOrderLimit: req.body.minReOrderLimit,
            unit: req.body.unit,
            typeOfFoodId: req.body.typeOfFoodId
        }*/
        dbAccess.Insert(path, req.body);
        // save the bear and check for errors


    })
    .get(function (req, res) {
        var path = req.params.tableName;
        /*for (var i = 1; i < req.path.length; i++) {
            path += req.path[i];
        }*/
        console.log(path);
        dbAccess.fAll(path).then(function (err, bears) {
            if (err)
                res.send(err);

            res.json({ message: "done" });
        });
    });

router.route('/:tableName/:_id')

    // get the bear with that id (accessed at GET http://localhost:8080/api/bears/:bear_id)
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

        // use our bear model to find the bear we want
        var u = {
            quantity: req.body.quantity
        }
        dbAccess.Update(req.params.tableName, req.body, req.params._id).then(function (err, bear) {

            if (err)
                res.send(err);

            res.json({ message: 'updated' });
        });

    })
    .delete(function (req, res) {
        
        dbAccess.remove(req.params._id, req.params.tableName).then(function(err, bear) {
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
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

var abc = {};
abc['drawingsTable'] = true;
abc['entriesLog'] = true;
abc['foodItem'] = true;
abc['paymentVoucher'] = true;
abc['purchaseOrder'] = true;
abc['purchaseOrderItems'] = true;
abc['supplier'] = true;
abc['typeOfFood'] = true;
abc['demandedItems'] = true;

router.route('/:tableName')
    .post(function (req, res, next) {


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
                if (value != 'successfully added') {
                    res.status(404).send(value);
                }
                else
                    res.status(200).json(value);
            });
        }



    })
    .get(function (req, res, next) {
        //  (req,res,next) = > {}
        //this.myFunc{()}
        var path = req.params.tableName;

        console.log(path);
        if (!abc[path]) {
            console.log('rerouting');
            next();

        }
        else {
            var page = parseInt(req.query.page, 10);
            if (isNaN(page) || page < 1) {
                page = 1;
            }

            var limit = parseInt(req.query.limit, 10);
            if (isNaN(limit)) {
                limit = 10;
            } else if (limit > 50) {
                limit = 50;
            } else if (limit < 1) {
                limit = 1;
            }
            var offset = (page - 1) * limit;
            //var a;
            function metadata() {
                var a;
                return dbAccess.countall(path).then(function (count, a) {
                    a = count;
                    return a;
                })

            }


            dbAccess.fAll(path, offset, limit).then(function (all) {
                if (all == 'Error') {
                    res.send(err);
                    console.log("error");
                    res.status(404).send('Data Not found');
                }
                else {
                    console.log("ddf");
                    res.status(200);

                    //res.send(JSON.stringify(all))
                    var md = metadata();
                    md.then((a) => {
                        var obj = {};
                        obj['data'] = all;
                        obj['status'] = 'OK';
                        console.log(req.query)
                        console.log(req.path)
                        var apage;
                        var url = req.host + "/api/" + path + "/?page="
                        if ((page + 1) <= Math.ceil(a / limit)) {
                            apage = page + 1;
                            url += apage;
                        }
                        else {
                            url = null;
                        }

                        if (req.query.limit) {
                            if (url)
                                url += '&limit=' + req.query.limit;
                        }

                        var meta = {
                            "page": page,
                            "total_pages": Math.ceil(a / limit),
                            "count": a,
                            "next": url
                        }

                        obj['meta'] = meta;
                        //res.json(all);
                        res.format({



                            'application/json': function () {
                                res.send(obj);
                            }
                            //res.write(all)
                        })
                    }
                    );

                }

            });
        }
    });

router.route('/:tableName/:_id')


    .get(function (req, res, next) {
        console.log("req.path=" + req.path);
        var path = "";
        for (var i = 1; req.path[i] != '/'; i++) {
            path += req.path[i];
        }
        if (!abc[path]) {
            console.log('rerouting');
            next();
             console.log('rerouted');
        }
        else
        {
        console.log("path=" + path);
        console.log('find_id:' + req.params.tableName);
        dbAccess.find(req.params.tableName, req.params._id).then(function (response) {

            if (response == 'Data not found')
                res.status(404).send('Data Not found');
            else
                res.status(200).json(response);
        });
        }
    })
    .put(function (req, res, next) {

        if (!abc[req.params.tableName]) {
            console.log('rerouting');
            next();

        }
        dbAccess.find(req.params.tableName, req.params._id).then(function (response) {
            if (response == 'Data not found') {
                res.status(404).send('Data Not found');
            }
            else {
                dbAccess.Update(req.params.tableName, req.body, req.params._id).then(function (response) {


                    if (response == 'Validation Error') {
                        res.status(403).send('Forbidden');
                    }
                    else
                        res.status(200).send('Successfully updated');
                });
            }
        })


    })
    .delete(function (req, res, next) {
        if (!abc[req.params.tableName]) {
            console.log('rerouting');
            next();

        }
        dbAccess.remove(req.params._id, req.params.tableName).then(function (err, response) {
            if (err)
                res.send(err);
            if (response == 'Data not found')
                res.status(404).send('Data Not found');
            else
                res.status(200).send('Successfully deleted');
        });

    });
router.route('/StockOut')
    
    .post(function (req, res, next) {
        var d = new Date().toISOString().
                    replace(/T/, ' ').      // replace T with a space
                    replace(/\..+/, '')
        var obj={
            'foodItemId' : req.body.id,
            'quantity' : req.body.quantity,
            'date' :d
        }
        dbAccess.Insert('drawingsTable',obj)
        console.log(req.body);
        dbAccess.stock(req.body,'out').then(function (a) {
            if (a == 'Updated') {
                res.status(200).send('Updated');
            }
        })
    });

router.route('/StockIn')
    
    .post(function (req, res, next) {
        console.log(req.body);
        
        dbAccess.stock(req.body,'in').then(function (a) {
            if (a == 'Updated') {
                res.status(200).send('Updated');
            }
        })
    });
router.route('/PO/:id')
.get(function(req,res){
    dbAccess.findpoi(req.params.id).then(function(response){
        res.status(200).json(response);
    })
})
router.use(function (req, res, next) {

    console.log("bdsdsd")
    res.status(404).send('Not Found');
});

// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/api', router);

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Magic happens on port ' + port);
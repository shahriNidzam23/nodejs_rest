var express = require('express');
var mysql = require('mysql');
var router = express.Router();

var pool = mysql.createPool({
    host: '127.0.0.1',
    user: 'root',
    password: '',
    database: 'restfulapi'
});

/* GET home page. */
router.get('/', function(req, res, next) {
  var results = {id: 1, name:"Muhammad Shahrin Nidzam bin Effendy",}
  res.json(results);
  //res.render('index', { title: 'Express' });
});

//GET ALL LOCATION FROM DB
router.get('/getLocation', function(req, res, next) {
    try {
        pool.getConnection(function(err, connection) {
            var querySelect = 'SELECT * FROM location';
            connection.query(querySelect, function(error, results, fields) {


                // Handle error after the release.
                if (error) throw error;

                res.json(results);
                // And done with the connection.
                connection.release();
                // Don't use the connection here, it has been returned to the pool.
            });
        });
    } catch (ex) {
        console.error("Internal error:" + ex);
        return next(ex);
    }
});

//GET LOCATION BY ID
router.get('/getLocationById/:id', function(req, res, next) {
    try {
        pool.getConnection(function(err, connection) {
            var querySelect = 'SELECT * FROM location WHERE id = ?';
            connection.query(querySelect, [req.params.id], function(error, results, fields) {


                // Handle error after the release.
                if (error) throw error;

                res.json(results);
                // And done with the connection.
                connection.release();
                // Don't use the connection here, it has been returned to the pool.
            });
        });
    } catch (ex) {
        console.error("Internal error:" + ex);
        return next(ex);
    }
});

//INSERT LOCATION
router.post('/createNewLocation', function(req, res, next) {
    try {
        pool.getConnection(function(err, connection) {
            // Use the connection
            var newLocation = { name: req.body.name, latitude: req.body.latitude, longitude: req.body.longitude };
                console.log(req.body);
            connection.query('INSERT INTO location SET ?', newLocation, function(error, results, fields) {

                // Handle error after the release.
                if (error) throw error;
                res.json(results.insertId);
                // And done with the connection.
                connection.release();

                // Don't use the connection here, it has been returned to the pool.
            });
        });
    } catch (ex) {
        console.error("Internal error:" + ex);
        return next(ex);
    }

});

//UPDATE LOCATION
router.put('/updateLocation/:id', function(req, res, next) {
    try {
        pool.getConnection(function(err, connection) {
            var sql = 'UPDATE location SET name = ?, latitude = ?, longitude = ?  WHERE id = ?';
            var response = [req.body.name, req.body.latitude, req.body.longitude, req.params.id];

            connection.query(sql, response, function(error, results, fields) {

                // Handle error after the release.
                if (error) throw error;

                res.json(results);
                // And done with the connection.
                connection.release();
                // Don't use the connection here, it has been returned to the pool.
            });
        });
    } catch (ex) {
        console.error("Internal error:" + ex);
        return next(ex);
    }
});

//DELETE LOCATION
router.delete('/deleteLocation/:id', function(req, res, next) {
    try {
        pool.getConnection(function(err, connection) {
            var sql = "DELETE FROM location WHERE id = ?";

            connection.query(sql, req.params.id, function(error, results, fields) {

                // Handle error after the release.
                if (error) throw error;
                //return promis
                res.json(results);
                // And done with the connection.
                connection.release();

                // Don't use the connection here, it has been returned to the pool.
            });
        });
    } catch (ex) {
        console.error("Internal error:" + ex);
        return next(ex);
    }
});
module.exports = router;

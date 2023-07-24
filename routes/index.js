var express = require('express');
var router = express.Router();
const https = require('https');

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index', {title: 'Express'});
});
router.get('/customers', (req, res) => {

    https.get('https://615f5fb4f7254d0017068109.mockapi.io/api/v1/customers', function (rep) {
        var rawData;
        rep.on('data', (chunk) => {
            rawData += chunk;
        });
        rep.on('end', (plop) => {
            try {
                console.log(plop);
                console.log(rawData);
                res.send(rawData);
            } catch (e) {
                console.error(e.message);
            }
        });
    });

});
router.get('/customers/:id', (req, res) => {

    https.get('https://615f5fb4f7254d0017068109.mockapi.io/api/v1/customers/' + req.params.id, function (rep) {
        var rawData;
        rep.on('data', (chunk) => {
            rawData += chunk;
        });
        rep.on('end', (plop) => {
            try {
                console.log(plop);
                console.log(rawData);
                res.send(rawData);
            } catch (e) {
                console.error(e.message);
            }
        });
    });

});
router.get('/customers/:id/orders', (req, res) => {

    https.get('https://615f5fb4f7254d0017068109.mockapi.io/api/v1/customers/' + req.params.id + '/orders', function (rep) {
        var rawData = "";
        rep.on('data', (chunk) => {
            rawData += chunk;
        });
        rep.on('end', (plop) => {
            try {
                console.log(plop);
                console.log(rawData);
                res.send(rawData);
            } catch (e) {
                console.error(e.message);
            }
        });
    });

});

module.exports = router;

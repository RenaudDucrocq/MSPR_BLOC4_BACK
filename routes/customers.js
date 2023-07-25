var express = require('express');
var router = express.Router();
const https = require('https');

/**
 * @swagger
 * /customers:
 *   get:
 *     summary: Get list of customers
 *     description: Retrieve a list of customers from KAWA CRM.
 *     responses:
 *      200:
 *         description: Successful operation.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 customers:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       createdAt:
 *                         type: string
 *                         description: Date of creation.
 *                         example: 2023-02-20T03:49:43.205Z
 *                       name:
 *                         type: string
 *                         description: The customer's name.
 *                         example: Jessica Grady
 *                       username:
 *                         type: string
 *                         description: The customer's username.
 *                         example: Merle.Hammes
 *                       firstname:
 *                         type: string
 *                         description: The customer's firstname.
 *                         example: Johnson
 *                       lastname:
 *                         type: string
 *                         description: The customer's lastname.
 *                         example: Gutmann
 *                       adress:
 *                         type: object
 *                         properties:
 *                           postalcode:
 *                             type: string
 *                             example: 43019
 *                           city:
 *                             type: string
 *                             example: Port Reanna
 *                       profile:
 *                         type: object
 *                         properties:
 *                           firstname:
 *                             type: string
 *                             example: Malcolm
 *                           lastname:
 *                             type: string
 *                             example: Ward
 *                       company:
 *                         type: object
 *                         properties:
 *                           companyname:
 *                             type: string
 *                             example: Leffler, Murphy and Wunsch
 *                       id:
 *                         type: integer
 *                         example: 7
 *                       orders:
 *                         type: array
 *                         items:
 *                           type: object
 *                           properties:
 *                             createdAt:
 *                               type: string
 *                               example: 2023-02-19T21:15:11.180Z
 *                             id:
 *                               type: integer
 *                               description: order's id
 *                               example: 57
 *                             customerId:
 *                               type: integer
 *                               description: customer's id
 *                               example: 7
 */
router.get('/', (req, res) => {

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
/**
 * @swagger
 * /customers/{id}:
 *   get:
 *     summary: Get customer's details
 *     description: Retrieve a customer from KAWA CRM.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Numeric ID of the product to retrieve.
 *         schema:
 *           type: integer
 *     responses:
 *      200:
 *         description: Successful operation.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 createdAt:
 *                   type: string
 *                   description: Date of creation.
 *                   example: 2023-02-20T03:49:43.205Z
 *                 name:
 *                   type: string
 *                   description: The customer's name.
 *                   example: Jessica Grady
 *                 username:
 *                   type: string
 *                   description: The customer's username.
 *                   example: Merle.Hammes
 *                 firstname:
 *                   type: string
 *                   description: The customer's firstname.
 *                   example: Johnson
 *                 lastname:
 *                   type: string
 *                   description: The customer's lastname.
 *                   example: Gutmann
 *                 address:
 *                   type: object
 *                   properties:
 *                     postalcode:
 *                       type: string
 *                       example: 43019
 *                     city:
 *                       type: string
 *                       example: Port Reanna
 *                 profile:
 *                   type: object
 *                   properties:
 *                     firstname:
 *                       type: string
 *                       example: Malcolm
 *                     lastname:
 *                       type: string
 *                       example: Ward
 *                 company:
 *                   type: object
 *                   properties:
 *                     companyname:
 *                       type: string
 *                       example: Leffler, Murphy and Wunsch
 *                 id:
 *                   type: integer
 *                   example: 7
 *                 orders:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       createdAt:
 *                         type: string
 *                         example: 2023-02-19T21:15:11.180Z
 *                       id:
 *                         type: integer
 *                         description: order's id
 *                         example: 57
 *                       customerId:
 *                         type: integer
 *                         description: customer's id
 *                         example: 7
 */
router.get('/:id', (req, res) => {

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
/**
 * @swagger
 * /customers/{id}/orders:
 *   get:
 *     summary: Get customer's orders
 *     description: Retrieve a list of customer's orders from KAWA CRM.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Numeric ID of the product to retrieve.
 *         schema:
 *           type: integer
 *     responses:
 *      200:
 *         description: Successful operation.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   createdAt:
 *                     type: string
 *                     example: 2023-02-19T21:15:11.180Z
 *                   id:
 *                     type: integer
 *                     example: 7
 *                   customerId:
 *                     type: integer
 *                     example: 7
 */
router.get('/:id/orders', (req, res) => {

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
router.get('/:id/orders/:orderid/products', (req, res) => {

  https.get('https://615f5fb4f7254d0017068109.mockapi.io/api/v1/customers/' + req.params.id + '/orders/' + req.params.orderid + '/products', function (rep) {
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

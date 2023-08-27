var express = require('express');
var router = express.Router();
var {getClient} = require('../utils/connection-query');
let checkToken = require('./authGuard').checkToken;


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
 *                       id:
 *                         type: integer
 *                         example: 7
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
 *                       addressid:
 *                         type: integer
 *                         example: 2
 *                       profileid:
 *                         type: integer
 *                         example: 2
 *                       companyid:
 *                         type: integer
 *                         example: 2
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

router.get('/', async (req, res) => {
    await checkToken(JSON.parse(JSON.stringify(req.headers)), res);
    const client = await getClient();
    client.query('SELECT * FROM customers\n' +
        'inner JOIN address on customers.addressid = address.id\n' +
        'inner JOIN profile on customers.profileid = profile.id\n' +
        'inner JOIN company on customers.companyid = company.id\n' +
        'inner JOIN orders on customers.id = orders.customerid\n' +
        'ORDER BY customers.id ASC',[id] , async (error, results) => {
        await client.end();
        if (error) {
            res.status(404);
        } else {
            res.status(200).json(results.rows);
        }
    });
});

/**
 * @swagger
 * /customers:
 *   get:
 *     summary: Get only one customer
 *     description: Retrieve a customer from KAWA CRM.
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
 *                       id:
 *                         type: integer
 *                         example: 7
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
 *                       addressid:
 *                         type: integer
 *                         example: 2
 *                       profileid:
 *                         type: integer
 *                         example: 2
 *                       companyid:
 *                         type: integer
 *                         example: 2
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
router.get('/:id', async (req, res) => {
    await checkToken(JSON.parse(JSON.stringify(req.headers)), res);
    const id = parseInt(req.params.id);
    const client = await getClient();
    client.query('SELECT * FROM customers\n' +
        'inner JOIN address on customers.addressid = address.id\n' +
        'inner JOIN profile on customers.profileid = profile.id\n' +
        'inner JOIN company on customers.companyid = company.id\n' +
        'inner JOIN orders on customers.id = orders.customerid\n' +
        'WHERE customers.id = $1\n' +
        'ORDER BY customers.id ASC',[id] , async (error, results) => {
        await client.end();
        if (error) {
            res.status(404);
        } else {
            res.status(200).json(results.rows);
        }
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
 *                   id:
 *                     type: integer
 *                     example: 7
 *                   createdAt:
 *                     type: string
 *                     example: 2023-02-19T21:15:11.180Z
 *                   customerId:
 *                     type: integer
 *                     example: 7
 */
router.get('/:id/orders', async (req, res) => {
    await checkToken(JSON.parse(JSON.stringify(req.headers)), res);
    const id = parseInt(req.params.id);
    const client = await getClient();
    client.query('SELECT * FROM orders\n' +
        'WHERE orders.customerid = $1\n' +
        'ORDER BY order.id ASC',[id] , async (error, results) => {
        await client.end();
        if (error) {
            res.status(404);
        } else {
            res.status(200).json(results.rows);
        }
    });
});

/**
 * @swagger
 * /customers/{id}/orders/{orderid}/products:
 *   get:
 *     summary: Get order's products
 *     description: Retrieve a list of order's product from KAWA CRM.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Numeric ID of the customer to retrieve.
 *         schema:
 *           type: integer
 *       - in: path
 *         name: orderid
 *         required: true
 *         description: Numeric ID of the order to retrieve
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
 *                   id:
 *                     type: integer
 *                     example: 7
 *                   name:
 *                     type: string
 *                     example: Peter Crona
 *                   stock:
 *                     type: integer
 *                     example: 29758
 *                   createdAt:
 *                     type: string
 *                     example: 2023-02-19T21:15:11.180Z
 *                   detailsid:
 *                     type: integer
 *                     example: 1
 *                   details:
 *                     type: object
 *                     properties:
 *                       price:
 *                         type: string
 *                         example: 85.00
 *                       description:
 *                         type: string
 *                         example: The Football Is Good For Training And Recreational Purposes
 *                       color:
 *                         type: string
 *                         example: green
 *                   orderId:
 *                     type: integer
 *                     example: 7
 */
router.get('/:id/orders/:orderid/products', async (req, res) => {
    await checkToken(JSON.parse(JSON.stringify(req.headers)), res);
    const id = parseInt(req.params.id);
    const orderid = parseInt(req.params.orderid);
    const client = await getClient();
    client.query('SELECT * FROM products\n' +
        'inner JOIN details on products.details_id = details.id\n' +
        'inner JOIN orders_products on orders_products.id_order = $2 and orders_products.id_product = products.id\n' +
        'ORDER BY products.id ASC',[id] ,[orderid] , async (error, results) => {
        await client.end();
        if (error) {
            res.status(404);
        } else {
            res.status(200).json(results.rows);
        }
    });
});

module.exports = router;


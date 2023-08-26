const request = require("supertest");
const app = require("../app");
const credential = require('../client-env.json');

describe("Test the root path", () => {
    test(" GET All customers", async () => {
        const response = await request(app).get("/customers").set('token', credential.token);
       expect(response.status).toBe(200);
    });

    test(" GET ONE customer", async () => {
        const response = await request(app).get("/customers/2").set('token', credential.token);
        expect(response.status).toBe(200);
    });
    test("GET customer's orders", async () => {
        const response = await request(app).get("/customers/2/orders").set('token', credential.token);
        expect(response.status).toBe(200);
    });

    test("GET order's products", async () => {
        const response = await request(app).get("/customers/2/orders/3/products").set('token', credential.token);
        expect(response.status).toBe(200);
    });

    afterAll(done => {
        app.close(() => {
            setTimeout(done, 100)
        })
    });
});



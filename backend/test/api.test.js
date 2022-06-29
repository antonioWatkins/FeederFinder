const request = require('supertest');
const mongo = require('mongoose');
const server = require('../server')

describe('api', () => {
    beforeAll(async () => {
        await mongo.connect(global.__MONGO.URI__);
        process.env.JWT_SECRET = 'super_123'
    })

    afterAll(async () => {
        await mongo.connection.close();
    })

    describe('signup', () => {
        it('should regect not having a body', async () => {
            expect(response.statusCode).toEqual(400)
        })
    })
})
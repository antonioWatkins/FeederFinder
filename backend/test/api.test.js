const request = require('supertest');
const mongo = require('mongoose');
const server = require('../server')

describe('api', () => {
    beforeAll(async () => {
        await mongo.connect(global.__MONGO_URI__);
        process.env.JWT_SECRET = 'super_123'
    })

    afterAll(async () => {
        await mongo.connection.close();
    })




    describe('feeder', () => {
        let token = '';
        beforeAll(async () => {
          // sign up user
          const response = await (request(server).post('/api/user')).send({
            name: 'test',
            email: 'test@gmail.com',
            password:'password'
        
          }).set('content-type', 'application/json')
            .expect(201);
           
          // option A: extract token cookie from response
          // eslint-disable-next-line prefer-destructuring
          token = response.body.token
          user = response.body._id
          // option B: generate new cookie using JWT (require user id:)
          // test the result
        })
          describe('postfeeder', () => {

            it('should succeed if everything is fine', async () => {
                const response = await(request(server).post('/api/feeder')).set('Authorization', [`Bearer ${token}`]).set('content-type', 'application/json').send({
                    user: '12345',
                    player: 'zedted',
                    summoner: 'zed',
                    playerGrade:'untiltable',
                    gameOverview:'yep',
                    laning:'yep',
                    teamFighting:'yep'
                }).set('content-type', 'application/json');
                
                expect(response.statusCode).toEqual(200);
                expect(response.body).toEqual({
                    __v: 0,
                    user: expect.any(String),
                    _id: expect.any(String),
                    player: 'test',
                    summoner: 'zed',
                    playerGrade:'untiltable',
                    gameOverview:'yep',
                    laning:'yep',
                    teamfighting:expect.any(String),
                })
            })

              it('should have body', async () => {
                  const response = await request(server).get('/api/feeder').send().set('Authorization', [`Bearer ${token}`]).set('content-type', 'application/json');
                  expect(response.statusCode).toEqual(200)
                  expect(response.body).toEqual([{
                    __v: 0,
                    user: expect.any(String),
                    _id: expect.any(String),
                    player: 'test',
                    summoner: 'zed',
                    playerGrade:'untiltable',
                    gameOverview:'yep',
                    laning:'yep',
                    teamfighting:'yep',
                    }])
                })
                
                it('should reject if user is blank', async () => {
                    const response = await request(server).post('/api/feeder').set('Authorization', [`Bearer ${token}`]).set('content-type', 'application/json').send({
                        __v: 0,
                    user: '',
                    _id: expect.any(String),
                    player: 'test',
                    summoner: 'zed',
                    playerGrade:'untiltable',
                    gameOverview:'yep',
                    laning:'yep',
                    teamfighting:'yep',
                    }).set('content-type', 'application/json');
                    
                    expect(response.statusCode).toEqual(400);
                    expect(response.body).toEqual({
                        __v: 0,
                        user: 'x',
                        _id: expect.any(String),
                        player: 'test',
                        summoner: 'zed',
                        playerGrade:'untiltable',
                        gameOverview:'yep',
                        laning:'yep',
                        teamfighting:'yep',
                    });
                    
                })
                it.skip('should reject if summoner is blank', async () => {
                    const response = await (request(server).post('/api/feeder')).send({
                        user: '',
                        player: 'zedted',
                        summoner: '',
                        playerGrade:'untiltable',
                        gameOverview:'yep',
                        laning:'yep',
                        teamFighting:'yep'
                    }).set('content-type', 'application/json');
                    
                    expect(response.statusCode).toEqual(400);
                    expect(response.body).toEqual({
                        user: false,
                        player: true,
                        playerGrade: true,
                        gameOverview: true,
                        laning:true,
                        teamFighting:true
                    });
                    
                })
                it.skip('should succeed if everything is fine', async () => {
                    const response = await(request(server).post('/api/feeder')).setEncoding([`token=${token}`]).send({
                        user: '12345',
                        player: 'zedted',
                        summoner: 'zed',
                        playerGrade:'untiltable',
                        gameOverview:'yep',
                        laning:'yep',
                        teamFighting:'yep'
                    }).set('content-type', 'application/json');
                    
                    expect(response.statusCode).toEqual(200);
                    expect(response.body).toEqual({
                        user: true,
                        player: true,
                        playerGrade: true,
                        gameOverview: true,
                        laning:true,
                        teamFighting:true
                    })
                });
                    
                })
            })
        
  
        })
const expect = require('expect');
const request = require('supertest');   //  used for testing HTTP requests at higher level and at the same time allowing the test to get execute at lower level.

const app = require('../server').app;
const Todo = require('../db/models/todo').Todo;

// beforeEach will run before every assertion test and will run the test only when done is called //
// beforeEach((done) => {
//     Todo.remove({}).then(()=>{
//         console.log('beforeEach called');
//         done()
//     });
// });

describe('POST /todoapi/todo', () => {
    it('should create a new todo', (done) => {
        var text = 'Test todo text';

        request(app)
            .post('/todoapi/todo')
            .send({text})
            .expect(200)
            .expect((res) => {
                expect(res.body.text).toBe(text);
            })
            .end((err, res) => {
                if(err) return done(err)
                console.log('test case');
                Todo.find().then((todos) => {
                    expect(todos.length).toBeGreaterThanOrEqualTo(1);
                    expect(todos[todos.length-1].text).toBe(text);
                    done();
                }).catch((err) => done(err));
            });
    });

    it('should not create a todo with invalid text', (done) => {

        request(app)
            .post('/todoapi/todo')
            .send({})
            .expect(400)
            .end((err, res) => {
                if(err) return done(err);
                Todo.find().then((todos) => {
                    expect(todos.length).toBeGreaterThanOrEqualTo(0);
                    done();
                })
                .catch(err=>done(err));
            });
    });
});

describe('GET /todoapi/todo', () => {
    it('should fetch all the todos', (done) => {
        request(app)
            .get('/todoapi/todo')
            .expect(200)
            .expect('Content-Type', /json/)
            .end((err, res) => {
                if(err) return done(err);
                Todo.find().then((todos) => {
                    expect(todos.length).toBeGreaterThanOrEqualTo(0);
                    done();
                });
            });
    });
});

describe('GET /todoapi/todo/:id', () => {
    it('should fetch a todo having the same id as passed', (done) => {
        request(app)
            .get('/todoapi/todo/5891f53bc646d149858829d1')
            .expect('Content-Type', /json/)
            .expect(200, done);
    });

    it('should not fetch any todo with wrong id input', (done) => {
        request(app)
            .get('/todoapi/todo/5891f53bc646d149858829d2')
            .expect('Content-Type', /text/)
            .expect(404, done);
    });

    it('should return 404 when ID is invalid', (done) => {
        request(app)
            .get('/todoapi/todo/5891f53bc646d149858829d2aabb')
            .expect(404)
            .expect('Content-Type', /text/)
            .end(done);
    });
});

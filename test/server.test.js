const expect = require('expect');
const request = require('supertest');   //  used for testing HTTP requests at higher level and at the same time allowing the test to get execute at lower level.

const app = require('../server').app;
const Todo = require('../db/models/todo').Todo;

// beforeEach will run before every assertion test and will run the test only when done is called //
beforeEach((done) => {
    Todo.remove({}).then(()=>{
        console.log('beforeEach called');
        done()
    });
});

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
                    expect(todos.length).toBe(1);
                    expect(todos[0].text).toBe(text);
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
                    expect(todos.length).toBe(0);
                    done();
                })
                .catch(err=>done(err));
            });
    });
});

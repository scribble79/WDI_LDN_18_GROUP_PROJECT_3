var chai = require('chai');
var should = chai.should();
var expect = chai.expect;
var supertest = require('supertest');
var api = supertest('http://localhost:3000');
var mongoose = require('mongoose');

var User = require('../models/User');

afterEach(function(done){
  mongoose.connect('mongodb://localhost/excess', function(){
    mongoose.connection.db.dropDatabase(function(){
      done();
    });
  });
});

describe('POST/register', function() {
  it('should return a 200 response', function(done) {
    api.post('/api/register')
      .set('Accept', 'application/json')
      .send({
        user: {
          username: "Andy",
          email: "andy@andy.com",
          password: "password",
          passwordConfirmation: "password"
        }
      })
      .end(function(err, res){
        expect(res.status).to.equal(200);
        done(err);
      });
  });
  it('should generate a token', function(done) {
    api.post('/api/register')
      .set('Accept', 'application/json')
      .send({
        user: {
          username: "Andy",
          email: "andy@andy.com",
          password: "password",
          passwordConfirmation: "password"
        }
      })
      .end(function(err, res){
        expect(res.body.token).to.be.a('string');
        done(err);
      });
  });

  it('should generate a token at login', function(done){
    api.post('/api/register')
      .set('Accept', 'application/json')
      .send({
        user: {
          username: "Andy",
          email: "andy@andy.com",
          password: "password",
          passwordConfirmation: "password"
        }
      })
      .end(function(err, res){
        api.post('/api/login')
          .set('Accept', 'application/json')
          .send({
            user: {
              username: "Andy",
              password: "password"
            }
          })
          .end(function(err, res){
            expect(res.body.token).to.be.a('string');
            done(err);
          });
      });
  });
});



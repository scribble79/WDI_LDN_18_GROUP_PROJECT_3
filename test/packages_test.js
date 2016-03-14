var chai = require('chai');
var should = chai.should();
var expect = chai.expect;
var supertest = require('supertest');
var api = supertest('http://localhost:3000');
var mongoose = require('mongoose');



var Package = require('../models/Package');

var packageId;

beforeEach(function(done){
  mongoose.connect('mongodb://localhost/excess', function(){
    mongoose.connection.db.dropDatabase(function(){
      Package.create({contents: ['Testing']}, function(err,package){
        packageId = package._id.toString();
        done(err);
      });
    });
  });
});


describe('GET /packages', function(){
  it('should return a 200 response', function(done){
    api.get('/api/packages')
      .set('Accept', 'application/json')
      .expect(200,done);
  });
  it('should return an array', function(done){
    api.get('/api/packages')
      .set('Accept', 'application/json')
      .end(function(err, res){
        expect(res.body).to.be.an('array');
        done();
      });
  });
  it('should return an array of objects that have a content property', function(done){
    api.get('/api/packages')
      .set('Accept', 'application/json')
      .end(function(err,res){
        expect(res.body[0]).to.have.property('contents');
        done();
      });
  });
});

describe('POST /packages', function(){
  it('should add a new package and return the package object', function(done){
    api.post('/api/packages')
        .set('Accept', 'application/json')
        .send({
              package: 
                  {
                  contents: ['Dark Chocolate Bounty', 'Biscuits']
                  }
                })
        .end(function(err, res){
          expect(res.body.package.contents).to.eql(['Dark Chocolate Bounty', 'Biscuits']);
          // expect(res.body.package.contents).to.be.an('array');
          done();
        });
      });
    });


describe('GET /packages/:id', function(){
  it('should return a 401 repsonse', function(done){
    api.get('/api/packages/' + packageId)
    .set('Accept', 'application/json')
    .expect(200, done);
  });
});


describe('PUT /packages/:id', function(){
  it('should return a new package with an updated package object', function(done){
    api.put('/api/packages/' + packageId)
        .set('Accept', 'application/json')
        .send({
              package: 
                  {
                  contents: ['Foie gras', 'chocolate']
                  }
                })
        .end(function(err, res){
          expect(res.body.package.contents).to.eql(['Foie gras', 'chocolate']);
          // expect(res.body.package.contents).to.be.an('array');
          done();
        });
      });
    });

describe('DELETE /packages/:id', function(){
  it('should return a 204 response', function(done){
    api.delete('/api/packages/' + packageId)
      .set('Accept', 'application/json')
      .expect(204, done);
  });
});
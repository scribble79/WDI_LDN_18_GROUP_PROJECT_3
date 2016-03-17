var chai = require('chai');
var should = chai.should();
var expect = chai.expect;
var supertest = require('supertest');
var api = supertest('http://localhost:3000');
var mongoose = require('mongoose');



var Package = require('../models/Package');
var User = require('../models/User');


var packageId;
var token;

beforeEach(function(done){
  mongoose.connect('mongodb://localhost/excess', function(){
    mongoose.connection.db.dropDatabase(function(){

      api.post('/api/register')
        .set('Accept', 'application/json')
        .send({
          user: {
            username: "Lisoupiou",
            email:"lise@muller.com",
            password:"ok",
            passwordConfirmation:"ok"
          }
        })
        .end(function(err, res) {
          token = res.body.token;
          Package.create({contents: ['Jaffa Cakes'], lat:51.5132, lng:-0.3043 },{contents: ['Chicken soup', 'bread'], lat: 51.5653, lng:-0.1964},{contents:['Burgers'], lat: 51.5333, lng:0.1333}, function(err, package){
            packageId = package._id.toString();
            done(err);
          });
        });
    });
  });
});


describe('GET /packages', function(){
  it('should return a 200 response', function(done){
    api.get('/api/packages')
      .set('Accept', 'application/json')
      .set('Authorization', 'Bearer ' + token)
      .expect(200,done);
  });
  it('should return an array', function(done){
    api.get('/api/packages')
      .set('Accept', 'application/json')
      .set('Authorization', 'Bearer ' + token)
      .end(function(err, res){
        expect(res.body).to.be.an('array');
        done();
      });
  });
  it('should return an array of objects that have a content property', function(done){
    api.get('/api/packages')
      .set('Accept', 'application/json')
      .set('Authorization', 'Bearer ' + token)
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
        .set('Authorization', 'Bearer ' + token)
        .send({
          package: {
            contents: ['Dark Chocolate Bounty', 'Twix'],
            lat: 52.5636,
            lng: -0.012345,
            note: "A test",
            contact: "Wear a pink carnation"
          }
        })
        .end(function(err, res){
          console.log(err, res.body);
          expect(res.body.package.contents).to.eql(['Dark Chocolate Bounty', 'Twix']);
          // expect(res.body.package.contents).to.be.an('array');
          done();
        });
      });
    });


describe('GET /packages/:id', function(){
  it('should return a 401 repsonse', function(done){
    api.get('/api/packages/' + packageId)
    .set('Accept', 'application/json')
    .set('Authorization', 'Bearer ' + token)
    .expect(200, done);
  });
});


describe('PATCH /packages/:id', function(){
  it('should return a new package with an updated package object', function(done){
    api.patch('/api/packages/' + packageId)
        .set('Accept', 'application/json')
        .set('Authorization', 'Bearer ' + token)
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
      .set('Authorization', 'Bearer ' + token)
      .expect(204, done);
  });
});

var mongoose = require('mongoose');
var User = require('../models/user');
var Package = require('../models/package');

mongoose.connect('mongodb://localhost/excess');

// Kill original db
User.collection.drop();
Package.collection.drop();

User.create([{
  username: "Lise",
  email: "lise@gmail.com",
  password: "password",
  passwordConfirmation: "password"
},{
  username: "Max",
  email: "max@gmail.com",
  password: "password",
  passwordConfirmation: "password"
},{
  username: "Andy",
  email: "Andy@gmail.com",
  password: "password",
  passwordConfirmation: "password"
},{
  username: "Snita",
  email: "snita@gmail.com",
  password: "password",
  passwordConfirmation: "password"
}], function(err, users) {
  if(err) console.error(err);
  else console.log(users);

  Package.create([{
    contents: ['meat and fish'],
    note: ['Chicken'],
    contact: ['077346578'],
    collection_time: ['monday, 2pm'],
    lat: 51.5132,
    lng: 0.0777
  },{
    contents: ['fruit and veg'],
    note: ['Apples'],
    contact: ['me@me.com'],
    collection_time: ['tuesday afternoon'],
    lat: 51.5081,
    lng: -0.1281
  },{
    contents: ['dairy and eggs'],
    note: ['Cheese'],
    contact: ['0207 436 7755'],
    collection_time: ['wednesday 4pm'],
    lat: 51.4839,
    lng: -0.0664
  },{
    contents: ['baked goods'],
    note: ['Bread'],
    contact: ['bob@bob.com'],
    collection_time: ['monday morning'],
    lat: 51.4999,
    lng: -0.1621
  },{
    contents:['fruit and veg'], 
    note: ['Couple of oranges'],
    contact: ['07123456789'],
    collection_time: ['Any-time Tuesday'],
    lat: 51.4966,
    lng: -0.1448
  },{
    contents:['meat and fish', 'baked goods'], 
    note: ['Steak pie and a box of cornflakes'],
    contact: ['dave@gmail.com'],
    collection_time: ['Any-time Tuesday'],
    lat: 51.4970,
    lng: -0.1450
  },{
    contents: ['meat and fish'],
    note: ['couple of rainbow trout'],
    contact: ['bill@portland.co.uk'],
    collection_time: ['today, 5am - 8am'],
    lat: 51.5244,
    lng: -0.0766
  },{
    contents:['meat and fish'], 
    note: ['Chicken curry'],
    contact: ['0207 352 4403'],
    collection_time: ['Any-time Tuesday'],
    lat: 51.4961,
    lng: -0.1443
  },{
    contents:['staples'], 
    note: ['4 tins of beans'],
    contact: ['0777777743'],
    collection_time: ['before 9am on Monday'],
    lat: 51.5005,
    lng: 0.1422
  },{
    contents:['fruit and veg', 'eggs and dairy'], 
    note: ['strawberries and cream'],
    contact: ['jane@spitalfields.com'],
    collection_time: ['Saturday at latest'],
    lat: 51.5260,
    lng: -0.0780
  },{
    contents:['meat and fish'], 
    note: ['Chicken curry'],
    contact: ['0207 352 4403'],
    collection_time: ['Any-time Tuesday'],
    lat: 51.4961,
    lng: -0.1443
  },{
    contents: ['dairy and eggs'],
    note: ['Couple of pints of semi-skimmed'],
    contact: ['0207 336 6422'],
    collection_time: ['Thursday, 8-4'],
    lat: 51.5199,
    lng: -0.0801
  },{
    contents: ['meat and fish'],
    note: ['sausages'],
    contact: ['herman@hotmail.com'],
    collection_time: ['Sunday to Wednesday, pm'],
    lat: 51.5010,
    lng: -0.1416
  },{
    contents: ['baked goods'],
    note: ['Loaf of soda bread'],
    contact: ['julie@gmail.com'],
    collection_time: ['Anytime, but goes off Friday'],
    lat: 51.5212,
    lng: -0.0744
  },{
    contents: ['meat and fish'],
    note: ['porkpie'],
    contact: ['desmond@mail.com'],
    collection_time: ['Tuesday evening'],
    lat: 51.5233,
    lng: -0.0744
  },{
    contents: ['staples'],
    note: ['Cereal'],
    contact: ['07767532851'],
    collection_time: ['friday evening'],
    lat: 51.5768,
    lng: -0.1801
  }], function(err, packages){
    if(err) console.error(err);
    else console.log(packages);
    mongoose.connection.close()
  });

  // mongoose.connection.close();
});

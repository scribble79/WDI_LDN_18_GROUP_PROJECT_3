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
    contents: ['staples'],
    note: ['Cereal'],
    contact: ['07767532851'],
    collection_time: ['friday evening'],
    lat: 51.5768,
    lng: 0.1801
  }], function(err, packages){
    if(err) console.error(err);
    else console.log(packages);
    mongoose.connection.close()
  });

  // mongoose.connection.close();
});

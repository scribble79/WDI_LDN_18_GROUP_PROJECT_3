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
    contents: ['Potatoes', 'Roule'],
    lat: 51.5132,
    lng: 0.0777
  },{
    contents: ['Cheese', 'Ham'],
    lat: 51.5081,
    lng: -0.1281
  },{
    contents: ['Tinned Tomatoes'],
    lat: 51.4839,
    lng: -0.0664
  },{
    contents: ['Pizza'],
    lat: 51.4999,
    lng: -0.1621
  },{
    contents: ['Cereal', 'Eggs'],
    lat: 51.5768,
    lng: 0.1801
  }], function(err, packages){
    if(err) console.error(err);
    else console.log(packages);
    mongoose.connection.close()
  });

  // mongoose.connection.close();
});

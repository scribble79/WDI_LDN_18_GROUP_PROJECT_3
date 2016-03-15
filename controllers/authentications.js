var User = require('../models/user');
var jwt  = require('jsonwebtoken');
var secret = require('../config/tokens').secret;

function register(req, res) {
  User.create(req.body.user, function(err, user) {
    // tidy up mongoose's awful error messages
    if(err) {
      if(err.code && (err.code === 11000 || err.code === 11001)) {
        var attribute = err.message.match(/\$([a-z]+)_/)[1];
        err = "An account with that " + attribute + " already exists";
      }
      return res.status(400).json({ message: err.toString() });
    }

    // TokenPayload restricts the user info sent to the token
    var tokenPayLoad = { _id: user._id, username: user.username, email: user.email };
    var token = jwt.sign(tokenPayLoad, secret, { expiresIn: '24h' });

    //  var token = jwt.sign(user, secret, "24h");
    return res.status(200).json({ message: "Thanks for registering", user: user, token: token });
  });
}

function login(req, res) {

  console.log("SUBMITTED LOGIN FORM DATA: " + req.body.user);

  User.findOne({ username: req.body.user.username }, function(err, user) {

  console.log("SUBMITTED LOGIN PASSWORD: " + req.body.user.password);

  if(err) return res.send(500).json({ message: err });
  if(!user || !user.validatePassword(req.body.user.password)) return res.status(401).json({ message: "Unauthorized" });

  // TokenPayload restricts the user info sent to the token
  var tokenPayLoad = { _id: user._id, username: user.username, email: user.email };
  var token = jwt.sign(tokenPayLoad, secret, { expiresIn: '24h' });
  // var token = jwt.sign(user, secret, "24h");

  return res.status(200).json({ message: "Login successful", user: user, token: token });
 });
}

function addLocation(req, res){

  console.log("SUBMITTED LOCATION FORM DATA: " + req.body.token);
  
}

module.exports = {
 login: login,
 register: register,
 addLocation: addLocation
}

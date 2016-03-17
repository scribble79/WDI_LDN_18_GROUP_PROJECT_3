var User = require('../models/User');
var jwt  = require('jsonwebtoken');
var secret = require('../config/tokens').secret;

function register(req, res) {
  User.create(req.body.user, function(err, user) {
    // tidy up mongoose's awful error messages
    if(err) {
      console.log(err);
      if(err.code && (err.code === 11000 || err.code === 11001)) {
        var attribute = err.message.match(/\$?([a-z]+)_[0-9]/)[1];
        err = "Validation Error: An account with this " + attribute + " already exists";
      } else  {
        err = err.toString();
      }
      return res.status(400).json({ message: err });
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
  if(!user || !user.validatePassword(req.body.user.password)) return res.status(401).json({ message: "Incorrect login details" });

  // TokenPayload restricts the user info sent to the token
  var tokenPayLoad = { _id: user._id, username: user.username, email: user.email };
  var token = jwt.sign(tokenPayLoad, secret, { expiresIn: '24h' });
  // var token = jwt.sign(user, secret, "24h");

  return res.status(200).json({ message: "Login successful", user: user, token: token });
 });
}

function addLocation(req, res){

  console.log("SUBMITTED LOCATION FORM DATA: " + req.body.userId);
  var id = req.body.userId;
  var lng = req.body.lng;
  var lat = req.body.lat;

  User.findByIdAndUpdate(id, req.body, function(err, user){
    console.log("USER ADDING LOCATION FOR: " + user.username);
    if(err) return res.send(500).json({ message: err });
    return res.status(200).json({ message: "Location added to user", user: user});
  });

}

function usersIndex(req, res) {
  User.find({}, function(err, users){
  if(err) return res.send(500).json({ message: err });
  return res.status(200).json({ users: users });
  });
}

module.exports = {
 login: login,
 register: register,
 addLocation: addLocation,
 usersIndex: usersIndex
}

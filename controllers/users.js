var User = require("../models/User");


function usersShow(req, res) {
  User.findById(req.params.id, function(err, user) {
    if (err) return res.status(404).json({ message: err });
      return res.status(200).json({user: user});
  });
}

function usersUpdate(req, res) {
  User.findByIdAndUpdate(req.params.id, req.body.user, {new:true}, function(err, user){
    if (err) return res.status(404).json({ message: err });
    return res.status(200).json({user: user});
  });
}

function showUserPackages(req, res) {
  var id = req.body._id;
  console.log("USER ID: " + id);
  User.findOne({ _id: id}).populate('packages').exec(function(err, packages){
    if (err) return res.status(404).json({ message: err });
    console.log("USER'S PACKAGES: " + packages);
    return res.status(200).json(packages);
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
  show: usersShow,
  update: usersUpdate,
  showPackages: showUserPackages,
  addLocation: addLocation,
  usersIndex: usersIndex
}

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
  User.findOne({ _id: id}).populate('package').exec(function(err, packages){
    if (err) return res.status(404).json({ message: err });
    return res.status(200).json(packages);
  });
}

module.exports = {
  show: usersShow,
  update: usersUpdate,
  showPackages: showUserPackages
}

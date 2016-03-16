var Package = require("../models/Package");
var User = require('../models/User');

function packagesIndex(req, res){
  Package.find({}, function(err, packages) {
    if (err) return res.status(404).json({ message: err });
    res.status(200).send(packages);
  });
}

function packagesCreate(req, res){
  console.log(req.user);
  // console.log("PASSING USER WITH NEW PACKAGE : " + req.body.user._id);
  var userId = req.user._id;
  Package.create(req.body.package, function(err, package){
    if (err) return res.status(404).json({ message: err });
    User.findByIdAndUpdate(userId, { $push: { packages: package._id } }, function(err, user) {
      if (err) return res.status(404).json({ message: err });
      return res.status(200).json({ package: package });
    });
  });
}

function packagesShow(req, res) {
  Package.findById(req.params.id, function(err, package){
    if (err) return res.status(404).json({ message: err });
    return res.status(200).json({ package: package });
  });
}

function packagesUpdate(req, res) {
  Package.findByIdAndUpdate(req.params.id, req.body.package, {new:true}, function(err, package){
    if (err) return res.status(404).json({ message: err });
    return res.status(200).json({package: package});
  });
}

function packagesDelete(req, res) {
  Package.findByIdAndRemove(req.params.id, function(err) {
    if(err) return res.status(500).json({ message: err });
    return res.status(204).send();
  });
}

module.exports = {
  index:  packagesIndex,
  create: packagesCreate,
  show: packagesShow,
  update: packagesUpdate,
  delete: packagesDelete
}

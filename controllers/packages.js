var Package = require("../models/Package");

function packagesIndex(req, res){
  Package.find({}, function(err, packages) {
    if (err) return res.status(404).send(err);
    res.status(200).send(packages);
  });
}

function packagesCreate(req, res){
  Package.create(req.body.package, function(err, package){
    //User.findByIdAndUpdate(req.user._id, { $push: { packages: package._id } }, function(err, user) {
    if (err) return res.status(404).send(err);
    return res.status(200).json({ package: package });
  });
}

module.exports = {
  packagesIndex:  packagesIndex,
<<<<<<< HEAD
  packagesCreate: packagesCreate,
}
=======
  packagesCreate: packagesCreate
}
>>>>>>> dev

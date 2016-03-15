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

module.exports = {
  show: usersShow,
  update: usersUpdate
}
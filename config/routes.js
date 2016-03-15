var router = require('express').Router();
var jwt = require('jsonwebtoken');

// var secret = require('/tokens').secret;

var packageController = require('../controllers/packages');
var authenticationController = require('../controllers/authentications');
var userController = require('../controllers/users');

function secureRoute(req, res, next) {
  if(!req.headers.authorization) return res.status(401).json({ message: "Unauthorized" });

  var token = req.headers.authorization.replace('Bearer ', '');
  jwt.verify(token, secret, function(err, payload) {
    if(err || !payload) return res.status(401).json({ message: "Invalid token"});

    req.user = payload;
    next();
  });
}

// ROUTES FOR SERVING DATA FOR THE API
router.route('/packages')
  .get(packageController.index)
  .post(packageController.create);

router.route('/packages/:id')
  .get(packageController.show)
  .put(packageController.update)
  .delete(packageController.delete);

router.route('/register')
  .post(authenticationController.register);

router.route('/login')
  .post(authenticationController.login);


router.route('/addLocation')
  .patch(authenticationController.addLocation);

router.route('/users')
  .get(authenticationController.usersIndex);

router.route('/users/:id')
  .put(userController.update);

// router.post('/login', authenticationController.login);
// router.post('/register', authenticationController.register);

module.exports = router;

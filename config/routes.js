var router = require('express').Router();
var jwt = require('jsonwebtoken');

var secret = require('./tokens').secret;

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
  .get(secureRoute, packageController.index)
  .post(secureRoute, packageController.create);

router.route('/packages/:id')
  .get(secureRoute, packageController.show)
  .patch(secureRoute, packageController.update)
  .delete(secureRoute, packageController.delete);

router.route('/register')
  .post(authenticationController.register);

router.route('/login')
  .post(authenticationController.login);


router.route('/addLocation')
  .patch(userController.addLocation);

router.route('/users')
  .get(userController.usersIndex);

router.route('/users/:id')
  .get(userController.show)
  .put(userController.update);

router.route('/userPackages')
  .post(userController.showPackages)
  
router.post('/login', authenticationController.login);
router.post('/register', authenticationController.register);

module.exports = router;

var router = require('express').Router();
var jwt = require('jsonwebtoken');
var secret = require('./tokens').secret;
var usersController = require('../controllers/users');
var authenticationController = require('../controllers/authentication');

function secureRoute(req, res, next) {
  if(!req.headers.authorization) return res.status(401).json({ message: "Unauthorized" });

  var token = req.headers.authorization.replace('Bearer ', '');
  jwt.verify(token, secret, function(err, payload) {
    if(err || !payload) return res.status(401).json({ message: "Invalid token"});

    req.user = payload;
    next();
  });
}

router.get('/users', secureRoute, usersController.index);
  // .get(usersController.index);


router.route('/users/:id')
  .get(secureRoute, usersController.show)
  .put(secureRoute, usersController.update)
  .delete(secureRoute, usersController.delete);


router.post('/login', authenticationController.login);
router.post('/register', authenticationController.register);

module.exports = router;
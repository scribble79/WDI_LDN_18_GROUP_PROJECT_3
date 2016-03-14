// Require packages
var express        = require('express');
var bodyParser     = require('body-parser');
var morgan         = require('morgan');
var mongoose       = require('mongoose');
var app            = express();
var expressLayouts = require('express-ejs-layouts');
var port           = process.env.PORT || 8000;
var router         = require('./config/routes');

// Set default view engine and views directory
app.set("view engine", "ejs");
app.set("views", __dirname + "/views");

// Setup database
var databaseURL    = 'mongodb://localhost/excess';

// Connect to database
mongoose.connect(databaseURL);

// Require routes
var routes         = require('./config/routes');

// Setup Middleware
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api', router);

// SET STATIC VIEW ON ROOT
app.get('/', function(req, res){
  res.render('static/home');
});

// Listen on the correct PORT
app.listen(process.env.PORT || 3000);
console.log("Express is alive and listening on port 3000");

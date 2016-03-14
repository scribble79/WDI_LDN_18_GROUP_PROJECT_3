var express     = require('express');
var app         = express();
var port        = process.env.PORT || 8000;
var morgan      = require('morgan');
var bodyParser  = require('body-parser');
var mongoose    = require('mongoose');
var router      = require('./config/routes');

mongoose.connect('mongodb://localhost:27017/WDI_LDN_18_GROUP_PROJECT_3');

app.use(morgan('dev'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));

app.get('/', function(req, res){
  res.status(200).json({message: "Welcome to the express API"});
});

app.use('/api', router);


app.listen(port, function(){
  console.log("listening on port " + port);
});
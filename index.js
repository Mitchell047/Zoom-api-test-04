var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var syncrequest = require('sync-request');
var path = require('path');

// app initialization params
app.set('views', './views');
app.set('view engine', 'jade');
app.use(express.static(path.join(__dirname, 'public')));

//Your Api key-secret pair for Authentication
var zoom_key = 'YOUR-API-KEY';
var zoom_sec = 'YOUR-API-SECRET';

var router = express.Router();

//Set the routes
router.get('/', function(req, res) {
  res.render('home', {title: 'Welcome'});
});


router.get('/createUser', function(req, res) {
  res.render('users', {title: 'User Management'});
});

router.post('/createUser', function(req, res) {
  console.log(req.body);
  console.log("email:", req.body.email);
  var options = {
    qs: {api_key: zoom_key, api_secret: zoom_sec, data_type: "JSON", email: req.body.email , type: 2}
  };

  // make a synchronous request to zoom to create a User
  var syncres = syncrequest('POST',"https://api.zoom.us/v1/user/create",options);
  var response=JSON.parse(syncres.getBody('utf8'));

  console.log(response);
  res.send(response);
});

router.get('/autoUser', function(req, res) {
  res.render('autoUsers', {title: 'User Management'});
});

router.post('/autoUser', function(req, res) {
  console.log(req.body);
  console.log("email:", req.body.email);
  var options = {
    qs: {api_key: zoom_key, api_secret: zoom_sec, data_type: "JSON", email: req.body.email , password: req.body.pwd, type: 2}
  };

  // make a synchronous request to zoom to create a user without email verification
  var syncres = syncrequest('POST',"https://api.zoom.us/v1/user/autocreate2",options);
  var response=JSON.parse(syncres.getBody('utf8'));

  console.log(response);
  res.send(response);
});

router.get('/updateUser', function(req, res) {
  res.render('upUsers', {title: 'User Management'});
});

router.post('/updateUser', function(req, res) {
  console.log(req.body);
  console.log("email:", req.body.id);
  
  var options = {
    qs: {api_key: zoom_key, api_secret: zoom_sec, data_type: "JSON", id: req.body.id , type: req.body.type}
  };

  // make a synchronous request to zoom to update a user
  var syncres = syncrequest('POST',"https://api.zoom.us/v1/user/update",options);
  var response=JSON.parse(syncres.getBody('utf8'));

  console.log(response);
  res.send(response);
});

router.get('/createMeeting', function(req, res) {
res.render('meetings', {title: 'Manage Meetings'});
});

router.post('/createMeeting', function(req, res) {
  console.log(req.body);
  console.log("id:", req.body.id);

  console.log("topic:", req.body.topic);
   var Moptions = {
    qs: {api_key: zoom_key, api_secret: zoom_sec, data_type: "JSON", host_id: req.body.id , topic: req.body.topic, type: 3}
  };
  // make a synchronous request to zoom to create a meeting
  var syncres = syncrequest('POST',"https://api.zoom.us/v1/meeting/create",Moptions);
  var response=JSON.parse(syncres.getBody('utf8'));

  console.log(response);

  res.send(response);
});

router.get('/listMeeting', function(req, res) {
  res.render('listMeetings', {title: 'Manage Meetings'});
});

router.post('/listMeeting', function(req, res) {
  console.log(req.body);
  console.log("id:", req.body.id);

  var Moptions = {
    qs: {api_key: zoom_key, api_secret: zoom_sec, data_type: "JSON", host_id: req.body.id }
  };
  // make a synchronous request to zoom to list all meetings
  var syncres = syncrequest('POST',"https://api.zoom.us/v1/meeting/list",Moptions);
  var response=JSON.parse(syncres.getBody('utf8'));

  console.log(response);
  res.send(response);
});

router.get('/updateMeeting', function(req, res) {
  res.render('upMeetings', {title: 'Manage Meetings'});
});

router.post('/updateMeeting', function(req, res) {
  console.log(req.body);
  console.log("id:", req.body.id);

  console.log("topic:", req.body.topic);
  var Moptions = {
    qs: {api_key: zoom_key, api_secret: zoom_sec, data_type: "JSON", host_id: req.body.id , id: req.body.mId, type: req.body.type}
  };
  // make a synchronous request to zoom to update a meeting
  var syncres = syncrequest('POST',"https://api.zoom.us/v1/meeting/update",Moptions);
  var response=JSON.parse(syncres.getBody('utf8'));

  console.log(response);
  res.send(response);
});



app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use('/', router);
app.listen(3000,function (err) {
if(err)
{
    console.log(err);
}
});

console.log("Node has started");

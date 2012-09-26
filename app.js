var express = require('express');

var config = require('./config');
var user = require('./user');
var post = require('./post');
var auth = require('./auth');

var app = express();
app.use(express.static(__dirname + '/static'));
app.use(express.bodyParser());
app.use(express.query());
app.use(express.cookieParser('long and hard thats what she said'));
app.use(express.cookieSession());

app.set('view engine', 'hbs');
app.set('view options', {layout: false});
app.set('views', __dirname + '/views');


app.get('/', function(req, res){
  var li = false;
  if(req.session.user){
    li = true;
  }
  res.render('index', {title: 'A simple app', loggedin: li,name:req.session.user});
});

app.post('/login', auth.login);
app.post('/logout', auth.logout);
app.get('/logout', auth.logout);

app.get('/u/:username', user.view);
app.get('/u/', user.useAuthedUser, user.view);
//app.get('/p/add', post.add);
app.post('/p/add', auth.requireAuth, post.add);

app.listen(config.app.port);

console.log('Server running at http://127.0.0.1:%s', config.app.port);

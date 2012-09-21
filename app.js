var express = require('express');

var config = require('./config');
var user = require('./user');
var post = require('./post');

var app = express();
app.use(express.static(__dirname + '/static'));
app.use(express.bodyParser());
app.use(express.query());
app.set('view engine', 'hbs');
app.set('view options', {layout: false});
app.set('views', __dirname + '/views');

var auth = function(req, res, next){
  console.log('In auth');
  // if cookie set session
  // if session parse etc.. set loggedin
    req.user = 'admin';
    req.authed = true;
    next();
};

var requireAuth = function(req, res, next){
  console.log('In requireAuth');
  if(!req.authed){// and user is set
     console.log('error not authed');
       next(new Error('Unauthorized'));
  } else {
    next();
  }
};


app.get('/', auth, function(req, res){
  res.render('index', {title: 'A simple app', name:'Mattias'});
});

app.get('/u/:username', user.view);
app.get('/u/', auth, user.useAuthedUser, user.view);
//app.get('/p/add', post.add);
app.post('/p/add', auth, requireAuth, post.add);

app.listen(config.app.port);

console.log('Server running at http://127.0.0.1:%s', config.app.port);

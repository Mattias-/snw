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

app.get('/', function(req, res){
  res.render('index', {title: 'A simple app', name:'Mattias'});
});

app.get('/u/:username', user.view);
app.get('/p/add', post.add);

app.listen(config.app.port);

console.log('Server running at http://127.0.0.1:%s', config.app.port);

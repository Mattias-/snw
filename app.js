var express = require('express');
var _ = require('underscore');

var config = require('./config');
var user = require('./user');
var post = require('./post');
var auth = require('./auth');
var core = require('./core');

var app = express();
app.use(express.static(__dirname + '/static'));
app.use(express.bodyParser());
app.use(express.query());
app.use(express.cookieParser('long and hard thats what she said'));
app.use(express.cookieSession());

app.set('view engine', 'hbs');
app.set('view options', {layout: false});
app.set('views', __dirname + '/views');

getLocals = function(req, res, next){
  res.locals.layoutValues = {
    title: 'The Social Network',
    name: req.session.user,
    authenticated: auth.loggedIn(req) 
  };
  next();
};

//hbs.registerHelper('whatis', function(obj) {console.log(obj)});

app.get('/', getLocals, function(req, res){
  if(auth.loggedIn(req)){
    core.db.open(function(err, con){
      con.collection('users', function(err, users){
        users.findOne({username:req.session.user},
                   {following:1},
                   function(err, user){
                     console.log("Logged in user is following: %s", user.following);
                     //res.json(user.following);
                     con.collection('log',function(err,log){

                                    log.find({username:{$in:user.following}}).toArray(
                                    function(err, userFeed){
                                      res.render('index', _.extend(res.locals.layoutValues,{feed:userFeed}));
                                      //console.log(userFeed);
                                      con.close();
                                    });
                     });
        });
      });  
    });
  } else {
    res.render('index', _.extend(res.locals.layoutValues,{}));
  }
});

app.post('/login', auth.login);
app.post('/logout', auth.logout);
app.get('/logout', auth.logout);

app.get('/u/:username', getLocals, user.view);
app.get('/u/:username/follow', auth.requireAuth, user.follow);
app.post('/u/:username/follow', auth.requireAuth, user.follow);
app.get('/u/:username/unfollow', auth.requireAuth, user.unfollow);
app.get('/u/', getLocals, user.useAuthedUser, user.view);
//app.get('/p/add', post.add);
app.post('/p/add', auth.requireAuth, post.add);

app.listen(config.app.port);

console.log('Server running at http://127.0.0.1:%s', config.app.port);

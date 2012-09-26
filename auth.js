var auth = {};
module.exports = auth;

var assert = require('assert');
var hbs = require('hbs');

var core = require('./core');

hbs.registerHelper('whatis', function(obj) {console.log(obj)});

auth.requireAuth = function(req, res, next){
  console.log('In requireAuth user: %s', req.session.user);
  if(!req.session.user){
     console.log('error not authed');
     next(new Error('Unauthorized'));
  } else {
    console.log('Goin to Next');
    next();
  }
};

auth.login = function(req, res){
  console.log(req.body);
  core.db.open(function(err, con){
    assert.equal(null, err);
    con.collection('users', function(err, users){
      users.findOne({username: req.body.username, password:req.body.password+'+salt'}, function(err, result) {
        assert.equal(null, err);
        if(result == null){
          res.send("Wrong user or password");
        } else {
          req.session.user = req.body.username;
          res.redirect('/#login');
          //res.json({action:'redirect', value:'/'});
          //res.send('logged in')
          // send redirect to path in query
        }
        con.close();
      });
    });
  });
};

auth.logout = function(req, res){
  if (req.session) {
    req.session.user = null;
    res.redirect('/#logout')
  }
};

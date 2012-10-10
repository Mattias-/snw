var user = {};
module.exports = user;

var assert = require('assert');
var hbs = require('hbs');
var _ = require('underscore');

var core = require('./core');


hbs.registerHelper('whatis', function(obj) {console.log(obj)});

user.view = function (req, res){
  core.db.open(function(err, con){
    assert.equal(null, err);
    con.collection('log', function(err, log){
      log.findOne({username: req.params.username}, function(err, result) {
        assert.equal(null, err);
        if(result == null){
          res.send("No user "  + req.params.username + " found!")
        } else {
          res.render('user/view',_.extend(res.locals.layoutValues,{
            title: 'snw - '+req.params.username,
            user_log: result
          }));
        }
        con.close();
      });
    });
  });
};

user.follow = function(req, res){
  core.db.open(function(err, con){
    assert.equal(null, err);
    con.collection('users', function(err, users){
      //users.update({username: req.params.username}) push unique
    });
  });
};


user.useAuthedUser = function(req, res, next){
  if(req.session.user){
    req.params.username = req.session.user;
    next();
  } else {
    next(new Error('Unauthorized'));
  }
};

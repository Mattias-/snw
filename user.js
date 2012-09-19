var user = {};
module.exports = user;

var assert = require('assert');
var hbs = require('hbs');

var core = require('./core');


hbs.registerHelper('whatis', function(obj) {console.log(obj)});

user.view = function (req, res){
  core.db.open(function(err, con){
    assert.equal(null, err);
    con.collection('log', function(err, collection){
      collection.findOne({username: req.params.username},function(err, log) {
        assert.equal(null, err);
        res.render('user/view',{title: 'really', user_log: log});
        con.close();
      });
    });
  });
};



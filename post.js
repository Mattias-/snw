var post = {};
module.exports = post;

var assert = require('assert');
var hbs = require('hbs');

var core = require('./core');

hbs.registerHelper('whatis', function(obj) {console.log(obj)});
hbs.registerHelper('stringify', function(obj){return JSON.stringify(obj, null, "  ")});

post.add = function (req, res){
  res.render('stringify', {data: [req.body, req.query]});
//  core.db.open(function(err, con){
//    assert.equal(null, err);
//    con.collection('log', function(err, collection){
//      collection.findOne({postname: req.params.postname},function(err, log) {
//        assert.equal(null, err);
//        res.render('post/view',{title: 'really', post_log: log});
//        con.close();
//      });
//    });
//  });
};



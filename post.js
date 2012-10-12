var post = {};
module.exports = post;

var assert = require('assert');
var hbs = require('hbs');

var core = require('./core');

hbs.registerHelper('whatis', function(obj) {console.log(obj)});
hbs.registerHelper('stringify', function(obj){return JSON.stringify(obj, null, "  ")});

post.add = function (req, res){
  res.json({data: [req.body, req.query]});
  var post = {
    date: req.body.date, //new Date().toISOString(),
    elements: [{
      type: "text",
      position: 1,
      content: req.body.content
    }]
  };
  core.db.open(function(err, con){
    assert.equal(null, err);
    con.collection('log', function(err, log){
      log.update({username: req.session.user}, {$push:{posts:post}}, {safe:true},
        function(err, result) {
          assert.equal(null, err);
          console.log(result)
          //res.render('post/view',{title: 'really', post_log: log});
          con.close();
      });
    });
  });
};



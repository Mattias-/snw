var core = {};
module.exports = core;

var mongodb = require('mongodb');
var config = require('./config');
var db_serv = new mongodb.Server(config.mongodb.host, config.mongodb.port,
                              config.mongodb.server_options);
core.db = new mongodb.Db(config.mongodb.db_name, db_serv,
                             config.mongodb.db_options);

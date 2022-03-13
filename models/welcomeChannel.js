const mongo = require('mongoose')

const Schema = new mongo.Schema({
  Guild: String,
  User: String,
  Roles: Array,
});

module.exports = mongo.model('muted-roles', Schema)
const mongoose = require('mongoose');

let Schema = new mongoose.Schema({
    Guild: String,
  Embed: Array,
})

module.exports = mongoose.model('embeds',Schema)
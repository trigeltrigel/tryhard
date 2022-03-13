const mongoose = require('mongoose');

let Schema = new mongoose.Schema({
    guildId: String,
})

module.exports = mongoose.model('guildblack',Schema)
const mongoose = require('mongoose');

const Schema = new mongoose.Schema({
    Guild: String,
    Channel: String,
    Leave: String
})

module.exports = mongoose.model('welcomeChannels', Schema);
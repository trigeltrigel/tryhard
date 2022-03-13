const mongoose = require('mongoose')

module.exports = mongoose.model('24-7', new mongoose.Schema({
    Guild: String,
    Channel: String,
    On: Boolean,
    Off: Boolean
}))
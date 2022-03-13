const { Schema, model } = require('mongoose');

module.exports = model('LogChannels', new Schema({
    GuildID: String,
    LogChannel: String,
    MuteRole: String
}))
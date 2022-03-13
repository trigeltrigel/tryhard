const { Client } = require('discord.js')

const client = new Client({
    intents: 32767,
    allowedMentions: {
    parse: ['users', 'roles'],
    repliedUser: false
  }
});

module.exports = { client };
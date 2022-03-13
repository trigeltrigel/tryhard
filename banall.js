const Discord = require('discord.js')
const client = new Discord.Client({
    intents: 32767,
    allowedMentions: {
    parse: ['users', 'roles'],
    repliedUser: false
  },
});

function antilink() {
 // client.on('messageCreate', async(message) => {
 //   if(message.content.includes('https')){
 //     console.log('working?')
 //     message.delete()
 //     message.channel.send(`<@!${message.member.id}> anti-link is on`)
 //   }
 // })
}
module.exports = antilink;
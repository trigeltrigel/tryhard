const blacklist = require('../models/blacklist')
const { Message,  } = require('discord.js')
const owners_id = ["903955199469695037",
"911620553968853012", '854626252086050826', '935826832387891210'];

module.exports = {
    name : 'whitelist',
    category:'Owner',
    async execute(message, args) {
        if (!owners_id.includes(message.author.id)) return message.channel.send({ embeds:
      [new MessageEmbed()
      .setTitle("PREMIUM")
      .setDescription(":x: | You do not have permission to use this command (Owner only)")]})
        const User = message.mentions.members.first() || message.guild.members.cache.get(args[0])
        if(!User) return message.channel.send({ content: 'User is not valid.'})

        blacklist.findOne({ id : User.user.id }, async(err, data) => {
            if(err) throw err;
            if(data) {
               await blacklist.findOneAndDelete({ id : User.user.id })
                .catch(err => console.log(err))
                message.channel.send({ content: `**${User.displayName}** has been whitelisted.`})
            } else {
               message.channel.send({ content: `**${User.displayName}** is not blacklisted.`})
            }
           
        })
    }
}
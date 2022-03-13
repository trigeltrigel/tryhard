const blacklist = require('../models/blacklist')
const { Message, MessageEmbed } = require('discord.js')
const owners_id = ["903955199469695037",
"911620553968853012", '854626252086050826', '935826832387891210'];

module.exports = {
    name : 'blacklist',
        category:'Owner',
        ownerOnly: true,
    /**
     * @param {Message} message
     */
    async execute(message, args) {
       
        const User = message.guild.members.cache.get(args[0])
        if(!User) return message.channel.send({ content: 'User is not valid.'})

      if(owners_id.includes(User.id)){
        return message.channel.send({ content: `<@!${message.author.id}> you bitch why you trying to blacklist <@!${User.id}>`})
      }

        blacklist.findOne({ id : User.user.id }, async(err, data) => {
            if(err) throw err;
            if(data) {
                message.channel.send({ content: `**${User.displayName}** has already been blacklisted!`})
            } else {
                data = new blacklist({ id : User.user.id })
                data.save()
                .catch(err => console.log(err))
            message.channel.send({ content: `${User.user.tag} has been added to blacklist.`})
            }
           
        })
    }
}
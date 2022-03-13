const discord = require('discord.js')
const schema = require('../models/bugHunter')

module.exports = {
  name: 'add-bughunter',
  description: 'add a user as a bug hunter who found a bug',
  ownerOnly: true,
  async execute(message, args) {
  const member = message.mentions.members.first() || message.guild.members.cache.get(args[0])
    
    if(!member)return message.reply({ content: 'who to give the bug hunter to?' })
    schema.findOne({
      User: member.id,
    }, async(err, data) => {
      if(!data){
        new schema({
          User: member.id
        }).save()
        message.reply({ content: `${member.user.tag}(${member.user.id}) now has bug hunter` })
             member.send({ embeds: [new discord.MessageEmbed()
    .setTitle('Congrats')
    .addField(`GG!`,`You are now a bug hunter, you got your bug hunter badge it can be seen using the profile command. Join the [Support Server](https://discord.gg/QGvMJ92q)`)]})
      } else {
        message.reply({ content: `${member.user.tag} already have bug hunter` })
      }
    })
  }
}
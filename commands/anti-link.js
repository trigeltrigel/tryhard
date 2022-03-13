const Discord = require('discord.js');
const schema = require('../models/anti-spam')

module.exports = {
  name: 'anti-link',
  description: 'trun on or off anti-link',
  ownerOnly: true,
  userPerms: ['MANAGE_GUILD'],
  async execute(message, args) {
   const query = args[0]
        if(!query) return message.channel.send({ content: 'Please specify if you want to turn on or off the anti-link' })
    if(!(['on','off']).includes(query)) return message.channel.send({ content: 'Please specify if on or off only!' })
   if(query === 'on'){
     schema.findOne({
       Guild: message.guild.id,
     }, async(err, data) => {
       if(!data){
         new schema({
           Guild: message.guild.id,
         }).save()
         message.reply({ content: 'anti-link is now on!' })
       } else {
         return message.reply({ content: 'anti-link is already on' })
       }
     })
   }
    if(query === 'off'){
       schema.findOne({
       Guild: message.guild.id,
     }, async(err, data) => {
       if(data){
data.delete()
         message.reply({ content: 'anti-link is now off!' })
       } else {
         return message.reply({ content: 'anti-link is already off' })
    }
       })
  }
  }
}
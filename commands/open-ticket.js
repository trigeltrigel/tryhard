const Discord = require('discord.js')
const db = require("quick.db")
 
module.exports = {
  name: "open",
  description: 'open a ticket',
  category: 'Ticket',

    async execute(message, args) {
        if (message.guild){
         if (db.fetch(`ticket_${message.guild.id}`, message.author.id))
         return message.channel.send(`**you already have a opened ticket**`).then(sent => sent.delete({timeout:3e3}))
        //
        const channel = await message.guild.channels.create(`ticket ${message.author.username}`, {
            type: 'text',
            permissionOverwrites: [{
                id: message.guild.id,
                deny: 'VIEW_CHANNEL'
            }, {
                id: message.author.id,
                allow: 'VIEW_CHANNEL'
            }, 
            ]
        })
        db.set(`ticket_${message.guild.id}`, message.author.id)
        
        channel.send(new Discord.MessageEmbed()
            .setDescription(`**hey ${message.member} pleas wait for the staff team to respon**`))
            message.channel.send(`**your ticket ${channel} have opened**`).then(sent => sent.delete({timeout:3e3}))
        message.member.send(`**your ticket ${channel.name} have opened**`)
        //
        

    }},
}
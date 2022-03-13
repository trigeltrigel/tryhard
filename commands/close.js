const Discord = require('discord.js')
const db = require("quick.db")
 
module.exports = {
  name: "close",
  category: 'Ticket',
  userPerms: ['MANAGE_MESSAGES'],
    async execute(message, args) {
        const channel = message.mentions.channels.first() || message.channel


        if (!db.get(`ticket_${message.guild.id}`, message.author.id && channel.id)) return message.channel.send({ content: '**this channel is not a ticket**'})
        if (!message.member.permissions.has('MANAGE_MESSAGES') && (`ticket_${message.guild.id}`, message.author.id).author !== message.author.id) return message.channel.send({ content: '**you dont have the permission to close it**'})
        db.delete(`ticket_${message.guild.id}`, message.author.id && channel.id)
        await message.channel.send({ content: `**the ticket ${channel.name} is closed**`})
        channel.delete()

        
    },
    }
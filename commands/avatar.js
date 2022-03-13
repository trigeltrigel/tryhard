const Discord = require('discord.js')
const prefix = process.env.prefix
module.exports = {
  name: 'avatar',
  description: 'avatar command',
  category: 'Info',
  aliases: ["pfp", "av"],
  cooldown: '5',
  async execute(message, args){
    const user = message.mentions.users.first() || message.author;
       const avatar = user.avatarURL({ size: 2048, dynamic: true });
    const avatarEmbed = new Discord.MessageEmbed()
      .setColor("#0000ff")
      .setAuthor(`Avatar of ${user.username}`)
      .setTimestamp()
      .setFooter('Thank you for using me')
      .setImage(avatar)
    message.channel.send({ embeds: [avatarEmbed]});
  },
};
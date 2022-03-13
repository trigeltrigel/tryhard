const Levels = require('discord-xp')
const { MessageEmbed } = require('discord.js')
const schema = require('../models/level')

module.exports = {
  name: "add-level",
  aliases: ['alv','adlv','addlv'],
  timeout: "3000",
  description: "Add/Plus Level of a member",
  usage: '[Member] [Amount]',
  userPerms: ['MANAGE_GUILD'],
  category: 'Config',
  async execute(message, args) {
  const data = await schema.findOne({ Guild: message.guild.id })
  if(!data) return message.channel.send({ content: `Leveling System is not enabled`})
    // if(!message.member.hasPermission("MANAGE_GUILD")) return message.channel.send(`You don't have permission to use this command`)
    const member = await message.mentions.members.first() || message.guild.members.cache.get(args[0])
    if(!member) return message.channel.send({ content: `You need to mention the user to add level and the amount of level(s)`})
    const xp = args.slice(1).join(" ")
    if(!xp || !Number(xp)) return message.channel.send({ content: `You must specify Level as a number to add like i said`})
 await Levels.appendLevel(member.id, message.guild.id, xp);
 const user = await Levels.fetch(member.id, message.guild.id);
 const xpRequired = await Levels.xpFor(user.level + 1)
message.channel.send({ embeds: [new MessageEmbed()
  .setTitle(`${member.user.username} 's Rank`)
  .addField(`Info`,[
    `Current Level: ${user.level}`,
    `Current XP: ${user.xp} / ${xpRequired}`
  ])
  .setThumbnail(member.user.displayAvatarURL({ dynamic: true }))
  .setColor("RANDOM")
  .setFooter(`Added ${xp} Level(s) to ${member.user.tag} || Requested by: ${message.author.tag}`)
]
})
  }
}
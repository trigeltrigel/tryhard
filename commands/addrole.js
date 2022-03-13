const { MessageEmbed, DiscordAPIError } = require('discord.js');
module.exports = {
    name : 'role',
    category : 'moderation',
    aliases: ['r'],
    timeout: '4000',
    description : 'Change roles for a member',
    usage: '[Member] [Role]',
    userPerms: 'MANAGE_ROLES',
    category: 'Moderation',

  async execute(message, args) {
      
        if(!message.guild.me.permissions.has("MANAGE_ROLES")) return message.channel.send({ embeds: [new MessageEmbed()
            .setDescription("**I cannot add roles**")
            .setColor("RED")
            .setFooter(
                `Requested by ${message.author.tag}`,
                message.author.displayAvatarURL({ dynamic: true })
              )
        ]})
        const member = await message.mentions.members.first() || message.guild.members.cache.get(args[0])
        const role = await message.guild.roles.cache.find(role => role.name === args[1]) || message.guild.roles.cache.find(role => role.id === args[1]) || message.mentions.roles.first()
        if(!member) return message.channel.send({ embeds: [new MessageEmbed()
            .setDescription(`**Incoorect Usage. Correct Usage \`\ -role @member @role or via name or id\`\` Use This One**`)
            .setColor("RED")
            .setFooter(
                `Requested by ${message.author.tag}`,
                message.author.displayAvatarURL({ dynamic: true })
              )
        ]})
        if(!role) return message.channel.send({ embeds: [new MessageEmbed()
            .setDescription("**The server hasn't had that role.**")
            .setColor("RED")
            .setFooter(
                `Requested by ${message.author.tag}`,
                message.author.displayAvatarURL({ dynamic: true })
              )
        ]})

    if(role.position >= message.member.roles.highest.position) return message.channel.send({ embeds: [new MessageEmbed()
            .setColor("RED")
            .setDescription(`**You cannot add/remove that role. ${role} position is above or equals your highest role position**`)
            .setFooter(
                `Requested by ${message.author.tag}`,
                message.author.displayAvatarURL({ dynamic: true })
              )
    ]})
        if(!member.roles.cache.get(role.id)) {
            member.roles.add(role.id, `TryHard Moderation - Role Command - Action By: ${message.author.tag}`)
            message.channel.send({ embeds: [new MessageEmbed()
                .setColor("GREEN")
                .setDescription(`**Added role ${role} for ${member.user.tag}**`)
                .setFooter(
                    `Requested by ${message.author.tag}`,
                    message.author.displayAvatarURL({ dynamic: true })
                  )
            ]})
        }
        if(member.roles.cache.get(role.id)) {
            member.roles.remove(role.id, `TryHard Moderation - Role Command - Action By: ${message.author.tag}`)
            message.channel.send({ embeds: [new MessageEmbed()
                .setColor("GREEN")
                .setDescription(`**Removed role ${role} for ${member.user.tag}**`)
                .setFooter(
                    `Requested by ${message.author.tag}`,
                    message.author.displayAvatarURL({ dynamic: true })
                  )
            ]})
        }

    }
}
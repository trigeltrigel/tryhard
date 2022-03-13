const { MessageEmbed, DiscordAPIError } = require('discord.js');
const client = require('../index')
const { success , error, PREFIX } = require('../config.json')
const logSchema = require('../models/modlogs')
const prefixSchema = require('../models/prefix')

client.modlogs = async function({ Member, Action, Color, Reason}, message) {
	const data2 = await logSchema.findOne({ Guild: message.guild.id });
	if(!data2) return;
	
	const channel = await message.guild.channels.cache.get(data2.Channel)
	if(!channel) return data2.delete()
	const logsEmbed = new MessageEmbed()
		.setColor(Color)
		.setTitle(`TryHard\'s Moderation`)
		.addField(`Information`, [
			`Action: ${Action}`,
			`Member: ${Member.user.tag} (${Member.id})`,
			`Reason: ${Reason}`,
			`Action By: ${message.author.tag} (${message.author.id})`
		])
		.setThumbnail(Member.user.displayAvatarURL({dynamic: true}))
		.setDescription(`Action Channel: ${message.channel} (${message.channel.id})`)
	channel.send({ embed: [logsEmbed]})
}

client.prefix = async function(message) {
  let custom;

  const data = await prefixSchema.findOne({ Guild : message.guild.id })
  
  if(data) {
      custom = data.Prefix;
  } else {
      custom = PREFIX;
  }
  return custom;
}

module.exports = {
    name : 'ban',
    category : 'moderation',
    aliases: ['b'],
    cooldown: '4000',
    description : 'Bans a member from the server',
    usage: '[Member] [Reason]',
    userPerms: 'BAN_MEMBERS',
    category: 'Moderation',

   async execute(message, args) {
      const prefix = await client.prefix(message)
    if(!message.guild.me.permissions.has("BAN_MEMBERS")) return message.channel.send({ embeds: [new MessageEmbed()
        .setDescription(`**${error} I need \`BAN_MEMBERS\` permission to ban the user**`)
        .setColor("RED")
        .setFooter(
            `Requested by ${message.author.tag}`,
            message.author.displayAvatarURL({ dynamic: true })
          )
    ]})
    
    const member = await message.mentions.members.first() || message.guild.members.cache.get(args[0])
    if(!member) return message.channel.send({ embeds: [new MessageEmbed()
        .setDescription(`**${error} Oops ! You need to mention the user to ban. Like: \`${prefix}ban 155149108183695360 Advertising\`**`)
        .setColor("RED")
        .setFooter(
            `Requested by ${message.author.tag}`,
            message.author.displayAvatarURL({ dynamic: true })
          )
    ]})
    if(member.user.id === message.author.id) return message.channel.send({ embeds: [new MessageEmbed()
        .setDescription(`**Do you want ban yourself?**`)
        .setColor("RED")
        .setFooter(
            `Requested by ${message.author.tag}`,
            message.author.displayAvatarURL({ dynamic: true })
          )
    ]});
    if(member.user.id == message.guild.ownerId) return message.channel.send({ embeds: [new MessageEmbed()
    .setDescription(`${error} are you sure cuz he can only ban you and not you ban him(he is the server owner)...`)
    .setColor('RED')
    .setFooter(`Requested by ${message.author.tag}`, message.author.displayAvatarURL({ dynamic: true }))
    ]})
    const reason = args.slice(1).join(" ") || 'No reason was provided'
    if(!member.bannable) return message.channel.send({ embeds: [new MessageEmbed()
        .setDescription(`**${error} Hmm... Please check my role order and permission before run the ban on this user !**`)
        .setColor("RED")
        .setFooter(
            `Requested by ${message.author.tag}`,
            message.author.displayAvatarURL({ dynamic: true })
          )
    ]})
    if(member.roles.highest.position >= message.member.roles.highest.position) return message.channel.send({ embeds: [new MessageEmbed()
    .setDescription(`**${error} Oops ! ${member.user.tag} is higher than you !**`)
    .setColor("RED")
    .setFooter(
        `Requested by ${message.author.tag}`,
        message.author.displayAvatarURL({ dynamic: true })
      )
    ]})
    try{
        await member.ban({
            reason: `TryHard Moderation - Ban Command - Action By: ${message.author.tag} with reason: ${reason}`
        })
      message.channel.send({ embeds: [new MessageEmbed().setDescription(`**${success} ${member.user.tag} was banned with reason \`${reason}\`**`).setColor("GREEN")]})
    }catch(err){
        console.log(err)
        return message.channel.send({ embeds: [new MessageEmbed()
            .setDescription(`**${error} Oops !! There was an error when I'm trying to ban that user !!**`)
            .setColor("RED")
            .setFooter(
                `Requested by ${message.author.tag}`,
                message.author.displayAvatarURL({ dynamic: true })
              )
        ]})
    }
    client.modlogs({
      Member: member,
      Action: "Ban",
      Color: "RED",
      Reason: reason
    }, message)
    member.send({ embeds: [new MessageEmbed()
            .setDescription(`**CAUTION: YOU WERE BANNED FROM \`${message.guild.name}\` WITH REASON: \`${reason}\`. ACTION BY: \`${message.author.username}#null\`**`)
            .setColor("YELLOW")
            .setFooter(
                `Requested by ${message.author.tag}`,
                message.author.displayAvatarURL({ dynamic: true })
              )
    ]})
  }
    }
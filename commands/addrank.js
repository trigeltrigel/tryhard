const { MessageEmbed, DiscordAPIError } = require('discord.js');
const schema = require('../models/ranks')
module.exports = {
    name : 'set-level-role',
    category : 'Config',
    aliases: ['arr'],
    timeout: '4000',
    description : 'Add a rank',
    userPerms: 'Manage Server',
     
   async execute(message, args) {
        const RoleD = await message.mentions.roles.first() || message.guild.roles.cache.get(args[0]) ; const rank = args.slice(1).join(" ")
        if(!rank, !RoleD) return message.channel.send({ content: `Incorrect Usage.`})
        schema.findOne({ Guild: message.guild.id , Rank: rank }, async(err, data) => {
            if(data) {
                message.channel.send({ content: `That rank is exist. Delete that rank and create new`});
            } else{
                data = new schema({
                    Guild: message.guild.id,
                    Rank: rank,
                    Role: RoleD.id,
                })
                message.reply({ content: `Success ! Created Rank: ${rank} with role: ${RoleD.name}`})
            }
            data.save()
        })
    }
}
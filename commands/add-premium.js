const premiumSchema = require("../models/premium")
const { MessageEmbed } = require("discord.js")

module.exports = {
  name: "add-premium",
  ownerOnly: true,
  category: 'Owner',

  async execute(message, args) {





      const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find(r => r.user.username.toLowerCase() === args[0].toLocaleLowerCase()) || message.guild.members.cache.find(ro => ro.displayName.toLowerCase() === args[0].toLocaleLowerCase());





     //this is how the embed work ok
      if(!member) return message.channel.send({ embeds:
        [new MessageEmbed() 
        .setTitle("PREMIUM") 
        .setDescription(":x: | Please mention a member")
        ]})




        premiumSchema.findOne({User: member.id},async(err, data) => {
          if(data) return message.channel.send({ embeds: 
            [new MessageEmbed()
            .setTitle("PREMIUM")
            .setDescription(`:x: | This user already gained premium features`)
            ]})


                  new premiumSchema({User: member.id}).save()
        return message.channel.send({ embeds:
          [new MessageEmbed()
          .setTitle("PREMIUM")
          .setDescription(`:white_check_mark: | Added premium to : ${member}`)
          ]})
        })
        const sui = new MessageEmbed()
          .setTitle("PREMIUM")
          .setDescription(`Congrats ${member.user.username} You Now Have Premium And Join My [Support Server](https://discord.gg/kmktBR5fAC) And U Will Get The Premium Role`)
          .setFooter(member.user.displayAvatarURL())
    member.send({ embeds: [sui]})
      
  }
}
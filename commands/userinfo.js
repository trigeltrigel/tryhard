const {  MessageEmbed , MessageActionRow, MessageButton} = require("discord.js");
const schema = require('../models/premium')

module.exports = {
    name: "userinfo",
    description: 'Send the info of a mentioned user',
    category: 'Info',
   async execute(message, args) {

        var u = message.mentions.members.first() || message.member 
        var uu = message.guild.members.cache.get(u.id)
        var ee = new MessageActionRow().addComponents(
            new MessageButton()
        .setLabel(`Main info`)
        .setEmoji(`ℹ`)
        .setCustomId(`main`)
        .setDisabled(true)
        .setStyle(`PRIMARY`),
        new MessageButton()
             .setLabel(`Roles info`)
             .setStyle(`PRIMARY`)
             .setEmoji(`ℹ`)
             .setCustomId(`roles`),
             new MessageButton()
             .setLabel(`Permissions`)
             .setStyle(`PRIMARY`)
             .setEmoji(`ℹ`)
             .setCustomId(`permissions`)
        
          ); 
       var e = new MessageEmbed()
       
       .addField(`Name : `,`${u.user.username}`,true)
       .addField(`Id : `,`${u.id}`,true)
       .addField(`User created at : `,`<t:${parseInt(u.user.createdAt / 1000)}:R>`,true)
       .addField(`User joined at : `,`<t:${parseInt(uu.joinedAt / 1000)}:R>`,true)
       .addField(`Nickname : `,`${uu.nickname || `None`}`,true)
       .addField(`Presence : `,`${uu.presence?.status || `offline`}`,true)
       .setColor(`RANDOM`)
       .setThumbnail(`${u.displayAvatarURL({size : 1024 , dynamic : true})}`)
       const data = await schema.findOne({
         User: uu.id,
       })
       if(data){
         e.addField(`Premium : `, `✅`,true)
       } else {
         e.addField(`Premium : `, `⛔`,true)
       }
       const Sendmenu = await message.channel.send({embeds : [e] , components : [ee]})
       var f = i => i.customId === `main` || i.customId === `roles`  && i.u.id === message.author.id
       var c = Sendmenu.createMessageComponentCollector({ f, time: 30000 });
       c.on(`collect`, i => {
           
        if (i.customId === 'main') {
           Sendmenu.edit({embeds : [e] , components : [ee]})
        }
        if(i.customId === `roles`) {
            var eeee = new MessageActionRow().addComponents(
                new MessageButton()
            .setLabel(`Main info`)
            .setEmoji(`ℹ`)
            .setCustomId(`main`)
            .setDisabled(false)
            .setStyle(`PRIMARY`),
            new MessageButton()
                 .setLabel(`Roles info`)
                 .setStyle(`PRIMARY`)
                 .setEmoji(`ℹ`)
                 .setDisabled(true)
                 .setCustomId(`roles`),
                 new MessageButton()
                 .setLabel(`Permissions`)
                 .setStyle(`PRIMARY`)
                 .setEmoji(`ℹ`)
                 .setCustomId(`permissions`)
              ); 
            var eee = new MessageEmbed()
            
          .addField(`Roles : `,`${uu.roles.cache.map(r => r).sort((first, second) => second.position - first.position).join(`, `)}`,true)
          .addField(`Highest role : `,`${uu.roles.highest}`,true)
            .setColor(`RANDOM`)
            .setThumbnail(`${u.displayAvatarURL({size : 1024 , dynamic : true})}`)
           Sendmenu.edit({embeds : [eee] , components : [eeee]})
        }
        if(i.customId === `permissions`) {
            var eeeee = new MessageActionRow().addComponents(
                new MessageButton()
            .setLabel(`Main info`)
            .setEmoji(`ℹ`)
            .setCustomId(`main`)
            .setStyle(`PRIMARY`),
            new MessageButton()
                 .setLabel(`Roles info`)
                 .setStyle(`PRIMARY`)
                 .setEmoji(`ℹ`)
                 .setCustomId(`roles`),
                 new MessageButton()
                 .setLabel(`Permissions`)
                 .setStyle(`PRIMARY`)
                 .setEmoji(`ℹ`)
                 .setDisabled(true)
                 .setCustomId(`permissions`)
              ); 
              var eee2= new MessageEmbed()
              
            .addField(`Permissions : `,`\`\`\`${uu.permissions.toArray().join(` | `)}\`\`\``,true)
              .setColor(`RANDOM`)
              .setThumbnail(`${u.displayAvatarURL({size : 1024 , dynamic : true})}`)
              Sendmenu.edit({embeds : [eee2] , components : [eeeee]})
        }
       })
    }
}
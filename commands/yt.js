 const discord = require('discord.js')
const fetch = require('node-fetch')

module.exports = {
    name: 'yt',
    description: 'start a youtube together activite to watch youtube with your friends',
    category: 'Fun',
    premiumg: true,
   async execute (message, args) {
    let channel = message.member.voice.channel;
    if(!channel) return message.channel.send({ content: "You have to be in a vc" })

    fetch(`https://discord.com/api/v8/channels/${channel.id}/invites`, {
        method: "POST",
        body: JSON.stringify({
            max_age: 86400,
            max_uses: 0,
            target_application_id: "755600276941176913",
            target_type: 2,
            temporary: false,
            validate: null
        }),
        headers: {
            "Authorization": `Bot OTM0NDU2Njg4MzA2NjgzOTI1.YewWmw.CTRx-7J3C8Sm7-EOp9rpj_ZPHRQ`,
            "Content-Type": "application/json"
        }
    })
    
    .then(res => res.json())
    .then(invite => {
        const e = new discord.MessageEmbed()
.setTitle('Welcome to YouTube!')
.setColor('RED')
.setThumbnail('https://media.discordapp.net/attachments/796358841038143488/851878274179399751/youtube.png')
        .setDescription(`\nTo watch youtube [Click me](https://discord.com/invite/${invite.code})`)
.setTimestamp()

let button = new discord.MessageButton()
            .setLabel('Open YouTube!')
            .setStyle('LINK')
            .setURL(`https://discord.com/invite/${invite.code}`)
let eee = new discord.MessageActionRow()
.addComponents(button)
        message.channel.send({
            components: [eee],
            embeds: [e]
        });
    })
}
}
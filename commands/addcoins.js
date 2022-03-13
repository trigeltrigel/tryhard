const { MessageEmbed, Intents } = require("discord.js");
const db = require("quick.db");
const discord = require("discord.js");
require('discord-reply');
const client = new discord.Client({ intents: Intents.FLAGS.GUILDS });

module.exports = {
        name: "addmoney",
        category: "Owner",
        description: "Adds Money To A user",
        aliases: ["addcoins"],
        usage: "add money [mention | ID]",
        ownerOnly: true,
        
    async execute(message, args) {
            
        let user = message.mentions.members.first() || message.guild.members.cache.get(args[0])
        if (!user) return message.channel.send({ content: "**Mention A Valid User!**"})
        if (!args[1]) return message.channel.send({ content: "**Enter A Valid Amount!**"})
        if (isNaN(args[1])) return message.channel.send({ content: `**Your Amount Is Not A Number!**`});
        if (args[1] > 1000000) return message.channel.send({ content: `Cannot Add That Much Amount!\n**Max Adding Amount: 1,000,000`});
        db.add(`money_${user.id}`, args[1])
        let bal = db.fetch(`money_${user.id}`)

        let moneyEmbed = new MessageEmbed()
            .setColor("GREEN")
            .setDescription(`Added **${args[1]}** Coins\n**New Balance: ${bal}**`);
        message.lineReplyNoMention({ embeds: [moneyEmbed]})

    }
}
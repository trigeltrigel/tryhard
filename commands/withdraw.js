const { MessageEmbed } = require("discord.js");
const discord = require("discord.js");
require('discord-reply');
const db = require("quick.db");

module.exports = {
        name: "withdraw",
        aliases: ["with"],
        category: "economy",
        description: "Withdraws Money From Bank",
        usage: "withdraw <amount>",
    
    async execute(message, args) {
        
        let user = message.author;

        let member2 = db.fetch(`bank_${user.id}`)

        if (args.join(' ').toLocaleLowerCase() == 'all') {
            let money = await db.fetch(`bank_${user.id}`)
            let embed = new MessageEmbed()
              .setColor("RED")
              .setDescription(`**You Do Not Have Any Money To Withdraw!**`)
            if (!money) return message.channel.send({ embeds: [embed]})
            db.subtract(`bank_${user.id}`, money)
            db.add(`money_${user.id}`, money)
            let embed5 = new MessageEmbed()
                .setColor("GREEN")
                .setDescription(`You Have Withdrawn **All** Coins From Your Bank`); 
            message.reply({ embeds: [embed5]})

        } else {

            let embed2 = new MessageEmbed() 
                .setColor("RED")
                .setDescription(`Specify An Amount To Withdraw!`);

            if (!args[0]) {
                return message.channel.send({ embeds: [embed2]})
            }
            let embed6 = new MessageEmbed()
                .setColor("RED")
                .setDescription(`Your Amount Is Not A Number!`)
                .setFooter("with all")
            if(isNaN(args[0])) {
                return message.channel.send({ embeds: [embed6]})
            }
           
            let embed4 = new MessageEmbed()
                .setColor("RED")
                .setDescription(`You Don't Have That Much Money In Your Bank!`);

            if (member2 < args[0]) {
                return message.channel.send({ embeds: [embed4]})
            }

            let embed5 = new MessageEmbed()
                .setColor("GREEN")
                .setDescription(`You Have Withdrawn **${args[0]}** Coins From Your Bank!`);

            message.lineReplyNoMention({ embeds: [embed5]})
            db.subtract(`bank_${user.id}`, args[0])
            db.add(`money_${user.id}`, args[0])
        }
    }
}
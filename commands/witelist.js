const { MessageEmbed } = require("discord.js");
const db = require("quick.db");

module.exports = {
        name: "daily",
        category: "economy",
        description: "Gives You 500K Per day",
        usage: "daily",
        
        async execute(message, args) {
    
        let user = message.author;

        let timeout = 86400000;
        let amount = 500000;

        let daily = await db.fetch(`daily_${user.id}`);

        if (daily !== null && timeout - (Date.now() - daily) > 0) {
            let time = ms(timeout - (Date.now() - daily));

            let timeEmbed = new MessageEmbed()
                .setColor("RED")
                .setDescription(`Bro, you already claimed your daily reward dont you?\nCooldown: ${time.hours}h ${time.minutes}m ${time.seconds}s`);
            message.channel.send(timeEmbed)
        } else {
            let moneyEmbed = new MessageEmbed()
                .setColor("GREEN")
                .setDescription(`You recieved ${amount}, as your daily reward!\nCome back in **${time.hours}h ${time.minutes}m ${time.seconds}`)
                .setFooter("https://discord.homes/andrewx")
            message.channel.send(moneyEmbed)
            db.add(`money_${user.id}`, amount)
            db.set(`daily_${user.id}`, Date.now())


        }
    }
}
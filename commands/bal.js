// const db = require('quick.db')
// const Discord = require('discord.js')

// module.exports = {
//   name: 'bal',
//   description: "gets the balance of a user",
// async execute(message, args) {

//     if (db.get(`user_${message.author.id}.bal`) === null) {
//       message.reply(`You need to first create an account using \`${PREFIX}start\``)
//     }

//     else {

//     let bal = db.get(`user_${message.author.id}.bal`)

//     const embed = new Discord.MessageEmbed()
//     .setTitle(`${message.author.username}\'s Balance`)
//     .setDescription(`${bal} coins`)
//     .setColor("GREEN")
//     .setTimestamp()

//     message.channel.send(embed)

//     }

//   }
// }















const { MessageEmbed, Intents } = require("discord.js");
const discord = require("discord.js");
require('discord-reply');
const client = new discord.Client({ intents: Intents.FLAGS.GUILDS });
const db = require("quick.db");

module.exports = {
    name: "balance",
    aliases: ["bal"],
    category: "economy",
    description: "Shows Current Balance",
    usage: "balance [mention | ID]",
    
  async execute(message, args) {
    
    let user =
      message.mentions.members.first() ||
      message.guild.members.cache.get(args[0]) ||
      message.guild.members.cache.find(
        r =>
          r.user.username.toLowerCase() === args.join(" ").toLocaleLowerCase()
      ) ||
      message.guild.members.cache.find(
        r => r.displayName.toLowerCase() === args.join(" ").toLocaleLowerCase()
      ) ||
      message.member;

    let bal = db.fetch(`money_${user.id}`);

    if (bal === null) bal = 0;

    let bank = await db.fetch(`bank_${user.id}`);

    if (bank === null) bank = 0;
    let Total = bal + bank;
    
    if (user) {
      let moneyEmbed = new MessageEmbed()
      .setTitle(`${user.user.username}'s Balance`)
        .setColor("RANDOM")
        .setDescription(
          `**Cash:** ${bal}\n**Bank:** ${bank}\n**Total:** ${Total}`
        );
      message.reply({ embeds: [moneyEmbed]});
    } else {
      return message.lineReply("**Mention A Valid User!**");
    }
  }
};
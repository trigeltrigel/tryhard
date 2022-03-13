const Premium = require('../models/GuildPremium');
const  Discord = require('discord.js');
const moment = require('moment');
var voucher_codes = require('voucher-code-generator');
module.exports = {
        name: 'addcode',
        aliases: [ 'add-premium-code' ],
        description: 'Add a premium code.',
        category: 'Owner',
        ownerOnly: true,

    async execute(message, args) {

      const client = message.client;



const plans = ["month", "year"]
      
if(!args[0]) return message.channel.send({ content: `Provide a Plan!\n${plans.join(" - ")}`})

if(!plans.includes(args[0])) return message.channel.send({ content: `Provide a Plan!\n${plans.join(" - ")}`})

let expiresAt;


if(args[0] === "month"){

expiresAt = Date.now() + 2592000000;


} else if(args[0] === "year"){

expiresAt = Date.now() + (2592000000 * 12);

} 


let amount = args[1];
if(!amount) amount = 1

const array = []
  for (var i = 0; i <  amount; i++) {

      const codePremium = voucher_codes.generate({
    pattern: "####-####-####",
});

const code = codePremium.toString().toUpperCase();


const find = await Premium.findOne({ 
  code: code 
  });

if(!find){

Premium.create({
  code: code,
  expiresAt: expiresAt,
  plan: args[0]
});

array.push(`\`${i + 1}-\` ${code}`)
}
  }

  message.channel.send({ embeds: [new Discord.MessageEmbed()
  .setDescription(`**Generated ${array.length} Premium Code(s)**\n\n${array.join("\n")}\n\n**Type:** ${args[0]}\n**Expires:** ${moment(expiresAt).format("dddd, MMMM Do YYYY")}`)
  ]})
      
    }
}

          function match(msg, i) {
          if (!msg) return undefined;
          if (!i) return undefined;
          let user = i.members.cache.find(
            m =>
              m.user.username.toLowerCase().startsWith(msg) ||
              m.user.username.toLowerCase() === msg ||
              m.user.username.toLowerCase().includes(msg) ||
              m.displayName.toLowerCase().startsWith(msg) ||
              m.displayName.toLowerCase() === msg ||
              m.displayName.toLowerCase().includes(msg)
          );
          if (!user) return undefined;
          return user.user;
        }
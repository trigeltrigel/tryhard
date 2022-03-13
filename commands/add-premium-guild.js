const schema = require("../models/premium-guild")
const { Message, MessageEmbed } = require("discord.js")
const client = require('../index')
const day = require('dayjs');
module.exports = {
  name: "add-premium-guild",
  ownerOnly: true,
  category: 'Owner',
/**
 * @param {String[]} args
 * @param {Message} message
 */
  async execute(message, args) {
if(!args[0])return message.reply({ content: 'specify a guild id'})
if(!message.client.guilds.cache.has(args[0]))
return message.reply({ content: 'i am not in this guild'})

schema.findOne({ Guild: args[0] }, async (err, data) => {
  if(data) data.delete();

  if(args[1]){
    const Expire = day(args[1]).valueOf()
 new schema({
 Guild: args[0],
 Expire,
 Permanent: false,
 }).save();
  } else {
 new schema({
   Guild: args[0],
   Expire: 0,
   Permanent: true,
 }).save();
  }
  message.reply({ content: 'Saved Data'})
})
  }
}
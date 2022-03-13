const schema = require('../models/level')

module.exports = {
  name: 'disable-leveling',
  aliases: ['dlv'],
  description: "Disable Leveling Module",
  timeout: '3000',
  category: 'Config',
  userPerms: ['MANAGE_SERVER'],
  async execute(message, args) {
    schema.findOne({ Guild: message.guild.id }, async(err, data) => {
      if(data) {
        await data.delete()
        message.channel.send({ content: `Disabled Leveling System`})
      } else {
        message.channel.send({ content: `Leveling System is disabled already`})
      }
    })
  }
}
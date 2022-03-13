const discord = require('discord.js')

module.exports = {
  name: 'report-bug',
  description: 'send/report a bug to the owners',
async execute(message, args) {
  const bug = args[0]
  if(!bug)return message.reply({ content: 'Please secify a bug to report' })
  const channelToSend = message.client.channels.cache.get('946784267474731048')
  const embed = new discord.MessageEmbed()
  .setTitle('NEW BUG FOUND')
  .setThumbnail(`${message.member.displayAvatarURL()}`)
  .addField(`BUG:`, `${bug}`, true)
  .setFooter(`sent by: ${message.member.user.tag}(${message.member.id})`)
 channelToSend.send({ embeds: [embed] })
  message.reply({ content: `Your bug: ${bug} has been sent to the team. Thank you` })
}
}
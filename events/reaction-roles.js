const client = require('../index')
const reactionSchema = require('../models/reaction-roles')
client.on("messageReactionAdd", async(messageReaction, user) => {
  const { message , emoji } = messageReaction;
  if(client.user.id == user.id) return;
  await reactionSchema.findOne({
    Guild: message.guild.id,
    Channel: message.channel.id,
    Message: message.id,
    Emoji: emoji
  }, async(err, data) => {
    if(!data) return
    const role = await message.guild.roles.cache.get(data.Role)
    if(!role) return data.delete()
    const member = await message.guild.members.cache.get(user.id)
    await member.roles.add(role.id)
    await member.send(new MessageEmbed().setTitle(`Role Added`).setColor("GREEN").setDescription(`You were given role 
    \`${role.name}\` by reacted ${emoji}`))
  })
})


client.on("messageReactionRemove", async(messageReaction, user) => {
  const { message , emoji } = messageReaction;
  if(client.user.id == user.id) return;
  await reactionSchema.findOne({
    Guild: message.guild.id,
    Channel: message.channel.id,
    Message: message.id,
    Emoji: emoji
  }, async(err, data) => {
    if(!data) return
    const role = await message.guild.roles.cache.get(data.Role)
    if(!role) return data.delete()
    const member = await message.guild.members.cache.get(user.id)
    await member.roles.remove(role)
    await member.send(new MessageEmbed().setTitle(`Role Removed`).setColor("RED").setDescription(`You were lost role 
    \`${role.name}\` by unreacted ${emoji}`))
  })
})
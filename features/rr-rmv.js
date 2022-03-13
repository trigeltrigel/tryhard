const Schema = require('../schemas/reactions');
const Discord = require('discord.js');

module.exports = {
	name: 'messageReactionRemove',
	once: false,
	async execute(reaction, user) {
		
		if (reaction.message.partial) await reaction.message.fetch();
		if (reaction.partial) await reaction.fetch();
		if (user.bot) return;
    const { guild } = reaction.message;
    if (!guild) return;
    if (!guild.me.permissions.has("MANAGE_ROLES")) return;
    
		isEmoji = function(emoji) {
      const e = Discord.Util.parseEmoji(emoji);

      if (e.id === null) {
        return {
          name: e.name,
          id: e.id,
          animated: e.animated,
          response: false
        }
      } else {
        return {
          name: e.name,
          id: e.id,
          animated: e.animated,
          response: true
        }
      }
    }
    
    const member = guild.members.cache.get(user.id);
    if (!member) return;
    
    await Schema.findOne({
    	guild_id: guild.id,
    	msg_id: reaction.message.id
    }, async (err, db) => {
    	if (!db) return;
    	if (reaction.message.id != db.msg_id) return;
    	
    	const data = db.rcs;
    	
    	for (let i in data) {
    		if (reaction.emoji.id === null) {
    			if (reaction.emoji.name === data[i].emoji) {
    				member.roles.remove(data[i].roleId, ['reaction role']).catch(err => console.log(err));
    			}
    		} else {
    			if (reaction.emoji.id === data[i].emoji) {
    				member.roles.remove(data[i].roleId, ['reaction role']).catch(err => console.log(err));
    			}
    	 }
      }
    });
	},
};
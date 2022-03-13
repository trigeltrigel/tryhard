const discord = require('discord.js')
const { owners_id } = require('../owners.js')
const { client } = require('../client')
const schema = require('../models/premium')
const hunter = require('../models/bugHunter')
const db = require("quick.db");
const Levels = require('discord-xp')
const leveling = require('../models/level')
module.exports = {
  name: 'profile',
  description: 'show the user\'s profile of the bot and not discord',
  async execute(message, args) {
    const member = await message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member
  
    const embed = new discord.MessageEmbed()
.setThumbnail(`${member.displayAvatarURL()}`)
      .setTitle(`${member.user.username}\'s Profile`)
let badge = [];
  if(owners_id.includes(member.id)){
    badge.push('<:early_verified_bot_developer:946060207249829919>')
   
  }
    const premium = await schema.findOne({
      User: member.id
    })
    if(premium){
      badge.push('👑')
    }

   const guild = await client.guilds.cache.get('731900308808269874') 

    const userGuild = await guild.members.cache.get(member.id)

    if(userGuild){
    
if(userGuild.roles.cache.get('830396964130390037')){
       badge.push('<:Moderator:946078887081828372>')
    }
    }

      
    let bal = await db.fetch(`money_${member.id}`)

    if (bal === null) bal = 0;

    let bank = await db.fetch(`bank_${member.id}`);

    if (bank === null) bank = 0;
    let Total = bal + bank; 

    const bugHunter = await hunter.findOne({
      User: member.id,
    })
    if(bugHunter){
      badge.push('<:bug_hunter_2:946078669691056238>')
    }
    const levelThing = await leveling.findOne({
      Guild: message.guild.id,
    })
    
   let lEvel = [] 
    let LEVELL = []
    let XP = []
     if(!levelThing){
      lEvel.push('Leveling System Is Disabled!')
    } else {
        const user = await Levels.fetch(member.id, message.guild.id, true);
       if(!user){
         LEVELL.push('No Level Yet')
         XP.push('No Xp Yet')
       } else {
LEVELL.push(user.level || 0)
         XP.push(user.xp || 0)
       lEvel.push(`level: ${LEVELL} \n xp: ${XP} `)
       }
    }
    const user = embed.addField(`USER:`,`\`\`\`${member.user.tag}\`\`\` \`\`\`${member.id}\`\`\``,true)
    const badges = embed.addField(`Badges:`,`${badge.join('') || 'No Badges'}`)
    const meaing = embed.addField('Badges Meaning:',`<:early_verified_bot_developer:946060207249829919> = the bot developer/owner \n 👑 = premium user \n <:bug_hunter_2:946078669691056238> = bug hunter (who found a bug in the bot) \n <:Moderator:946078887081828372> = staff in the support server`,true)
    const economy = embed.addField('Economy:',`Wallet: ${bal} \n Bank: ${bank} \n Total: ${Total}`)
    const LEVELSSS = embed.addField('Leveling:', `${lEvel || 'No Level Or Xp In My Data'}`)
    message.reply({ embeds: [embed]})
  }  
} 

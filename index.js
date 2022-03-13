/**
 * Module Imports
 */
const { Client, Collection, MessageEmbed, Discord, Intents } = require("discord.js");
const { client } = require('./client')
const {
    inspect
} = require("util")
const antilink = require('./banall')
const GuildBlacklist = require('./models/GuildBlackList')
const { owners_id } = require('./owners')
//require('./commands/profile.js')(owners_id)
const errChannel = "884150735376355328"
const dbots = require("discord.dbl");
const dbl = new dbots("MkGboHDwRCfKPGSnkmTyCWDP", client, { autoPost: 900001, auth: "ehh" });
const reactionRoles = require('./models/reaction-roles') 
const antiPingSchema = require('./models/anti-ping');
const blacklist = require('./models/blacklist')
const WelcomeSchema = require('./models/welcome')
const premiumSchema = require('./models/premium')
const premiumGuild = require('./models/premium-guild')
const prefixschema = require('./models/prefix')
const RoleSchema = require('./models/autorole');
const kickSchema = require('./models/kicks');
const levelSchema = require('./models/level')
const logSchema = require('./models/modlogs');
const logSchema2 = require('./models/log')
const embedSchema = require('./models/embeds')
const serverInvites = new Map();
const Levels = require('discord-xp')
const Database = require("@replit/database");
const prefixes = new Database();
const mongoose = require('mongoose')
const { readdirSync } = require("fs");
const fs = require ("fs");
const { join } = require("path");
const { TOKEN, PREFIX, LOCALE } = require("./util/EvobotUtil");
const path = require("path");
const i18n = require("i18n");
const { CanvasSenpai } = require("canvas-senpai")
const canva = new CanvasSenpai();
const db = require('quick.db')
const config = require('./config.json')
const chalk = require('chalk')
const colors = require('./colors.json')
const Enmap = require('enmap')
const antispam = require('./models/anti-spam')
const autoroleSchema = require('./models/autorole')
const hunter = require('./models/bugHunter')
let getPrefix = '';
Levels.setURL(config.mongoDB);

//['profile'].forEach(handler => {
    //require(`./commands/${handler}`)(owners_id, client)
//});

mongoose
	.connect(
		config.mongoDB,
		{
			useUnifiedTopology: true,
			useNewUrlParser: true
		})
client.commands = new Collection();
client.prefix = 
client.queue = new Map();
const cooldowns = new Collection();
const escapeRegex = (str) => str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
i18n.configure({
  locales: ["ar", "de", "en", "es", "fr", "it", "ko", "nl", "pl", "pt_br", "ru", "sv", "tr", "zh_cn", "zh_tw"],
  directory: path.join(__dirname, "locales"),
  defaultLocale: "en",
  objectNotation: true,
  register: global,

  logWarnFn: function (msg) {
    console.log("warn", msg);
  },

  logErrorFn: function (msg) {
    console.log("error", msg);
  },

  missingKeyFn: function (locale, value) {
    return value;
  },

  mustacheConfig: {
    tags: ["{{", "}}"],
    disable: false
  }
});



/**
 * Client Events
 */
client.on('debug', console.log)


client.on("ready", async () => {
    // Presence
    setInterval(() => {
        client.user.setPresence({
            activities: [{
                name: `${client.guilds.cache.size} Servers!`, // Status will show how many server the bot is in
                type: 'WATCHING' // You change it to "STREAMING" or "PLAYING" or "LISTENING"
            }],
            status: 'online' // Bot status
        });
    }, 60000)

    console.clear();
    console.log("")
    console.log(chalk.red.bold("——————————[Basic Info]——————————"))
    console.log(
        chalk.white(`${client.guilds.cache.reduce((a, b) => a + b.memberCount, 0) > 1 ? "Users:" : "User:"}`),
        chalk.red(`${client.guilds.cache.reduce((a, b) => a + b.memberCount, 0)}`),
        chalk.white("||"),
        chalk.white(`${client.guilds.cache.size > 1 ? "Servers:" : "Server:"}`),
        chalk.red(`${client.guilds.cache.size}`),
    )
    console.log(
        chalk.white(`Prefix:` + chalk.red(` ${getPrefix}`) + chalk.white(' & ') + chalk.red(' /')),
        chalk.white("||"),
        chalk.white(`Slash Commands:`),
        chalk.red(`none`),
        chalk.white("& Message Commands:"),
        chalk.red(`${client.commands.size}`),
    )
    console.log(
        chalk.white("Total Commands:"),
        chalk.red(`${client.commands.size}`),
    )

    console.log("")
    console.log(chalk.red.bold("——————————[Statistics]——————————"))
    console.log(
        chalk.white(`Running on Node`),
        chalk.green(process.version),
        chalk.white('on'),
        chalk.green(`${process.platform} ${process.arch}`)
    )
    console.log(
        chalk.white('Memory:'),
        chalk.green(`${(process.memoryUsage().rss / 1024 / 1024).toFixed(2)}`),
        chalk.white('MB')
    )
    console.log(
        chalk.white('RSS:'),
        chalk.green(`${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)}`),
        chalk.white('MB')
    )
    console.log("")
    console.log(chalk.red.bold("——————————[Connections]——————————"))
    console.log(chalk.white("✅ Successfully Connected To"), chalk.red(`${client.user.tag}`), chalk.white('('), chalk.green(client.user.id), chalk.white(')'))
    mongoose.connect(config.mongoDB,
		{
			useUnifiedTopology: true,
			useNewUrlParser: true
		}).then(console.log(chalk.white("✅ Successfully Connected To"), chalk.red(`Mongoose Data Base`)))
          })


/**
 * Import all commands
 */

const commandFiles = readdirSync(join(__dirname, "commands")).filter((file) => file.endsWith(".js"));
for (const file of commandFiles) {
  const command = require(join(__dirname, "commands", `${file}`));
  client.commands.set(command.name, command);
}

client.on('guildCreate', async guild => {
  const botOwner = await client.users.cache.get('903955199469695037')
  if(!botOwner) return;
const owner = await guild.fetchOwner()
  
  const embed = new MessageEmbed()
			.setTitle(`Added To New Server`)
			.setThumbnail(`${guild.iconURL({ dynamic: true })}`)
			.addField(`Guild`, `${guild.name + ' / ' + guild.id}`)
			.setColor('GREEN')
			.addField(`Members`, `${guild.memberCount}`)
			.addField(`Humans`, `${guild.members.cache.filter(u => !u.user.bot).size}`)
			.addField(`Bots`, `${guild.members.cache.filter(u => u.user.bot).size}`)
			.addField(`Owner`, `${owner.user.tag + '/' + owner.user.id}`)
			.addField(
				`Created`,`
				${new Date(guild.createdTimestamp).toLocaleDateString()
}`)
  
  
if(!guild.vanityURLCode){
embed.addField(`VanityURL`,'No vanityURL') 
} else {
  embed.addField(`VanityURL`, `discord.gg/${guild.vanityURLCode}`)
    }
  await botOwner.send({ embeds: 
 [embed]   });      
  })
  client.on('guildMemberAdd', async(member) => {
if(member.guild.id === '731900308808269874'){
  const data = await hunter.findOne({
    User: member.id,
  })
  if(data){
member.roles.add('946838092759846932')
  }  
  const datA = await premiumSchema.findOne({
    User: member.id
  })
    if(datA){      
      
member.roles.add('921730521837477888')
    }
  
}
})
client.on('messageCreate', async message => {
if(message.guild.id !== '731900308808269874') {
  return
 } else {
  const data = await premiumSchema.findOne({
    User: message.member.id
  })
    if(data){      
      
message.member.roles.add('921730521837477888')
    } else {
      message.member.roles.remove('921730521837477888')
    }
}
  })


client.on('messageCreate', async(message) => {
  if(message.author.bot) return
levelSchema.findOne({ Guild: message.guild.id },async(err, data) => {
      if(!data) return;
      const randomAmountOfXp = Math.floor(Math.random() * 9) + 1; // Min 1, Max 10
    const hasLeveledUp = await Levels.appendXp(message.author.id, message.guild.id, randomAmountOfXp);
    if (hasLeveledUp) {
    const user = await Levels.fetch(message.author.id, message.guild.id);
    if(data.Channel){
      const channel = await message.guild.channels.cache.get(data.Channel)
      channel.send({ content: `Congrats ! ${message.author}, You just leveled up to **${user.level}** :tada:`});
    } else {
    message.channel.send({ content: `Congrats ! ${message.author}, You just leveled up to **${user.level}** :tada:`});
    }
    }
    })
})

client.on("messageCreate", async (message) => {

  const data = await prefixschema.findOne({ Guild: message.guild.id });

	if (data) {
		getPrefix = data.Prefix;
	} else {
		getPrefix = PREFIX;
  }

  client.user.setActivity(`mention to know my prefix and ${client.guilds.cache.size} guilds ${client.users.cache.size} users`);
  
if(message.content.includes(`<@!${client.user.id}>`)){
  message.channel.send({ embeds: [new MessageEmbed().setTitle('NEED HELP?').setThumbnail(message.author.displayAvatarURL()).setDescription(`Hey my prefix is ${getPrefix}, use ${getPrefix}prefix set  (prefix) to set a custome prefix`)]})
}


  if(message.content.includes(`<@${client.user.id}>`)){
  message.channel.send({ embeds: [new MessageEmbed().setTitle('NEED HELP?').setThumbnail(message.author.displayAvatarURL()).setDescription(`Hey my prefix is ${getPrefix}, use ${getPrefix}prefix set (prefix) to set a custome prefix`)]})
  }
antispam.findOne({
  Guild: message.guild.id
}, async(err, data) => {
  if(data){
      if(message.content.includes('https')){
     message.delete()
     message.channel.send(`<@!${message.member.id}> anti-link is on`)
   }
  } else {
    return
  }
})
   //   if(message.content.includes('https')){
   //   message.delete()
   //   message.channel.send(`<@!${message.member.id}> anti-link is on`)
   // }

if(!message.content.startsWith(getPrefix))return
    GuildBlacklist.findOne({
      guildId: message.guild.id,
    }, async(err, data) => {
      if(err) throw err;
      if(!data){
 blacklist.findOne({ id : message.author.id }, async(err, data) => {
        if(err) throw err;
        if(!data) {

  if (message.author.bot) return;
  if (message.channel.type === "DM") {
message.reply({ content: 'Sorry my commands only work in server!'})
}

  const prefixRegex = new RegExp(`^(<@!${client.user.id}>|${escapeRegex(getPrefix)})\\s*`);
  if (!prefixRegex.test(message.content)) return;

  const [, matchedPrefix] = message.content.match(prefixRegex);

  const args = message.content.slice(matchedPrefix.length).trim().split(/ +/);
  const commandName = args.shift().toLowerCase();

  const command =
    client.commands.get(commandName) ||
    client.commands.find((cmd) => cmd.aliases && cmd.aliases.includes(commandName));

  if (!command) return;

  if (!cooldowns.has(command.name)) {
    cooldowns.set(command.name, new Collection());
  }

 if(!message.member.permissions.has(command.userPerms || [] ))return message.channel.send({ embeds: [new MessageEmbed()
 .setTitle('ERROR')
 .setDescription(`you need ${command.userPerms} to use ${command.name}`)
 .setThumbnail(message.author.displayAvatarURL())
 .setColor(message.member.displayColor)]})
if(command.ownerOnly){
  const notowner = new MessageEmbed()
.setDescription("You can't use this command!")
.setColor("RED")
  if (!owners_id.includes(message.author.id))
     return message.channel.send({ embeds: [notowner]});
}
if(command.premium && !await premiumSchema.findOne({ User: message.author.id })) return message.reply({ content: 'Sorry this command is for premium users only'})
if(command.premiumg){
  premiumGuild.findOne({ Guild: message.guild.id }, async (err, data) => {
    if(!data) return message.channel.send({ conetnt: 'This is a server premium command only'})
    if(!data.Permanent && Date.now() > data.Expire) {
      data.delete()
    return message.reply({ content: 'The premium date is expired'})
    }

  const now = Date.now();
  const timestamps = cooldowns.get(command.name);
  const cooldownAmount = (command.cooldown || 1) * 1000;

  if (timestamps.has(message.author.id)) {
    const expirationTime = timestamps.get(message.author.id) + cooldownAmount;

    if (now < expirationTime) {
      const timeLeft = (expirationTime - now) / 1000;
      return message.reply(
        i18n.__mf("common.cooldownMessage", { time: timeLeft.toFixed(1), name: command.name })
      );
    }
  }

  timestamps.set(message.author.id, now);
  setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);

  try {
    command.execute(message, args).then(
    console.log(`${message.author.tag} used ${command.name} in ${message.guild.name}(${message.guild.id})(${message.channel.id})`))
 client.channels.cache.get(errChannel).send({ content: `${message.author.tag} used ${command.name} in ${message.guild.name}(${message.guild.id})(${message.channel.id})` })
  } catch (error) {
    console.error(error);
    message.reply(i18n.__("common.errorCommand")).catch(console.error);
  
  }
  })

        } else 
 command.execute(message, args).then(
    console.log(`${message.author.tag} used ${command.name} in ${message.guild.name}(${message.guild.id})(${message.channel.id})`))
 client.channels.cache.get(errChannel).send({ content: `${message.author.tag} used ${command.name} in ${message.guild.name}(${message.guild.id})(${message.channel.id})` })
        } else {
            message.channel.send({ content: 'You are blacklisted!'})
        }
 })
   } else {
        message.reply({ content: `${message.guild.name} is blacklisted` })
   }
      })
})

        
client.modlogs = async function({ Member, Action, Color, Reason}, message) {
	const data = await logSchema.findOne({ Guild: message.guild.id });
	if(!data) return;
	
	const channel = await message.guild.channels.cache.get(data.Channel)
	if(!channel) return data.delete()
	const logsEmbed = new MessageEmbed()
		.setColor(Color)
		.setTitle(`TryHard Moderation`)
		.addField(`Information`, [
			`Action: ${Action}`,
			`Member: ${Member.user.tag} (${Member.id})`,
			`Reason: ${Reason}`,
			`Action By: ${message.author.tag} (${message.author.id})`
		])
		.setThumbnail(Member.user.displayAvatarURL({dynamic: true}))
		.setDescription(`Action Channel: ${message.channel} (${message.channel.id})`)
	channel.send({ embeds: [logsEmbed]})
}
client.on('messageDelete', async message => {
	logSchema.findOne({ Guild: message.guild.id }, async (err, data) => {
		if (err) throw err;
		if (!data) return;
		if (data) {
			const log = await message.guild.channels.cache.get(data.Channel);
			if (!log) {
				await logSchema.findOneAndDelete({ Guild: message.guild.id });
				console.log(`Delete Log For Guild: ${message.guild.id}`);
			} else {
				log
					.send({ embeds:		[new MessageEmbed()
							.setTitle(`Message Deleted`)
							.setColor('RED')
							.addField(`Content`, `${message.content}`)
							.addField(`Author`, `${message.author}`)
							.addField(`Channel`, `${message.channel}`)
							.setTimestamp()
					]})
			}
		}
  });

client.on('channelDelete', async channel => {
	logSchema.findOne({ Guild: channel.guild.id }, async (err, data) => {
		if (err) throw err;
		if (!data) return;
		if (data) {
			const log = await channel.guild.channels.cache.get(data.Channel);
			if (!log) {
				await logSchema.findOneAndDelete({ Guild: channel.guild.id });
				console.log(`Delete Log For Guild: ${channel.guild.id}`);
			} else {
				log
					.send({ embeds: 
						[new MessageEmbed()
							.setTitle(`Channel Deleted`)
							.setColor('RED')
							.addField(`Channel`, `${channel.name}`)
							.addField(`Position`, `${channel.position}`)
							.addField(`Category`, `${channel.parent ? null : `No Category`}`)
							.setTimestamp()
					]})
					.catch(err => {
						cnsole.log(`I cannot send message to logs channel`);
					});
			}
		}
	});
});

client.on('roleCreate', async channel => {
	logSchema.findOne({ Guild: channel.guild.id }, async (err, data) => {
		if (err) throw err;
		if (!data) return;
		if (data) {
			const log = await channel.guild.channels.cache.get(data.Channel);
			if (!log) {
				await logSchema.findOneAndDelete({ Guild: channel.guild.id });
				console.log(`Delete Log For Guild: ${channel.guild.id}`);
			} else {
				log
					.send({ embeds:
						[new MessageEmbed()
							.setTitle(`Role Created`)
							.setColor('GREEN')
							.addField(`Role`, `${channel}`)
							.addField(`Position`, `${channel.position}`)
							.addField(`ID`, `${channel.id}`)
							.setTimestamp()
					]})
					.catch(err => {
						cnsole.log(`I cannot send message to logs channel`);
					});
			}
		}
	});
});

client.on('roleDelete', async channel => {
	logSchema.findOne({ Guild: channel.guild.id }, async (err, data) => {
		if (err) throw err;
		if (!data) return;
		if (data) {
			const log = await channel.guild.channels.cache.get(data.Channel);
			if (!log) {
				await logSchema.findOneAndDelete({ Guild: channel.guild.id });
				console.log(`Delete Log For Guild: ${channel.guild.id}`);
			} else {
				log
					.send({ embeds: 
						[new MessageEmbed()
							.setTitle(`Role Deleted`)
							.setColor('GREEN')
							.addField(`Role`, `${channel.name}`)
							.addField(`Position`, `${channel.position}`)
							.addField(`ID`, `${channel.id}`)
							.setTimestamp()
					]})
					.catch(err => {
						cnsole.log(`I cannot send message to logs channel`);
					});
			}
		}
	});
});

client.on('channelCreate', async channel => {
	logSchema.findOne({ Guild: channel.guild.id }, async (err, data) => {
		if (err) throw err;
		if (!data) return;
		if (data) {
			const log = await channel.guild.channels.cache.get(data.Channel);
			if (!log) {
				await logSchema.findOneAndDelete({ Guild: channel.guild.id });
				console.log(`Delete Log For Guild: ${channel.guild.id}`);
			} else {
				log
					.send({ embeds:
						[new MessageEmbed()
							.setTitle(`Channel Created`)
							.setColor('GREEN')
							.addField(`Channel`, `${channel.name}`)
							.addField(`Position`, `${channel.position}`)
							.addField(`Category`, `${channel.parent ? null : `No Category`}`)
							.setTimestamp()
					]})
					.catch(err => {
						console.log(`I cannot send message to logs channel`);
					});
			}
		}
	});
});

client.on('channelUpdate', async (oldChannel, newChannel) => {
	logSchema.findOne({ Guild: oldChannel.guild.id }, async (err, data) => {
		if (err) throw err;
		if (!data) return;
		if (data) {
			const log = await oldChannel.guild.channels.cache.get(data.Channel);
			if (!log) {
				await logSchema.findOneAndDelete({ Guild: oldChannel.guild.id });
				console.log(`Delete Log For Guild: ${oldChannel.guild.id}`);
			} else {
				if (oldChannel.topic !== newChannel.topic) {
					log.send({ embeds:
						[new MessageEmbed()
							.setTitle(`Channel Topic Updated`)
							.addField(`Channel`, `${oldChannel}`)
							.addField(`Old Topic`, `${oldChannel.topic}`)
							.addField(`New Topic`, `${newChannel.topic}`)
							.setColor('YELLOW')
							.setTimestamp()
					]});
				} else if (oldChannel.name !== newChannel.name) {
					log.send({ embeds:
						[new MessageEmbed()
							.setTitle(`Channel Name Updated`)
							.addField(`Channel`, `${oldChannel}`)
							.addField(`Old Name`, `${oldChannel.name}`)
							.addField(`New Name`, `${newChannel.name}`)
							.setColor('YELLOW')
							.setTimestamp()
					]});
				} else if (oldChannel.parent !== newChannel.parent) {
					log.send({ embeds:
						[new MessageEmbed()
							.setTitle(`Channel Category Updated`)
							.addField(`Channel`, `${oldChannel}`)
							.addField(`Old Category`, `${oldChannel.parent}`)
							.addField(`New Category`, `${newChannel.parent}`)
							.setColor('YELLOW')
							.setTimestamp()
					]});
				} else if (
					oldChannel.rateLimitPerUser !== newChannel.rateLimitPerUser
				) {
					log.send({ embeds:
						[new MessageEmbed()
							.setTitle(`Channel Slowmode Updated`)
							.addField(`Channel`, `${oldChannel}`)
							.addField(
								`Old Slowmode`,
								`${oldChannel.rateLimitPerUser}` + ` seconds`
							)
							.addField(
								`New Slowmode`,
								`${newChannel.rateLimitPerUser}` + ` seconds`
							)
							.setColor('YELLOW')
							.setTimestamp()
					]});
				}
			}
		}
	});
});

client.on('messageUpdate', async (oldMessage, newMessage) => {
	logSchema.findOne({ Guild: oldMessage.guild.id }, async (err, data) => {
		if (err) throw err;
		if (!data) return;
		if (data) {
			const log = await oldMessage.guild.channels.cache.get(data.Channel);
			if (!log) {
				await logSchema.findOneAndDelete({ Guild: oldMessage.guild.id });
				console.log(`Delete Log For Guild: ${oldMessage.guild.id}`);
			} else {
				log
					.send({ embeds:
						[new MessageEmbed()
							.setTitle(`Message Updated`)
							.setColor('YELLOW')
							.addField(`Old Content`, `${oldMessage.content}`)
							.addField(`New Content`, `${newMessage.content}`)
							.addField(`Author`, `${oldMessage.author}`)
							.addField(`Channel`, `${oldMessage.channel}`)
							.setTimestamp()
					]})
					.catch(err => {
						cnsole.log(`I cannot send message to logs channel`);
					});
			}
		}
	});

client.on('roleUpdate', async (oldRole, newRole) => {
	logSchema.findOne({ Guild: oldRole.guild.id }, async (err, data) => {
		if (err) throw err;
		if (!data) return;
		if (data) {
			const log = await oldRole.guild.channels.cache.get(data.Channel);
			if (!log) {
				await logSchema.findOneAndDelete({ Guild: oldRole.guild.id });
				console.log(`Delete Log For Guild: ${oldRole.guild.id}`);
			} else {
				if (oldRole.name !== newRole.name) {
					log.send({ embeds:
						[new MessageEmbed()
							.setTitle(`Role Name Updated`)
							.addField(`Role`, `${oldRole}`)
							.addField(`Old Name`, `${oldRole.name}`)
							.addField(`New Name`, `${newRole.name}`)
							.setColor('YELLOW')
							.setTimestamp()
					]});
				} else if (oldRole.color !== newRole.color) {
					log.send({ embeds:
						[new MessageEmbed()
							.setTitle(`Role Color Updated`)
							.addField(`Role`, `${oldRole}`)
							.addField(`Old Color`, `${oldRole.color}`)
							.addField(`New Color`, `${newRole.color}`)
							.setColor('YELLOW')
							.setTimestamp()
					]});
				}
			}
		}
	});
});

client.on('guildMemberUpdate', async (oldMember, newMember) => {
	logSchema.findOne({ Guild: oldMember.guild.id }, async (err, data) => {
		if (err) throw err;
		if (!data) return;
		if (data) {
			const log = await oldMember.guild.channels.cache.get(data.Channel);
			if (!log) {
				await logSchema.findOneAndDelete({ Guild: oldMember.guild.id });
				console.log(`Delete Log For Guild: ${oldMember.guild.id}`);
			}
			if (oldMember.user.tag !== newMember.user.tag) {
				log.send({ embeds:
					[new MessageEmbed()
						.setTitle(`Member Updated`)
						.addField(`Member`, `${oldMember}`)
						.addField(`Old Username`, `${oldMember.user.tag}`)
						.addField(`New Username`, `${newMember.user.tag}`)
						.setColor('YELLOW')
						.setTimestamp()
      ]});
       } else if (oldMember.roles.cache.size !== newMember.roles.cache.size) {
				log.send({ embeds:
					[new MessageEmbed()
						.setTitle(`Member Role Changed`)
						.addField(`Member`, `${oldMember}`)
						.addField(
							`Before`,
							`${oldMember.roles.cache.map(role => role.toString()).join(' , ')
						}`)
						.addField(
							`After`,
							`${newMember.roles.cache.map(role => role.toString()).join(' , ')
						}`)
						.setColor('YELLOW')
						.setTimestamp()
				]});
			}
		}
})	  
})
})
})

const reactionSchema = require('./models/reaction-roles')
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
    await member.send({ embeds: [new MessageEmbed().setTitle(`Role Added`).setColor("GREEN").setDescription(`You were given role 
    \`${role.name}\` by reacted ${emoji}`)]})
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
    await member.send({ embeds: [new MessageEmbed().setTitle(`Role Removed`).setColor("RED").setDescription(`You were lost role 
    \`${role.name}\` by unreacted ${emoji}`)]})
  })
})

client.on('guildBanAdd', async (guild, user) => {
	logSchema.findOne({ Guild: guild.id }, async (err, data) => {
		if (err) throw err;
		if (!data) return;
		if (data) {
			const log = await guild.channels.cache.get(data.Channel);
			if (!log) {
				await logSchema.findOneAndDelete({ Guild: guild.id });
				console.log(`Delete Log For Guild: ${guild.id}`);
			} else {
				log.send({ embeds:
					[new MessageEmbed()
						.setDescription(`**<@${user.id}> was banned**`)
						.setTimestamp()
						.setThumbnail(user.displayAvatarURL({ dynamic: true }))
						.setColor('RED')
				]});
			}
		}
	})
});

client.on('guildBanRemove', async (guild, user) => {
	logSchema.findOne({ Guild: guild.id }, async (err, data) => {
		if (err) throw err;
		if (!data) return;
		if (data) {
			const log = await guild.channels.cache.get(data.Channel);
			if (!log) {
				await logSchema.findOneAndDelete({ Guild: guild.id });
				console.log(`Delete Log For Guild: ${guild.id}`);
			} else {
				log.send({ embeds: 
					[new MessageEmbed()
						.setDescription(`**<@${user.id}> was unbanned**`)
						.setTimestamp()
						.setThumbnail(user.displayAvatarURL({ dynamic: true }))
						.setColor('GREEN')
				]});
			}
		}
	});
});

client.on('error', err => {
    const a = client.channels.cache.get(errChannel)
    console.log(
        chalk.yellow('——————————[ERROR]——————————\n') + err
    )
    const ErrorEmbed = new MessageEmbed()
        .setTitle('Error')
        .setURL('https://discordjs.guide/popular-topics/errors.html#api-errors')
        .setColor('#2F3136')
        .setDescription(`\`\`\`${inspect(error, {depth: 0})}\`\`\``)
        
        .setTimestamp()
    return a.send({
        embeds: [ErrorEmbed]
    })
});
process.on("unhandledRejection", (reason, p) => {
    const b = client.channels.cache.get(errChannel)
    console.log(
        chalk.yellow('——————————[Unhandled Rejection/Catch]——————————\n'),
        reason, p
    )
    const unhandledRejectionEmbed = new MessageEmbed()
        .setTitle('Unhandled Rejection/Catch')
        .setURL('https://nodejs.org/api/process.html#event-unhandledrejection')
        .setColor('#2F3136')
        .addField('Reason', `\`\`\`${inspect(reason, { depth: 0 })}\`\`\``)
        .addField('Promise', `\`\`\`${inspect(p, { depth: 0 })}\`\`\``)
        
        .setTimestamp()
    return b.send({
        embeds: [unhandledRejectionEmbed]
    })
});
process.on("uncaughtException", (err, origin) => {
    const c = client.channels.cache.get(errChannel)
    console.log(
        chalk.yellow('——————————[Uncaught Exception/Catch]——————————\n'),
        err, origin
    )
    const uncaughtExceptionEmbed = new MessageEmbed()
        .setTitle('Uncaught Exception/Catch')
        .setColor('#2F3136')
        .setURL('https://nodejs.org/api/process.html#event-uncaughtexception')
        .addField('Error', `\`\`\`${inspect(err, { depth: 0 })}\`\`\``)
        .addField('Origin', `\`\`\`${inspect(origin, { depth: 0 })}\`\`\``)
        
        .setTimestamp()
    return c.send({
        embeds: [uncaughtExceptionEmbed]
    })
});
process.on("uncaughtExceptionMonitor", (err, origin) => {
    const d = client.channels.cache.get(errChannel)
    console.log(
        chalk.yellow('——————————[Uncaught Exception/Catch (MONITOR)]——————————\n'),
        err, origin
    )
    const uncaughtExceptionMonitorEmbed = new MessageEmbed()
        .setTitle('Uncaught Exception Monitor')
        .setColor('#2F3136')
        .setURL('https://nodejs.org/api/process.html#event-uncaughtexceptionmonitor')
        .addField('Error', `\`\`\`${inspect(err, { depth: 0 })}\`\`\``)
        .addField('Origin', `\`\`\`${inspect(origin, { depth: 0 })}\`\`\``)
        
        .setTimestamp()

    return d.send({
        embeds: [uncaughtExceptionMonitorEmbed]
    })
});
process.on("multipleResolves", (type, promise, reason) => {
    const e = client.channels.cache.get(errChannel)
    console.log(
        chalk.yellow('——————————[Multiple Resolves]——————————\n'),
        type, promise, reason
    )
    const multipleResolvesEmbed = new MessageEmbed()
        .setTitle('Multiple Resolves')
        .setURL('https://nodejs.org/api/process.html#event-multipleresolves')
        .setColor('#2F3136')
        .addField('Type', `\`\`\`${inspect(type, { depth: 0 })}\`\`\``)
        .addField('Promise', `\`\`\`${inspect(promise, { depth: 0 })}\`\`\``)
        .addField('Reason', `\`\`\`${inspect(reason, { depth: 0 })}\`\`\``)
        
        .setTimestamp()
    return e.send({
        embeds: [multipleResolvesEmbed]
    })
});
process.on("warning", (warn) => {
    const f = client.channels.cache.get(errChannel)
    console.log(
        chalk.yellow('——————————[Warning]——————————\n'),
        warn
    )
    const warningEmbed = new MessageEmbed()
        .setTitle('Warning')
        .setColor('#2F3136')
        .setURL('https://nodejs.org/api/process.html#event-warning')
        .addField('Warn', `\`\`\`${inspect(warn, { depth: 0 })}\`\`\``)
        
        .setTimestamp()
    return f.send({
        embeds: [warningEmbed]
    })
});


const bottoken = process.env['TOKEN']
client.login(bottoken); 

async function getMemberRoles(memberId) {
    var primaryGuild = '731900308808269874';
    var guild = client.guilds.cache.get(primaryGuild);
    var member = await guild.members.fetch({
        user: memberId,
        force: true
    });
    var roleList = [];

    member.roles.cache.forEach(role => roleList.push(role.id));

    return roleList;
}

module.exports = {
    getMemberRoles: getMemberRoles
};

const express = require('express');
const cookieParser = require('cookie-parser');
const appSettings = require("./config.json");
const discordCredentials = appSettings.discord;
const url = require('url');
const fetch = require('node-fetch');
const DiscordOauth2 = require("discord-oauth2");
const oauth = new DiscordOauth2({
  clientId: "934456688306683925",
	clientSecret: "h4fcTasGFPKMY7ETH687Paae8kDSNxmb",
  redirectUri: "https://TRYHARD.zeinfarran7.repl.co",
  
});
const scopes = ["identify", "guilds", "guilds.join"];
const { Permissions } = require("discord.js");
const subdomain = require('express-subdomain');
const router = express.Router();

var sessionParser = require('express-session')({
    cookie: {
      path: '/', 
      secure: false, 
      httpOnly: true,
      maxAge: 40 * 24 * 60 * 60 * 1000 // 40 days
    },
    secret: 'HM.IDFKE',
    resave: false,
    saveUninitialized: true,
    name: 'shell-token.sid',
    key: 'session_cookie_name',
  });

const app = express();

// the proxy will be http, nginx will manage https and certs
var server = require("http").createServer(app);

app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
app.use(sessionParser);
app.use('/js', express.static(__dirname + '/js'));
app.use('/css', express.static(__dirname + '/css'));
app.use('/fav', express.static(__dirname + '/fav'));
app.use(express.urlencoded());
app.use(cookieParser());

async function discordLoginPage (req, res) {
  const urlObj = url.parse(req.url, true);

  if (urlObj.query.code) {
    const accessCode = urlObj.query.code;
    const data = {
        client_id: discordCredentials.client_id,
        client_secret: discordCredentials.client_secret,
        grant_type: 'authorization_code',
        redirect_uri: discordCredentials.redirect_uri,
        code: accessCode,
        scope: ['identify','guilds'],
    };

    var response = await fetch('https://discord.com/api/oauth2/token', {
        method: 'POST',
        body: new URLSearchParams(data),
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
    });

    var info = await response.json();


    var userInfoRequest = await fetch('https://discord.com/api/users/@me', {
        headers: {
            authorization: `${info.token_type} ${info.access_token}`,
        },
    });    

    var userData = await userInfoRequest.json();
 var userGuild = await fetch('https://discord.com/api/users/@me/guilds', {
   headers: {
     authorization: `Bearer ${info.access_token}`
   }
 })
    var userGuilds = await userGuild.json()
    var roles = [];
    
    try {
      roles = await getMemberRoles(userData.id);
    } catch (error) {
    } 

//      let OAuth2Response;
//     let OAuth2UserResponse;
//     let OAuth2GuildsResponse;

//     OAuth2Response = oauth.tokenRequest({
// 	// clientId, clientSecret and redirectUri are omitted, as they were already set on the class constructor
// 	code: accessCode,
//   scope: scopes.join(' '),
//   grantType: "authorization_code",
// });

//     OAuth2UserResponse = await oauth.getUser(OAuth2Response.access_token);

//       OAuth2GuildsResponse = await oauth.getUserGuilds(OAuth2Response.access_token);

//     console.log(OAuth2Response)

//     oauth.addMember({
// 	accessToken: OAuth2Response.access_token,
// 	botToken: client.token,
// 	guildId: "731900308808269874",
// 	userId: OAuth2UserResponse.id,
// }).then(console.log);
    
//      req.session.guilds = OAuth2GuildsResponse || [];
    req.session.userGuilds = userGuilds;
     req.session.userId = userData.id;
    req.session.username = userData.username + "#" + userData.discriminator;
    req.session.createdon = userData.id;
    req.user = userData

    if (userData.avatar) {
      req.session.avatar = `https://cdn.discordapp.com/avatars/${userData.id}/${userData.avatar}`;
    } else {
      req.session.avatar = `/css/img/discord.png`;
    }

    // role check logic goes here
    // example:
    if (roles.filter(x => appSettings.roles.mod.includes(x)).length > 0) {
        req.session.isMod = true;
    } else {
        req.session.isMod = false;
    }
    
  }
  console.log(`${req.session.username} logged in`)
  const channel = await client.channels.cache.get(errChannel)
  channel.send({ content: `${req.session.username} logged in!` })
    req.session.save();
  res.redirect('/');
}

async function rootPage(req, res) {
  res.render(path.join(__dirname, '/index.html'), {
      id: req.session.userId,
      username: req.session.username,
      avatar: req.session.avatar,
      loginUrl: appSettings.discord.login_uri,
    isMod: req.session.isMod,
owners: owners_id,
  });
    if(!req.session.username){
    console.log(`someone not logged in visited the main page`)
  } else {
  console.log(`${req.session.username} visited the main page`)
      
  }
  return;
}

// async function Admin(req, res) {
 
// }

async function dashboard(req, res) {
  res.render(path.join(__dirname, '/dashboard.ejs'), {
      userGuilds: req.session.userGuilds,
    perms: Permissions,
    bot: client,
    path: req.path,
    user: req.user || null,
    inv: 'https://discord.com/api/oauth2/authorize?client_id=934456688306683925&permissions=8&redirect_uri=https%3A%2F%2FTRYHARD.zeinfarran7.repl.co%2Fdiscordlogin&response_type=code&scope=bot%20applications.commands%20identify'
  });
  if(!req.session.username){
    console.log(`someone not logged in visited the dashboard page`)
  } else {
  console.log(`${req.session.username} visited the dashboard page`)
  }
  return;
}

 const renderTemplate = (res, req, template, data = {}) => {
    // Default base data which passed to the ejs template by default.
    const baseData = {
      bot: client,
      path: req.path,
      user: req.user || null,
    };

 }

app.get('/', rootPage);
app.get('/discordlogin', discordLoginPage);
app.get("/dashboard", dashboard);
app.get('/admin', async(req, res) => {
  if(!owners_id.includes(req.session.userId))
    return res.redirect('/')

     res.render(path.join(__dirname, '/admin.ejs'), {
      id: req.session.userId,
      username: req.session.username,
      avatar: req.session.avatar,
      loginUrl: appSettings.discord.login_uri,
      isMod: req.session.isMod,
      owners: owners_id,
      alert: null,
      bot: client,
      path: req.path,
      user: req.user || null,
  });
    if(!req.session.username){
    console.log(`someone not logged in visited the admin page`)
  } else {
  console.log(`${req.session.username} visited the admin page`)
      
  }
  return;
  })

app.post('/admin', async(req, res) => {
  if(!owners_id.includes(req.session.userId))
    return res.redirect('/')
  
     GuildBlacklist.findOne({ guildId: req.body.guildId }, async(err, data) => {
       if(!data){
         new GuildBlacklist({
           guildId: req.body.guildId,
         }).save()
       }
     });

  GuildBlacklist.findOne({
    guildId: req.body.guildIDD,
  }, async(err, data) => {
    if(!data){
    } else {
      data.delete()
    }
  })

     res.render(path.join(__dirname, '/admin.ejs'), {
      id: req.session.userId,
      username: req.session.username,
      avatar: req.session.avatar,
      loginUrl: appSettings.discord.login_uri,
      isMod: req.session.isMod,
      owners: owners_id,
      blacklist,
      alert: 'You Settings have been changed',
    bot: client,
    path: req.path,
    user: req.user || null,
  });
    if(!req.session.username){
    console.log(`someone not logged in visited the admin page`)
  } else {
  console.log(`${req.session.username} visited the admin page`)
      
  }
  return;
  })
app.get("/dashboard/:guildID", async (req, res) => {
GuildBlacklist.findOne({
  guildId: req.params.guildID,
}, async(err, data) => {
  if(!data){

    const guild = client.guilds.cache.get(req.params.guildID);
    if (!guild) return res.redirect("/dashboard");
    let member = guild.members.cache.get(req.session.userId);
    if (!member) {
      try {
        await guild.members.fetch();
        member = guild.members.cache.get(req.session.userId);
      } catch (err) {
        req.send(`Couldn't fetch the members of ${guild.id}: ${err}`);
      }
    }
    if (!member) return res.redirect("/dashboard");
    if (!member.permissions.has(Permissions.FLAGS.MANAGE_GUILD)) {
      return res.redirect("/dashboard");
    }


    let storedSettings = await prefixschema.findOne({ Guild: guild.id });
    if (!storedSettings) {

      const newSettings = new prefixschema({
        Guild: guild.id,
      });
      await newSettings.save().catch((e) => {
        console.log(e);
      });
      storedSettings = await prefixschema.findOne({ Guild: guild.id });
    }


  await res.render(path.join(__dirname, '/settings.ejs'), {
      guild,
      settings: storedSettings,
      alert: null,
    bot: client,
    path: req.path,
    user: req.user || null,
  });

      } else {
    res.send(`This Guild Is Blacklisted`)
      }
})
  
  });


  app.post("/dashboard/:guildID", async (req, res) => {

    const guild = client.guilds.cache.get(req.params.guildID);
    if (!guild) return res.redirect("/dashboard");
    const member = guild.members.cache.get(req.session.userId);
    if (!member) return res.redirect("/dashboard");
    if (!member.permissions.has("MANAGE_GUILD")) {
      return res.redirect("/dashboard");
    }

    let storedSettings = await prefixschema.findOne({ Guild: guild.id });
    if (!storedSettings) {

      const newSettings = new prefixschema({
        Guild: guild.id,
      });
      await newSettings.save().catch((e) => {
        console.log(e);
      });
      storedSettings = await prefixschema.findOne({ Guild: guild.id });
    }

    storedSettings.Prefix = req.body.prefix;
    await storedSettings.save().catch((e) => {
      console.log(e);
    });


  await res.render(path.join(__dirname, '/settings.ejs'), {
      guild,
      settings: storedSettings,
      alert: "Your settings have been saved.",
    bot: client,
    path: req.path,
    user: req.user || null,
  });

  });

// app.get('/testIng',test)
app.get('/logout', (req, res) => {
  req.session.destroy();

  res.render(path.join(__dirname, '/logout.html'), {
    loginUrl: appSettings.discord.login_uri
  });
});
app.get('/invite', async(req, res) => {
  res.redirect('https://discord.com/api/oauth2/authorize?client_id=934456688306683925&permissions=8&redirect_uri=https%3A%2F%2FTRYHARD.zeinfarran7.repl.co%2Fdiscordlogin&response_type=code&scope=bot%20applications.commands%20identify')
})
const Topgg = require('@top-gg/sdk')

const webhook = new Topgg.Webhook('TryHardd')


app.post("/dblwebhook", webhook.listener(vote => {
  // vote will be your vote object, e.g
  const user = client.users.cache.get(vote.user)
    if (!user){
  return
} else {
  const embedE = new MessageEmbed()
  .setTitle('VOTING SYSTEM')
.addField(`Thanks <@!${vote.user}> for voting`,`You got 5000 coins as for now this is the only voting reward join the support server and tell us some suggestions`)
      user.send({ embeds: [embedE]})
  db.add(`money_${vote.user}`, 5000)
  
  console.log(user.send) // 395526710101278721 < user who voted\

 
} // You can also throw an error to the listener callback in order to resend the webhook after a few seconds
  res.send('please leave this page👍')
}))


app.get('/manage', async(res, req) => {
   if (!req.session.userId) return res.redirect('/discord?r=/manage');
})

app.get('*', (req, res) => {
res.send(`<html>
<body>
	<div id="notfound">
		<div class="notfound">
			<div class="notfound-404"></div>
			<h1>404</h1>
			<h2>Oops! Error 404 Page Not Found</h2>
			<p>Sorry but the page you are looking for does not exist, have been removed. name changed or is temporarily unavailable</p>
			<a href="/">Back to homepage</a>
		</div>
	</div>
</body>
</html>`)
})


server.listen(60, () => console.log('ok less go!'))
module.exports = {
    name: "clear",
    description: "Clears messages",
    category: 'Moderation',
  async execute(message, args){

        const amount = args.join(" ");

        if(!amount) return message.reply({ content: 'please provide an amount of messages for me to delete'})

        if(amount > 100) return message.reply({ content: `you cannot clear more than 100 messages at once`})

        if(amount < 1) return message.reply({ content: `you need to delete at least one message`})

        await message.channel.messages.fetch({limit: amount}).then(messages => {
            message.channel.bulkDelete(messages
    )})
  }
}
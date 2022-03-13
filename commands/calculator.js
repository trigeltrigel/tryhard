const discord = require ('discord.js')
const { Calculator } = require('weky')
module.exports = {
    name: 'calculator',
    description: 'A Calculator Command',
    category: 'Fun',
    async execute(message, args) {
  await Calculator(message)
    }
}
import Discord, { AnyChannel, ButtonInteraction, Collection, Intents, Interaction, Message, MessageActionRow, MessageButton, MessageCollector, MessageEmbed, TextChannel } from 'discord.js'
import {createLoa, onReady} from './loaCommands'
import dotenv from 'dotenv'
dotenv.config()

const client = new Discord.Client({
  intents: [
    Intents.FLAGS.GUILDS,
    Intents.FLAGS.GUILD_MESSAGES,
    Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
    Intents.FLAGS.DIRECT_MESSAGES,
    Intents.FLAGS.DIRECT_MESSAGE_REACTIONS
  ]
})

const guildId = '743106884890001408'
const loaChannelId = '941499381415292948'
const loaReqChannelId = '941499381415292948'

client.on('ready', () => {
  console.log('The bot is Loaded')

  onReady(client)

  const guild = client.guilds.cache.get(guildId)
  

  let commands

  if (guild) {
    commands = guild.commands
  } else {
    commands = client.application?.commands
  }

  commands?.create({
    name: 'ping',
    description: 'Replies With Pong',
  })

  commands?.create({
    name: 'loa',
    description: "Creates an Loa with a desc and length",
    options: [
      {
        name: 'desc',
        description: 'Description of why',
        required: true,
        type: Discord.Constants.ApplicationCommandOptionTypes.STRING
      },
      {
        name: 'length',
        description: 'Length, eg. 1w is one week. d = day, w = week, m = month. 1m1w is one month one week',
        required: true,
        type: Discord.Constants.ApplicationCommandOptionTypes.STRING
      }
    ]
  })
})

client.on('interactionCreate', async (interaction) => {
  if (!interaction.isCommand()) {
    return
  }

  const {commandName, options} = interaction

  switch (commandName) {
    case 'ping':
      interaction.reply({
        content: 'pong',
        ephemeral: true
      })
      break
    case 'loa':
      await interaction.deferReply({
        ephemeral: true
      })
      createLoa(interaction, options)
      break
  }
})

client.login(process.env.TOKEN)
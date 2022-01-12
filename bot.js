require('dotenv').config()

const { Client, Intents, MessageEmbed } = require('discord.js')
const { bold } = require('@discordjs/builders')

const client = new Client({ intents: [Intents.FLAGS.GUILDS] })

function createEmbedMessage (alias, vendor, img) {
  const embed = new MessageEmbed()
  embed.setAuthor({ name: `Track Bot ${vendor}` })
  embed.setThumbnail(img)
  embed.setColor('#fbbc24')
  embed.setDescription(`Product ${alias} available in ${vendor}`)
  return embed
}

async function createThread (channel, alias, vendor, url, img) {
  const thread = await channel.threads.create({
    name: `Thread ${alias} - ${vendor}`,
    autoArchiveDuration: 1440 // 1 day (24*60)
  })
  console.log(`Created thread: ${thread.name} in channel ${channel.name}`)
  // creating a embed message
  const embed = createEmbedMessage(alias, vendor, img)
  // sending messages in thread
  await thread.send({ embeds: [embed] })
  await thread.send(url)
}

async function sendMessageDiscord ({ vendor, alias, img, url }) {
  try {
    client.on('ready', () => {
      // console.log('Ready!')
      console.log(`Logged in as ${client.user.tag}!`)
      // Finding specific channel
      const channels = client.channels.cache.filter(channel => channel.name.includes('products-stock'))
      // If we has channels, we'll create thread and send message into it
      if (channels.size > 0) {
        channels.forEach(channel => {
          channel.send(`Product ${bold(alias)} is available on ${bold(vendor)}`).then(async response => {
            await createThread(channel, alias, vendor, url, img)
            // Logout client
            client.destroy()
          })
        })
      } else {
        console.log('Channel not found')
      }
    })
    await client.login(process.env.TOKEN_DISCORD)
  } catch (error) {
    console.error('An error ocurred with Discord API')
  }
}

module.exports = { sendMessageDiscord }

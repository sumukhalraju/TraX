require('dotenv').config();
const fs = require('fs');
const { Client , GatewayIntentBits , Events } = require('discord.js');

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent
  ]
});


function getCurrentUTC() {
  const now = new Date();
  const formattedUTC = now.toLocaleString('en-IN', {
  timeZone: 'UTC',
  weekday: 'short',
  year: 'numeric',
  month: 'long',
  day: '2-digit',
  hour: '2-digit',
  minute: '2-digit',
  second: '2-digit'
});
  return formattedUTC;
}
client.on('ready', () => {
  const logEntry = `✅ Bot logged in as ${client.user.tag} at ${getCurrentUTC()}\n`;
  console.log(logEntry); // Console log
  fs.appendFileSync('logs/login-logs.txt', logEntry); // Save to file
});

client.on('messageCreate', message => {
  if (message.mentions.has(client.user) && !message.author.bot) {
    message.reply("Hey! You mentioned me?");
  }
});

client.on(Events.InteractionCreate, async interaction => {
  if (!interaction.isChatInputCommand()) return;

  if (interaction.commandName === 'activebadge') {
    await interaction.reply({
      content: `👨‍💻 The **Active Developer Badge** is granted by Discord.

To qualify:
- You must have used an interaction (e.g., slash command) in the last 30 days.
- Visit: https://discord.com/developers/active-developer

This bot supports interactions, so you're on the right track!`,
      ephemeral: true
    });
  }
});

client.login(process.env.DISCORD_TOKEN);
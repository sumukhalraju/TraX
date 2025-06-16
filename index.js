require('dotenv').config();
const fs = require('fs');
const { Client , GatewayIntentBits } = require('discord.js');

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent
  ]
});

client.on('ready', () => {
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
  const logEntry = `✅ Bot logged in as ${client.user.tag} at ${formattedUTC}\n`;
  console.log(logEntry); // Console log
  fs.appendFileSync('logs/login-logs.txt', logEntry); // Save to file
});

client.on('messageCreate', message => {
  if (message.mentions.has(client.user) && !message.author.bot) {
    message.reply("Hey! You mentioned me?");
  }
});

client.login(process.env.DISCORD_TOKEN);
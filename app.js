const env = require("./env.json");
const fs = require('fs');
const { Client, GatewayIntentBits, Collection } = require('discord.js');
const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent
    ]
});

const prefix = "!";

client.cmds = new Collection();

const commandFiles = fs.readdirSync("./commands").filter((file) => file.endsWith(".js"));

const data = []
for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    client.cmds.set(command.cmd, command);
    data.push({ cmd: command.cmd, run: command.run });

}

client.on("messageCreate", (msg) => {
    if (!msg.content.startsWith(prefix) || msg.author.bot) return;

    const args = msg.content.slice(prefix.length).trim().split(/ +/);
    const cmd = args.shift();

    if (!client.cmds.has(cmd)) return;

    try {
        client.cmds.get(cmd).run(msg, args);
    } catch (error) {
        console.error(error);
    }
})

client.on("ready", () => {
    console.log(`Logged in as @${client.user.tag}`);
});

client.login(env.token);

/**
 * A ping pong bot, whenever you send "ping", it replies "pong".
 */

// Import the discord.js module
import Discord from "discord.js";

export class GPBot {
    constructor() {
        // Create an instance of a Discord client
        const client:Discord.Client = new Discord.Client();

        /**
         * The ready event is vital, it means that only _after_ this will your bot start reacting to information
         * received from Discord
         */
        client.on('ready', () => {
        console.log('I am ready!');
        });

        // Create an event listener for messages
        client.on('message', message => {
        // If the message is "ping"
        if (message.content === 'ping') {
            // Send "pong" to the same channel
            message.channel.send('pong');
        }
        });

        // Log our bot in using the token from https://discordapp.com/developers/applications/me
        client.login('NTg2Mzk2NTk2ODkyMzM2MTI4.XPnbaQ.egh4EqgjF3FCBSELSXbrMG04wx8');
    }
}
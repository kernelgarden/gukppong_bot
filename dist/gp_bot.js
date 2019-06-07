"use strict";
/**
 * A ping pong bot, whenever you send "ping", it replies "pong".
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Import the discord.js module
const discord_js_1 = __importDefault(require("discord.js"));
class GPBot {
    constructor() {
        // Create an instance of a Discord client
        const client = new discord_js_1.default.Client();
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
        client.login('your token here');
    }
}
exports.GPBot = GPBot;
//# sourceMappingURL=gp_bot.js.map
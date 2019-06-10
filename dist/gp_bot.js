"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = __importDefault(require("discord.js"));
const message_dispatcher_1 = require("./message_dispatcher");
class GPBot {
    constructor() {
        this.initialize();
        this.login();
    }
    Dispatcher() {
        return this.dispatcher;
    }
    initialize() {
        this.client = new discord_js_1.default.Client();
        this.client.on('ready', () => {
            console.log('I am ready!');
        });
        this.dispatcher = new message_dispatcher_1.MessageDispatcher();
        this.client.on('message', async (message) => {
            let result = await this.dispatcher.dispatch(message);
            console.log(result);
        });
    }
    async login() {
        try {
            await this.client.login('NTg2Mzk2NTk2ODkyMzM2MTI4.XPnbaQ.egh4EqgjF3FCBSELSXbrMG04wx8');
            return true;
        }
        catch (err) {
            console.error(err);
            return false;
        }
    }
}
exports.GPBot = GPBot;
//# sourceMappingURL=gp_bot.js.map
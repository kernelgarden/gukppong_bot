"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const gp_bot_1 = require("./gp_bot");
const ping_pong_1 = require("./handlers/ping_pong");
const gpBot = new gp_bot_1.GPBot();
let dispatcher = gpBot.Dispatcher();
dispatcher.add_handler(ping_pong_1.ping_pong_handler);
//# sourceMappingURL=app.js.map
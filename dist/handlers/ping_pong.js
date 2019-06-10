"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
async function ping_pong_handler(message) {
    if (message.content === 'ping') {
        message.channel.send('pong');
    }
    return true;
}
exports.ping_pong_handler = ping_pong_handler;
//# sourceMappingURL=ping_pong.js.map
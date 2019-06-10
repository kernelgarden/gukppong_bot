"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class MessageDispatcher {
    add_handler(handler) {
        this.handlers.push(handler);
    }
    async dispatch(message) {
        for (var i = 0; i < this.handlers.length; i++) {
            try {
                let result = await this.handlers[i](message);
            }
            catch (err) {
                console.error(err);
                continue;
            }
        }
    }
}
exports.MessageDispatcher = MessageDispatcher;
//# sourceMappingURL=message_dispatcher.js.map
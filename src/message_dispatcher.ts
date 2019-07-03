import Discord from "discord.js";

export interface MessageHandleResult {

}

export class MessageDispatcher {
    private handlers: MessageHandlerFunc[]

    constructor() {
        this.handlers = new Array<MessageHandlerFunc>();
    }

    public add_handler(handler: MessageHandlerFunc) {
        this.handlers.push(handler);
    }

    public add_handlers(handlers: Array<MessageHandlerFunc>) {
        handlers.forEach((handler: MessageHandlerFunc) => {
            this.add_handler(handler);
        });
    }

    public async dispatch(message: Discord.Message) {
        for (var i = 0; i < this.handlers.length; i++) {
            try {
                let result = await this.handlers[i](message);
            } catch(err) {
                console.error(err);
                continue;
            }
        }
    }
}

export type MessageHandlerFunc = (message: Discord.Message) => Promise<MessageHandleResult>;
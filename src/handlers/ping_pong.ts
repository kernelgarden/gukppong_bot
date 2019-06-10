import Discord from "discord.js"
import { MessageHandleResult } from "message_dispatcher";

export async function ping_pong_handler(message: Discord.Message): Promise<MessageHandleResult> {
    if (message.content === 'ping') {
        message.channel.send('pong');
    }

    return true;
}
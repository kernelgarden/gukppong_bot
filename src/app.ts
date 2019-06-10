import { GPBot } from "./gp_bot";
import { MessageDispatcher } from "./message_dispatcher";
import { ping_pong_handler } from "./handlers/ping_pong";

const gpBot = new GPBot();

let dispatcher: MessageDispatcher = gpBot.Dispatcher();
dispatcher.add_handler(ping_pong_handler);
import { GPBot } from "./gp_bot";
import { MessageDispatcher, MessageHandlerFunc } from "./message_dispatcher";
import { ping_pong_handler } from "./handlers/ping_pong";

const gpBot = new GPBot();
gpBot.login();

const handlers = new Array<MessageHandlerFunc>(ping_pong_handler);
gpBot.Dispatcher().add_handlers(handlers);
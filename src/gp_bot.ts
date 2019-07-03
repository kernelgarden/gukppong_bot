import Discord, { Message, TextChannel } from "discord.js";
import { MessageDispatcher } from "./message_dispatcher";
import { discord_bot_key } from "./constants";

export class GPBot {
    private client: Discord.Client;
    private dispatcher: MessageDispatcher;

    constructor() {
        this.initialize();
    }

    public Client(): Discord.Client {
        return this.client;
    }

    public Dispatcher(): MessageDispatcher {
        return this.dispatcher;
    }

    private initialize(): void {
        this.client = new Discord.Client();
        this.client.on('ready', () => {
            console.log('I am ready!');
        });

        this.dispatcher = new MessageDispatcher();

        this.client.on('message', async message => {
            let result = await this.dispatcher.dispatch(message);
            //console.log(result);
        });
    }

    public async broadcast_all_channel(msg: string): Promise<boolean> {
        try {
            this.client.channels.forEach((value, _key, _map) => {
                if (value.type === "text") {
                    let channel = value as TextChannel;
                    channel.send(msg);
                }
            });
            return true;
        } catch(err) {
            console.error(err);
            return false;
        }
    }

    public async send_message(msg: string, channel: Discord.TextChannel): Promise<boolean> {
        try {
            channel.send(msg);
            return true;
        } catch(err) {
            console.error(err);
            return false;
        }
    }

    public async login(): Promise<boolean> {
        try {
            const api_key = discord_bot_key;
            await this.client.login(discord_bot_key);
            return true;
        } catch(err) {
            console.error(err);
            return false;
        }
    }

    public close(): void {
        this.client.destroy();
        console.log("bye!");
    }
}
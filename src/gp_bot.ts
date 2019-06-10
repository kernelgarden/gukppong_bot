import Discord from "discord.js";
import { MessageDispatcher } from "./message_dispatcher";

export class GPBot {
    private client: Discord.Client;
    private dispatcher: MessageDispatcher;

    constructor() {
        this.initialize();
        this.login();
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
            console.log(result);
        });
    }

    private async login(): Promise<boolean> {
        try {
            await this.client.login('NTg2Mzk2NTk2ODkyMzM2MTI4.XPnbaQ.egh4EqgjF3FCBSELSXbrMG04wx8');
            return true;
        } catch(err) {
            console.error(err);
            return false;
        }
    }
}
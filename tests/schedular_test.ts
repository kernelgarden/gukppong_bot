import { expect, assert } from "chai";
import { GPBot } from "../src/gp_bot";
import { Schedular } from "../src/schedular";
import { Channel, TextChannel } from "discord.js";
import moment from "moment";

let gpBot: GPBot;
let scheduler: Schedular;

before("initialize", async function() {
    gpBot = new GPBot();
    await gpBot.login();

    scheduler = new Schedular();
});

describe("Bot", function() {
    it("broadcast_all_channel", async function() {
        let val = await gpBot.broadcast_all_channel("BBipp");
        expect(val).equal(true);
    })
})

describe("scheduler", function() {
    it("push", async function() {
        this.timeout(20000);
        let rand_time = Math.floor(Math.random() * 10);
        let next_date = moment().add(rand_time, "s").toDate();
        scheduler.push(() => {
            console.log(`I called ${rand_time} seconds ago`);
            return Promise.resolve();
        }, next_date);

        const delay = (time: number) => new Promise(_ => setTimeout(_, time));
        await delay(rand_time * 1000 + 1000);
        expect(Date.now() > next_date.getTime()).equal(true);
    });
});

after("finalize", function() {
    gpBot.close();
});
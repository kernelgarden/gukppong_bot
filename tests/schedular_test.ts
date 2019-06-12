import { expect, assert } from "chai";
import { GPBot } from "../src/gp_bot";
import { Channel, TextChannel } from "discord.js";

let gpBot: GPBot;

before("initialize", async function() {
    gpBot = new GPBot();
    await gpBot.login();
});

describe("scheduler", function() {
    it("push", function() {
        gpBot.Client().channels.forEach((value, _key, _map) => {
            if (value.type === "text") {
                let channel = value as TextChannel;
                channel.send("bbipp");
            }
        });
        expect(true).equal(true);
    });
});

after("finalize", function() {
    gpBot.close();
});
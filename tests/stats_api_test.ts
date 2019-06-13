import { expect, assert } from "chai";
import { GPBot } from "../src/gp_bot";
import { Schedular } from "../src/schedular";
import { Channel, TextChannel } from "discord.js";
import moment from "moment";
import { StatsAPIParser } from "../src/mlb_api/stats_api_parser";

let api_parser: StatsAPIParser;

before("initialize", async function() {
    api_parser = new StatsAPIParser();
});

describe("Stats API", function() {
    it("request schedule", async function() {
        let result = await api_parser.request_schedule(moment().toDate());
        console.debug(result);
        expect(result).to.not.null;
    });

    it ("request live game", async function() {
        let result = await api_parser.request_live_game(564769);
        console.debug(result);
        expect(result).to.not.null;
    })
});
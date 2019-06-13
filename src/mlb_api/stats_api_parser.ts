import rp from "request-promise-native";
import * as su from "../utils/string_util";
import moment from "moment";
import { GameSchedule } from "./game_schedule";
import { Game } from "./game";

export class StatsAPIParser {
    private base_url: string = "http://statsapi.mlb.com/api";
    
    private schedule_uri: string = "v1/schedule?sportId=1&date={0}/{1}/{2}";

    private live_game_uri: string = "v1.1/game/{0}/feed/live/diffPatch?startTimecode={1}";

    private live_game_uri_without_timecode: string = "v1.1/game/{0}/feed/live";

    constructor() {
        this.initialize();
    }

    private initialize(): void {
    }

    private make_schedule_url(date: Date): string {
        return this.base_url + "/" + 
            su.format(this.schedule_uri, 
                date.getUTCMonth().toString(),
                date.getUTCDay().toString(),
                date.getFullYear().toString());
    }

    private make_live_game_url(game_id: number, start_time: Date = null): string {
        let rest_url: string;

        if (start_time == null) {
            rest_url = 
                su.format(this.live_game_uri_without_timecode, game_id.toString());
        } else {
            let date_format = moment(start_time).utc().format("YYYYMMDD_HHmmss");
            rest_url = 
                su.format(this.live_game_uri, game_id.toString(), date_format);
        }

        return this.base_url + "/" + rest_url;
    }

    private make_option(full_url: string): rp.Options {
        return {
            url: full_url,
            headers: {
                'User-Agent': 'gukppong_bot'
            },
            json: true
        }
    }

    public async request_schedule(date: Date): Promise<GameSchedule> {
        const url = this.make_schedule_url(date);

        try {
            return await rp(this.make_option(url));
        } catch(err) {
            console.error(err);
            return null;
        }
    }

    public async request_live_game(game_id: number, start_time: Date = null): Promise<Game> {
        return null;
    }
}
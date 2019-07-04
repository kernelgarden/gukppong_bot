import * as su from "../utils/string_util";
import moment from "moment";
import { GameSchedule } from "./game_schedule";
import { Game } from "./game";
import { ApiService, ApiResponse } from "../api_service";

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

    public async request_schedule(date: Date): Promise<GameSchedule> {
        const url = this.make_schedule_url(date);

        try {
            let response: ApiResponse<GameSchedule> = await new ApiService()
                .uri(url)
                .method("GET")
                .send();

            if (response.result === "Success") {
                console.debug(response.response.dates[0].games[0]);
                return response.response;
            } else {
                console.error(response.error);
                return null;
            }
        } catch(err) {
            console.error(err);
            return null;
        }
    }

    public async request_live_game(game_id: number, start_time: Date = null): Promise<Game> {
        const url = this.make_live_game_url(game_id, start_time);

        try {
            let response: ApiResponse<Game> = await new ApiService()
                .uri(url)
                .method("GET")
                .send();
            
            if (response.result === "Success") {
                console.debug(response);
                return response;
            } else {
                console.error(response.error);
                return null;
            }
        } catch(err) {
            console.error(err);
            return null;
        }
    }
}
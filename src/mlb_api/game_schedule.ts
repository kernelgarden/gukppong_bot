export interface GameSchedule {
    copyright: string;
    totalItems: number;
    totalEvents: number;
    totalGames: number;
    totalGamesInProgress: number;
    dates: DateDetail[];

    /*
    "copyright":"Copyright 2019 MLB Advanced Media, L.P.  Use of any content on this page acknowledges agreement to the terms posted here http://gdx.mlb.com/components/copyright.txt",
   "totalItems":16,
   "totalEvents":0,
   "totalGames":16,
   "totalGamesInProgress":0,
   "dates":[  
       */
}

export interface DateDetail {
    // skip useless

    games: GameSchedule[];
}

export interface GameSchedule {
    gamePK: number;
    link: string;
    gameType: string;
}

/*
         "games":[  
            {  
               "gamePk":567491,
               "link":"/api/v1/game/567491/feed/live",
               "gameType":"R",
               "season":"2019",
               "gameDate":"2019-06-11T17:05:00Z",
               "rescheduledFrom":"2019-06-10T23:05:00Z",
               "status":{  
                  "abstractGameState":"Final",
                  "codedGameState":"F",
                  "detailedState":"Final",
                  "statusCode":"F",
                  "abstractGameCode":"F"
               },
               "teams":{  
                  "away":{  
                     "leagueRecord":{  
                        "wins":32,
                        "losses":34,
                        "pct":".485"
                     },
                     "score":5,
                     "team":{  
                        "id":121,
                        "name":"New York Mets",
                        "link":"/api/v1/teams/121"
                     },
                     "isWinner":false,
                     "splitSquad":false,
                     "seriesNumber":22
                  },
                  "home":{  
                     "leagueRecord":{  
                        "wins":41,
                        "losses":24,
                        "pct":".631"
                     },
                     "score":12,
                     "team":{  
                        "id":147,
                        "name":"New York Yankees",
                        "link":"/api/v1/teams/147"
                     },
                     "isWinner":true,
                     "splitSquad":false,
                     "seriesNumber":22
                  }
               },
               "venue":{  
                  "id":3313,
                  "name":"Yankee Stadium",
                  "link":"/api/v1/venues/3313"
               },
               "content":{  
                  "link":"/api/v1/game/567491/content"
               },
               "isTie":false,
               "gameNumber":1,
               "publicFacing":true,
               "doubleHeader":"S",
               "gamedayType":"P",
               "tiebreaker":"N",
               "calendarEventID":"14-567491-2019-06-11",
               "seasonDisplay":"2019",
               "dayNight":"day",
               "description":"Makeup of 6/10 PPD",
               "scheduledInnings":9,
               "gamesInSeries":2,
               "seriesGameNumber":1,
               "seriesDescription":"Regular Season",
               "recordSource":"S",
               "ifNecessary":"N",
               "ifNecessaryDescription":"Normal Game"
            },
*/
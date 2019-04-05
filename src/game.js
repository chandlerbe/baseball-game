define(["require", "exports", "./player", "./position", "./scoreboard", "./utilities"], function (require, exports, player_1, position_1, scoreboard_1, util) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class Game {
        get inning() {
            return this._inning;
        }
        set inning(value) {
            if (value > 0 && value < 99) {
                this._inning = value;
            }
            else {
                this._inning = 1;
            }
        }
        constructor(visitors, homers) {
            this.inning = 1;
            this.getTeamRoster(visitors, 1984);
            this.getTeamRoster(homers, 1984);
            this.visitorTeam = visitors;
            this.homeTeam = homers;
            this.setTeamAtBat(this.visitorTeam);
            this.scoreboard = new scoreboard_1.Scoreboard(this.homeTeam.name, this.visitorTeam.name);
        }
        throwPitch() {
            if (this.isGameOver()) {
                return;
            }
            let pitch = util.getPitch(this.playerPitching);
            switch (pitch) {
                case util.typeOfPitches.Ball:
                    this.incrementBalls();
                    break;
                case util.typeOfPitches.BallInPlay:
                    break;
                case util.typeOfPitches.HitByPitch:
                    this.advanceBaseRunners();
                    this.playerAtBat.gameStats.battingStat.incrementHitByPitch();
                    this.playerPitching.gameStats.pitchingStat.incrementHitByPitch();
                    break;
                case util.typeOfPitches.Strike:
                    this.incrementStrikes();
                    break;
            }
        }
        ballInPlay() {
            let hit = util.getHit(this.playerAtBat);
            switch (hit) {
                case util.typeOfHits.Single:
                    this.advanceBaseRunners();
                    this.scoreboard.incrementHits(this.homeTeam, this.teamAtBat);
                    break;
                case util.typeOfHits.Double:
                    for (let i = 0; i < 2; i++) {
                        this.advanceBaseRunners();
                    }
                    this.scoreboard.incrementHits(this.homeTeam, this.teamAtBat);
                    break;
                case util.typeOfHits.Triple:
                    for (let i = 0; i < 3; i++) {
                        this.advanceBaseRunners();
                    }
                    this.scoreboard.incrementHits(this.homeTeam, this.teamAtBat);
                    break;
                case util.typeOfHits.HomeRun:
                    for (let i = 0; i < 4; i++) {
                        this.advanceBaseRunners();
                    }
                    this.scoreboard.incrementHits(this.homeTeam, this.teamAtBat);
                    break;
                case util.typeOfHits.Error:
                    this.advanceBaseRunners(util.typeOfHits.Error);
                    this.scoreboard.incrementErrors(this.homeTeam, this.teamAtBat);
                    break;
            }
        }
        advanceBaseRunners(action) {
            if (this.runnerOnThirdBase) {
                this.runnerOnThirdBase.gameStats.battingStat.incrementRunsScored();
                this.playerAtBat.gameStats.battingStat.incrementRunsBattedIn();
                this.playerPitching.gameStats.pitchingStat.incrementRunsAllowed();
                if (action !== util.typeOfHits.Error) {
                    this.playerPitching.gameStats.pitchingStat.incrementEarnedRunsAllowed();
                }
                this.scoreboard.incrementRuns(this.inning, this.homeTeam, this.teamAtBat);
                this.runnerOnThirdBase = null;
            }
            if (this.runnerOnSecondBase) {
                this.runnerOnThirdBase = this.runnerOnSecondBase;
                this.runnerOnSecondBase = null;
            }
            if (this.runnerOnFirstBase) {
                this.runnerOnSecondBase = this.runnerOnFirstBase;
                this.runnerOnFirstBase = null;
            }
            this.runnerOnFirstBase = this.playerAtBat;
        }
        incrementBalls() {
            if (this.scoreboard.incrementBalls()) {
                this.playerAtBat.gameStats.battingStat.incrementWalks();
                this.playerPitching.gameStats.pitchingStat.incrementBattersFaced();
                this.playerPitching.gameStats.pitchingStat.incrementWalks();
            }
        }
        incrementStrikes() {
            if (this.scoreboard.incrementStrikes()) {
                this.playerAtBat.gameStats.battingStat.incrementStrikeouts();
                this.playerPitching.gameStats.pitchingStat.incrementBattersFaced();
                this.playerPitching.gameStats.pitchingStat.incrementStrikeouts();
                this.incrementOuts();
            }
        }
        incrementOuts() {
            if (this.isGameOver()) {
                return;
            }
            this.playerPitching.gameStats.pitchingStat.incrementOutsRecorded();
            if (this.scoreboard.incrementOuts()) {
                this.incrementInning();
            }
        }
        incrementInning() {
            this.playerPitching = this.teamAtBat.playerPitching;
            if (this.isHomeTeamBatting()) {
                this.inning += 1;
                this.setTeamAtBat(this.visitorTeam);
            }
            else {
                this.setTeamAtBat(this.homeTeam);
            }
            this.playerAtBat = this.teamAtBat.playerBatting;
            this.runnerOnFirstBase = null;
            this.runnerOnSecondBase = null;
            this.runnerOnThirdBase = null;
        }
        isHomeTeamBatting() {
            return this.teamAtBat === this.homeTeam;
        }
        setTeamAtBat(batting) {
            this.teamAtBat = batting;
        }
        isGameOver() {
            if (this.inning > 9 &&
                !this.isHomeTeamBatting() &&
                this.visitorTeam.runs() > this.homeTeam.runs()) {
                return true;
            }
            else if (this.inning >= 9 &&
                this.isHomeTeamBatting() &&
                this.homeTeam.runs() > this.visitorTeam.runs()) {
                return true;
            }
            else {
                return false;
            }
        }
        getTeamRoster(team, year) {
            let self = this;
            let battersXhr = new XMLHttpRequest();
            battersXhr.open("GET", "../data/batters.json", true);
            battersXhr.onload = function () {
                if (battersXhr.status === 200) {
                    var data = JSON.parse(battersXhr.responseText);
                    var players = data.find(w => w.team === team.id && w.year === year);
                    for (let i = 0; i < players.length; i++) {
                        let player = self.createPlayer(players[i]);
                        player.seasonStats.battingStat.atBats(players[i].atBats);
                        player.seasonStats.battingStat.caughtStealing(players[i].caughtStealing);
                        player.seasonStats.battingStat.doubles(players[i].doubles);
                        player.seasonStats.battingStat.groundedIntoDoublePlay(players[i].groundedIntoDoublePlay);
                        player.seasonStats.battingStat.hitByPitch(players[i].hitByPitch);
                        player.seasonStats.battingStat.hits(players[i].hits);
                        player.seasonStats.battingStat.homeRuns(players[i].homeRuns);
                        player.seasonStats.battingStat.runsBattedIn(players[i].runsBattedIn);
                        player.seasonStats.battingStat.runsScored(players[i].runsScored);
                        player.seasonStats.battingStat.sacrificeOuts(players[i].sacrificeOuts);
                        player.seasonStats.battingStat.stolenBases(players[i].stolenBases);
                        player.seasonStats.battingStat.strikeouts(players[i].strikeouts);
                        player.seasonStats.battingStat.triples(players[i].triples);
                        player.seasonStats.battingStat.walks(players[i].walks);
                        self.addPositions(player, players[i].positions);
                        team.roster.push(player);
                    }
                }
            };
            battersXhr.send();
            var pitchersXhr = new XMLHttpRequest();
            pitchersXhr.open("GET", "../data/pitchers.json", true);
            pitchersXhr.onload = function () {
                if (pitchersXhr.status === 200) {
                    var data = JSON.parse(pitchersXhr.responseText);
                    var players = data.find(w => w.team === team.id && w.year === year);
                    for (let i = 0; i < players.length; i++) {
                        let player = self.createPlayer(players[i]);
                        player.seasonStats.pitchingStat.earnedRunsAllowed(players[i].earnedRuns);
                        player.seasonStats.pitchingStat.gamesStarted(players[i].gamesStarted);
                        player.seasonStats.pitchingStat.gamesFinished(players[i].gamesFinished);
                        player.seasonStats.pitchingStat.hitByPitch(players[i].hitByPitch);
                        player.seasonStats.pitchingStat.groundedIntoDoublePlay(players[i].groundedIntoDoublePlay);
                        player.seasonStats.pitchingStat.hitByPitch(players[i].hitByPitch);
                        player.seasonStats.pitchingStat.hits(players[i].hits);
                        player.seasonStats.pitchingStat.homeRuns(players[i].homeRunsAllowed);
                        player.seasonStats.pitchingStat.loses(players[i].loses);
                        player.seasonStats.pitchingStat.runsAllowed(players[i].runsAllowed);
                        player.seasonStats.pitchingStat.outsRecorded(players[i].numberOfOutsPitched);
                        player.seasonStats.pitchingStat.sacrificeOuts(players[i].sacrificeOuts);
                        player.seasonStats.pitchingStat.saves(players[i].saves);
                        player.seasonStats.pitchingStat.strikeouts(players[i].strikeouts);
                        player.seasonStats.pitchingStat.triples(players[i].triples);
                        player.seasonStats.pitchingStat.walks(players[i].walks);
                        player.seasonStats.pitchingStat.wins(players[i].wins);
                        self.addPositions(player, players[i].positions);
                        team.roster.push(player);
                    }
                }
            };
            pitchersXhr.send();
        }
        createPlayer(player) {
            return new player_1.Player(player.firstName, player.lastName, player.bats, player.throws, util.getRandomNumber(1, 99));
        }
        addPositions(player, positions) {
            for (let k = 0; k < positions.length; k++) {
                player.seasonStats.addPosition(position_1.PositionFactory.CreateInstance(positions[k].position, positions[k].games, positions[k].gamesStarted, positions[k].errors));
            }
        }
    }
    exports.Game = Game;
});

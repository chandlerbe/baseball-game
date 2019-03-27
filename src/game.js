define(["require", "exports", "./player", "./position", "./scoreboard", "./utilities"], function (require, exports, player_1, position_1, scoreboard_1, util) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    //import * as teams from "../data/teams.json";
    //import * as players from "../data/players.json";
    class Game {
        constructor(visitors, homers) {
            this.handedness = ["R", "L"];
            this.positions = [
                new position_1.Position("C", 2),
                new position_1.Position("1B", 3),
                new position_1.Position("2B", 4),
                new position_1.Position("SS", 6),
                new position_1.Position("3B", 5),
                new position_1.Position("LF", 7),
                new position_1.Position("CF", 8),
                new position_1.Position("RF", 9)
            ];
            this.names = [];
            this.inning = 1;
            this.generateRoster(visitors.roster);
            this.generateRoster(homers.roster);
            this.visitorTeam = visitors;
            this.homeTeam = homers;
            this.setTeamAtBat(this.visitorTeam);
            this.scoreboard = new scoreboard_1.Scoreboard(this.homeTeam.name, this.visitorTeam.name);
        }
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
                    this.playerAtBat.battingStats.incrementHitByPitch();
                    this.playerPitching.pitchingStats.incrementHitByPitch();
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
                this.runnerOnThirdBase.battingStats.incrementRunsScored();
                this.playerAtBat.battingStats.incrementRunsBattedIn();
                this.playerPitching.pitchingStats.incrementRunsAllowed();
                if (action !== util.typeOfHits.Error) {
                    this.playerPitching.pitchingStats.incrementEarnedRunsAllowed();
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
                this.playerAtBat.battingStats.incrementWalks();
                this.playerPitching.pitchingStats.incrementBattersFaced();
                this.playerPitching.pitchingStats.incrementWalks();
            }
        }
        incrementStrikes() {
            if (this.scoreboard.incrementStrikes()) {
                this.playerAtBat.battingStats.incrementStrikeouts();
                this.playerPitching.pitchingStats.incrementBattersFaced();
                this.playerPitching.pitchingStats.incrementStrikeouts();
                this.incrementOuts();
            }
        }
        incrementOuts() {
            if (this.isGameOver()) {
                return;
            }
            this.playerPitching.pitchingStats.incrementOutsRecorded();
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
        generateRoster(roster) {
            var rosterLimit = 17;
            var battingOrder = 1;
            for (let i = 0; i < rosterLimit; i++) {
                if (i > 13) {
                    roster.push(new player_1.Player(this.getRandomName(roster), position_1.PositionFactory.CreateInstance(position_1.Positions.Pitcher), this.getRandomHandedness(), util.getRandomNumber(1, 99)));
                }
                else if (i === 13) {
                    roster.push(new player_1.Player(this.getRandomName(roster), position_1.PositionFactory.CreateInstance(position_1.Positions.Pitcher), this.getRandomHandedness(), util.getRandomNumber(1, 99), battingOrder++));
                }
                else if (i > 7) {
                    roster.push(new player_1.Player(this.getRandomName(roster), position_1.PositionFactory.CreateInstance(position_1.Positions.Utility), this.getRandomHandedness(), util.getRandomNumber(1, 99)));
                }
                else {
                    roster.push(new player_1.Player(this.getRandomName(roster), this.getRandomPosition(roster), this.getRandomHandedness(), util.getRandomNumber(1, 99), battingOrder++));
                }
            }
        }
        getRandomName(roster) {
            let rnd = util.getRandomNumber(0, this.names.length - 1);
            for (let i = 0; i < roster.length; i++) {
                if (roster[i].name === this.names[rnd]) {
                    rnd = util.getRandomNumber(0, this.names.length - 1);
                    i = 0;
                }
            }
            return this.names[rnd];
        }
        getRandomPosition(roster) {
            let rnd = util.getRandomNumber(0, this.positions.length - 1);
            for (let i = 0; i < roster.length; i++) {
                if (roster[i].position.position === this.positions[rnd].position) {
                    rnd = util.getRandomNumber(0, this.positions.length - 1);
                    i = 0;
                }
            }
            return this.positions[rnd];
        }
        getRandomHandedness() {
            return this.handedness[util.getRandomNumber(0, 1)];
        }
        getRoster() {
            var xhr = new XMLHttpRequest();
            xhr.open("GET", "../data/names.json", true);
            xhr.onload = function () {
                if (xhr.status === 200) {
                    var data = JSON.parse(xhr.responseText);
                }
            };
            xhr.send();
            return [];
        }
    }
    exports.Game = Game;
});

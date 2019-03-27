define(["require", "exports", "knockout"], function (require, exports, ko) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class Scoreboard {
        constructor(visitorTeamName, homeTeamName) {
            this.visitorTeamName = visitorTeamName;
            this.homeTeamName = homeTeamName;
            this.numberOfOuts = ko
                .observable(0)
                .extend({ min: 0, max: 3 });
            this.balls = ko
                .observable(0)
                .extend({ min: 0, max: 4 });
            this.strikes = ko
                .observable(0)
                .extend({ min: 0, max: 3 });
            this.visitorTeamRuns = ko.observableArray([0]);
            this.visitorTeamHits = ko
                .observable(0)
                .extend({ min: 0, max: 99 });
            this.visitorTeamErrors = ko
                .observable(0)
                .extend({ min: 0, max: 99 });
            this.homeTeamRuns = ko.observableArray([]);
            this.homeTeamHits = ko
                .observable(0)
                .extend({ min: 0, max: 99 });
            this.homeTeamErrors = ko
                .observable(0)
                .extend({ min: 0, max: 99 });
        }
        incrementBalls() {
            this.balls(this.balls() + 1);
            if (this.balls() > 3) {
                this.resetPitchCount();
                return true;
            }
            return false;
        }
        incrementStrikes() {
            this.strikes(this.strikes() + 1);
            if (this.strikes() > 2) {
                this.resetPitchCount();
                return true;
            }
            return false;
        }
        incrementOuts() {
            this.numberOfOuts(this.numberOfOuts() + 1);
            if (this.numberOfOuts() > 2) {
                this.numberOfOuts(0);
                return true;
            }
            return false;
        }
        incrementRuns(inning, homeTeam, teamAtBat) {
            if (teamAtBat === homeTeam) {
                this.homeTeamRuns[inning] += 1;
            }
            else {
                this.visitorTeamRuns[inning] += 1;
            }
        }
        incrementHits(homeTeam, teamAtBat) {
            if (teamAtBat === homeTeam) {
                this.homeTeamHits(this.homeTeamHits() + 1);
            }
            else {
                this.visitorTeamHits(this.visitorTeamHits() + 1);
            }
        }
        incrementErrors(homeTeam, teamAtBat) {
            if (teamAtBat !== homeTeam) {
                this.homeTeamErrors(this.homeTeamErrors() + 1);
            }
            else {
                this.visitorTeamErrors(this.visitorTeamErrors() + 1);
            }
        }
        resetPitchCount() {
            this.balls(0);
            this.strikes(0);
        }
    }
    exports.Scoreboard = Scoreboard;
});

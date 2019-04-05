define(["require", "exports", "./stats", "knockout"], function (require, exports, stats_1, ko) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class PitchingStats extends stats_1.Stats {
        constructor() {
            super();
            this.wins = ko
                .observable(0)
                .extend({ min: 0, max: 99 });
            this.loses = ko
                .observable(0)
                .extend({ min: 0, max: 99 });
            this.gamesFinished = ko
                .observable(0)
                .extend({ min: 0, max: 99 });
            this.gamesStarted = ko
                .observable(0)
                .extend({ min: 0, max: 99 });
            this.saves = ko
                .observable(0)
                .extend({ min: 0, max: 99 });
            this.outsRecorded = ko
                .observable(0)
                .extend({ min: 0, max: 999 });
            this.battersFaced = ko
                .observable(0)
                .extend({ min: 0, max: 999 });
            this.earnedRunsAllowed = ko
                .observable(0)
                .extend({ min: 0, max: 999 });
            this.runsAllowed = ko
                .observable(0)
                .extend({ min: 0, max: 999 });
            this.pitchingAbility =
                ((this.wins() +
                    this.saves() +
                    this.strikeouts() +
                    this.outsRecorded() -
                    this.hits() -
                    this.walks() -
                    this.homeRuns() -
                    this.runsAllowed() -
                    this.loses()) /
                    555) *
                    100;
        }
        incrementOutsRecorded() {
            this.outsRecorded(this.outsRecorded() + 1);
        }
        incrementBattersFaced() {
            this.battersFaced(this.battersFaced() + 1);
        }
        incrementHitsAllowed() {
            this.hits(this.hits() + 1);
        }
        incrementEarnedRunsAllowed() {
            this.earnedRunsAllowed(this.earnedRunsAllowed() + 1);
        }
        incrementRunsAllowed() {
            this.runsAllowed(this.runsAllowed() + 1);
        }
        inningsPitched() {
            return (this.outsRecorded() / 3).toFixed(1);
        }
        earnedRunAverage() {
            return ((this.earnedRunsAllowed() / parseFloat(this.inningsPitched())) *
                9).toFixed(2);
        }
    }
    exports.PitchingStats = PitchingStats;
});

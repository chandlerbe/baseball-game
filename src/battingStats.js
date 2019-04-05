define(["require", "exports", "./stats", "knockout"], function (require, exports, stats_1, ko) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class BattingStats extends stats_1.Stats {
        constructor() {
            super();
            this.atBats = ko
                .observable(0)
                .extend({ min: 0, max: 999 });
            this.runsScored = ko
                .observable(0)
                .extend({ min: 0, max: 999 });
            this.runsBattedIn = ko
                .observable(0)
                .extend({ min: 0, max: 999 });
            this.stolenBases = ko
                .observable(0)
                .extend({ min: 0, max: 999 });
            this.caughtStealing = ko
                .observable(0)
                .extend({ min: 0, max: 99 });
            this.hitForAverageAbility = (this.hits() / this.atBats() / 0.4) * 100;
            this.hitForPowerAbility = (this.homeRuns() / this.atBats() / 0.075) * 100;
            let totalAttemptedSteals = this.stolenBases() + this.caughtStealing();
            if (totalAttemptedSteals > 50) {
                this.speedAbility = 90;
            }
            else if (totalAttemptedSteals > 35) {
                this.speedAbility = 80;
            }
            else if (totalAttemptedSteals > 20) {
                this.speedAbility = 70;
            }
            else if (totalAttemptedSteals > 10) {
                this.speedAbility = 60;
            }
            else {
                this.speedAbility = 45;
            }
        }
        incrementAtBats() {
            this.atBats(this.atBats() + 1);
        }
        incrementRunsScored() {
            this.runsScored(this.runsScored() + 1);
        }
        incrementRunsBattedIn() {
            this.runsBattedIn(this.runsBattedIn() + 1);
        }
        plateAppearances() {
            return this.atBats() + this.sacrificeOuts() + this.walks();
        }
        battingAverage() {
            if (this.atBats() === 0) {
                return ".000";
            }
            return (this.hits() / this.atBats()).toFixed(3);
        }
    }
    exports.BattingStats = BattingStats;
});

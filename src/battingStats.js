define(["require", "exports", "./stats", "knockout"], function (require, exports, stats_1, ko) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class BattingStats extends stats_1.Stats {
        constructor() {
            super();
            this.plateAppearances = ko
                .observable(0)
                .extend({ min: 0, max: 99 });
            this.runsScored = ko
                .observable(0)
                .extend({ min: 0, max: 99 });
            this.runsBattedIn = ko
                .observable(0)
                .extend({ min: 0, max: 99 });
        }
        incrementPlateAppearances() {
            this.plateAppearances(this.plateAppearances() + 1);
        }
        incrementRunsScored() {
            this.runsScored(this.runsScored() + 1);
        }
        incrementRunsBattedIn() {
            this.runsBattedIn(this.runsBattedIn() + 1);
        }
        atBats() {
            return this.plateAppearances() - this.sacrificeOuts() - this.walks();
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

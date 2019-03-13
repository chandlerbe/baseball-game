var BaseballGame;
(function (BaseballGame) {
    class BattingStats extends BaseballGame.Stats {
        constructor() {
            super();
            this.plateAppearances = ko.observable(0).extend({ min: 0, max: 99 });
            this.runsScored = ko.observable(0).extend({ min: 0, max: 99 });
            this.runsBattedIn = ko.observable(0).extend({ min: 0, max: 99 });
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
    BaseballGame.BattingStats = BattingStats;
})(BaseballGame || (BaseballGame = {}));

var BaseballGame;
(function (BaseballGame) {
    class PitchingStats extends BaseballGame.Stats {
        constructor() {
            super();
            this.outsRecorded = ko.observable(0).extend({ min: 0, max: 99 });
            this.battersFaced = ko.observable(0).extend({ min: 0, max: 99 });
            this.hitsAllowed = ko.observable(0).extend({ min: 0, max: 99 });
            this.earnedRunsAllowed = ko.observable(0).extend({ min: 0, max: 99 });
            this.runsAllowed = ko.observable(0).extend({ min: 0, max: 99 });
        }
        incrementOutsRecorded() {
            this.outsRecorded(this.outsRecorded() + 1);
        }
        incrementBattersFaced() {
            this.battersFaced(this.battersFaced() + 1);
        }
        incrementHitsAllowed() {
            this.hitsAllowed(this.hitsAllowed() + 1);
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
    BaseballGame.PitchingStats = PitchingStats;
})(BaseballGame || (BaseballGame = {}));

var BaseballGame;
(function (BaseballGame) {
    class Stats {
        constructor() {
            this.walks = ko.observable(0).extend({ min: 0, max: 99 });
            this.strikeouts = ko.observable(0).extend({ min: 0, max: 99 });
            this.hitByPitch = ko.observable(0).extend({ min: 0, max: 99 });
            this.singles = ko.observable(0).extend({ min: 0, max: 99 });
            this.doubles = ko.observable(0).extend({ min: 0, max: 99 });
            this.triples = ko.observable(0).extend({ min: 0, max: 99 });
            this.homeRuns = ko.observable(0).extend({ min: 0, max: 99 });
            this.sacrificeOuts = ko.observable(0).extend({ min: 0, max: 99 });
        }
        incrementWalks() {
            this.walks(this.walks() + 1);
        }
        incrementStrikeouts() {
            this.strikeouts(this.strikeouts() + 1);
        }
        incrementHitByPitch() {
            this.hitByPitch(this.hitByPitch() + 1);
        }
        incrementSingles() {
            this.singles(this.singles() + 1);
        }
        incrementDoubles() {
            this.doubles(this.doubles() + 1);
        }
        incrementHomeRuns() {
            this.homeRuns(this.homeRuns() + 1);
        }
        incrementSacrificeOuts() {
            this.sacrificeOuts(this.sacrificeOuts() + 1);
        }
        hits() {
            return this.singles() + this.doubles() + this.triples() + this.homeRuns();
        }
    }
    BaseballGame.Stats = Stats;
})(BaseballGame || (BaseballGame = {}));

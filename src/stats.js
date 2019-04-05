define(["require", "exports", "knockout"], function (require, exports, ko) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class Stats {
        constructor() {
            this.walks = ko
                .observable(0)
                .extend({ min: 0, max: 999 });
            this.strikeouts = ko
                .observable(0)
                .extend({ min: 0, max: 999 });
            this.hitByPitch = ko
                .observable(0)
                .extend({ min: 0, max: 99 });
            this.hits = ko
                .observable(0)
                .extend({ min: 0, max: 999 });
            this.doubles = ko
                .observable(0)
                .extend({ min: 0, max: 99 });
            this.triples = ko
                .observable(0)
                .extend({ min: 0, max: 99 });
            this.homeRuns = ko
                .observable(0)
                .extend({ min: 0, max: 99 });
            this.sacrificeOuts = ko
                .observable(0)
                .extend({ min: 0, max: 99 });
            this.groundedIntoDoublePlay = ko
                .observable(0)
                .extend({ min: 0, max: 99 });
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
        incrementHits() {
            this.hits(this.hits() + 1);
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
        singles() {
            return this.hits() - this.doubles() - this.triples() - this.homeRuns();
        }
    }
    exports.Stats = Stats;
});

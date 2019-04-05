define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var typeOfPitches;
    (function (typeOfPitches) {
        typeOfPitches[typeOfPitches["Strike"] = 0] = "Strike";
        typeOfPitches[typeOfPitches["Ball"] = 1] = "Ball";
        typeOfPitches[typeOfPitches["BallInPlay"] = 2] = "BallInPlay";
        typeOfPitches[typeOfPitches["HitByPitch"] = 3] = "HitByPitch";
    })(typeOfPitches = exports.typeOfPitches || (exports.typeOfPitches = {}));
    var typeOfHits;
    (function (typeOfHits) {
        typeOfHits[typeOfHits["Single"] = 0] = "Single";
        typeOfHits[typeOfHits["Double"] = 1] = "Double";
        typeOfHits[typeOfHits["Triple"] = 2] = "Triple";
        typeOfHits[typeOfHits["HomeRun"] = 3] = "HomeRun";
        typeOfHits[typeOfHits["Error"] = 4] = "Error";
    })(typeOfHits = exports.typeOfHits || (exports.typeOfHits = {}));
    var typeOfOuts;
    (function (typeOfOuts) {
        typeOfOuts[typeOfOuts["FoulBall"] = 0] = "FoulBall";
        typeOfOuts[typeOfOuts["GroundOut"] = 1] = "GroundOut";
        typeOfOuts[typeOfOuts["FlyOut"] = 2] = "FlyOut";
        typeOfOuts[typeOfOuts["PopOut"] = 3] = "PopOut";
    })(typeOfOuts = exports.typeOfOuts || (exports.typeOfOuts = {}));
    function shuffleArray(data) {
        for (let i = data.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [data[i], data[j]] = [data[j], data[i]];
        }
    }
    function getRandomNumber(minValue = 10, maxValue = 30) {
        return Math.floor(Math.random() * (maxValue - minValue + 1) + minValue);
    }
    exports.getRandomNumber = getRandomNumber;
    function getHit(batter) {
        let hits = [];
        for (var i = 0; i < batter.seasonStats.battingStat.hitForAverageAbility; i++) {
            hits.push(typeOfHits.Single);
        }
        for (var i = 0; i < batter.seasonStats.battingStat.hitForAverageAbility / 4; i++) {
            hits.push(typeOfHits.Double);
        }
        for (var i = 0; i < batter.seasonStats.battingStat.hitForAverageAbility / 10; i++) {
            hits.push(typeOfHits.HomeRun);
        }
        for (var i = 0; i < batter.seasonStats.battingStat.hitForAverageAbility / 12; i++) {
            hits.push(typeOfHits.Triple);
        }
        for (var i = 0; i < batter.seasonStats.battingStat.hitForAverageAbility / 15; i++) {
            hits.push(typeOfHits.Error);
        }
        shuffleArray(hits);
        return hits[getRandomNumber(0, hits.length - 1)];
    }
    exports.getHit = getHit;
    function getOut() {
        let outs = [];
        for (let i = 0; i < 20; i++) {
            outs.push(typeOfOuts.FlyOut);
        }
        for (let i = 0; i < 5; i++) {
            outs.push(typeOfOuts.FoulBall);
        }
        for (let i = 0; i < 20; i++) {
            outs.push(typeOfOuts.GroundOut);
        }
        for (let i = 0; i < 10; i++) {
            outs.push(typeOfOuts.PopOut);
        }
        shuffleArray(outs);
        return outs[getRandomNumber(0, outs.length - 1)];
    }
    exports.getOut = getOut;
    function getPitch(pitcher) {
        let pitches = [];
        for (let i = 0; i < pitcher.seasonStats.pitchingStat.pitchingAbility; i++) {
            pitches.push(typeOfPitches.Strike);
        }
        for (let i = 0; i < pitcher.seasonStats.pitchingStat.pitchingAbility - pitcher.seasonStats.pitchingStat.pitchingAbility / 3; i++) {
            pitches.push(typeOfPitches.Ball);
        }
        for (let i = 0; i < 5; i++) {
            pitches.push(typeOfPitches.BallInPlay);
        }
        for (let i = pitches.length; i < 100; i++) {
            pitches.push(typeOfPitches.HitByPitch);
        }
        shuffleArray(pitches);
        return pitches[getRandomNumber(0, pitches.length - 1)];
    }
    exports.getPitch = getPitch;
});

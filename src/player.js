define(["require", "exports", "./battingStats", "./pitchingStats", "./utilities"], function (require, exports, battingStats_1, pitchingStats_1, utilities_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class Player {
        constructor(name, position, handedness, jerseyNumber, battingOrder) {
            this.name = name;
            this.position = position;
            this.handedness = handedness;
            this.jerseyNumber = jerseyNumber;
            this.battingOrder = battingOrder;
            if (!battingOrder) {
                battingOrder = 0;
            }
            this.battingStats = new battingStats_1.BattingStats();
            this.pitchingStats = new pitchingStats_1.PitchingStats();
            this.pitchingAbility = utilities_1.generateNumber();
            this.hitForAverageAbility = utilities_1.generateNumber();
            this.hitForPowerAbility = utilities_1.generateNumber();
            this.speedAbility = utilities_1.generateNumber();
            if (position.name === "SP" || position.name === "RP") {
                this.pitchingAbility = utilities_1.generateNumber(75, 99);
            }
            else {
                this.hitForAverageAbility = utilities_1.generateNumber(70, 99);
                this.hitForPowerAbility = utilities_1.generateNumber(70, 99);
                this.speedAbility = utilities_1.generateNumber(70, 99);
            }
        }
    }
    exports.Player = Player;
});

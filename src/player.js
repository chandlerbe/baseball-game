define(["require", "exports", "./playerStats"], function (require, exports, playerStats_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class Player {
        constructor(firstName, lastName, bats, throws, jerseyNumber, battingOrder) {
            this.firstName = firstName;
            this.lastName = lastName;
            this.bats = bats;
            this.throws = throws;
            this.jerseyNumber = jerseyNumber;
            this.battingOrder = battingOrder;
            if (!battingOrder) {
                battingOrder = 0;
            }
            this.gameStats = new playerStats_1.PlayerStats();
            this.seasonStats = new playerStats_1.PlayerStats();
        }
        displayName() {
            return `${this.lastName}, ${this.firstName.substring(0, 1)}.`;
        }
    }
    exports.Player = Player;
});

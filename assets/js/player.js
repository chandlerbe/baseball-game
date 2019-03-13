var BaseballGame;
(function (BaseballGame) {
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
            this.battingStats = new BaseballGame.BattingStats();
            this.pitchingStats = new BaseballGame.PitchingStats();
            this.pitchingAbility = BaseballGame.Utilities.generateNumber();
            this.hitForAverageAbility = BaseballGame.Utilities.generateNumber();
            this.hitForPowerAbility = BaseballGame.Utilities.generateNumber();
            this.speedAbility = BaseballGame.Utilities.generateNumber();
            if (position.name === "SP" || position.name === "RP") {
                this.pitchingAbility = BaseballGame.Utilities.generateNumber(75, 99);
            }
            else {
                this.hitForAverageAbility = BaseballGame.Utilities.generateNumber(70, 99);
                this.hitForPowerAbility = BaseballGame.Utilities.generateNumber(70, 99);
                this.speedAbility = BaseballGame.Utilities.generateNumber(70, 99);
            }
        }
    }
    BaseballGame.Player = Player;
})(BaseballGame || (BaseballGame = {}));

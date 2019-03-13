namespace BaseballGame {
  export class Player {
    readonly pitchingAbility: number;
    readonly hitForAverageAbility: number;
    readonly hitForPowerAbility: number;
    readonly speedAbility: number;
    battingStats: BattingStats;
    pitchingStats: PitchingStats;

    constructor(
      public name: string,
      public position: Position,
      public handedness: string,
      public jerseyNumber: number,
      public battingOrder?: number
    ) {
      if (!battingOrder) {
        battingOrder = 0;
      }

      this.battingStats = new BattingStats();
      this.pitchingStats = new PitchingStats();
      this.pitchingAbility = Utilities.generateNumber();
      this.hitForAverageAbility = Utilities.generateNumber();
      this.hitForPowerAbility = Utilities.generateNumber();
      this.speedAbility = Utilities.generateNumber();

      if (position.name === "SP" || position.name === "RP") {
        this.pitchingAbility = Utilities.generateNumber(75, 99);
      } else {
        this.hitForAverageAbility = Utilities.generateNumber(70, 99);
        this.hitForPowerAbility = Utilities.generateNumber(70, 99);
        this.speedAbility = Utilities.generateNumber(70, 99);
      }
    }
  }
}

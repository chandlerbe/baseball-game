import { BattingStats } from "./battingStats";
import { PitchingStats } from "./pitchingStats";
import { Position } from "./position";
import { generateNumber } from "./utilities";

export class Player {
  readonly pitchingAbility: number;
  readonly hitForAverageAbility: number;
  readonly hitForPowerAbility: number;
  readonly speedAbility: number;
  battingStats: BattingStats;
  pitchingStats: PitchingStats;

  constructor(
    public firstName: string,
    public lastName: string,
    public position: Position,
    public bats: string,
    public throws: string,
    public jerseyNumber: number,
    public battingOrder?: number
  ) {
    if (!battingOrder) {
      battingOrder = 0;
    }

    this.battingStats = new BattingStats();
    this.pitchingStats = new PitchingStats();
    this.pitchingAbility = generateNumber();
    this.hitForAverageAbility = generateNumber();
    this.hitForPowerAbility = generateNumber();
    this.speedAbility = generateNumber();

    if (position.name === "SP" || position.name === "RP") {
      this.pitchingAbility = generateNumber(75, 99);
    } else {
      this.hitForAverageAbility = generateNumber(70, 99);
      this.hitForPowerAbility = generateNumber(70, 99);
      this.speedAbility = generateNumber(70, 99);
    }
  }

  displayName(): string {
    return `${this.lastName}, ${this.firstName.substring(0, 1)}.`;
  }
}

import { BattingStats } from "./battingStats";
import { PitchingStats } from "./pitchingStats";
import { Position } from "./position";

export class Player {
  readonly pitchingAbility: number;
  readonly hitForAverageAbility: number;
  readonly hitForPowerAbility: number;
  readonly speedAbility: number;
  seasonBattingStats: BattingStats;
  seasonPitchingStats: PitchingStats;
  gameBattingStats: BattingStats;
  gamePitchingStats: PitchingStats;

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

    this.seasonBattingStats = new BattingStats();
    this.seasonPitchingStats = new PitchingStats();
    this.gameBattingStats = new BattingStats();
    this.gamePitchingStats = new PitchingStats();
    this.pitchingAbility = 0;
    this.hitForAverageAbility = 0;
    this.hitForPowerAbility = 0;
    this.speedAbility = 0;
  }

  displayName(): string {
    return `${this.lastName}, ${this.firstName.substring(0, 1)}.`;
  }
}

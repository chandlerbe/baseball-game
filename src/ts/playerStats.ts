import { BattingStats } from "./battingStats";
import { PitchingStats } from "./pitchingStats";
import { Position } from "./position";

export class PlayerStats {
  positions: Position[];
  battingStat: BattingStats;
  pitchingStat: PitchingStats;

  constructor() {
    this.positions = [];
  }

  addPosition(position: Position): void {
    this.positions.push(position);
  }
}

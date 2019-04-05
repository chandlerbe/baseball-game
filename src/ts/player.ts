import { PlayerStats } from "./playerStats";

export class Player {
  gameStats: PlayerStats;
  seasonStats: PlayerStats;

  constructor(
    public firstName: string,
    public lastName: string,
    public bats: string,
    public throws: string,
    public jerseyNumber: number,
    public battingOrder?: number
  ) {
    if (!battingOrder) {
      battingOrder = 0;
    }

    this.gameStats = new PlayerStats();
    this.seasonStats = new PlayerStats();
  }

  displayName(): string {
    return `${this.lastName}, ${this.firstName.substring(0, 1)}.`;
  }
}

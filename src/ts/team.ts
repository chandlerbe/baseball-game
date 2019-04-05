import { Player } from "./player";

export class Team {
  playerPitching: Player;
  playerBatting: Player;
  roster: Player[];
  private batterAtPlate: number;

  constructor(readonly id: string, readonly name: string, readonly nickname: string) {
    this.batterAtPlate = 0;
    this.roster = [];
  }

  init(): void {
    this.getNextBatter();
  }

  getLineUp(): Player[] {
    return this.roster.filter(w => w.battingOrder > 0).sort(this.sortPlayers);
  }

  private sortPlayers(firstPlayer: Player, secondPlayer: Player): number {
    if (firstPlayer.battingOrder > secondPlayer.battingOrder) {
      return 1;
    } else if (firstPlayer.battingOrder < secondPlayer.battingOrder) {
      return -1;
    } else {
      return 0;
    }
  }

  addPlayerToRoster(teammate: Player): void {
    if (this.roster.findIndex(w => w === teammate) === -1) {
      this.roster.push(teammate);
    }
  }

  changePitcher(newPitcher: Player): void {
    this.playerPitching = newPitcher;
  }

  changeBatter(batter: Player): void {
    batter.battingOrder = this.playerBatting.battingOrder;
    this.playerBatting.battingOrder = 0;
  }

  getNextBatter(): void {
    this.batterAtPlate += 1;

    if (this.batterAtPlate > 9) {
      this.batterAtPlate = 1;
    }

    this.playerBatting = this.roster.find(
      w => w.battingOrder === this.batterAtPlate
    );
  }

  runs(): number {
    let total = 0;

    this.roster.forEach(e => (total += e.gameStats.battingStat.runsScored()));

    return total;
  }

  hits(): number {
    let total = 0;

    this.roster.forEach(e => (total += e.gameStats.battingStat.hits()));

    return total;
  }
}

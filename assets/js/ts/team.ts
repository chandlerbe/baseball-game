namespace BaseballGame {
  export class Team {
    playerPitching: Player;
    playerBatting: Player;
    roster: Player[];
    private batterAtPlate: number;

    constructor(readonly name: string, readonly nickname: string) {
      this.batterAtPlate = 0;
      this.roster = [];
    }

    init(): void {
      this.getNextBatter();
      this.playerPitching = this.roster.find(w => w.position.name === "SP");
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

    changePitcher(): void {
      this.playerPitching = this.roster.find(
        w => w.position.name === "RP" && w.pitchingStats.battersFaced() === 0
      );
    }

    changeBatter(batter: Player): void {
      if (batter.battingStats.plateAppearances() > 0) {
        return;
      }

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

      this.roster.forEach(e => (total += e.battingStats.runsScored()));

      return total;
    }

    hits(): number {
      let total = 0;

      this.roster.forEach(e => (total += e.battingStats.hits()));

      return total;
    }
  }
}

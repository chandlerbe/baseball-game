namespace BaseballGame {
  export class Game {
    private _inning: number;
    get inning(): number {
      return this._inning;
    }
    set inning(value: number) {
      if (value > 0 && value < 99) {
        this._inning = value;
      } else {
        this._inning = 1;
      }
    }

    runnerOnFirstBase: Player;
    runnerOnSecondBase: Player;
    runnerOnThirdBase: Player;
    playerAtBat: Player;
    playerPitching: Player;
    teamAtBat: Team;
    visitorTeam: Team;
    homeTeam: Team;
    scoreboard: Scoreboard;

    constructor(visitors: Team, homers: Team) {
      this.inning = 1;

      this.generateRoster(visitors.roster);
      this.generateRoster(homers.roster);

      this.visitorTeam = visitors;
      this.homeTeam = homers;
      this.setTeamAtBat(this.visitorTeam);

      this.scoreboard = new Scoreboard(
        this.homeTeam.name,
        this.visitorTeam.name
      );
    }

    throwPitch(): void {
      if (this.isGameOver()) {
        return;
      }

      let pitch = Utilities.getPitch(this.playerPitching);

      switch (pitch) {
        case BaseballGame.typeOfPitches.Ball:
          this.incrementBalls();
          break;
        case BaseballGame.typeOfPitches.BallInPlay:
          break;
        case BaseballGame.typeOfPitches.HitByPitch:
          this.advanceBaseRunners();
          this.playerAtBat.battingStats.incrementHitByPitch();
          this.playerPitching.pitchingStats.incrementHitByPitch();
          break;
        case BaseballGame.typeOfPitches.Strike:
          this.incrementStrikes();
          break;
      }
    }

    ballInPlay(): void {
      let hit = Utilities.getHit(this.playerAtBat);

      switch (hit) {
        case BaseballGame.typeOfHits.Single:
          this.advanceBaseRunners();
          this.scoreboard.incrementHits(this.homeTeam, this.teamAtBat);

          break;
        case BaseballGame.typeOfHits.Double:
          for (let i = 0; i < 2; i++) {
            this.advanceBaseRunners();
          }
          this.scoreboard.incrementHits(this.homeTeam, this.teamAtBat);

          break;
        case BaseballGame.typeOfHits.Triple:
          for (let i = 0; i < 3; i++) {
            this.advanceBaseRunners();
          }
          this.scoreboard.incrementHits(this.homeTeam, this.teamAtBat);

          break;
        case BaseballGame.typeOfHits.HomeRun:
          for (let i = 0; i < 4; i++) {
            this.advanceBaseRunners();
          }
          this.scoreboard.incrementHits(this.homeTeam, this.teamAtBat);

          break;
        case BaseballGame.typeOfHits.Error:
          this.advanceBaseRunners(BaseballGame.typeOfHits.Error);
          this.scoreboard.incrementErrors(this.homeTeam, this.teamAtBat);

          break;
      }
    }

    advanceBaseRunners(action?: BaseballGame.typeOfHits): void {
      if (this.runnerOnThirdBase) {
        this.runnerOnThirdBase.battingStats.incrementRunsScored();

        this.playerAtBat.battingStats.incrementRunsBattedIn();

        this.playerPitching.pitchingStats.incrementRunsAllowed();
        if (action !== BaseballGame.typeOfHits.Error) {
          this.playerPitching.pitchingStats.incrementEarnedRunsAllowed();
        }

        this.scoreboard.incrementRuns(
          this.inning,
          this.homeTeam,
          this.teamAtBat
        );

        this.runnerOnThirdBase = null;
      }

      if (this.runnerOnSecondBase) {
        this.runnerOnThirdBase = this.runnerOnSecondBase;
        this.runnerOnSecondBase = null;
      }

      if (this.runnerOnFirstBase) {
        this.runnerOnSecondBase = this.runnerOnFirstBase;
        this.runnerOnFirstBase = null;
      }

      this.runnerOnFirstBase = this.playerAtBat;
    }

    incrementBalls(): void {
      if (this.scoreboard.incrementBalls()) {
        this.playerAtBat.battingStats.incrementWalks();

        this.playerPitching.pitchingStats.incrementBattersFaced();
        this.playerPitching.pitchingStats.incrementWalks();
      }
    }

    incrementStrikes(): void {
      if (this.scoreboard.incrementStrikes()) {
        this.playerAtBat.battingStats.incrementStrikeouts();

        this.playerPitching.pitchingStats.incrementBattersFaced();
        this.playerPitching.pitchingStats.incrementStrikeouts();

        this.incrementOuts();
      }
    }

    incrementOuts(): void {
      if (this.isGameOver()) {
        return;
      }

      this.playerPitching.pitchingStats.incrementOutsRecorded();

      if (this.scoreboard.incrementOuts()) {
        this.incrementInning();
      }
    }

    incrementInning(): void {
      this.playerPitching = this.teamAtBat.playerPitching;

      if (this.isHomeTeamBatting()) {
        this.inning += 1;
        this.setTeamAtBat(this.visitorTeam);
      } else {
        this.setTeamAtBat(this.homeTeam);
      }

      this.playerAtBat = this.teamAtBat.playerBatting;
      this.runnerOnFirstBase = null;
      this.runnerOnSecondBase = null;
      this.runnerOnThirdBase = null;
    }

    isHomeTeamBatting(): boolean {
      return this.teamAtBat === this.homeTeam;
    }

    setTeamAtBat(batting: Team): void {
      this.teamAtBat = batting;
    }

    isGameOver(): boolean {
      if (
        this.inning > 9 &&
        !this.isHomeTeamBatting() &&
        this.visitorTeam.runs() > this.homeTeam.runs()
      ) {
        return true;
      } else if (
        this.inning >= 9 &&
        this.isHomeTeamBatting() &&
        this.homeTeam.runs() > this.visitorTeam.runs()
      ) {
        return true;
      } else {
        return false;
      }
    }

    private generateRoster(roster: Player[]): void {
      var rosterLimit = 17;
      var battingOrder = 1;

      for (let i = 0; i < rosterLimit; i++) {
        if (i > 13) {
          roster.push(
            new Player(
              this.getRandomName(roster),
              new Position("RP", 1),
              this.getRandomHandedness(),
              Utilities.getRandomNumber(1, 99)
            )
          );
        } else if (i === 13) {
          roster.push(
            new Player(
              this.getRandomName(roster),
              new Position("SP", 1),
              this.getRandomHandedness(),
              Utilities.getRandomNumber(1, 99),
              battingOrder++
            )
          );
        } else if (i > 7) {
          roster.push(
            new Player(
              this.getRandomName(roster),
              new Position("UT", 0),
              this.getRandomHandedness(),
              Utilities.getRandomNumber(1, 99)
            )
          );
        } else {
          roster.push(
            new Player(
              this.getRandomName(roster),
              this.getRandomPosition(roster),
              this.getRandomHandedness(),
              Utilities.getRandomNumber(1, 99),
              battingOrder++
            )
          );
        }
      }
    }

    private getRandomName(roster: Player[]): string {
      let rnd = Utilities.getRandomNumber(0, this.names.length - 1);

      for (let i = 0; i < roster.length; i++) {
        if (roster[i].name === this.names[rnd]) {
          rnd = Utilities.getRandomNumber(0, this.names.length - 1);
          i = 0;
        }
      }

      return this.names[rnd];
    }

    private getRandomPosition(roster: Player[]): Position {
      let rnd = Utilities.getRandomNumber(0, this.positions.length - 1);

      for (let i = 0; i < roster.length; i++) {
        if (roster[i].position.position === this.positions[rnd].position) {
          rnd = Utilities.getRandomNumber(0, this.positions.length - 1);
          i = 0;
        }
      }

      return this.positions[rnd];
    }

    private getRandomHandedness(): string {
      return this.handedness[Utilities.getRandomNumber(0, 1)];
    }

    private handedness: string[] = ["R", "L"];
    positions: Position[] = [
      new Position("C", 2),
      new Position("1B", 3),
      new Position("2B", 4),
      new Position("SS", 6),
      new Position("3B", 5),
      new Position("LF", 7),
      new Position("CF", 8),
      new Position("RF", 9)
    ];
    private names: string[] = [
      "Smith, D.",
      "Gonzalez, A.",
      "Foster, J.",
      "Dwight, S.",
      "Bauer, J.",
      "Gywnn, T.",
      "Peters, J.",
      "Jackson, R.",
      "Sanderson, G.",
      "Hobbs, R.",
      "Paige, S.",
      "Cooper, P.",
      "Sweeney, D.",
      "Hale, A.",
      "Biggs, M.",
      "McDermott, D.",
      "Quincy, T.",
      "Mitchell, H.",
      "Howard, D.",
      "Lester, R.",
      "Cey, R.",
      "Jones, A.",
      "Miller, D.",
      "Miquel, A.",
      "Rodriguez, M.",
      "Philpot, C.",
      "Murphy, D.",
      "Hamilton, D.",
      "Fultz, P.",
      "Guidry, R.",
      "Howard, R.",
      "Hernandez, F.",
      "Wells, D.",
      "Nelson, M.",
      "Martinez, D.",
      "Potvin, F.",
      "Damon, M.",
      "Bannister, F.",
      "Stanton, M.",
      "Sales, C.",
      "Price, D.",
      "Sanchez, G.",
      "Bourbon, P.",
      "Duffy, D.",
      "Herrera, G.",
      "Hosmer, E.",
      "Kemp, M.",
      "Stamkos, S.",
      "Serrano, P.",
      "Hayes, W.",
      "Davis, C.",
      "Simpson, B.",
      "Hightower, D.",
      "Gibson, K.",
      "Smith, O.",
      "Vaughn, R.",
      "Youngblood, J.",
      "Zimmer, D.",
      "Berra, Y.",
      "Williams, T.",
      "Martinez, P.",
      "McDavid, C.",
      "Sanders, R.",
      "Goodwin, T.",
      "Phelps, T.",
      "Fernandez, T.",
      "Robinson, B.",
      "Roberts, D.",
      "Hughes, P.",
      "Pecota, J.",
      "Stargell, W.",
      "Johnson, G.",
      "Coleman, V.",
      "Henderson, R.",
      "Parker, D.",
      "Ray, J.",
      "Bianco, M.",
      "Kessinger, K."
    ];
  }
}

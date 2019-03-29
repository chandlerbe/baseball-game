import { Player } from "./player";
import { Position, PositionFactory, Positions } from "./position";
import { Scoreboard } from "./scoreboard";
import { Team } from "./team";
import * as util from "./utilities";

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

    this.getTeamRoster(visitors);
    this.getTeamRoster(homers);

    this.visitorTeam = visitors;
    this.homeTeam = homers;
    this.setTeamAtBat(this.visitorTeam);

    this.scoreboard = new Scoreboard(this.homeTeam.name, this.visitorTeam.name);
  }

  throwPitch(): void {
    if (this.isGameOver()) {
      return;
    }

    let pitch = util.getPitch(this.playerPitching);

    switch (pitch) {
      case util.typeOfPitches.Ball:
        this.incrementBalls();
        break;
      case util.typeOfPitches.BallInPlay:
        break;
      case util.typeOfPitches.HitByPitch:
        this.advanceBaseRunners();
        this.playerAtBat.gameBattingStats.incrementHitByPitch();
        this.playerPitching.gamePitchingStats.incrementHitByPitch();
        break;
      case util.typeOfPitches.Strike:
        this.incrementStrikes();
        break;
    }
  }

  ballInPlay(): void {
    let hit = util.getHit(this.playerAtBat);

    switch (hit) {
      case util.typeOfHits.Single:
        this.advanceBaseRunners();
        this.scoreboard.incrementHits(this.homeTeam, this.teamAtBat);

        break;
      case util.typeOfHits.Double:
        for (let i = 0; i < 2; i++) {
          this.advanceBaseRunners();
        }
        this.scoreboard.incrementHits(this.homeTeam, this.teamAtBat);

        break;
      case util.typeOfHits.Triple:
        for (let i = 0; i < 3; i++) {
          this.advanceBaseRunners();
        }
        this.scoreboard.incrementHits(this.homeTeam, this.teamAtBat);

        break;
      case util.typeOfHits.HomeRun:
        for (let i = 0; i < 4; i++) {
          this.advanceBaseRunners();
        }
        this.scoreboard.incrementHits(this.homeTeam, this.teamAtBat);

        break;
      case util.typeOfHits.Error:
        this.advanceBaseRunners(util.typeOfHits.Error);
        this.scoreboard.incrementErrors(this.homeTeam, this.teamAtBat);

        break;
    }
  }

  advanceBaseRunners(action?: util.typeOfHits): void {
    if (this.runnerOnThirdBase) {
      this.runnerOnThirdBase.gameBattingStats.incrementRunsScored();

      this.playerAtBat.gameBattingStats.incrementRunsBattedIn();

      this.playerPitching.gamePitchingStats.incrementRunsAllowed();
      if (action !== util.typeOfHits.Error) {
        this.playerPitching.gamePitchingStats.incrementEarnedRunsAllowed();
      }

      this.scoreboard.incrementRuns(this.inning, this.homeTeam, this.teamAtBat);

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
      this.playerAtBat.gameBattingStats.incrementWalks();

      this.playerPitching.gamePitchingStats.incrementBattersFaced();
      this.playerPitching.gamePitchingStats.incrementWalks();
    }
  }

  incrementStrikes(): void {
    if (this.scoreboard.incrementStrikes()) {
      this.playerAtBat.gameBattingStats.incrementStrikeouts();

      this.playerPitching.gamePitchingStats.incrementBattersFaced();
      this.playerPitching.gamePitchingStats.incrementStrikeouts();

      this.incrementOuts();
    }
  }

  incrementOuts(): void {
    if (this.isGameOver()) {
      return;
    }

    this.playerPitching.gamePitchingStats.incrementOutsRecorded();

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

  private getTeamRoster(team: Team, year: number): void {
    var battersXhr = new XMLHttpRequest();
    battersXhr.open("GET", "../data/batters.json", true);

    battersXhr.onload = function() {
      if (battersXhr.status === 200) {
        var data = JSON.parse(battersXhr.responseText);
        var players = data.find(w => w.team === team.id && w.year === year);

        for (let i = 0; i < players.length; i++) {
          team.roster.push(
            new Player(
              players[i].firstName,
              players[i].lastName,
              PositionFactory.CreateInstance(players[i].position),
              players[i].bats,
              players[i].throws,
              util.getRandomNumber(1, 99)
            )
          );
        }
      }
    };

    battersXhr.send();

    var pitchersXhr = new XMLHttpRequest();
    pitchersXhr.open("GET", "../data/pitchers.json", true);

    pitchersXhr.onload = function() {
      if (pitchersXhr.status === 200) {
        var data = JSON.parse(pitchersXhr.responseText);
        var players = data.find(w => w.team === team.id && w.year === year);

        for (let i = 0; i < players.length; i++) {
          team.roster.push(
            new Player(
              players[i].firstName,
              players[i].lastName,
              PositionFactory.CreateInstance(Positions.Pitcher),
              players[i].bats,
              players[i].throws,
              util.getRandomNumber(1, 99)
            )
          );
        }
      }
    };

    pitchersXhr.send();
  }
}

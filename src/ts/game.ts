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
        this.playerAtBat.battingStats.incrementHitByPitch();
        this.playerPitching.pitchingStats.incrementHitByPitch();
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
      this.runnerOnThirdBase.battingStats.incrementRunsScored();

      this.playerAtBat.battingStats.incrementRunsBattedIn();

      this.playerPitching.pitchingStats.incrementRunsAllowed();
      if (action !== util.typeOfHits.Error) {
        this.playerPitching.pitchingStats.incrementEarnedRunsAllowed();
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

  private getTeamRoster(team: Team): void {
    var battingOrder = 1;

    var xhr = new XMLHttpRequest();
    xhr.open("GET", "../data/batters.json", true);

    xhr.onload = function() {
      if (xhr.status === 200) {
        var data = JSON.parse(xhr.responseText);
        var players = data.find(w => w.team === team.id);

        for (let i = 0; i < players.length; i++) {
          team.roster.push(
            new Player(
              players[i].firstName,
              players[i].lastName,
              PositionFactory.CreateInstance(players[i].position),
              players[i].bats,
              players[i].throws,
              players[i].jerseyNumber
            )
          );
        }
      }
    };

    xhr.send();
  }
}

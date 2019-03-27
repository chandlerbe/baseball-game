import { Team } from "./team";
import * as ko from "knockout";

export class Scoreboard {
  numberOfOuts: KnockoutObservable<number> = ko
    .observable(0)
    .extend({ min: 0, max: 3 });
  balls: KnockoutObservable<number> = ko
    .observable(0)
    .extend({ min: 0, max: 4 });
  strikes: KnockoutObservable<number> = ko
    .observable(0)
    .extend({ min: 0, max: 3 });
  visitorTeamRuns: KnockoutObservableArray<number> = ko.observableArray([0]);
  visitorTeamHits: KnockoutObservable<number> = ko
    .observable(0)
    .extend({ min: 0, max: 99 });
  visitorTeamErrors: KnockoutObservable<number> = ko
    .observable(0)
    .extend({ min: 0, max: 99 });
  homeTeamRuns: KnockoutObservableArray<number> = ko.observableArray([]);
  homeTeamHits: KnockoutObservable<number> = ko
    .observable(0)
    .extend({ min: 0, max: 99 });
  homeTeamErrors: KnockoutObservable<number> = ko
    .observable(0)
    .extend({ min: 0, max: 99 });

  constructor(
    readonly visitorTeamName: string,
    readonly homeTeamName: string
  ) {}

  incrementBalls(): boolean {
    this.balls(this.balls() + 1);

    if (this.balls() > 3) {
      this.resetPitchCount();
      return true;
    }

    return false;
  }

  incrementStrikes(): boolean {
    this.strikes(this.strikes() + 1);

    if (this.strikes() > 2) {
      this.resetPitchCount();
      return true;
    }

    return false;
  }

  incrementOuts(): boolean {
    this.numberOfOuts(this.numberOfOuts() + 1);

    if (this.numberOfOuts() > 2) {
      this.numberOfOuts(0);
      return true;
    }

    return false;
  }

  incrementRuns(inning: number, homeTeam: Team, teamAtBat: Team): void {
    if (teamAtBat === homeTeam) {
      this.homeTeamRuns[inning] += 1;
    } else {
      this.visitorTeamRuns[inning] += 1;
    }
  }

  incrementHits(homeTeam: Team, teamAtBat: Team): void {
    if (teamAtBat === homeTeam) {
      this.homeTeamHits(this.homeTeamHits() + 1);
    } else {
      this.visitorTeamHits(this.visitorTeamHits() + 1);
    }
  }

  incrementErrors(homeTeam: Team, teamAtBat: Team): void {
    if (teamAtBat !== homeTeam) {
      this.homeTeamErrors(this.homeTeamErrors() + 1);
    } else {
      this.visitorTeamErrors(this.visitorTeamErrors() + 1);
    }
  }

  resetPitchCount(): void {
    this.balls(0);
    this.strikes(0);
  }
}

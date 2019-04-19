import { Stats } from "./stats";
import * as ko from "knockout";

export class PitchingStats extends Stats {
  wins: KnockoutObservable<number> = ko
    .observable(0)
    .extend({ min: 0, max: 99 });
  loses: KnockoutObservable<number> = ko
    .observable(0)
    .extend({ min: 0, max: 99 });
  gamesFinished: KnockoutObservable<number> = ko
    .observable(0)
    .extend({ min: 0, max: 99 });
  gamesStarted: KnockoutObservable<number> = ko
    .observable(0)
    .extend({ min: 0, max: 99 });
  saves: KnockoutObservable<number> = ko
    .observable(0)
    .extend({ min: 0, max: 99 });
  outsRecorded: KnockoutObservable<number> = ko
    .observable(0)
    .extend({ min: 0, max: 999 });
  battersFaced: KnockoutObservable<number> = ko
    .observable(0)
    .extend({ min: 0, max: 999 });
  earnedRunsAllowed: KnockoutObservable<number> = ko
    .observable(0)
    .extend({ min: 0, max: 999 });
  runsAllowed: KnockoutObservable<number> = ko
    .observable(0)
    .extend({ min: 0, max: 999 });
  inningsPitched: KnockoutComputed<string>;
  earnedRunAverage: KnockoutComputed<string>;

  readonly pitchingAbility: number;

  constructor() {
    super();

    this.pitchingAbility =
      ((this.wins() +
        this.saves() +
        this.strikeouts() +
        this.outsRecorded() -
        this.hits() -
        this.walks() -
        this.homeRuns() -
        this.runsAllowed() -
        this.loses()) /
        555) *
      100;

    this.inningsPitched = ko.computed(() => {
      return (this.outsRecorded() / 3).toFixed(1);
    });
    
    this.earnedRunAverage = ko.computed(() => {
      return (
        (this.earnedRunsAllowed() / parseFloat(this.inningsPitched())) *
        9
      ).toFixed(2);
    });
  }

  incrementOutsRecorded(): void {
    this.outsRecorded(this.outsRecorded() + 1);
  }

  incrementBattersFaced(): void {
    this.battersFaced(this.battersFaced() + 1);
  }

  incrementHitsAllowed(): void {
    this.hits(this.hits() + 1);
  }

  incrementEarnedRunsAllowed(): void {
    this.earnedRunsAllowed(this.earnedRunsAllowed() + 1);
  }

  incrementRunsAllowed(): void {
    this.runsAllowed(this.runsAllowed() + 1);
  }
}

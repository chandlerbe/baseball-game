import { Stats } from "./stats";
import * as ko from "knockout";

export class BattingStats extends Stats {
  atBats: KnockoutObservable<number> = ko
    .observable(0)
    .extend({ min: 0, max: 999 });
  runsScored: KnockoutObservable<number> = ko
    .observable(0)
    .extend({ min: 0, max: 999 });
  runsBattedIn: KnockoutObservable<number> = ko
    .observable(0)
    .extend({ min: 0, max: 999 });
  stolenBases: KnockoutObservable<number> = ko
    .observable(0)
    .extend({ min: 0, max: 999 });
  caughtStealing: KnockoutObservable<number> = ko
    .observable(0)
    .extend({ min: 0, max: 99 });
  groundedIntoDoublePlay: KnockoutObservable<number> = ko
    .observable(0)
    .extend({ min: 0, max: 99 });

  constructor() {
    super();
  }

  incrementAtBats(): void {
    this.atBats(this.atBats() + 1);
  }

  incrementRunsScored(): void {
    this.runsScored(this.runsScored() + 1);
  }

  incrementRunsBattedIn(): void {
    this.runsBattedIn(this.runsBattedIn() + 1);
  }

  plateAppearances(): number {
    return this.atBats() + this.sacrificeOuts() + this.walks();
  }

  battingAverage(): string {
    if (this.atBats() === 0) {
      return ".000";
    }

    return (this.hits() / this.atBats()).toFixed(3);
  }
}

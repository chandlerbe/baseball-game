import { Stats } from "./stats";
import * as ko from "knockout";

export class BattingStats extends Stats {
  plateAppearances: KnockoutObservable<number> = ko
    .observable(0)
    .extend({ min: 0, max: 99 });
  runsScored: KnockoutObservable<number> = ko
    .observable(0)
    .extend({ min: 0, max: 99 });
  runsBattedIn: KnockoutObservable<number> = ko
    .observable(0)
    .extend({ min: 0, max: 99 });

  constructor() {
    super();
  }

  incrementPlateAppearances(): void {
    this.plateAppearances(this.plateAppearances() + 1);
  }

  incrementRunsScored(): void {
    this.runsScored(this.runsScored() + 1);
  }

  incrementRunsBattedIn(): void {
    this.runsBattedIn(this.runsBattedIn() + 1);
  }

  atBats(): number {
    return this.plateAppearances() - this.sacrificeOuts() - this.walks();
  }

  battingAverage(): string {
    if (this.atBats() === 0) {
      return ".000";
    }

    return (this.hits() / this.atBats()).toFixed(3);
  }
}

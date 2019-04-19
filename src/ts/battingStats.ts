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
  battingAverage: KnockoutComputed<string>;
  plateAppearances: KnockoutComputed<number>;

  readonly hitForAverageAbility: number;
  readonly hitForPowerAbility: number;
  readonly speedAbility: number;

  constructor() {
    super();

    this.hitForAverageAbility = (this.hits() / this.atBats() / 0.4) * 100;
    this.hitForPowerAbility = (this.homeRuns() / this.atBats() / 0.075) * 100;

    let totalAttemptedSteals = this.stolenBases() + this.caughtStealing();

    if (totalAttemptedSteals > 50) {
      this.speedAbility = 90;
    } else if (totalAttemptedSteals > 35) {
      this.speedAbility = 80;
    } else if (totalAttemptedSteals > 20) {
      this.speedAbility = 70;
    } else if (totalAttemptedSteals > 10) {
      this.speedAbility = 60;
    } else {
      this.speedAbility = 45;
    }

    this.battingAverage = ko.computed(() => {
      if (this.atBats() === 0) {
        return ".000";
      }

      return (this.hits() / this.atBats()).toFixed(3);
    });

    this.plateAppearances = ko.computed(() => {
      return this.atBats() + this.sacrificeOuts() + this.walks();
    });
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
}

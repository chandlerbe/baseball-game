import * as ko from "knockout";

export abstract class Stats {
  walks: KnockoutObservable<number> = ko
    .observable(0)
    .extend({ min: 0, max: 999 });
  strikeouts: KnockoutObservable<number> = ko
    .observable(0)
    .extend({ min: 0, max: 999 });
  hitByPitch: KnockoutObservable<number> = ko
    .observable(0)
    .extend({ min: 0, max: 99 });
  hits: KnockoutObservable<number> = ko
    .observable(0)
    .extend({ min: 0, max: 999 });
  doubles: KnockoutObservable<number> = ko
    .observable(0)
    .extend({ min: 0, max: 99 });
  triples: KnockoutObservable<number> = ko
    .observable(0)
    .extend({ min: 0, max: 99 });
  homeRuns: KnockoutObservable<number> = ko
    .observable(0)
    .extend({ min: 0, max: 99 });
  sacrificeOuts: KnockoutObservable<number> = ko
    .observable(0)
    .extend({ min: 0, max: 99 });
  groundedIntoDoublePlay: KnockoutObservable<number> = ko
    .observable(0)
    .extend({ min: 0, max: 99 });

  constructor() {}

  incrementWalks(): void {
    this.walks(this.walks() + 1);
  }

  incrementStrikeouts(): void {
    this.strikeouts(this.strikeouts() + 1);
  }

  incrementHitByPitch(): void {
    this.hitByPitch(this.hitByPitch() + 1);
  }

  incrementHits(): void {
    this.hits(this.hits() + 1);
  }

  incrementDoubles(): void {
    this.doubles(this.doubles() + 1);
  }

  incrementHomeRuns(): void {
    this.homeRuns(this.homeRuns() + 1);
  }

  incrementSacrificeOuts(): void {
    this.sacrificeOuts(this.sacrificeOuts() + 1);
  }

  singles(): number {
    return this.hits() - this.doubles() - this.triples() - this.homeRuns();
  }
}

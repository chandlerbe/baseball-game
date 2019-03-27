import * as ko from "knockout";

export abstract class Stats {
  walks: KnockoutObservable<number> = ko
    .observable(0)
    .extend({ min: 0, max: 99 });
  strikeouts: KnockoutObservable<number> = ko
    .observable(0)
    .extend({ min: 0, max: 99 });
  hitByPitch: KnockoutObservable<number> = ko
    .observable(0)
    .extend({ min: 0, max: 99 });
  singles: KnockoutObservable<number> = ko
    .observable(0)
    .extend({ min: 0, max: 99 });
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

  incrementSingles(): void {
    this.singles(this.singles() + 1);
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

  hits(): number {
    return this.singles() + this.doubles() + this.triples() + this.homeRuns();
  }
}

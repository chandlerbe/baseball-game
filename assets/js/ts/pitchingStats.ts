namespace BaseballGame {
  export class PitchingStats extends Stats {
    outsRecorded: KnockoutObservable<number> = ko.observable(0).extend({ min: 0, max: 99 });
    battersFaced: KnockoutObservable<number> = ko.observable(0).extend({ min: 0, max: 99 });
    hitsAllowed: KnockoutObservable<number> = ko.observable(0).extend({ min: 0, max: 99 });
    earnedRunsAllowed: KnockoutObservable<number> = ko.observable(0).extend({ min: 0, max: 99 });
    runsAllowed: KnockoutObservable<number> = ko.observable(0).extend({ min: 0, max: 99 });

    constructor() {
      super();
    }

    incrementOutsRecorded(): void {
      this.outsRecorded(this.outsRecorded() + 1);
    }

    incrementBattersFaced(): void {
      this.battersFaced(this.battersFaced() + 1);
    }

    incrementHitsAllowed(): void {
      this.hitsAllowed(this.hitsAllowed() + 1);
    }

    incrementEarnedRunsAllowed(): void {
      this.earnedRunsAllowed(this.earnedRunsAllowed() + 1);
    }

    incrementRunsAllowed(): void {
      this.runsAllowed(this.runsAllowed() + 1);
    }

    inningsPitched(): string {
      return (this.outsRecorded() / 3).toFixed(1);
    }

    earnedRunAverage(): string {
      return (
        (this.earnedRunsAllowed() / parseFloat(this.inningsPitched())) *
        9
      ).toFixed(2);
    }
  }
}

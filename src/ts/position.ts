import * as ko from "knockout";

export class Position {
  games: KnockoutObservable<number> = ko
    .observable(0)
    .extend({ min: 0, max: 999 });
  gamesStarted: KnockoutObservable<number> = ko
    .observable(0)
    .extend({ min: 0, max: 999 });
  errors: KnockoutObservable<number> = ko
    .observable(0)
    .extend({ min: 0, max: 99 });

  constructor(
    public name: string,
    public position: number,
    gamesPlayed: number = 0,
    gamesStarted: number = 0,
    errorsCommitted: number = 0
  ) {
    this.games = ko.observable(gamesPlayed);
    this.gamesStarted = ko.observable(gamesStarted);
    this.errors = ko.observable(errorsCommitted);
  }
}

export class PositionFactory {
  static CreateInstance(
    position: string,
    games: number,
    gamesStarted: number,
    errors: number
  ): Position {
    switch (position) {
      case "C":
        return new Position(position, 2, games, gamesStarted, errors);
      case "1B":
        return new Position(position, 3, games, gamesStarted, errors);
      case "2B":
        return new Position(position, 4, games, gamesStarted, errors);
      case "3B":
        return new Position(position, 5, games, gamesStarted, errors);
      case "SS":
        return new Position(position, 6, games, gamesStarted, errors);
      case "LF":
        return new Position(position, 7, games, gamesStarted, errors);
      case "CF":
        return new Position(position, 8, games, gamesStarted, errors);
      case "RF":
        return new Position(position, 9, games, gamesStarted, errors);
      case "P":
        return new Position(position, 1, games, gamesStarted, errors);
      case "OF":
        return new Position(position, 0, games, gamesStarted, errors);
      case "DH":
        return new Position(position, 0, games, gamesStarted, errors);
    }
  }

  static Catcher(): string {
    return "C";
  }
  static FirstBase(): string {
    return "1B";
  }
  static SecondBase(): string {
    return "2B";
  }
  static ThirdBase(): string {
    return "3B";
  }
  static ShortStop(): string {
    return "SS";
  }
  static LeftField(): string {
    return "LF";
  }
  static CenterField(): string {
    return "CF";
  }
  static RightField(): string {
    return "RF";
  }
  static OutField(): string {
    return "OF";
  }
  static DesignatedHitter(): string {
    return "DH";
  }
}

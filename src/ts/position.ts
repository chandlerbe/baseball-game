export class Position {
  constructor(public name: string, public position: number) {}
}

export class PositionFactory {
  static CreateInstance(position: Positions): Position {
    switch (position) {
      case Positions.Catcher:
        return new Position("C", 2);
      case Positions.FirstBase:
        return new Position("1B", 3);
      case Positions.SecondBase:
        return new Position("2B", 4);
      case Positions.ThirdBase:
        return new Position("3B", 5);
      case Positions.Shortstop:
        return new Position("SS", 6);
      case Positions.LeftField:
        return new Position("LF", 7);
      case Positions.CenterField:
        return new Position("CF", 8);
      case Positions.RightField:
        return new Position("RF", 9);
      case Positions.Pitcher:
        return new Position("P", 0);
      default:
        return new Position("UT", 0);
    }
  }
}

export enum Positions {
  Catcher,
  FirstBase,
  SecondBase,
  ThirdBase,
  Shortstop,
  LeftField,
  CenterField,
  RightField,
  Utility,
  Pitcher
}

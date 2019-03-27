import { Player } from "../../ts/player";
import { PositionFactory, Positions } from "../../ts/position";

describe("when calling player methods the function", () => {
  it("a batter should have a hit for average ability", done => {
    let batter = new Player(
      "Joe Smith",
      PositionFactory.CreateInstance(Positions.FirstBase),
      "R",
      7,
      1
    );

    expect(batter.hitForAverageAbility).toBeGreaterThan(40);
    expect(batter.hitForPowerAbility).toBeGreaterThan(40);
    expect(batter.speedAbility).toBeGreaterThan(40);
  });
  it("a pitcher should have a pitch ability", done => {
    let pitcher = new Player(
      "Pete Smith",
      PositionFactory.CreateInstance(Positions.Pitcher),
      "R",
      3
    );
    expect(pitcher.pitchingAbility).toBeGreaterThan(40);
  });
});

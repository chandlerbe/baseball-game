import { Player } from "../../ts/player";

describe("when calling player methods the function", () => {
  it("a batter should have a hit for average ability", done => {
    let batter = new Player("Joe", "Smith", "R", "R", 7, 1);

    expect(batter.gameStats.battingStat.hitForAverageAbility).toBeGreaterThan(40);
    expect(batter.gameStats.battingStat.hitForPowerAbility).toBeGreaterThan(40);
    expect(batter.gameStats.battingStat.speedAbility).toBeGreaterThan(40);
  });
  it("a pitcher should have a pitch ability", done => {
    let pitcher = new Player("Joe", "Smith", "R", "R", 7, 1);
    expect(pitcher.gameStats.pitchingStat.pitchingAbility).toBeGreaterThan(40);
  });
});

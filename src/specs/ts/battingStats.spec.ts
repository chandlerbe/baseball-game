import { BattingStats } from "../../ts/battingStats";

describe("when calling batting stats methods the function", () => {
  it("increment plate appearances should be 1", done => {
    let bs = new BattingStats();

    bs.incrementPlateAppearances();
    expect(bs.plateAppearances()).toEqual(1);
  });
  it("increment runs scored should be 1", done => {
    let bs = new BattingStats();

    bs.incrementRunsScored();
    expect(bs.runsScored()).toEqual(1);
  });
  it("increment runs batted in should be 1.", done => {
    let bs = new BattingStats();

    bs.incrementRunsBattedIn();
    expect(bs.runsBattedIn()).toEqual(1);
  });
});

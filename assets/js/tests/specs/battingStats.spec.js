describe("Batting stats class:", () => {
  let stat = new bbg.BattingStats();

  it("Plate appearances should be 1.", () => {
    stat.incrementPlateAppearances();
    expect(stat.plateAppearances()).toEqual(1);
  });
  it("Runs scored should be 1.", () => {
    stat.incrementRunsScored();
    expect(stat.runsScored()).toEqual(1);
  });
  it("Runs batted in should be 1.", () => {
    stat.incrementRunsBattedIn();
    expect(stat.runsBattedIn()).toEqual(1);
  });
});

describe("Game class: ", () => {
  let game = new bbg.Game(
    new bbg.Team("Atlanta", "Braves"),
    new bbg.Team("St. Louis", "Cardinals")
  );

  describe("Generate the team rosters.", () => {
    it("Visitor team roster has been created.", () => {
      expect(game.visitorTeam.roster.length).toEqual(17);
    });
    it("Home team roster has been created.", () => {
      expect(game.homeTeam.roster.length).toEqual(17);
    });
  });
});

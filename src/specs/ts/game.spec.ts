import { Game } from "../../ts/game";
import { Team } from "../../ts/team";

describe("when calling game methods the function", () => {
  it("constructor should create a new team", done => {
    let tm = new Team("NYM", "New York", "Mets");

    expect(tm).toBeDefined();
  });

  let game = new Game(
    new Team("ATL", "Atlanta", "Braves"),
    new Team("STL", "St. Louis", "Cardinals")
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

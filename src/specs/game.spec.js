define(["require", "exports", "../../ts/game", "../../ts/team"], function (require, exports, game_1, team_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    describe("when calling game methods the function", () => {
        it("constructor should create a new team", done => {
            let tm = new team_1.Team("New York", "Mets");
            expect(tm).toBeDefined();
        });
        let game = new game_1.Game(new team_1.Team("Atlanta", "Braves"), new team_1.Team("St. Louis", "Cardinals"));
        describe("Generate the team rosters.", () => {
            it("Visitor team roster has been created.", () => {
                expect(game.visitorTeam.roster.length).toEqual(17);
            });
            it("Home team roster has been created.", () => {
                expect(game.homeTeam.roster.length).toEqual(17);
            });
        });
    });
});

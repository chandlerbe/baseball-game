define(["require", "exports", "../../ts/player", "../../ts/position"], function (require, exports, player_1, position_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    describe("when calling player methods the function", () => {
        it("a batter should have a hit for average ability", done => {
            let batter = new player_1.Player("Joe Smith", position_1.PositionFactory.CreateInstance(position_1.Positions.FirstBase), "R", 7, 1);
            expect(batter.hitForAverageAbility).toBeGreaterThan(40);
            expect(batter.hitForPowerAbility).toBeGreaterThan(40);
            expect(batter.speedAbility).toBeGreaterThan(40);
        });
        it("a pitcher should have a pitch ability", done => {
            let pitcher = new player_1.Player("Pete Smith", position_1.PositionFactory.CreateInstance(position_1.Positions.Pitcher), "R", 3);
            expect(pitcher.pitchingAbility).toBeGreaterThan(40);
        });
    });
});

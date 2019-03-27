define(["require", "exports", "../../ts/player", "../../ts/position", "../../ts/utilities"], function (require, exports, player_1, position_1, util) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    describe("when calling utilities methods the function", () => {
        it("should generate a random number between 0 and 10", () => {
            let x = util.getRandomNumber(0, 10);
            expect(x).toBeGreaterThanOrEqual(0);
            expect(x).toBeLessThanOrEqual(10);
        });
        it("should generate a number between 1 and 50", () => {
            let y = util.generateNumber(1, 50);
            expect(y).toBeGreaterThanOrEqual(1);
            expect(y).toBeLessThanOrEqual(50);
        });
        it("should get a hit for a player.", () => {
            let batter = new player_1.Player("Joe Smith", new position_1.Position("1B", 3), "R", 7, 1);
            spyOn(util, "getHit");
            let hit = util.getHit(batter);
            expect(util.getHit).toHaveBeenCalled();
            expect(hit).toBeDefined();
        });
    });
});

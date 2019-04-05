import { Player } from "../../ts/player";
import * as util from "../../ts/utilities";

describe("when calling utilities methods the function", () => {
  it("should generate a random number between 0 and 10", () => {
    let x = util.getRandomNumber(0, 10);

    expect(x).toBeGreaterThanOrEqual(0);
    expect(x).toBeLessThanOrEqual(10);
  });
  it("should get a hit for a player.", () => {
    let batter = new Player("Joe", "Smith", "R", "R", 7, 1);

    spyOn(util, "getHit");
    let hit = util.getHit(batter);

    expect(util.getHit).toHaveBeenCalled();
    expect(hit).toBeDefined();
  });
});

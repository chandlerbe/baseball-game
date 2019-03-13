describe("Utilities class: ", () => {
  describe("Calling utilities methods.", () => {
    it("Should generate a random number between 0 and 10.", () => {
      let x = bbg.Utilities.getRandomNumber(0, 10);

      expect(x).toBeGreaterThanOrEqual(0);
      expect(x).toBeLessThanOrEqual(10);
    });
    it("Should generate a number between 1 and 50.", () => {
      let x = bbg.Utilities.generateNumber(1, 50);

      expect(x).toBeGreaterThanOrEqual(1);
      expect(x).toBeLessThanOrEqual(50);
    });
    it("Get a hit for a player.", () => {
      let player = new bbg.Player("Joe Smith", new bbg.Position("1B", 3), "R", 7, 1);
      console.log(player.hitForAverageAbility);
      let hit = bbg.Utilities.getHit(player);
      console.log(hit);

      expect(hit).not.toBeUndefined();
    });
  });
});

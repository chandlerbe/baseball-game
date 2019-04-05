import { Team } from "../../ts/team";

describe("when calling team methods the function", () => {
  it("constructor should create a new team", done => {
    let tm = new Team("NYM", "New York", "Mets");

    expect(tm).toBeDefined();
  });
});

define(["require", "exports", "../../ts/team"], function (require, exports, team_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    describe("when calling team methods the function", () => {
        it("constructor should create a new team", done => {
            let tm = new team_1.Team("New York", "Mets");
            expect(tm).toBeDefined();
        });
    });
});

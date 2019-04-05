define(["require", "exports", "./game", "./scoreboard", "./team", "knockout"], function (require, exports, game_1, scoreboard_1, team_1, ko) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var viewModel = {
        ballgame: new game_1.Game(new team_1.Team("PIT", "Pittsburgh", "Pirates"), new team_1.Team("CHN", "Chicago", "Cubs"))
    };
    viewModel.ballgame.scoreboard = new scoreboard_1.Scoreboard(viewModel.ballgame.visitorTeam.nickname, viewModel.ballgame.homeTeam.nickname);
    ko.applyBindingsWithValidation(viewModel);
    $(function () {
        while (!viewModel.ballgame.isGameOver()) {
            viewModel.ballgame.throwPitch();
        }
    });
});

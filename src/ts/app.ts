import { Game } from "./game";
import { Scoreboard } from "./scoreboard";
import { Team } from "./team";
import * as ko from "knockout";

var viewModel = {
  ballgame: new Game(
    new Team("PIT", "Pittsburgh", "Pirates"),
    new Team("CHN", "Chicago", "Cubs")
  )
};

viewModel.ballgame.scoreboard = new Scoreboard(
  viewModel.ballgame.visitorTeam.nickname,
  viewModel.ballgame.homeTeam.nickname
);

ko.applyBindingsWithValidation(viewModel);

$(function() {
  while (!viewModel.ballgame.isGameOver()) {
    viewModel.ballgame.throwPitch();
  }
});

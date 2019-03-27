import { Game } from "./game";
import { Scoreboard } from "./scoreboard";
import { Team } from "./team";
import * as $ from "jquery";
import * as ko from "knockout";

var viewModel = {
  ballgame: new Game(
    new Team("Pittsburgh", "Pirates"),
    new Team("Chicago", "Cubs")
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

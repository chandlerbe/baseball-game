let bbg = BaseballGame;

var viewModel = {
  ballgame: new bbg.Game(
    new bbg.Team("Pittsburgh", "Pirates"),
    new bbg.Team("Chicago", "Cubs")
  )
};

ko.applyBindingsWithValidation(viewModel);

$(function() {
  $("#btnThrowPitch").click(function() {
    viewModel.ballgame.throwPitch();
  });
});

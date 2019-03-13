var BaseballGame;
(function (BaseballGame) {
    class Position {
        constructor(name, position) {
            this.name = name;
            this.position = position;
        }
    }
    BaseballGame.Position = Position;
})(BaseballGame || (BaseballGame = {}));

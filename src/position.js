define(["require", "exports", "knockout"], function (require, exports, ko) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class Position {
        constructor(name, position, gamesPlayed = 0, gamesStarted = 0, errorsCommitted = 0) {
            this.name = name;
            this.position = position;
            this.games = ko
                .observable(0)
                .extend({ min: 0, max: 999 });
            this.gamesStarted = ko
                .observable(0)
                .extend({ min: 0, max: 999 });
            this.errors = ko
                .observable(0)
                .extend({ min: 0, max: 99 });
            this.games = ko.observable(gamesPlayed);
            this.gamesStarted = ko.observable(gamesStarted);
            this.errors = ko.observable(errorsCommitted);
        }
    }
    exports.Position = Position;
    class PositionFactory {
        static CreateInstance(position, games, gamesStarted, errors) {
            switch (position) {
                case "C":
                    return new Position(position, 2, games, gamesStarted, errors);
                case "1B":
                    return new Position(position, 3, games, gamesStarted, errors);
                case "2B":
                    return new Position(position, 4, games, gamesStarted, errors);
                case "3B":
                    return new Position(position, 5, games, gamesStarted, errors);
                case "SS":
                    return new Position(position, 6, games, gamesStarted, errors);
                case "LF":
                    return new Position(position, 7, games, gamesStarted, errors);
                case "CF":
                    return new Position(position, 8, games, gamesStarted, errors);
                case "RF":
                    return new Position(position, 9, games, gamesStarted, errors);
                case "P":
                    return new Position(position, 1, games, gamesStarted, errors);
                case "OF":
                    return new Position(position, 0, games, gamesStarted, errors);
                case "DH":
                    return new Position(position, 0, games, gamesStarted, errors);
            }
        }
        static Catcher() {
            return "C";
        }
        static FirstBase() {
            return "1B";
        }
        static SecondBase() {
            return "2B";
        }
        static ThirdBase() {
            return "3B";
        }
        static ShortStop() {
            return "SS";
        }
        static LeftField() {
            return "LF";
        }
        static CenterField() {
            return "CF";
        }
        static RightField() {
            return "RF";
        }
        static OutField() {
            return "OF";
        }
        static DesignatedHitter() {
            return "DH";
        }
    }
    exports.PositionFactory = PositionFactory;
});

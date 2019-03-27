define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class Position {
        constructor(name, position) {
            this.name = name;
            this.position = position;
        }
    }
    exports.Position = Position;
    class PositionFactory {
        static CreateInstance(position) {
            switch (position) {
                case Positions.Catcher:
                    return new Position("C", 2);
                case Positions.FirstBase:
                    return new Position("1B", 3);
                case Positions.SecondBase:
                    return new Position("2B", 4);
                case Positions.ThirdBase:
                    return new Position("3B", 5);
                case Positions.Shortstop:
                    return new Position("SS", 6);
                case Positions.LeftField:
                    return new Position("LF", 7);
                case Positions.CenterField:
                    return new Position("CF", 8);
                case Positions.RightField:
                    return new Position("RF", 9);
                case Positions.Pitcher:
                    return new Position("P", 0);
                default:
                    return new Position("UT", 0);
            }
        }
    }
    exports.PositionFactory = PositionFactory;
    var Positions;
    (function (Positions) {
        Positions[Positions["Catcher"] = 0] = "Catcher";
        Positions[Positions["FirstBase"] = 1] = "FirstBase";
        Positions[Positions["SecondBase"] = 2] = "SecondBase";
        Positions[Positions["ThirdBase"] = 3] = "ThirdBase";
        Positions[Positions["Shortstop"] = 4] = "Shortstop";
        Positions[Positions["LeftField"] = 5] = "LeftField";
        Positions[Positions["CenterField"] = 6] = "CenterField";
        Positions[Positions["RightField"] = 7] = "RightField";
        Positions[Positions["Utility"] = 8] = "Utility";
        Positions[Positions["Pitcher"] = 9] = "Pitcher";
    })(Positions = exports.Positions || (exports.Positions = {}));
});

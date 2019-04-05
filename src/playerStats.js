define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class PlayerStats {
        constructor() {
            this.positions = [];
        }
        addPosition(position) {
            this.positions.push(position);
        }
    }
    exports.PlayerStats = PlayerStats;
});

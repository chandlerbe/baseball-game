define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class Team {
        constructor(id, name, nickname) {
            this.id = id;
            this.name = name;
            this.nickname = nickname;
            this.batterAtPlate = 0;
            this.roster = [];
        }
        init() {
            this.getNextBatter();
        }
        getLineUp() {
            return this.roster.filter(w => w.battingOrder > 0).sort(this.sortPlayers);
        }
        sortPlayers(firstPlayer, secondPlayer) {
            if (firstPlayer.battingOrder > secondPlayer.battingOrder) {
                return 1;
            }
            else if (firstPlayer.battingOrder < secondPlayer.battingOrder) {
                return -1;
            }
            else {
                return 0;
            }
        }
        addPlayerToRoster(teammate) {
            if (this.roster.findIndex(w => w === teammate) === -1) {
                this.roster.push(teammate);
            }
        }
        changePitcher(newPitcher) {
            this.playerPitching = newPitcher;
        }
        changeBatter(batter) {
            batter.battingOrder = this.playerBatting.battingOrder;
            this.playerBatting.battingOrder = 0;
        }
        getNextBatter() {
            this.batterAtPlate += 1;
            if (this.batterAtPlate > 9) {
                this.batterAtPlate = 1;
            }
            this.playerBatting = this.roster.find(w => w.battingOrder === this.batterAtPlate);
        }
        runs() {
            let total = 0;
            this.roster.forEach(e => (total += e.gameStats.battingStat.runsScored()));
            return total;
        }
        hits() {
            let total = 0;
            this.roster.forEach(e => (total += e.gameStats.battingStat.hits()));
            return total;
        }
    }
    exports.Team = Team;
});

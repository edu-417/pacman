function ScatterBehavior() {
}

ScatterBehavior.prototype.getTargetTile = function (ghost, gameState) {

    if (ghost.personality == Game.BLINKY.personality) {
        return new Vector(-3, 2);
    }

    if (ghost.personality == Game.PINKY.personality) {
        return new Vector(-3, 16);
    }

    if (ghost.personality == Game.INKY.personality) {
        return new Vector(22, 18);
    }

    if (ghost.personality == Game.CLYDE.personality) {
        return new Vector(22, 0);
    }

};

ScatterBehavior.prototype.getColor = function () {
    return {
        body: 'green',
        eyes: 'black'
    };
};
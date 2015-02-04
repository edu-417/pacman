function DeadBehavior() {
}

DeadBehavior.prototype.getTargetTile = function (ghost, gamestate) {

    return new Vector(8, 9);
};

DeadBehavior.prototype.getColor = function () {
    return {
        body: 'white',
        eyes: 'black'
    };
};
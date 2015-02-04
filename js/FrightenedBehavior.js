function FrightenedBehavior() {
}

FrightenedBehavior.prototype.getTargetTile = function (ghost, gamestate) {
    var r = Math.floor(Math.random() * Maze.dir.length);
    var next_direction = Maze.dir[r];

    return maze.getMapCoordinates(ghost.position).add(next_direction);
};

FrightenedBehavior.prototype.getColor = function () {
    return {
        body: 'darkblue',
        eyes: 'white'
    }
};
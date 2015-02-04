/*
* @constructor
* @param {string} behavior
*/

function Behavior(behavior) {
    this.behavior = null;

    if (behavior == Game.BEHAVIORS.chase) {
        this.behavior = new ChaseBehavior();
    }
    else if (behavior == Game.BEHAVIORS.scatter) {
        this.behavior = new ScatterBehavior();
    }
    else if (behavior == Game.BEHAVIORS.frightened) {
        this.behavior = new FrightenedBehavior();
    }
    else if (behavior == Game.BEHAVIORS.dead) {
        this.behavior = new DeadBehavior();
    }

    if(this.behavior === null){
        //console.log('entreee!!!');
    }
}

Behavior.prototype.getTargetTile = function (ghost, gameState) {
    return this.behavior.getTargetTile(ghost, gameState);
};

Behavior.prototype.getColor = function () {
    return this.behavior.getColor();
};

Behavior.prototype.getNextDirection = function (ghost, gameState) {

    var target = this.getTargetTile(ghost, gameState);

    var min_distance = Number.POSITIVE_INFINITY;
    var current_direction = new Vector(ghost.direction.y, ghost.direction.x);
    var new_direction = new Vector(ghost.direction.y, ghost.direction.x);

    var coordinates = gameState.maze.getMapCoordinates(ghost.position);

    for (var i = 0; i < Maze.dir.length; ++i) {        
        if (!ghost.isInHouse() && current_direction.isEqual(Maze.dir[i].getReverse())) {
            continue;
        }

        var newCoordinates = coordinates.add(Maze.dir[i]);
        if (!gameState.maze.isValidPosition(newCoordinates)) {
            continue;
        }
        var distance = gameState.maze.bfs(newCoordinates, target);

        if (min_distance > distance) {
            min_distance = distance;
            new_direction = Maze.dir[i].clone();

        }
    }

    return new Vector(new_direction.y, new_direction.x);
};


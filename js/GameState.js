/*@constructor
*/

var ARROW_LEFT = 37,
    ARROW_UP = 38,
    ARROW_RIGHT = 39,
    ARROW_DOWN = 40;

function GameState(game, currentLevel) {
    this.game = game;
    this.currentLevel = currentLevel;
    this.currentTime = 0;
    this.player = null;
    this.ghosts = [];
    this.map = [];

    for (var i = 0; i < game.map.length; ++i) this.map[i] = game.map[i].slice();

    this.maze = null;
}




GameState.prototype.getGhostPosition = function (personality) {
    for (var i = 0; i < this.ghosts.length; ++i) {
        if (this.ghosts[i].personality == personality) return this.ghosts[i].position.clone();
    }

    return null;
};

GameState.prototype.setGhostsBehavior = function (behavior) {
    for (var i = 0; i < this.ghosts.length; ++i) {
        if (!(this.ghosts[i].behavior.behavior instanceof DeadBehavior)) {
            this.ghosts[i].behavior = new Behavior(behavior);
        }
    }
};

GameState.prototype.setGhostBehavior = function (ghost, behavior) {
    
    ghost.behavior = new Behavior(behavior);
};

GameState.prototype.updateMaze = function () {
    var currentPlayerCoordinates = this.maze.getMapCoordinates(this.player.position);

    if (this.map[currentPlayerCoordinates.x][currentPlayerCoordinates.y] == Tile.PILL) {
        this.player.isEnergized = true;
        this.setGhostsBehavior(Game.BEHAVIORS.frightened);
    }

    if (this.map[currentPlayerCoordinates.x][currentPlayerCoordinates.y] != Tile.WALL) this.map[currentPlayerCoordinates.x][currentPlayerCoordinates.y] = Tile.EMPTY;

    this.maze.map = [];

    for (var i = 0; i < this.map.length; ++i) this.maze.map[i] = this.map[i].slice();
};

GameState.prototype.checkColisions = function () {
    var currentCoordinates = this.maze.getMapCoordinates(this.player.position);

    for (var i = 0; i < this.ghosts.length; ++i) {
        var ghostCoordinates = this.maze.getMapCoordinates(this.ghosts[i].position);

        if (ghostCoordinates.isEqual(currentCoordinates)) {
            if (!this.player.isEnergized) {
                return true;
            }

            this.setGhostBehavior(this.ghosts[i], Game.BEHAVIORS.dead);

        }
    }

    return false;
};

GameState.prototype.restartConfiguration = function () {
    this.player.position = new Vector(Game.PACMAN.start_position.x * Game.TILE_SIZE + Game.TILE_SIZE / 2, Game.PACMAN.start_position.y * Game.TILE_SIZE + Game.TILE_SIZE / 2);
    this.player.direction = new Vector(0, 0);
    this.player.newDirection = new Vector(0, 0);
    this.ghosts[0].position = new Vector(Game.BLINKY.start_position.x * Game.TILE_SIZE + Game.TILE_SIZE / 2, Game.BLINKY.start_position.y * Game.TILE_SIZE + Game.TILE_SIZE / 2);
    this.ghosts[1].position = new Vector(Game.PINKY.start_position.x * Game.TILE_SIZE + Game.TILE_SIZE / 2, Game.PINKY.start_position.y * Game.TILE_SIZE + Game.TILE_SIZE / 2);
    this.ghosts[2].position = new Vector(Game.INKY.start_position.x * Game.TILE_SIZE + Game.TILE_SIZE / 2, Game.INKY.start_position.y * Game.TILE_SIZE + Game.TILE_SIZE / 2);
    this.ghosts[3].position = new Vector(Game.CLYDE.start_position.x * Game.TILE_SIZE + Game.TILE_SIZE / 2, Game.CLYDE.start_position.y * Game.TILE_SIZE + Game.TILE_SIZE / 2);


    //this.map = [];
    //for (var i = 0; i < this.game.map.length; ++i) this.map[i] = this.game.map[i].slice();

    //this.maze.map = [];

    //for (var i = 0; i < this.game.map.length; ++i) this.maze.map[i] = this.game.map[i].slice();
};


GameState.prototype.manageBehaviorTransitions = function (dt) {
    this.currentTime += dt;


    var interval = null;

    for (var i = 0; i < Game.INTERVALS.length; ++i) {
        if (this.currentLevel >= Game.INTERVALS[i].start && this.currentLevel <= Game.INTERVALS[i].end) {
            interval = Game.INTERVALS[i];
            break;
        }
    }

    var behavior = null;

    for (var i = 0; i < interval.points.length; ++i) {
        if (this.currentTime >= interval.points[i].value * 1000){
            behavior = interval.points[i].behavior;   
        }
        else{
            //console.log("tmr!!!");
        }
    }

    this.setGhostsBehavior(behavior);

};

GameState.prototype.update = function (dt) {

    if (this.checkColisions()) {
        this.restartConfiguration();
    }


    this.manageBehaviorTransitions(dt);
    this.updateMaze();
    this.maze.update(dt);
    this.player.update(dt);
    for (var i = 0; i < this.ghosts.length ; ++i) {
        this.ghosts[i].update(dt);
    }
};

GameState.prototype.draw = function (context) {
    this.maze.draw(context);    
    for (var i = 0; i < this.ghosts.length ; ++i) {
        this.ghosts[i].draw(context);
    }

    this.player.draw(context);
};

GameState.prototype.onkeydown = function (e) {

    if (e.keyCode == ARROW_LEFT) {
        this.player.newDirection = new Vector(-1, 0);
    }
    else if (e.keyCode == ARROW_UP) {
        this.player.newDirection = new Vector(0, -1);

    }
    else if (e.keyCode == ARROW_RIGHT) {
        this.player.newDirection = new Vector(1, 0);

    }
    else if (e.keyCode == ARROW_DOWN) {
        this.player.newDirection = new Vector(0, 1);
    }
};
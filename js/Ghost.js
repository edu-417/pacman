/*@constructor
/* param {Vector} position
/* param {number} speed
/* param {number} width
/* param {number} height
/* param {GameState} currentGameState
/* param {string} behavior
/* param {string} personality
*/

function Ghost(position, speed, width, height, currentGameState, personality, behavior) {
    goog.base(this, position, speed, width, height);
    this.currentGameState = currentGameState;
    this.behavior = new Behavior(behavior);
    this.personality = personality;
    this.direction = new Vector(0, 0);
    this.newDirection = new Vector(0, 0);
}

goog.inherits(Ghost, Entity);

Ghost.prototype.update = function (dt) {
    if(this.isOnWholeSquare(this.position))this.newDirection = this.behavior.getNextDirection(this, this.currentGameState);
    if (this.canChangeDirection()) this.direction = this.newDirection.clone();
    this.move(dt);
};

Ghost.prototype.isInHouse = function () {
    var coordinate = this.currentGameState.maze.getMapCoordinates(this.position);
    if (coordinate.x != 10) return false;

    for (var i = 8; i <= 10; ++i) {
        if (coordinate.y == i) return true;
    };

    return false;
};

Ghost.prototype.isValidPosition = function (position) {
    var left_coordinates = this.currentGameState.maze.getMapCoordinates(position.add(new Vector(-this.width / 2, -this.height / 2)));
    var right_coordinates = this.currentGameState.maze.getMapCoordinates(position.add(new Vector(this.width / 2, this.height / 2)));
    return this.currentGameState.maze.isValidPosition(left_coordinates) && this.currentGameState.maze.isValidPosition(right_coordinates);
};

Ghost.prototype.move = function (dt) {

    var new_position = this.position;
    new_position = this.position.add(this.direction.multiply(this.speed * dt));

    if (new_position.x < 0) new_position.x += this.currentGameState.game.width;
    if (new_position.x >= this.currentGameState.game.width) new_position.x -= this.currentGameState.game.width;

    if (this.isValidPosition(new_position)) {
        this.position = new_position;
    }
};

Ghost.prototype.canChangeDirection = function () {
    if (!this.isOnWholeSquare(this.position)) return false;
    var coordinate = this.currentGameState.maze.getMapCoordinates(this.position);
    var new_coordinate = coordinate.add(new Vector(this.newDirection.y, this.newDirection.x));
    return this.currentGameState.maze.isValidPosition(new_coordinate);
};


Ghost.prototype.draw = function (context) {

    if (this.personality == Game.BLINKY.personality) {
        context.fillStyle = Game.BLINKY.color;
    }
    else if (this.personality == Game.PINKY.personality) {
        context.fillStyle = Game.PINKY.color;
    }
    else if (this.personality == Game.INKY.personality) {
        context.fillStyle = Game.INKY.color;
    }
    else {
        context.fillStyle = Game.CLYDE.color;
    }

    if (this.behavior.getColor()) context.fillStyle = this.behavior.getColor().body;

    context.beginPath();


    context.moveTo(this.position.x - this.width / 2, this.position.y + this.height / 2);
    context.lineTo(this.position.x - this.width / 2, this.position.y);;
    context.bezierCurveTo(this.position.x - this.width / 2, this.position.y - 8, this.position.x - 8, this.position.y - this.height / 2, this.position.x, this.position.y - this.height / 2);
    context.bezierCurveTo(this.position.x + 8, this.position.y - this.height / 2, this.position.x + this.width / 2, this.position.y - 8, this.position.x + this.width / 2, this.position.y);
    context.lineTo(this.position.x + this.width / 2, this.position.y + this.height / 2);

    //context.lineTo(106.333, 111.333);
    //context.lineTo(101.666, 116);
    //context.lineTo(97, 111.333);
    //context.lineTo(92.333, 116);
    //context.lineTo(87.666, 111.333);
    //context.lineTo(83, 116);
    context.fill();


    /*
    context.fillStyle = "white";
    context.beginPath();
    context.moveTo(91, 96);
    context.bezierCurveTo(88, 96, 87, 99, 87, 101);
    context.bezierCurveTo(87, 103, 88, 106, 91, 106);
    context.bezierCurveTo(94, 106, 95, 103, 95, 101);
    context.bezierCurveTo(95, 99, 94, 96, 91, 96);
    context.moveTo(103, 96);
    context.bezierCurveTo(100, 96, 99, 99, 99, 101);
    context.bezierCurveTo(99, 103, 100, 106, 103, 106);
    context.bezierCurveTo(106, 106, 107, 103, 107, 101);
    context.bezierCurveTo(107, 99, 106, 96, 103, 96);
    context.fill();
    */

    context.fillStyle = "black";
    if (this.behavior.getColor()) context.fillStyle = this.behavior.getColor().eyes;

    context.beginPath();
    context.arc(this.position.x + 4, this.position.y, 2, 0, Math.PI * 2, true);
    context.fill();

    context.beginPath();
    context.arc(this.position.x - 8, this.position.y, 2, 0, Math.PI * 2, true);
    context.fill();

};
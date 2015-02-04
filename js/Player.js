/*@constructor
/* param {Vector} position
/* param {number} speed
/* param {number} width
/* param {number} height
/* param {GameState} currentGameState
*/

function Player(position, speed, width, height, currentGameState) {
    goog.base(this, position, speed, width, height);
    this.currentGameState = currentGameState;
    this.isEnergized = false;
    this.lives = 3;
    this.direction = new Vector(0, 0);
    this.newDirection = new Vector(0, 0);
}

goog.inherits(Player, Entity);


/*
*param {Vector} position
*/
Player.prototype.isValidPosition = function (position) {
    var topLeftCoordinates = this.currentGameState.maze.getMapCoordinates(position.add(new Vector(-this.width / 2, -this.height / 2)));
    var bottomRightCoordinates = this.currentGameState.maze.getMapCoordinates(position.add(new Vector(this.width / 2, this.height / 2)));
    
    return this.currentGameState.maze.isValidPosition(topLeftCoordinates) && this.currentGameState.maze.isValidPosition(bottomRightCoordinates);
};


Player.prototype.move = function (dt) {

    var new_position = this.position.add(this.direction.multiply(this.speed * dt));

    if (new_position.x < 0) new_position.x += this.currentGameState.game.width;
    if (new_position.x >= this.currentGameState.game.width) new_position.x -= this.currentGameState.game.width;

    if (this.isValidPosition(new_position)) {
        this.position = new_position;
    }
};

Player.prototype.canChangeDirection = function () {
    if(!this.isOnWholeSquare(this.position))return false;
    var coordinate = this.currentGameState.maze.getMapCoordinates(this.position);
    var new_coordinate = coordinate.add( new Vector(this.newDirection.y, this.newDirection.x) );
    return this.currentGameState.maze.isValidPosition(new_coordinate);
};


Player.prototype.update = function (dt) {
    if (this.canChangeDirection()) this.direction = this.newDirection.clone();
    this.move(dt);
};

Player.prototype.draw = function (context) {

    context.beginPath();
    context.arc(this.position.x, this.position.y, this.width / 2, Math.PI / 7, -Math.PI / 7, false);
    context.lineTo(this.position.x, this.position.y);
    context.closePath();
    context.stroke();
    context.fillStyle = Game.PACMAN.color;
    context.fill();
};
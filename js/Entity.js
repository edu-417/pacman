/*@constructor
/* param {Vector} position
/* param {number} speed
/* param {number} width
/* param {number} height
*/

function Entity(position, speed, width, height) {
    this.position = position.clone();
    this.speed = speed;
    this.width = width;
    this.height = height;
}


Entity.prototype.move = function (dt) {    

    var new_position = this.position.add(this.direction).multiply(this.speed * dt);

    if (this.isValid(new_position)) {
        this.position = new_position;
    }
};

Entity.prototype.isOnWholeSquare = function (position) {

    var topLeftCoordinates = this.currentGameState.maze.getMapCoordinates(position.add(new Vector(-this.width / 2, -this.height / 2)));
    var bottomRightCoordinates = this.currentGameState.maze.getMapCoordinates(position.add(new Vector(this.width / 2, this.height / 2)));
    return topLeftCoordinates.isEqual(bottomRightCoordinates);
}

Entity.prototype.draw = function (context) {

};

Entity.prototype.update = function (dt) {
};

/*@constructor
/* param {Vector} position
/* param {number} speed
/* param {number} width
/* param {number} height
/* param {number} type
*/

function Tile(position, speed, width, height, type) {
    goog.base(this, position, speed, width, height);
    this.type = type;
}

goog.inherits(Tile, Entity);

Tile.WALL = 0;
Tile.BISCUIT = 1;
Tile.EMPTY = 2;
Tile.PILL = 4;

Tile.prototype.update = function (dt) {
};

Tile.prototype.draw = function (context) {


    if (this.type == Tile.WALL) {
        context.fillStyle = "blue";
        context.fillRect(this.position.x - this.width / 2, this.position.y - this.height / 2, this.width, this.height);
    }

    if (this.type == Tile.BISCUIT) {
        context.fillStyle = "black";
        context.fillRect(this.position.x - 2, this.position.y - 2, 4, 4);
        context.fillStyle = "white";
        context.fillRect(this.position.x - 1, this.position.y - 1, 2, 2);
    }

    if (this.type == Tile.PILL) {
        
        context.beginPath();
        context.arc(this.position.x, this.position.y, 8, 0, 2 * Math.PI, true);
        context.fillStyle = "black";
        context.fill();
        context.beginPath();
        context.arc(this.position.x, this.position.y, 5, 0, 2 * Math.PI, true);
        context.fillStyle = "white";
        context.fill();
    }

};
/*@constructor
/* param {number} x
/* param {number} y
*/
function Vector(x, y) {
    this.x = x;
    this.y = y;
}



Vector.EuclidianDistance = function (A, B) {
    return A.substract(B).quadraticModule();
};

/* param {Vector} addedVector
*/

Vector.prototype.add = function (addedVector) {
    return new Vector(this.x + addedVector.x, this.y + addedVector.y);
};


/* param {Vector} addedVector
*/

Vector.prototype.substract = function (substractedVector) {
    return new Vector(this.x - substractedVector.x, this.y - substractedVector.y);
};


Vector.prototype.quadraticModule = function () {
    return this.x * this.x + this.y * this.y;
};

Vector.prototype.module = function () {
    return Math.sqrt(this.quadraticModule());
};

/* param {number} k
*/
Vector.prototype.multiply = function (k) {
    return new Vector(this.x * k, this.y * k);
};

/* param {Vector} vectorB
*/
Vector.prototype.isEqual = function (vectorB) {
    return this.x == vectorB.x && this.y == vectorB.y;
};

Vector.prototype.getOrthogonal = function () {
    return new Vector(-this.y, this.x);
};

Vector.prototype.getReverse = function () {
    return new Vector(-this.x, -this.y);
};

Vector.prototype.clone = function () {
    return new Vector(this.x, this.y);
};
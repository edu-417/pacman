/*@constructor
*/

Maze.dir = [new Vector(-1, 0), new Vector(0, -1), new Vector(1, 0), new Vector(0, 1)];

function Maze(map) {
    this.tiles = null;
    this.map = [];

    for (var i = 0; i < map.length; ++i) this.map[i] = map[i].slice();
}

Maze.prototype.draw = function (context) {
    for (var i = 0; i < this.tiles.length; ++i) {
        this.tiles[i].draw(context);
    }
};

Maze.prototype.update = function (dt) {

    this.tiles = [];

    for (var i = 0; i < this.map.length; ++i) {
        for (var j = 0; j < this.map[i].length; ++j) {
            var y = i * Game.TILE_SIZE + Game.TILE_SIZE / 2;
            var x = j * Game.TILE_SIZE + Game.TILE_SIZE / 2;

            this.tiles.push(new Tile(new Vector(x, y), 0, Game.TILE_SIZE, Game.TILE_SIZE, this.map[i][j]));
        }
    }

    for (var i = 0; i < this.tiles.length; ++i) {
        this.tiles[i].update(dt);
    }
};

Maze.prototype.getMapCoordinates = function (position) {
    var size = Game.TILE_SIZE;
    var x = Math.floor(position.x / size);
    var y = Math.floor(position.y / size);

    return new Vector(y, x);
};

Maze.prototype.isValidPosition = function (position) {

    return this.map[position.x][position.y] != 0 && this.map[position.x][position.y] != 3;

};


Maze.prototype.isInsideMaze = function (position) {
    return position.x >= 0 && position.x < this.map.length && position.y >= 0 && position.y < this.map[0].length;
};

Maze.prototype.bfs = function (source, target) {

    // return Vector.EuclidianDistance(source, target);

    if (!this.isInsideMaze(target)) return Vector.EuclidianDistance(source, target);

    var distance = new Array(this.map.length);
    var used = new Array(this.map.length);

    for (var i = 0; i < this.map.length ; ++i) {
        distance[i] = new Array(this.map[i].length);
        used[i] = new Array(this.map[i].length);
        for (var j = 0; j < this.map[i].length; ++j) {
            distance[i][j] = Number.POSITIVE_INFINITY;
            used[i][j] = false;
        }
    }    

    var Q = new Queue();

    Q.push(source);
    used[source.x][source.y] = true;
    distance[source.x][source.y] = 0;
    //prev[source.x][source.y] = null;

    var map_width = this.map[0].length;

    while (!Q.isEmpty()) {
        var u = Q.front();
        Q.pop();

        for (var i = 0; i < Maze.dir.length; ++i) {
            var to = u.add(Maze.dir[i]);

            if (to.y < 0) to.y += map_width;
            if (to.y >= map_width) to.y -= map_width;

            if (!this.isValidPosition(to)) continue;
            if (used[to.x][to.y]) continue;

            Q.push(to)
            used[to.x][to.y] = true;
            distance[to.x][to.y] = distance[u.x][u.y] + 1;            
            //prev[to.x][to.y] = u;
        }
    }

    /*
    var path = [];

    
    for (var u = target; !u; u = prev[u.x][u.y]) {
        path.push(u);
    }

    path.reverse();
    */

    if (distance[target.x][target.y] == Number.POSITIVE_INFINITY) return Vector.EuclidianDistance(source, target);

    return distance[target.x][target.y];
}



function ChaseBehavior() {
}

ChaseBehavior.prototype.getTargetTile = function (ghost, gameState) {

    var playerCoordinates = gameState.maze.getMapCoordinates(gameState.player.position);
    var ghostCordinates = gameState.maze.getMapCoordinates(ghost.position);
    var current_player_direction = new Vector(gameState.player.direction.y, gameState.player.direction.x);


    var blinky_coordinate = gameState.maze.getMapCoordinates(gameState.getGhostPosition(Game.BLINKY.personality));

    var target = null;

    if (ghost.personality == Game.PINKY.personality) {        

        target = playerCoordinates.add(current_player_direction.multiply(4));
        return target;
    }

    if (ghost.personality == Game.INKY.personality) {

        var coordinate = playerCoordinates.add(current_player_direction.multiply(2));
        target = coordinate.multiply(2).substract(blinky_coordinate);

        return target;
    }
    
    if (ghost.personality == Game.CLYDE.personality) {
        var distance = Vector.EuclidianDistance(playerCoordinates, ghostCordinates);
        if (distance <= 64) {
            return new Vector(22, 0);
        }
    }

    return playerCoordinates;

};

ChaseBehavior.prototype.getColor = function () {
    return null;
};

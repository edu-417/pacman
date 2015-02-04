/*@constructor
*/


Game.MAX_DELTA = 50;

Game.PACMAN = {
    speed: 0.11,
    start_position: {
        x: 9,
        y: 16
    },
    width: 28,
    height: 28,
    color: 'yellow'
};

Game.BLINKY = {
    speed: 0.08,
    start_position: {
        x: 9,
        y: 8
    },
    width: 28,
    height: 28,
    color: 'red',
    personality: 'blinky',
    default_behavior: 'chase'
};
Game.PINKY = {
    speed: 0.08,
    start_position: {
        x: 8,
        y: 10
    },
    width: 28,
    height: 28,
    color: 'pink',
    personality: 'pinky',
    default_behavior: 'chase'
};
Game.INKY = {
    speed: 0.08,
    start_position: {
        x: 9,
        y: 10
    },
    width: 28,
    height: 28,
    color: 'skyblue',
    personality: 'inky',
    default_behavior: 'chase'
};

Game.CLYDE = {
    speed: 0.08,
    start_position: {
        x: 10,
        y: 10
    },
    width: 28,
    height: 28,
    color: 'orange',
    personality: 'clyde',
    default_behavior: 'chase'
};

Game.TILE_SIZE = 30;
Game.FRIGHT_TIME = 6000;

Game.BEHAVIORS = {
    chase: 'chase',
    scatter: 'scatter',
    frightened: 'frightened',
    dead: 'dead'
};

Game.INTERVALS = [

    {
        start: 1,
        end: 1,
        points: [
            {
                behavior: 'scatter',
                value: 0
            },

            {
                behavior: 'chase',
                value: 7
            },

            {
                behavior: 'scatter',
                value: 27
            },

            {
                behavior: 'chase',
                value: 34
            },

            {
                behavior: 'scatter',
                value: 54
            },

            {
                behavior: 'chase',
                value: 59
            },

            {
                behavior: 'scatter',
                value: 79
            },

            {
                behavior: 'chase',
                value: 84
            }
        ]
    },
    {
        start: 2,
        end: 4,

        points: [
            {
                behavior: 'scatter',
                value: 0
            },

            {
                behavior: 'chase',
                value: 7
            },

            {
                behavior: 'scatter',
                value: 27
            },

            {
                behavior: 'chase',
                value: 34
            },

            {
                behavior: 'scatter',
                value: 54
            },

            {
                behavior: 'chase',
                value: 59
            },

            {
                behavior: 'scatter',
                value: 1092
            },

            {
                behavior: 'chase',
                value: 1092 + 1 / 60
            }            
        ]
    },

    {
        start: 5,
        end: Number.POSITIVE_INFINITY,
        points: [
            {
                behavior: 'scatter',
                value: 0
            },

            {
                behavior: 'chase',
                value: 7
            },

            {
                behavior: 'scatter',
                value: 27
            },

            {
                behavior: 'chase',
                value: 34
            },

            {
                behavior: 'scatter',
                value: 54
            },

            {
                behavior: 'chase',
                value: 59
            },

            {
                behavior: 'scatter',
                value: 1096
            },

            {
                behavior: 'chase',
                value: 1096 + 1 / 60
            }
        ]
    }

];

function Game() {
    var distance = Vector.EuclidianDistance(new Vector(2, 3), new Vector(3, 4));
    var canvas = document.getElementById('canvas');
    this.context = canvas.getContext('2d');
    this.width = canvas.width;
    this.height = canvas.height;
    this.currentGameState = null;
    this.previousTimeStamp = -1;
    this.map = [
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	        [0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0],
	        [0, 4, 0, 0, 1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 1, 0, 0, 4, 0],
	        [0, 1, 0, 0, 1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 1, 0, 0, 1, 0],
	        [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
	        [0, 1, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 1, 0],
	        [0, 1, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 1, 0],
	        [0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0],
	        [2, 2, 2, 0, 1, 0, 1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 2, 2, 2],
	        [0, 0, 0, 0, 1, 0, 1, 0, 0, 2, 0, 0, 1, 0, 1, 0, 0, 0, 0],
	        [2, 2, 2, 2, 1, 1, 1, 0, 2, 2, 2, 0, 1, 1, 1, 2, 2, 2, 2],
	        [0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0],
	        [2, 2, 2, 0, 1, 0, 1, 1, 1, 2, 1, 1, 1, 0, 1, 0, 2, 2, 2],
	        [0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0],
	        [0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0],
	        [0, 1, 0, 0, 1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 1, 0, 0, 1, 0],
	        [0, 4, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 4, 0],
	        [0, 0, 1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 1, 0, 1, 0, 0],
	        [0, 1, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 1, 0],
	        [0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0],
	        [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
	        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    ];
}

Game.prototype.clear = function () {
    this.context.clearRect(0, 0, this.width, this.height);
};

Game.prototype.setInitialState = function () {
    this.currentGameState = new GameState(this, 1);
    this.currentGameState.player = new Player(new Vector(Game.PACMAN.start_position.x * Game.TILE_SIZE + Game.TILE_SIZE / 2, Game.PACMAN.start_position.y * Game.TILE_SIZE + Game.TILE_SIZE / 2), Game.PACMAN.speed, Game.PACMAN.width, Game.PACMAN.height, this.currentGameState);
    this.currentGameState.ghosts.push(new Ghost(new Vector(Game.BLINKY.start_position.x * Game.TILE_SIZE + Game.TILE_SIZE / 2, Game.BLINKY.start_position.y * Game.TILE_SIZE + Game.TILE_SIZE / 2), Game.BLINKY.speed, Game.BLINKY.width, Game.BLINKY.height, this.currentGameState, Game.BLINKY.personality, Game.BLINKY.default_behavior));
    this.currentGameState.ghosts.push(new Ghost(new Vector(Game.PINKY.start_position.x * Game.TILE_SIZE + Game.TILE_SIZE / 2, Game.PINKY.start_position.y * Game.TILE_SIZE + Game.TILE_SIZE / 2), Game.PINKY.speed, Game.PINKY.width, Game.PINKY.height, this.currentGameState, Game.PINKY.personality, Game.PINKY.default_behavior));
    this.currentGameState.ghosts.push(new Ghost(new Vector(Game.INKY.start_position.x * Game.TILE_SIZE + Game.TILE_SIZE / 2, Game.INKY.start_position.y * Game.TILE_SIZE + Game.TILE_SIZE / 2), Game.INKY.speed, Game.INKY.width, Game.INKY.height, this.currentGameState, Game.INKY.personality, Game.INKY.default_behavior));
    this.currentGameState.ghosts.push(new Ghost(new Vector(Game.CLYDE.start_position.x * Game.TILE_SIZE + Game.TILE_SIZE / 2, Game.CLYDE.start_position.y * Game.TILE_SIZE + Game.TILE_SIZE / 2), Game.CLYDE.speed, Game.CLYDE.width, Game.CLYDE.height, this.currentGameState, Game.CLYDE.personality, Game.CLYDE.default_behavior));
    this.currentGameState.maze = new Maze(this.map);

    document.addEventListener('keydown', this.currentGameState.onkeydown.bind(this.currentGameState));
};

Game.prototype.update = function (dt) {
    dt = Math.min(dt, Game.MAX_DELTA);

    this.currentGameState.update(dt);
};

Game.prototype.draw = function () {
    this.clear();
    this.currentGameState.draw(this.context);
};

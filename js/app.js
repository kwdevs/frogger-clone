// Enemies our player must avoid
var Enemy = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';

    //Sets each newly created Enemy to a random lane of the 3 possible lanes
    this.y = this.getStartPoint(1, 3);
    this.x = 0;

    //Delegates the lookups to Enemy.prototype for newly created Enemies.
    Object.create(Enemy.prototype);

};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers
    ctx.clearRect(0,0,ctx.canvas.width,ctx.canvas.height);

};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

//Begin my Enemy Methods
//
//Get random start point for enemy
Enemy.prototype.getStartPoint = function(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    
    var randomPoint = Math.floor(Math.random() * (max - min + 1)) + min;

    if (randomPoint === 1) {
        return this.y = 60;
    }   else if (randomPoint === 2) {
        return this.y = 143;
    }   else {
        return this.y = 228;
    };

};
// Now write your own player class
// This class requires an update(), render(),
// a handleInput(), checkCollisions() method.

// Player Class
var Player = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our player, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/char-boy.png';

    var startCoordinateX = ctx.canvas.width/2 -50;
    var startCoordinatey = 400;

    this.x = startCoordinateX;
    this.y = startCoordinatey;

    var obj = Object.create(Player.prototype);

};

// Update the player's position
Player.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.

};

// Draw the player on the screen, required method for game
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.handleInput = function (key) {
    
    switch (key) {

        case 'left':
            if (player.x - 100 > 0) {
                player.x -= 100;
                break;
            } else {
                return;
            }
        case 'right':
            if (player.x + 100 < ctx.canvas.width - 100) {
                player.x += 100;
                break;
            } else {
                return;
            }
        case 'up':
            if (player.y - 83 > -83) {
                player.y -= 83;
                console.log(player.y);
                break;
            } else if (player.y < 0) {
                ;
            }
        case 'down':
            if (player.y + 83 < ctx.canvas.height - 166) {
                player.y += 83;
                break;
            } else {
                return;
            }
    };
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

var bug = new Enemy();
var bug1 = new Enemy();
var bug2 = new Enemy();

var allEnemies = [bug, bug1, bug2,];

var player = new Player();


// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});

// Enemies our player must avoid
var Enemy = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';

    var speed = this.setSpeed(10, 50);
    // console.log(Speed);
    var angle = 0;
    var velocityX = Math.cos(angle) * speed;
    // console.log(velocityX);
    //Sets each newly created Enemy to a random lane of the 3 possible lanes
    this.y = this.getStartPoint(1, 3);
    this.x = -100;

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
    //increment the x property here using the keyword 'this'
    ++this.x;
    this.x + Enemy.velocityX * dt;
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

    // Make sure that only 1 y coordinate is assigned to Enemies so they don't spawn on top of one another.

    
};

Enemy.prototype.setSpeed = function(min, max) {

    min = Math.ceil(min);
    max = Math.floor(max);

    var randomSpeed = Math.floor(Math.random() * (max - min + 1)) + min;

    return randomSpeed;
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
    var startCoordinateY = 400;

    this.x = startCoordinateX;
    this.y = startCoordinateY;

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
    
    ctx.save();

    ctx.restore();
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
                // console.log(player);
                break;
                // Need to figure out how to alert a win when player reaches the water.
            } else if (player.y < 68) {
                window.alert("Winner Winner Chicken Dinner");      
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

// Create new bugs based on an interval of time and push them to the allEnemies Array
// using an inline anonymous function passed to setInterval.
setInterval(function() {    var newBug = new Enemy();

                            Enemy.y = Enemy.prototype.getStartPoint(1,3);

                            allEnemies.push(newBug);

                        }, 3000);

var allEnemies = [];

console.log(allEnemies);

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

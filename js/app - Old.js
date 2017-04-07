
// Enemies our player must avoid
var Enemy = function() {
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';

    this.speed = this.setSpeed(10, 200);
    this.velocity = this.velocityX();
    
    //Sets each newly created Enemy to a random lane of the 3 possible lanes
    this.y = this.getStartPoint(1, 3);
    this.x = -100;

    //Delegates the lookups to Enemy.prototype for newly created Enemies.
    Object.create(Enemy.prototype);
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {

    ctx.clearRect(0,0,ctx.canvas.width,ctx.canvas.height);
    
    //increment the x property here using the keyword 'this'
    this.x += this.velocity * dt;
    
    //Remove excess enemies
    this.removeEnemies();
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

//Begin My Enemy Methods

//Get random start point for enemy
Enemy.prototype.getStartPoint = function(min, max) {
    
    min = Math.ceil(min);
    max = Math.floor(max);
    
    var randomPoint = Math.floor(Math.random() * (max - min + 1)) + min;
    
    var lastStartPoint = [];
    
    lastStartPoint.push(randomPoint);

    //Helps diversify spawn points
    this.spreadEnemies(lastStartPoint, randomPoint);

    if (randomPoint === 1) {
        return this.y = 60;
    }   else if (randomPoint === 2) {
        return this.y = 143;
    }   else {
        return this.y = 228;
    }; 
};
 
//Make enemies start point more diverse.
Enemy.prototype.spreadEnemies = function(lastStartPoint,randomPoint) {
    if (lastStartPoint = randomPoint) {
        
        ++randomPoint;

        return randomPoint;
    };
};

//Get random speed for each Enemy instance
Enemy.prototype.setSpeed = function(min, max) {

    min = Math.ceil(min);
    max = Math.floor(max);

    var randomSpeed = Math.floor(Math.random() * (max - min + 1)) + min;

    return randomSpeed;
};

//Get random velocity
Enemy.prototype.velocityX = function(){
    
    var angle = 0;
    
    var getRandomNum = function(min, max) {
        
        min = Math.ceil(min);
        max = Math.floor(max);

        return Math.floor(Math.random() * (max - min)) + min;
    };
    
    var multiplier = getRandomNum(1, 5);
    
    //No need for a degrees to radians conversion yet
    //Since angle = 0 is the same as radians = 0
    var newAngle = Math.ceil(Math.cos(angle));
    var radsToDegrees = Math.ceil((multiplier * (newAngle * 180 / Math.PI)));
    var velocity = radsToDegrees;

    return velocity;
};

//Remove enemies that have exited right on canvas
//preventing excess buildup of offscreen enemies
Enemy.prototype.removeEnemies = function () {
    if (allEnemies.length > 10) {
        allEnemies.splice(0,1);
    };
};

//Begin Player Class And Methods

// Player Class
var Player = function() {
    
    // The image/sprite for our player, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/char-princess-girl.png';

    var startCoordinateX = ctx.canvas.width/2 -50;
    var startCoordinateY = ctx.canvas.width - 100;

    this.x = startCoordinateX;
    this.y = startCoordinateY;

    var obj = Object.create(Player.prototype);
};

// Update the player's position
Player.prototype.update = function(dt) {

};
console.log(Player.prototype.update);
// Draw the player on the screen, required method for game
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

//Accepts allowedKeys and moves player accordingly.
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
                break;
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

//Very basic game reset method
Player.prototype.resetGame = function() {
    Object.freeze(Enemy);
    document.location.href = '';
};

Player.prototype.checkWin = function() {
    if (Player.y = -10) {
        displayPopup('images/winner.png', 600, 200);
    } else {
        return false;
    };
};


//Method to determine if player hits enemies or wins game
function checkCollisions() {
    
    player.width = 67;
    player.height = 70;

    allEnemies.width = 80;
    allEnemies.height = 65;

    for (var i = 0; allEnemies[i]; i++) {
        if (player.x < allEnemies[i].x + allEnemies.width
            && player.x + player.width > allEnemies[i].x
            && player.y < allEnemies[i].y + allEnemies.height
            && player.height + player.y > allEnemies[i].y) {
                Player.prototype.resetGame();
        };
    };
};

function displayPopup(src, width, height) {

    var popup = document.createElement('img');
    
    popup.src = src;
    popup.width = width;
    popup.height = height;

    document.body.appendChild(popup);
};



// Create new enemies based on an interval of time and push them to the allEnemies Array
// using an inline anonymous function passed to setInterval.
setInterval(function() {    var newBug = new Enemy();

                            allEnemies.push(newBug);

                        }, 1200);

var allEnemies = [];

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

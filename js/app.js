

var DivScore = document.createElement('div');
var canvas = document.getElementsByTagName('canvas')[0];
document.body.insertBefore(DivScore, canvas);
var score = 0;

// Enemies our player must avoid
var Enemy = function (x, y, speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    this.sprite = 'images/enemy-bug.png';
    this.x = x;
    this.y = y;
    this.speed = speed;

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images

};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function (dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x = this.x + this.speed * dt;
    if (this.x >= 505) {
        this.x = 0;
    }
    this.Collision();
};


Enemy.prototype.Collision = function () {
    if (player.y + 131 >= this.y + 90 &&
        player.y + 73 <= this.y + 135 &&
        player.x + 25 <= this.x + 88 &&
        player.x + 76 >= this.x + 11) {
        console.log('collision happend');
        Reset();
    }
};
// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};



// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function (x, y, speed) {
    this.sprite = 'images/char-horn-girl.png';
    this.x = x;
    this.y = y;
    this.speed = speed;

};


Player.prototype.update = function () { };


Player.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

/*
 * handles input for the player
 */
Player.prototype.handleInput = function (key) {
    
    if (key == 'right') {
        this.x = (this.x + this.speed) % 505;

    } else if (key == 'up') {
        this.y = (this.y - this.speed + 606) % 606;
       //reaching the water
        if (this.y <= (90 - 40)) {
            ReachedWater();
        }
    } else if (key == 'left') {
        this.x = (this.x - this.speed + 505) % 505;
    } else { //down
        this.y = (this.y + this.speed) % 606;
        if (this.y > 400) {
            this.y = 400;
        }
    }
};







//player default position

Player.prototype.reset = function () {
    this.x = 202.5;
    this.y = 383;
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
var allEnemies = [];
// Place the player object in a variable called player

var player = new Player(0, 0, 50);

Reset(); // the defaults



//resets after the collision
function Reset() {
    player.reset(); //player to default position
    score = 0;
    ScoreDisplay();
    allEnemies = [];
    allEnemies.push(
        new Enemy(0, Math.random() * 200+ 50, Math.random() * 100 + 80),
        new Enemy(0, Math.random() * 250 + 70, Math.random() * 100 + 40)
    );
}


function ReachedWater() {
    player.reset();

    score += 1;

    ScoreDisplay();
    // increase enemies by score
    if (score % 2 == 0 && allEnemies.length < 4) {
        allEnemies.push(new Enemy(0, Math.random() * 160 + 50, Math.random() * 90 + 70));

    }
    console.log('you won');
}

/*
 * updates the on screen score display
 */
function ScoreDisplay() {
    DivScore.innerHTML = 'Score ' + score;
}



// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function (e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});


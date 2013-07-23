GAME_WIDTH = 600;
GAME_HEIGHT = 400;

function MovingObject(pos, vel) {
  this.pos = pos;
  this.vel = vel;
}

// velocity should be an array: [dx, dy]
MovingObject.prototype.update = function() {
  this.pos[0] += this.vel[0];
  this.pos[1] += this.vel[1];
}

MovingObject.prototype.offScreen = function() {
  if (this.pos[0] >= GAME_WIDTH || this.pos[0] <= 0) {
    return true;
  }
  if (this.pos[1] >= GAME_HEIGHT || this.pos[1] <= 0) {
    return true;
  }
  return false;
}

function Asteroid(pos, vel) {
  MovingObject.call(this, pos, vel);
  this.color = "#fff";
  this.radius = (Math.floor(Math.random() * 30) + 20);
}

Asteroid.inherits(MovingObject);

//Check if correct later
Asteroid.prototype.randomAsteroid = function(){
  var x = Math.floor(Math.random() * 550) + 50;
  var y = Math.floor(Math.random() * 350) + 50;
  var dx = Math.floor(Math.random() * 10) - 5;
  var dy = Math.floor(Math.random() * 10) - 5;

  return new Asteroid([x, y], [dx, dy]);
}

Asteroid.prototype.draw = function(ctx){
  ctx.beginPath();
  ctx.arc(this.pos[0], this.pos[1], this.radius, 0, Math.PI*2, true);
  ctx.closePath();
  ctx.fillStyle = this.color;
  ctx.fill();

  // ctx.fillStyle = "green";
  // ctx.fillRect(50, 50, 50, 50);
}

function Game(ctx){
  this.asteroids = [];
  this.ctx = ctx;

  var numAsteroids = Math.floor(Math.random() * 15) + 5;
  for(var i = 0; i < numAsteroids; i++){
    //Use randomAsteroid method if its correct later
    var x = Math.floor(Math.random() * 550) + 50;
    var y = Math.floor(Math.random() * 350) + 50;
    var dx = Math.floor(Math.random() * 6) - 3;
    var dy = Math.floor(Math.random() * 6) - 3;
    var asteroid = new Asteroid([x, y], [dx, dy]);
    this.asteroids.push(asteroid);
  }
}

Game.prototype.draw = function(){
  var that = this;
  this.ctx.fillStyle = "#000";
  this.ctx.fillRect(0, 0, GAME_WIDTH, GAME_HEIGHT);
  this.asteroids.forEach(function(asteroid){
    asteroid.draw(that.ctx);
  });
}

Game.prototype.update = function() {
  for(var i = 0; i < this.asteroids.length; i++){
    var asteroid = this.asteroids[i];
    asteroid.update();
    if(asteroid.offScreen()){
      this.asteroids.splice(i, 1);
      i--;
    }
  }
  this.draw();
}

Game.prototype.start = function(){
  var that = this;
  window.setInterval(function(){
    that.update();
  },31);
}

var canvas = $('canvas');
var ctx = canvas[0].getContext('2d');
var game = new Game(ctx);
console.log(game.asteroids);
game.start();



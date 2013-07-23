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
}
function Asteroid(pos, vel) {
  this.radius = (Math.floor(Math.random() * 30) + 20);
  MovingObject.call(this, pos, vel, this.radius * 2, this.radius * 2);
  this.color = "#fff";
}

Asteroid.inherits(MovingObject);

//Check if correct later
Asteroid.randomAsteroid = function(){

  var i = Math.floor(Math.random() * 2);
  if(i % 2 == 0){
    var x = Math.floor(Math.random() * 200) + 25;
    var y = Math.floor(Math.random() * 350) + 50;
    var dx = Math.floor(Math.random() * 2);
    var dy = Math.floor(Math.random() * 4) - 2;
  }else{
    var x = Math.floor(Math.random() * 100) + 500;
    var y = Math.floor(Math.random() * 350) + 50;
    var dx = Math.floor(Math.random() * -2);
    var dy = Math.floor(Math.random() * 4) - 2;
  }
  return new Asteroid([x, y], [dx, dy]);
}

Asteroid.prototype.draw = function(ctx){
  ctx.beginPath();
  ctx.arc(this.pos[0], this.pos[1], this.radius, 0, Math.PI*2, true);
  ctx.closePath();
  ctx.fillStyle = this.color;
  ctx.fill();
}
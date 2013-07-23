function Ship(pos){
  MovingObject.call(this, pos, [0, 0])
  this.width = 20;
  this.height = 30;
}

Ship.inherits(MovingObject);

Ship.prototype.draw = function(ctx){
  ctx.fillStyle = "red";
  ctx.beginPath();
  ctx.moveTo(this.pos[0], this.pos[1] - this.height / 2);
  ctx.lineTo(this.pos[0] - this.width / 2, this.pos[1] + this.height / 2);
  ctx.lineTo(this.pos[0] + this.width / 2, this.pos[1] + this.height / 2);
  ctx.closePath();
  ctx.fill();
}

Ship.prototype.isHit = function(asteroid){
  var dist = Math.sqrt(
    Math.pow((asteroid.pos[0] - this.pos[0]), 2) +
    Math.pow((asteroid.pos[1] - this.pos[1]), 2)
  );

  if (dist < (asteroid.radius + this.width / 4)) {
    return true;
  }
  return false;
}
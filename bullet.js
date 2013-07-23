BULLET_SPEED = 10;

var Bullet = function(ship) {
  MovingObject.call(this, ship.pos.slice(0), ship.vel.slice(0), 3, 3);
  this.ship = ship;
  this.angle = this.ship.angle;
}

Bullet.inherits(MovingObject);

Bullet.prototype.draw = function(ctx) {
  var shipTip = [this.pos[0], this.pos[1] - this.ship.height/2];
  shipTip = this.ship._rotatePoint(shipTip[0], shipTip[1],
                          this.pos[0], this.pos[1], this.angle);

  var dx = ((shipTip[0] - this.pos[0]) / 20) * BULLET_SPEED;
  var dy = ((shipTip[1] - this.pos[1]) / 30) * BULLET_SPEED;

  this.vel = [dx,dy];

  ctx.fillStyle = '#c00';
  ctx.fillRect(this.pos[0], this.pos[1], this.width, this.height);
}

Bullet.prototype.checkCollision = function(asteroid) {

    var dist = Math.sqrt(
      Math.pow((asteroid.pos[0] - this.pos[0]), 2) +
      Math.pow((asteroid.pos[1] - this.pos[1]), 2)
    );

    if (dist < (asteroid.radius + this.height)) {
      return true;
    }
    return false;
}

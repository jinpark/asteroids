function Ship(pos, game){
  MovingObject.call(this, pos, [0, 0], 20, 30)
  this.angle = 180;
  this.game = game;
}

Ship.inherits(MovingObject);

Ship.prototype._rotatePoint = function(pointX, pointY, originX, originY, angle){
    angle = angle * Math.PI / 180.0;
    var x = Math.cos(angle) * (pointX-originX) -
            Math.sin(angle) * (pointY-originY) + originX;
    var y = Math.sin(angle) * (pointX-originX) +
            Math.cos(angle) * (pointY-originY) + originY;
    return [x, y];
}

Ship.prototype.draw = function(ctx){
  ctx.fillStyle = "red";
  ctx.beginPath();

  var tip = [this.pos[0], this.pos[1] - this.height / 2];
  var baseLeft = [this.pos[0] - this.width / 2, this.pos[1] + this.height / 2];
  var baseRight = [this.pos[0] + this.width / 2, this.pos[1] + this.height / 2];

  //Apply angle
  tip = this._rotatePoint(tip[0], tip[1], this.pos[0], this.pos[1], this.angle);
  baseLeft = this._rotatePoint(baseLeft[0], baseLeft[1],
                               this.pos[0], this.pos[1], this.angle);
  baseRight = this._rotatePoint(baseRight[0], baseRight[1],
                               this.pos[0], this.pos[1], this.angle);

  ctx.moveTo(tip[0], tip[1]);
  ctx.lineTo(baseLeft[0], baseLeft[1]);
  ctx.lineTo(baseRight[0], baseRight[1]);

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

Ship.prototype.turn = function(event) {
  if(event.keyIdentifier == "Left"){
    this.angle -= 4;
  }else if(event.keyIdentifier == "Right"){
    this.angle += 4;
  }
}

Ship.prototype.power = function(event){
  if(event.keyIdentifier == "Up"){
    var tip = [this.pos[0], this.pos[1] - this.height/2];
    tip = this._rotatePoint(tip[0], tip[1],
                            this.pos[0], this.pos[1], this.angle);

    var dx = (tip[0] - this.pos[0]) / 20;
    var dy = (tip[1] - this.pos[1]) / 30;

    this.vel[0] += dx;
    this.vel[1] += dy;
  }
}

Ship.prototype.fireBullet = function(){
  this.game.bullets.push(new Bullet(this));
}





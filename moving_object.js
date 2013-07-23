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
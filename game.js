function Game(ctx){
  this.asteroids = [];
  this.ctx = ctx;
  this.ship = new Ship([GAME_WIDTH / 2, GAME_HEIGHT / 2]);

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
  this.ship.draw(ctx);
}

Game.prototype.update = function() {
  for(var i = 0; i < this.asteroids.length; i++){
    var asteroid = this.asteroids[i];
    asteroid.update();
    if(asteroid.offScreen()){
      this.asteroids.splice(i, 1);
      i--;
    }
    if(this.ship.isHit(asteroid)){
      console.log("Hit!");
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
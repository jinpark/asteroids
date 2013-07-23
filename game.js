function Game(ctx){
  this.asteroids = [];
  this.ctx = ctx;
  this.ship = new Ship([GAME_WIDTH / 2, GAME_HEIGHT / 2], this);
  this.bullets = [];
  this.interval = null;
}

Game.prototype.generateAsteroids = function(){
  var numAsteroids = Math.floor(Math.random() * 10) + 5;
  for(var i = 0; i < numAsteroids; i++){
    this.asteroids.push(Asteroid.randomAsteroid());
  }
}

Game.prototype.draw = function(){
  var that = this;
  this.ctx.fillStyle = "#000";
  this.ctx.fillRect(0, 0, GAME_WIDTH, GAME_HEIGHT);

  this.asteroids.forEach(function(asteroid){
    asteroid.draw(that.ctx);
  });

  this.bullets.forEach(function(bullet){
    bullet.draw(that.ctx);
  });

  this.ship.draw(ctx);
}

Game.prototype.update = function() {
  this.ship.update();
  if(this.ship.offScreen()){
    this.ship.pos[0] = (this.ship.pos[0] + GAME_WIDTH) % GAME_WIDTH;
    this.ship.pos[1] = (this.ship.pos[1] + GAME_HEIGHT) % GAME_HEIGHT;
  }

  for(var i = 0; i < this.asteroids.length; i++){
    var asteroid = this.asteroids[i];
    asteroid.update();
    if(asteroid.offScreen()){
      if(asteroid.pos[0] < 0){
        asteroid.pos[0] = (asteroid.pos[0] + GAME_WIDTH) %
                           GAME_WIDTH + asteroid.width;
      }else{
        asteroid.pos[0] = (asteroid.pos[0] + GAME_WIDTH) %
                           GAME_WIDTH - asteroid.width;
      }

      if(asteroid.pos[1] < 0) {
        asteroid.pos[1] = (asteroid.pos[1] + GAME_HEIGHT) %
                           GAME_HEIGHT + asteroid.width;
      }else{
        asteroid.pos[1] = (asteroid.pos[1] + GAME_HEIGHT) %
                           GAME_HEIGHT - asteroid.width;
      }
    }
    if(this.ship.isHit(asteroid)){
      window.clearInterval(this.interval);
      alert("Game Over!");
    }
  }

  for (var j = 0; j < this.bullets.length; j++) {
    var bullet = this.bullets[j];
    bullet.update();
    for (var k = 0; k < this.asteroids.length; k++ ) {
      var asteroid = this.asteroids[k];

      if (bullet.checkCollision(asteroid)) {
        this.bullets.splice(j, 1);
        this.asteroids.splice(k, 1);
      }
    }
  }

  if(this.asteroids.length === 0){
    this.generateAsteroids();
  }

  this.draw();
}


Game.prototype.start = function(){
  this.generateAsteroids();

  var that = this;

  key('left, right', function(event){
    that.ship.turn(event);
  });

  key('up, down', function(event){
    that.ship.power(event);
  })

  key('space', function(event){
     that.ship.fireBullet(event);
  })

  this.interval = window.setInterval(function(){
    that.update();
  },31);
}
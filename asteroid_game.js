GAME_WIDTH = 600;
GAME_HEIGHT = 400;

var canvas = $('canvas');
var ctx = canvas[0].getContext('2d');
var game = new Game(ctx);
ctx.fillStyle = "#000";
ctx.fillRect(0, 0, GAME_WIDTH, GAME_HEIGHT);


ctx.font="30pt Arial";
ctx.strokeStyle = "white";
ctx.strokeText("Click to Play", GAME_WIDTH / 2, GAME_HEIGHT / 2);

canvas.on('click', function(){
  game.start();
})




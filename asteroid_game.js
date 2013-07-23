GAME_WIDTH = 600;
GAME_HEIGHT = 400;

var canvas = $('canvas');
var ctx = canvas[0].getContext('2d');
var game = new Game(ctx);
game.start();



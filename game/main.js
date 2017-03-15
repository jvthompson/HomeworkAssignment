var game = new Phaser.Game(800, 600, Phaser.AUTO, 'game');

var playSound = true;
var playMusic = true;
var musicPlayer;

var Main = function() {};

Main.prototype = {
    preload: function () {
        game.load.image('stars', 'assets/images/bg.jpg');
        game.load.image('loading', 'assets/images/loading.png');
        game.load.image('brand', 'assets/images/logo.png');
        game.load.script('Splash', 'states/Splash.js');
        game.load.script('utils', 'lib/utils.js');
        game.load.script('style', 'lib/style.js');
        game.scale.pageAlignHorizontally = true;
        game.scale.pageAlignVertically = true;
        game.scale.refresh();
        $("body").animate({ backgroundColor: "#000000" }, 2000);
    },
    
    create: function () {
        game.state.add('Splash', Splash);
        game.state.start('Splash');
    }
}

game.state.add('Main', Main);
game.state.start('Main');
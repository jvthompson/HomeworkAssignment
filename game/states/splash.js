var Splash = function () {};
var playSound = true;
var playMusic = true;
var music;

Splash.prototype = {
    loadScripts: function (){
        game.load.script('WebFont', 'vendor/webfontloader.js');
        game.load.script('GameMenu', 'states/gameMenu.js');
        game.load.script('Game', 'states/game.js');
        game.load.script('GameOver', 'states/gameOver.js');
        game.load.script('Credits', 'states/credits.js');
        game.load.script('Options', 'states/options.js');
    },
    
    loadBgm: function () {
        game.load.audio('junes', 'assets/bgm/junestheme.mp3');
        game.load.audio('exit', 'assets/bgm/Exit the Premises.mp3');
    },
    
    loadImages: function () {
        game.load.image('menu-bg', 'assets/images/menu-bg.jpg');
        game.load.image('options-bg', 'assets/images/options-bg.jpg');
    },
    
    loadFonts: function () {
        WebFontConfig = {
            custom: {
                families: ['Mario Kart DS'],
                urls: ['assets/style/mariokart.css']
            }
        }
    },
    
    addGameStates: function () {
        game.state.add("GameMenu",GameMenu);
        game.state.add("Game",Game);
        game.state.add("GameOver",GameOver);
        game.state.add("Credits",Credits);
        game.state.add("Options",Options);
    },

    addGameMusic: function () {
        music = game.add.audio('junes');
        music.loop = true;
        music.play();
    },
    
    init: function () {
        this.loadingBar = game.make.sprite(game.world.centerX-(387/2), 400, "loading");
        this.logo       = game.make.sprite(game.world.centerX, 200, 'brand');
        this.status     = game.make.text(game.world.centerX, 380, 'Loading...', {fill: 'white'});
        utils.centerGameObjects([this.logo, this.status]);
    },
    
    preload:function() {
        game.add.sprite(0,0,'stars');
        game.add.existing(this.logo).scale.setTo(0.5);
        game.add.existing(this.loadingBar);
        game.add.existing(this.status);
        this.load.setPreloadSprite(this.loadingBar);
        
        this.loadScripts();
        this.loadImages();
        this.loadFonts();
        this.loadBgm();
    },
    
    create: function() {
        this.status.setText('Ready!');
        this.addGameMusic();
        this.addGameStates();

        setTimeout(function () {
            game.state.start("GameMenu");
        }, 5000);
    }
}
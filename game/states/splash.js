var Splash = function () {};

Splash.prototype = {
    init: function () {
        this.sunny = game.add.sprite(400, 300,'sun');
        this.sunny.scale.setTo(0.75);
        this.sunny.anchor.setTo(0.5);
        
        this.status = game.make.text(game.world.centerX, 380, 'Loading...', {fill: 'white'});
        this.status.anchor.setTo(0.5);
    },
    
    preload:function() {
        game.add.existing(this.status);
        this.load.setPreloadSprite(this.sunny, 1);
        
        this.loadScripts();
        this.loadImages();
        this.loadFonts();
        this.loadBgm();
    },
    
    create: function() {
        this.status.setText("For Tabi. You'll always be my sunshine.").setStyle(style.navitem.credit);
        this.addGameMusic();
        this.addGameStates();
        this.createSFXMarkers();
        setTimeout(function () {
            game.state.start("GameMenu");
        }, 5000);
    },
    
    update: function() {
        game.stage.backgroundColor = $("body").css("background-color");
        
    },
    
    loadScripts: function (){
        game.load.script('WebFont', 'vendor/webfontloader.js');
        game.load.script('GameMenu', 'states/gameMenu.js');
        game.load.script('Game', 'states/game.js');
        game.load.script('GameOver', 'states/gameOver.js');
        game.load.script('Credits', 'states/credits.js');
        game.load.script('Options', 'states/options.js');
    },
    
    loadBgm: function () {
        game.load.audio('theme', 'assets/bgm/Leaving.mp3');        
        game.load.audio('sfx', 'assets/audio/piano.ogg');
        game.load.audio('sea', 'assets/audio/seaside.ogg');
    },
    
    loadImages: function () {
        game.load.spritesheet('lux', 'assets/images/lux_fix2.png', 219, 280);
        game.load.tilemap('gameWorld', 'assets/level.json', null, Phaser.Tilemap.TILED_JSON);
        game.load.image('tiles', 'assets/images/Tile.png');
    },
    
    loadFonts: function () {
        WebFontConfig = {
            custom: {
                families: ['Sugarpunch'],
                urls: ['assets/style/sugarpunch.css']
            }
        }
    },
    
    addGameStates: function () {
        game.state.add("GameMenu",GameMenu);
        game.state.add("Game",Game);
        game.state.add("GameOver",GameOver);
        game.state.add("Options",Options);
        game.state.add("Credits",Credits);
    },

    addGameMusic: function () {
        musicPlayer = game.add.audio('theme');
        musicPlayer.loop = true;
        musicPlayer.volume = .25;
    },
    
    createSFXMarkers: function() {
        
        sfxPlayer = game.add.audio('sfx');
        
        sfxPlayer.addMarker('note1', 0, 3);
        sfxPlayer.addMarker('note2', 4, 3);
        sfxPlayer.addMarker('note3', 8, 3);
        sfxPlayer.addMarker('note4', 12, 3);
        sfxPlayer.addMarker('note5', 16, 3);
        sfxPlayer.addMarker('note6', 20, 3);
        sfxPlayer.addMarker('note7', 24, 3);
        
        sfxPlayer.volume = 1;
        
        seaSFX = game.add.audio('sea');
    }
}
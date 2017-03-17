var Credits = function () {};

Credits.prototype = {
        
    init: function()
    {
        this.optionCount = 1;
    },

    create: function ()
    {
        game.add.text(30, 10, "Credits", style.navitem.default);
        
        this.addMenuOption('Music - Leaving by Ylmir', function () {
            window.open("http://www.newgrounds.com/audio/listen/622006");
        });
        this.addMenuOption('Audio - Monotraum @ freesound.org', function () {
            window.open("https://www.freesound.org/people/monotraum/sounds/254520/");
        });
        this.addMenuOption('Audio - digifishmusic', function () {
            window.open("http://www.freesound.org/people/digifishmusic/sounds/43760/");
        });
        this.addMenuOption('Phaser Menu System', function () {
            window.open("https://github.com/MattMcFarland/phaser-menu-system");
        });
        this.addMenuOption('Tilemaps from Itch.io', function () {
            window.open("http://itch.io");
        });
        this.addMenuOption('Tilemaps from OpenGameArt', function () {
            window.open("http://opengameart.org");
        });
        this.addMenuOption('Other Art Made By James Thompson', function () {
            window.open("http://jamesthompson.me");
        });
        this.addMenuOption('Built using the Phaser Library', function () {
            window.open("http://phaser.io");
        });
        this.addMenuOption('<-- Back', function () {
           game.state.start('GameMenu');
        });
    },
    
    addMenuOption: function (text, callback) {
        var txt = game.add.text(30, (this.optionCount * 60) + 10, text, style.navitem.credit);
        txt.inputEnabled = true;
        txt.events.onInputUp.add(callback);
        txt.events.onInputOver.add(function (target) {
            target.setStyle(style.navitem.hoverCredit);
        });
        txt.events.onInputOut.add(function (target) {
            target.setStyle(style.navitem.credit);
        });
        this.optionCount++;
    },
}
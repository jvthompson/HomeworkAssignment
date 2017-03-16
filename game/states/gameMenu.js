var GameMenu = function () { };

GameMenu.prototype = {

    addMenuOption: function (text, callback) {
        var txt = game.add.text(30, (this.optionCount * 80) + 200, text, style.navitem.default);
        txt.inputEnabled = true;
        txt.events.onInputUp.add(callback);
        txt.events.onInputOver.add(function (target) {
            target.setStyle(style.navitem.hover);
        });
        txt.events.onInputOut.add(function (target) {
            target.setStyle(style.navitem.default);
        });
        this.optionCount++;
    },

    init: function () {
        if (playMusic == true)
            musicPlayer.volume = 1;
            
        // Clear our DIV text
        $('#poem1').text('');
        $('#poem2').text('');
        
        this.titleText = game.make.text(30, 100, "lux", {
            font: 'bold 60pt Sugarpunch',
            fill: '#fffc5b',
            align: 'center'
        });
        this.titleText.setShadow(3, 3, 'rgba(0,0,0,0.5)', 5);
        //this.titleText.anchor.set(0.5);
        this.optionCount = 1;
        
        musicPlayer.play();
    },

    create: function () {
        game.stage.disableVisibilityChange = true;

        //game.add.sprite(0, 0, 'menu-bg');
        game.add.existing(this.titleText);

        this.addMenuOption('Start', function () {
            game.state.start('Game');
            sfxPlayer.play('note1', 0.25);
            console.log('You clicked Start!');
        });
        this.addMenuOption('Options', function () {
            console.log('You clicked Options!');
            sfxPlayer.play('note2', 0.25);
            game.state.start("Options");
        });
        this.addMenuOption('Credits', function () {
            console.log('You clicked Credits!');
        });
    }, 
    
    update: function() {
        game.stage.backgroundColor = "#000000";
        
    },
};
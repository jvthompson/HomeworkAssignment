var Options = function () {};

Options.prototype = {
   
    init: function() {
        this.titleText = game.make.text(game.world.centerX, 100, "Options", {
            font: 'bold 60pt Sugarpunch',
            fill: '#FDFFB5',
            align: 'center'
        });
        this.titleText.setShadow(3,3, 'rgba(0,0,0,0.5)', 5);
        this.titleText.anchor.set(0.5);
        this.optionCount = 1;
    },
    
    create: function() {
        game.add.existing(this.titleText);
        
        this.addMenuOption(playMusic ? 'Turn Off Music' : 'Turn On Music', function (target) {
           playMusic = !playMusic;
           target.text = playMusic ? 'Turn Off Music' : 'Turn On Music';
           musicPlayer.volume = playMusic ? 1 : 0; 
        });
        this.addMenuOption('<-- Back', function () {
           game.state.start('GameMenu');
        });
    },
    
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
    
};
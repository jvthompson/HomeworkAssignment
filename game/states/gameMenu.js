var GameMenu = function () { };

GameMenu.prototype = {
    
    init: function () {
        if (playMusic == true)
            musicPlayer.volume = 1;
            
        // Clear our DIV text, just in case the game has restarted
        // and our text is still there.
        $('#poem1').text('');
        $('#poem2').text('');
        
        this.titleText = game.make.text(30, 100, "lux", {
            font: 'bold 60pt Sugarpunch',
            fill: '#fffc5b',
            align: 'center'
        });
        
        this.titleText.setShadow(3, 3, 'rgba(0,0,0,0.5)', 5);
        this.optionCount = 1;
        
        musicPlayer.play();
    },

    create: function () {
        game.stage.disableVisibilityChange = true;

        //game.add.sprite(0, 0, 'menu-bg');
        game.add.existing(this.titleText);

        this.addMenuOption('Start', function () {
            game.state.start('Game');
        });
        this.addMenuOption('Options', function () {
            game.state.start("Options");
        });
        this.addMenuOption('Credits', function () {
            game.state.start("Credits");
        });
        this.addMenuOption('Click Here For Fullscreen - Recommended', function () {
            if ((document.fullScreenElement && document.fullScreenElement !== null) || 
                (!document.mozFullScreen && !document.webkitIsFullScreen)) {
                if (document.documentElement.requestFullScreen) {  
                    document.documentElement.requestFullScreen();  
                } else if (document.documentElement.mozRequestFullScreen) {  
                        document.documentElement.mozRequestFullScreen();  
                } else if (document.documentElement.webkitRequestFullScreen) {  
                        document.documentElement.webkitRequestFullScreen(Element.ALLOW_KEYBOARD_INPUT);  
                }  
            } else {  
                if (document.cancelFullScreen) {  
                    document.cancelFullScreen();  
                } else if (document.mozCancelFullScreen) {  
                        document.mozCancelFullScreen();  
                } else if (document.webkitCancelFullScreen) {  
                        document.webkitCancelFullScreen();  
                }  
            }
        });
    }, 
    
    update: function() {
        game.stage.backgroundColor = "#000000";
        
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
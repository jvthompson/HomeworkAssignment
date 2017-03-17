var GameOver = function () {
    
    // var sunny;
    // var lineCount;
    // var poem;
    
};

GameOver.prototype = {
    
    init: function() {
        this.lineCount = 0;
        this.poem = ["If I were the sun",
                "and you were the sky",
                "I'd never set.",
                "I'd hover above",
                "the edge of the water",
                "waiting for you to shine",
                "your stars on me",
                "so I could become bigger",
                "than what I am.",
                "I am brighter when",
                "I'm with you.",
                "- Christy Ann Martine"];
    },
    
    create: function() {
        
        $("body").animate({ backgroundColor: "#ffffff" }, 1);
        this.sunny = game.add.sprite(400, 900,'sun');
        this.sunny.anchor.setTo(0.5);
        this.sunny.scale.setTo(0.75);
        game.add.tween(this.sunny).to({x:400, y:300}, 5000, Phaser.Easing.Back.InOut, true);
        
        if (numLightCollected == 10)
            game.time.events.repeat(Phaser.Timer.SECOND * 3, this.poem.length, this.writePoem, this);
        else
        {
            $('#poem1').append("Thanks for playing Lux!" + "<br/>");
            $('#poem2').append("You only got " + numLightCollected + " lights out of 10." +"<br/>");
            this.resetGame();
        }
    },
    
    update: function() {
        game.stage.backgroundColor = $("body").css("background-color");
        
    },
    
    writePoem: function()
    {
        if (this.lineCount < 6)
            $('#poem1').append(this.poem[this.lineCount] + "<br/>");
        else
            $('#poem2').append(this.poem[this.lineCount] + "<br/>");
            
        this.lineCount++;
        if (this.lineCount == this.poem.length)
        {
            this.resetGame();
        }
    },
    
    resetGame: function()
    {
        seaSFX.fadeOut(1000);
        game.time.events.add(Phaser.Timer.SECOND * 10, function() {
                $("body").animate({ backgroundColor: "black" }, 100);               
                game.state.start('GameMenu');
            }, this);
    }
}
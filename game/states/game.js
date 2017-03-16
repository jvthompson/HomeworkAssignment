var Game = function () {
    var playerDead;
    var idleAnim;
    var sun;
    var player;
    var colors;
    var notes;
    var count;
    var collectTween;
    var gameOver;
};

Game.prototype = {
    init: function() {
                  
        this.gameOver = false;
        this.count = 0;
        this.playerDead = false;
        this.idleAnim = 'idleRight';
        this.colors = ["#1B0902", "#371102", "#913403", "#C9441B", "#F97400", "#EC831A", "#FBA600", "#FDCC29", "#8EC3ED", "#BBDDf8"];
        this.notes = ['note1', 'note2', 'note3', 'note4', 'note5', 'note6', 'note7'];
    },
    
    create: function() {
        game.physics.startSystem(Phaser.Physics.ARCADE);

        this.createSun();
        this.createWorld();
        this.createPlayer();
        
        game.camera.follow(this.player, Phaser.Camera.FOLLOW_PLATFORMER);
        
        cursors = game.input.keyboard.createCursorKeys();
    },
    
    createSun: function()
    {
        this.sun = game.add.sprite(400, 600,'sun');
        this.sun.anchor.setTo(0.5);
        this.sun.scale.setTo(0.15);
        this.sun.fixedToCamera = true;  
    },
    
    createPlayer: function()
    {
        this.player = game.add.sprite(40, 500, 'lux');
        this.player.animations.add('walkLeft', [4,5,6,7]);
        this.player.animations.add('walkRight', [0,1,2,3]);
        this.player.animations.add('idleRight', [0]);
        this.player.animations.add('idleLeft', [7]);
        
        this.player.animations.play('idle');
        this.player.scale.x = 0.15;
        this.player.scale.y = 0.15;
        
        game.physics.enable(this.player, Phaser.Physics.ARCADE);

        this.player.body.gravity.y = 1000;
        this.player.body.maxVelocity.y = 500;
    },
    
    createWorld: function() {
        map = game.add.tilemap('gameWorld');
        map.addTilesetImage('Tile', 'tiles');
        map.addTilesetImage('ExtraSet', 'tiles-extra');
        
        layer2 = map.createLayer('BG');
        layer1 = map.createLayer('Ground');
        layer3 = map.createLayer('LeavesBack');
        layer4 = map.createLayer('LeavesMid');
        layer5 = map.createLayer('LeavesFore');
        layer6 = map.createLayer('Foliage');
        layer7 = map.createLayer('Water');
        
        rays = game.add.group();
        rays.enableBody = true;
        
        map.createFromObjects('Pickups', 56, 'sun-small', 0, true, false, rays);
        
        map.setCollision([1,2,3,8,9,10,15,16,17, 22, 24, 63], true, layer1);
        map.setCollisionBetween(127, 177, true, layer1, true)
        layer1.resizeWorld();
        
        
    },
    
    collectLight: function(player, ray)
    {
       
        // play SFX
        sfxPlayer.play(this.notes[Math.floor(Math.random()*this.notes.length)]);
                
        // track the number we have collected
        this.count++;
        console.log('light collected' + this.count);
        
        //destroy our pickup.
        ray.destroy();
        
        console.log('player position: ' + this.player.x);
        
        // If we just collected our last pickup
        if (this.player.x > 10500)
        {
            this.player.body.velocity = 0;
            this.gameOver = true;
            $("body").animate({ backgroundColor: '#ffffff' }, 4000);
            
            musicPlayer.fadeOut(4000);
            seaSFX.fadeIn(2000);
            seaSFX.play();
            
            game.add.tween(this.sun.cameraOffset).to( {x: this.sun.cameraOffset.x, y: this.sun.cameraOffset.y - 1000 }, 4000, Phaser.Easing.Back.InOut, true);
            game.time.events.add(Phaser.Timer.SECOND * 4, function() {
                game.camera.fade(0xffffff, 1000);
                game.camera.onFadeComplete.add(function() {
                    game.state.start('GameOver');
                }, this);
            }, this);

            console.log('you win');
        }
        else
        {
             // Animate our Sun and background
            collectTween = game.add.tween(this.sun.cameraOffset).to( {x: this.sun.cameraOffset.x, y: this.sun.cameraOffset.y - 50 }, 1000, Phaser.Easing.Back.InOut, true);
            game.add.tween(this.sun.scale).to( {x: this.sun.scale.x + 0.05, y: this.sun.scale.y + 0.05 }, 1000, Phaser.Easing.Back.InOut, true);
            $("body").animate({ backgroundColor: this.colors[this.count] }, 2000);
        }
    },
    
    onDeath: function()
    {
        console.log('OnDeath Called');
        game.state.start('Game');
    },
    
    update: function()
    {
        game.stage.backgroundColor = $("body").css("background-color");
        if (this.playerDead == false && this.gameOver == false)
        {
            
            
            game.physics.arcade.collide(this.player, layer1);
            game.physics.arcade.overlap(this.player, rays, this.collectLight, null, this);
            
            if (cursors.right.isDown)
            {
                this.player.body.velocity.x = 200;
                this.player.animations.play('walkRight', 10, true);
                this.idleAnim = 'idleRight';
            }
            else if (cursors.left.isDown)
            {
                this.player.body.velocity.x = -200;
                this.player.animations.play('walkLeft', 10, true);
                this.idleAnim = 'idleLeft';
            }
            else
            {
                this.player.body.velocity.x = 0;
                this.player.animations.play(this.idleAnim);
            }
            
            if (cursors.up.isDown && this.player.body.blocked.down) 
                this.player.body.velocity.y = -500;
                
            // Check if player is off screen bottom / dead
            if (this.player.y > 610)
            {
                this.player.body.velocity = 0;
                game.add.tween(this.sun.cameraOffset).to( {x: this.sun.cameraOffset.x, y: 1000 }, 1000, Phaser.Easing.Back.InOut, true);
                //player is dead.
                console.log('player dead from falling');
                this.playerDead = true;
                $("body").animate({ backgroundColor: "black" }, 1000);
                game.time.events.add(Phaser.Timer.SECOND * 2, this.onDeath, this);
            }
        }
    },
}
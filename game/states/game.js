var Game = function () {};
var player;

Game.prototype = {
    create: function() {
        
        
        game.physics.startSystem(Phaser.Physics.ARCADE);
        
        
        this.createWorld();
        this.createPlayer();
        
        game.camera.follow(player, Phaser.Camera.FOLLOW_PLATFORMER);
        
        cursors = game.input.keyboard.createCursorKeys();
        jumpButton = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    },
    
    createPlayer: function()
    {
        player = game.add.sprite(40, 100, 'lux');
        player.animations.add('walkLeft', [4,5,6,7]);
        player.animations.add('walkRight', [0,1,2,3]);
        player.animations.add('idle', [0]);
        
        player.animations.play('idle');
        player.scale.x = 0.15;
        player.scale.y = 0.15;
        
        game.physics.enable(player, Phaser.Physics.ARCADE);
        
        player.body.collideWorldBounds = true;
        player.body.gravity.y = 1000;
        player.body.maxVelocity.y = 500;
    },
    
    createWorld: function() {
        map = game.add.tilemap('gameWorld');
        map.addTilesetImage('Tile', 'tiles');
        
        layer1 = map.createLayer('Ground');
        layer2 = map.createLayer('BG');
        layer3 = map.createLayer('LeavesBack');
        layer4 = map.createLayer('LeavesMid');
        layer5 = map.createLayer('LeavesFore');
        
        
        map.setCollision([14,15,16,17,21,23,24], true, layer1);
        layer1.resizeWorld();
        
        document.body.style.background = 'red';
    },
    
    update: function()
    {
        game.physics.arcade.collide(player, layer1);
        
        if (cursors.right.isDown)
        {
            player.body.velocity.x = 200;
            player.animations.play('walkRight', 10, true);
        }
        else if (cursors.left.isDown)
        {
            player.body.velocity.x = -200;
            player.animations.play('walkLeft', 10, true);
        }
        else
        {
            player.body.velocity.x = 0;
            player.animations.play('idle');
        }
        
        if (cursors.up.isDown && player.body.blocked.down) 
            player.body.velocity.y = -500;
    }
}
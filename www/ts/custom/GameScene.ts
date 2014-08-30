module GameBp {

    export class GameScene extends Phaser.State {

        background: Phaser.Sprite;
        music: Phaser.Sound;
        hitSound: Phaser.Sound;
        input: any;
        player: Phaser.Sprite;
        MAX_SPEED: number = 500;

        preload() {

            this.load.tilemap('map', 'assets/map_00.json', null, Phaser.Tilemap.TILED_JSON);
            this.load.image('tileset', 'assets/tileset.png');

            this.load.image('gameBg', 'assets/placeholder/img/squareBlue.png');
            this.load.image('enemy', 'assets/placeholder/img/headBlack.png');
            this.load.image('friend', 'assets/placeholder/img/headWhite.png');
            this.load.audio('hit', Utils
                .getAudioFileArray('assets/placeholder/fx/hit'));


            //            this.game.gameplayMusic.play();
        }


        create() {
            this.hitSound = this.game.add.audio('hit');

            //            this.music = this.add.audio('music', 1, false);
            //            this.music.play();

            this.game.physics.startSystem(Phaser.Physics.ARCADE);

            this.background = this.add.sprite(0, 0, 'gameBg');
            this.background.width = this.game.world.width;
            this.background.height = this.game.world.height;

            var map = this.add.tilemap('map');
            map.addTilesetImage('tileset', 'tileset');

            var background = map.createLayer('background');
            var ground = map.createLayer('ground');
            var red = map.createLayer('red');
            var green = map.createLayer('green');
            var green = map.createLayer('objects');

            var tutorialString = "collect the colors, reach the goal!";
            this.game.add.bitmapText(10, 10, 'bmFont', tutorialString, 50);

            var enemy = this.add.sprite(100, 100, "enemy");
            this.addPhysicsMovmentAndColision(enemy);
            this.addInputHandler(enemy, this.onWin);

            this.player = this.add.sprite(100, 100, "friend");
            this.physics.enable(this.player, Phaser.Physics.ARCADE);

            // Capture certain keys to prevent their default actions in the browser.
            // This is only necessary because this is an HTML5 game. Games on other
            // platforms may not need code like this.
            this.input.keyboard.addKeyCapture([
                Phaser.Keyboard.LEFT,
                Phaser.Keyboard.RIGHT,
                Phaser.Keyboard.UP,
                Phaser.Keyboard.DOWN
            ]);
        }

        update() {
            if (this.leftInputIsActive()) {
                // If the LEFT key is down, set the player velocity to move left
                this.player.body.velocity.x = -this.MAX_SPEED;
            } else if (this.rightInputIsActive()) {
                // If the RIGHT key is down, set the player velocity to move right
                this.player.body.velocity.x = this.MAX_SPEED;
            } else {
                // Stop the player from moving horizontally
                this.player.body.velocity.x = 0;
            }

            if (this.upInputIsActive()) {
                // If the RIGHT key is down, set the player velocity to move right
                this.player.body.velocity.y = -this.MAX_SPEED;
            } else if (this.downInputIsActive()) {
                // If the RIGHT key is down, set the player velocity to move right
                this.player.body.velocity.y = this.MAX_SPEED;
            } else {
                // Stop the player from moving horizontally
                this.player.body.velocity.y = 0;
            }
        }


        leftInputIsActive() {
            var isActive: boolean = false;

            isActive = this.input.keyboard.isDown(Phaser.Keyboard.LEFT);
            isActive |= (this.game.input.activePointer.isDown &&
            this.input.activePointer.x < this.game.width / 4);

            return isActive;
        }

        rightInputIsActive() {
            var isActive: boolean = false;

            isActive = this.input.keyboard.isDown(Phaser.Keyboard.RIGHT);
            isActive |= (this.game.input.activePointer.isDown &&
            this.input.activePointer.x > this.game.width / 2 + this.game.width / 4);

            return isActive;
        }

        upInputIsActive() {
            var isActive: boolean = false;

            isActive = this.input.keyboard.isDown(Phaser.Keyboard.UP);
            isActive |= (this.game.input.activePointer.isDown &&
            this.input.activePointer.x > this.game.width / 2 + this.game.width / 4);

            return isActive;
        }

        downInputIsActive() {
            var isActive: boolean = false;

            isActive = this.input.keyboard.isDown(Phaser.Keyboard.DOWN);
            isActive |= (this.game.input.activePointer.isDown &&
            this.input.activePointer.x > this.game.width / 2 + this.game.width / 4);

            return isActive;
        }

        addPhysicsMovmentAndColision(sprite: Phaser.Sprite) {

            this.game.physics.arcade.enable(sprite);
            sprite.body.velocity.x = 50 + Math.random() * 50;
            sprite.body.velocity.y = 50 + Math.random() * 50;
            sprite.body.bounce.x = 1;
            sprite.body.bounce.y = 1;
            sprite.body.collideWorldBounds = true;
        }


        addInputHandler(sprite: Phaser.Sprite, callback: Function) {

            sprite.inputEnabled = true;
            sprite.events.onInputDown.add(callback, this);
        }


        onWin() {

            this.hitSound.play();
            this.game.state.start('Win');
        }


        onLose() {

            this.hitSound.play();
            this.game.state.start('Lose');
        }


        shutdown() {
            //            this.game.gameplayMusic.stop();
        }

    }

} 
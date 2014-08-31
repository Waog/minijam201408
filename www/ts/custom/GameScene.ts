module GameBp {

    export class GameScene extends Phaser.State {

        music: Phaser.Sound;
        hitSound: Phaser.Sound;
        input: any;
        player: Player;
        green: Phaser.TilemapLayer;
        ground: Ground;
        tiles: Phaser.Physics.Ninja.Tile[];

        playerFalls: boolean;

        preload() {

            this.load.tilemap('map', 'assets/testmap01.json', null, Phaser.Tilemap.TILED_JSON);
            this.load.image('tileset', 'assets/tileset.bak.png');

            Player.preload(this);
            this.load.audio('hit', Utils
                .getAudioFileArray('assets/placeholder/fx/hit'));


            //            this.game.gameplayMusic.play();
        }


        create() {
            this.hitSound = this.game.add.audio('hit');

            //            this.music = this.add.audio('music', 1, false);
            //            this.music.play();

            this.game.physics.startSystem(Phaser.Physics.ARCADE);

            var map = this.add.tilemap('map');
            map.addTilesetImage('tileset.bak', 'tileset');

            var background = map.createLayer('background');

            this.ground = new Ground(this, map);

            //            this.green = map.createLayer('green');
            //            this.green.debug = true;
            //            map.setCollison([], true, 'green');

            //            var red = map.createLayer('red');

            var tutorialString = "collect the colors\n reach the goal!";
            this.game.add.bitmapText(10, 400, 'bmFont', tutorialString, 25);

            this.player = new Player(this.game, 10, 10);
        }

        update() {
            this.playerFalls = true;
            
            if (! this.ground.collidesWith(this.player.body)) {
                this.player.die(this.onLose, this);
            }
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
        
        render() {
//            this.game.debug.body(this.player);
        }
    }

} 
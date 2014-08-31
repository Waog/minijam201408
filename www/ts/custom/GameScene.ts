module GameBp {

    export class GameScene extends Phaser.State {

        player: Player; // just here for debugging physics
        music: Phaser.Sound;
        hitSound: Phaser.Sound;

        preload() {

            this.load.tilemap('map', 'assets/testmap01.json', null, Phaser.Tilemap.TILED_JSON);
            this.load.image('tileset', 'assets/tileset.bak.png');
            this.load.image('redball', 'assets/redball.png');

            Exit.preload(this);
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

            var ground: Ground = new Ground(this, map);

            var player:Player = new Player(this.game, 10, 10, ground, this.onWin, this.onLose, this);
            this.player = player;

            var exit: Exit = new Exit(this, map, player);

            new Redball(this, map, player, ground);

            var tutorialString = "collect the colors\n reach the goal!";
            this.game.add.bitmapText(10, 400, 'bmFont', tutorialString, 25);
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
            this.game.debug.body(this.player);
        }
    }

} 
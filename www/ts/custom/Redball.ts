module GameBp {

    export class Redball extends Phaser.Group {

        constructor(scene: Phaser.State, private tilemap: Phaser.Tilemap,
            private player: Player, private ground: Ground) {

            super(scene.game);

            this.enableBody = true;
            tilemap.createFromObjects('objects', 8, 'redball', 0, true, false, this);
            this.z = 40;
        }

        static preload(scene: Phaser.State) {
            scene.load.image('redball', 'assets/redball.png');
        }

        update() {

            super.update();
            this.game.physics.arcade.overlap(this.player, this, this.onTouch, null, this);
        }

        onTouch() {
            this.ground.activateRed();            
        }
    }
}
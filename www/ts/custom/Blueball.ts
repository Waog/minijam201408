module GameBp {

    export class Blueball extends Phaser.Group {

        private isActivated: boolean = false;

        constructor(private scene: Phaser.State, private tilemap: Phaser.Tilemap,
            private player: Player, private ground: Ground) {

            super(scene.game);

            this.enableBody = true;
            tilemap.createFromObjects('objects', 24, 'blueball', 0, true, false, this);
            this.z = 40;
        }

        static preload(scene: Phaser.State) {
            scene.load.image('blueball', 'assets/blueball.png');
        }

        update() {

            super.update();
            this.game.physics.arcade.overlap(this.player, this, this.onTouch, null, this);
        }

        onTouch() {
            if (this.isActivated) {
                return;
            }
            this.isActivated = true;

            console.log("blue!");
            new Ghost(this.scene, this.tilemap, this.player);
        }
    }
}
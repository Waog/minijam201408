module GameBp {

    export class Redball extends Phaser.Group {

        constructor(scene: Phaser.State, private tilemap: Phaser.Tilemap) {

            super(scene.game);

            this.enableBody = true;
            tilemap.createFromObjects('objects', 8, 'redball', 0, true, false, this);
        }

        static preload(scene: Phaser.State) {
            scene.load.image('redball', 'assets/redball.png');
        }
    }
}
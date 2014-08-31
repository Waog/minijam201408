module GameBp {

    export class Exit extends Phaser.Group {

        constructor(scene: Phaser.State, private tilemap: Phaser.Tilemap) {

            super(scene.game);
            
            this.enableBody = true;
            tilemap.createFromObjects('objects', 29, 'exit', 0, true, false, this);

        }
    }
}
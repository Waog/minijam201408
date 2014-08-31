module GameBp {

    export class Exit extends Phaser.Group {

        constructor(scene: Phaser.State, private tilemap: Phaser.Tilemap,
            private player: Player) {

            super(scene.game);

            this.enableBody = true;
            tilemap.createFromObjects('objects', 29, 'exit', 0, true, false, this);
        }

        static preload(scene: Phaser.State) {
            scene.load.image('exit', 'assets/exit.png');
        }

        update() {
            super.update();

            this.game.physics.arcade.overlap(this.player, this, this.onExit, null, this);
        }

        private onExit() {
            this.player.win();
        }
    }

}
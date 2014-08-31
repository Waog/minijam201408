module GameBp {

    export class Ghost extends Phaser.Group {

        constructor(scene: Phaser.State, private tilemap: Phaser.Tilemap,
            private player: Player) {

            super(scene.game);
            this.enableBody = true;
            tilemap.createFromObjects('objects', 31, 'ghost', 0, true, false, this);
            this.z = 60;

            this.activateMovement();
        }

        activateMovement() {
            for (var i: number = 0; i < this.countLiving(); i++) {
                var curGhost: Phaser.Sprite = this.getAt(i);
                this.game.physics.arcade.enable(curGhost);
                curGhost.body.velocity.x = -20 + Math.random() * 40;
                curGhost.body.velocity.y = -20 + Math.random() * 40;
                curGhost.body.bounce.x = 1;
                curGhost.body.bounce.y = 1;
                curGhost.body.collideWorldBounds = true;
            }
        }

        static preload(scene: Phaser.State) {
            scene.load.image('ghost', 'assets/ghost.png');
        }

        update() {

            super.update();
            this.game.physics.arcade.overlap(this.player, this, this.onTouch, null, this);
        }

        onTouch() {
            this.player.die();
        }
    }
}
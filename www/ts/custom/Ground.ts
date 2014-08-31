module GameBp {

    export class Ground extends Phaser.Group {
        
        private layer: Phaser.TilemapLayer

        constructor(scene: Phaser.State, private tilemap: Phaser.Tilemap) {

            super(scene.game);

            this.layer = tilemap.createLayer('ground');
            this.layer.debug = true;
            tilemap.setCollisionByExclusion([], true, this.layer);
        }

        update() {

            super.update();
        }

        collidesWith(body: Phaser.Physics.Arcade.Body): boolean {
            for (var y: number = 0; y < this.tilemap.height; y++) {
                for (var x: number = 0; x < this.tilemap.width; x++) {
                    if (this.collides(body, x, y)) {
                        return true;
                    }
                }
            }

            return false;
        }

        private collides(body: Phaser.Physics.Arcade.Body, x: number, y: number): boolean {
            var tile: Phaser.Tile = this.tilemap.getTile(x, y, this.layer);
            if (!tile) {
                return false;
            }

            if (tile.right < body.x || tile.left > body.x + body.width ||
                tile.bottom < body.y || tile.top > body.y + body.height) {
                return false;
            }

            return true;
        }
    }
}
module GameBp {

    export class Ground extends Phaser.Group {

        private activatedLayers: Phaser.TilemapLayer[] = [];
        private redActivated: boolean = false;

        constructor(scene: Phaser.State, private tilemap: Phaser.Tilemap) {

            super(scene.game);

            var mainLayer: Phaser.TilemapLayer = tilemap.createLayer('ground');
            this.activatedLayers.push(mainLayer);
            mainLayer.z = 10;
        }

        collidesWith(body: Phaser.Physics.Arcade.Body): boolean {
            for (var y: number = 0; y < this.tilemap.height; y++) {
                for (var x: number = 0; x < this.tilemap.width; x++) {
                    for (var i in this.activatedLayers) {
                        if (this.collides(body, x, y, this.activatedLayers[i])) {
                            return true;
                        }
                    }
                }
            }

            return false;
        }

        private collides(body: Phaser.Physics.Arcade.Body, x: number, y: number, layer: Phaser.TilemapLayer): boolean {
            var tile: Phaser.Tile = this.tilemap.getTile(x, y, layer);
            if (!tile) {
                return false;
            }

            if (tile.right < body.x || tile.left > body.x + body.width ||
                tile.bottom < body.y || tile.top > body.y + body.height) {
                return false;
            }

            return true;
        }

        activateRed() {
            if (this.redActivated) {
                return;
            }
            console.log('red!');
            this.redActivated = true;
            var newLayer: Phaser.TilemapLayer = this.tilemap.createLayer('redGround')
//            this.moveAboveZLayerOf(newLayer, this.activatedLayers[0]);
            newLayer.z = 12;
            this.game.world.sort();
            this.activatedLayers.push(newLayer);
        }

        moveAboveZLayerOf(layerToMove: Phaser.TilemapLayer, baseLayer: Phaser.TilemapLayer) {

            while (layerToMove.z > baseLayer.z + 1) {
                this.game.world.moveDown(layerToMove);
            }
        }
    }
}
module GameBp {

    export class Player extends Phaser.Sprite {

        static MAX_SPEED: number = 150;

        private stopUpdates: boolean = false;

        constructor(game: Phaser.Game, x: number, y: number,
            private ground: Ground, private onWinCb: Function, private onLoseCb: Function,
            private onWinLoseContext: Object) {

            super(game, x, y, 'player', 0);
            this.anchor.setTo(0.5, 0.5);
            game.physics.enable(this, Phaser.Physics.ARCADE);
            game.add.existing(this);

            this.body.setSize(10, 10);
            
            this.z = 50;
        }

        static preload(scene: Phaser.State) {
            scene.load.image('player', 'assets/player.png');
        }

        update() {
            if (this.stopUpdates) {
                return;
            }


            this.body.velocity.x = 0;
            this.body.velocity.y = 0;

            if (this.game.input.keyboard.isDown(Phaser.Keyboard.LEFT)) {
                this.body.velocity.x = -Player.MAX_SPEED;
                this.scale.x = -1;
            } else if (this.game.input.keyboard.isDown(Phaser.Keyboard.RIGHT)) {
                this.body.velocity.x = Player.MAX_SPEED;
                this.scale.x = 1;
            }

            if (this.game.input.keyboard.isDown(Phaser.Keyboard.UP)) {
                this.body.velocity.y = -Player.MAX_SPEED;
            } else if (this.game.input.keyboard.isDown(Phaser.Keyboard.DOWN)) {
                this.body.velocity.y = Player.MAX_SPEED;
            }

            if (!this.ground.collidesWith(this.body)) {
                this.die();
            }
        }

        private die() {
            if (this.stopUpdates) {
                return;
            }

            console.log("I'm dead");
            this.stopUpdates = true;
            this.body.velocity.x = 0;
            this.body.velocity.y = 0;

            var spriteTween: Phaser.Tween = this.game.add.tween(this);
            spriteTween.to({ rotation: 40, alpha: 0, width: 0, height: 0 }, 3000);
            spriteTween.onComplete.add(this.onLoseCb, this.onWinLoseContext);
            spriteTween.start();

            var fallTo: number = this.body.y + 40;
            var bodyTween: Phaser.Tween = this.game.add.tween(this.body);
            bodyTween.to({ y: fallTo }, 3000);
            bodyTween.start();
        }

        win() {
            if (this.stopUpdates) {
                return;
            }

            console.log("I won!");
            this.stopUpdates = true;
            this.body.velocity.x = 0;
            this.body.velocity.y = 0;

            var bodyY: number = this.body.y;
            this.game.add.tween(this.body)
                .to({ y: bodyY - 10 }, 300, Phaser.Easing.Circular.Out)
                .to({ y: bodyY }, 500, Phaser.Easing.Bounce.Out)
                .loop()
                .start();

            this.game.add.tween({})
                .to({}, 5000).start().onComplete.add(this.onWinCb, this.onWinLoseContext);
        }
    }
}
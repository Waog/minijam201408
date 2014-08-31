module GameBp {

    export class Player extends Phaser.Sprite {

        static MAX_SPEED: number = 150;

        private dying: boolean = false;

        constructor(game: Phaser.Game, x: number, y: number) {

            super(game, x, y, 'player', 0);
            this.anchor.setTo(0.5, 0.5);
            game.physics.enable(this, Phaser.Physics.ARCADE);
            this.body.collideWorldBounds = true;
            game.add.existing(this);
        }

        static preload(scene: Phaser.State) {
            scene.load.image('player', 'assets/player.png');
        }

        update() {
            super.update();

            if (this.dying) {
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
        }

        die(callback: Function, context: Object) {
            if (this.dying) {
                return;
            }
            
            console.log("I'm dead");
            this.dying = true;
            this.body.velocity.x = 0;
            this.body.velocity.y = 0;

            var spriteTween: Phaser.Tween = this.game.add.tween(this);
            spriteTween.to({rotation: 40, alpha: 0, width: 0, height: 0 }, 3000);
            spriteTween.onComplete.add(callback, context);
            spriteTween.start();

            var fallTo: number = this.body.y + 40;
            var bodyTween: Phaser.Tween = this.game.add.tween(this.body);
            bodyTween.to({ y: fallTo }, 3000);
            bodyTween.start();

        }
    }
}
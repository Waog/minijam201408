module GameBp {


    export class Bootloader extends Phaser.State {


        preload() {

            this.load.image('preloaderBg',
                'assets/placeholder/img/squareGradientTopDownBlue.png');
            this.load.image('preloaderBar',
                'assets/placeholder/img/squareGreen3D.png');
        }


        create() {

            //  Unless you specifically need to support multitouch I would recommend setting this to 1
            this.input.maxPointers = 1;

            //  Phaser will automatically pause if the browser tab the game is in loses focus. You can disable that here:
            this.stage.disableVisibilityChange = true;

            if (this.game.device.desktop) {
                // If you have any desktop specific settings, they can go in here
                // this.stage.scale.pageAlignHorizontally = true;
            }
            else {
                // Same goes for mobile settings.
            }

            // Capture certain keys to prevent their default actions in the browser.
            // This is only necessary because this is an HTML5 game. Games on other
            // platforms may not need code like this.
            this.input.keyboard.addKeyCapture([
                Phaser.Keyboard.LEFT,
                Phaser.Keyboard.RIGHT,
                Phaser.Keyboard.UP,
                Phaser.Keyboard.DOWN
            ]);

            this.game.state.start('Preloader', true, false);
        }
    }
}
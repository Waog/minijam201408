var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var GameBp;
(function (GameBp) {
    var Lose = (function (_super) {
        __extends(Lose, _super);
        function Lose() {
            _super.apply(this, arguments);
        }
        Lose.prototype.preload = function () {
            this.load.image('loseBg', 'assets/placeholder/img/squareGradientTopDownRed.png');
            //            this.game.loseSceneMusic.play();
        };

        Lose.prototype.create = function () {
            this.bg = this.add.sprite(0, 0, "loseBg");
            this.bg.width = this.game.world.width;
            this.bg.height = this.game.world.height;
            this.bg.inputEnabled = true;
            this.bg.events.onInputDown.add(this.onInteraction, this);

            var text = this.game.add.bitmapText(0, 0, 'bmFont', 'Game\nOver!', 80);
            text.align = 'center';
            text.x = this.game.world.centerX - text.width / 2;
            text.y = this.game.world.centerY - text.height / 2;
        };

        Lose.prototype.onInteraction = function () {
            //            this.game.clickSound.play();
            this.game.state.start('MainMenu');
        };

        Lose.prototype.shutdown = function () {
            //            this.game.loseSceneMusic.stop();
        };
        return Lose;
    })(Phaser.State);
    GameBp.Lose = Lose;
    ;
})(GameBp || (GameBp = {}));
var GameBp;
(function (GameBp) {
    var Preloader = (function (_super) {
        __extends(Preloader, _super);
        function Preloader() {
            _super.apply(this, arguments);
        }
        Preloader.prototype.preload = function () {
            // display the preload process
            this.preloadBg = this.add.sprite(0, 0, 'preloaderBg');
            this.preloadBg.width = this.game.world.width;
            this.preloadBg.height = this.game.world.height;

            this.preloadBar = this.add.sprite(this.game.world.centerX, this.game.world.centerY, 'preloaderBar');
            this.preloadBar.anchor.setTo(0.5, 0.5);
            this.load.setPreloadSprite(this.preloadBar);

            // preload and configure global content
            this.game.stage.backgroundColor = '#ABCDEF';

            this.load.spritesheet('button', 'assets/placeholder/spriteSheets/button.png', 300, 100);
            this.load.audio('click', Utils.getAudioFileArray('assets/placeholder/fx/blip'));

            this.load.audio('track01', Utils.getAudioFileArray('assets/placeholder/music/track01'));
            this.load.audio('track02', Utils.getAudioFileArray('assets/placeholder/music/track02'));
            this.load.audio('track03', Utils.getAudioFileArray('assets/placeholder/music/track03'));

            this.load.bitmapFont('bmFont', 'assets/placeholder/fonts/font.png', 'assets/placeholder/fonts/font.fnt');
        };

        Preloader.prototype.create = function () {
            var tween = this.add.tween(this.preloadBar).to({ alpha: 0 }, 1000, Phaser.Easing.Linear.None, true);
            tween.onComplete.add(this.startMainMenu, this);
        };

        Preloader.prototype.startMainMenu = function () {
            this.game.state.start('MainMenu', true, false);
        };
        return Preloader;
    })(Phaser.State);
    GameBp.Preloader = Preloader;
})(GameBp || (GameBp = {}));
var GameBp;
(function (GameBp) {
    var DecoratedButton = (function (_super) {
        __extends(DecoratedButton, _super);
        function DecoratedButton(text, game, callback, callbackContext, size, x, y) {
            if (typeof size === "undefined") { size = 65; }
            _super.call(this, game);

            this.button = new Phaser.Button(game, 0, 0, 'button', callback, callbackContext, 2, 1, 0);

            this.label = game.add.bitmapText(DecoratedButton.PADDING, DecoratedButton.PADDING, 'bmFont', text, size);
            this.label.align = 'center';

            this.button.width = this.label.width + 3 * DecoratedButton.PADDING;
            this.button.height = this.label.height + 3 * DecoratedButton.PADDING;

            this.add(this.button);
            this.add(this.label);

            if (x) {
                this.x = x - this.button.width / 2;
            } else {
                this.x = game.world.centerX - this.button.width / 2;
            }
            if (y) {
                this.y = y - this.button.height / 2;
            } else {
                this.y = game.world.centerY - this.button.height / 2;
            }
        }
        DecoratedButton.PADDING = 15;
        return DecoratedButton;
    })(Phaser.Group);
    GameBp.DecoratedButton = DecoratedButton;
})(GameBp || (GameBp = {}));
var GameBp;
(function (GameBp) {
    var Ground = (function (_super) {
        __extends(Ground, _super);
        function Ground(scene, tilemap) {
            _super.call(this, scene.game);
            this.tilemap = tilemap;

            this.layer = tilemap.createLayer('ground');
            this.layer.debug = true;
            tilemap.setCollisionByExclusion([], true, this.layer);
        }
        Ground.prototype.update = function () {
            _super.prototype.update.call(this);
        };

        Ground.prototype.collidesWith = function (body) {
            for (var y = 0; y < this.tilemap.height; y++) {
                for (var x = 0; x < this.tilemap.width; x++) {
                    if (this.collides(body, x, y)) {
                        return true;
                    }
                }
            }

            return false;
        };

        Ground.prototype.collides = function (body, x, y) {
            var tile = this.tilemap.getTile(x, y, this.layer);
            if (!tile) {
                return false;
            }

            if (tile.right < body.x || tile.left > body.x + body.width || tile.bottom < body.y || tile.top > body.y + body.height) {
                return false;
            }

            return true;
        };
        return Ground;
    })(Phaser.Group);
    GameBp.Ground = Ground;
})(GameBp || (GameBp = {}));
var GameBp;
(function (GameBp) {
    var GameScene = (function (_super) {
        __extends(GameScene, _super);
        function GameScene() {
            _super.apply(this, arguments);
        }
        GameScene.prototype.preload = function () {
            this.load.tilemap('map', 'assets/testmap01.json', null, Phaser.Tilemap.TILED_JSON);
            this.load.image('tileset', 'assets/tileset.bak.png');
            this.load.image('redball', 'assets/redball.png');

            GameBp.Exit.preload(this);
            GameBp.Player.preload(this);
            this.load.audio('hit', Utils.getAudioFileArray('assets/placeholder/fx/hit'));
            //            this.game.gameplayMusic.play();
        };

        GameScene.prototype.create = function () {
            this.hitSound = this.game.add.audio('hit');

            //            this.music = this.add.audio('music', 1, false);
            //            this.music.play();
            this.game.physics.startSystem(Phaser.Physics.ARCADE);

            var map = this.add.tilemap('map');
            map.addTilesetImage('tileset.bak', 'tileset');

            var background = map.createLayer('background');

            var ground = new GameBp.Ground(this, map);

            var player = new GameBp.Player(this.game, 10, 10, ground, this.onWin, this.onLose, this);

            var exit = new GameBp.Exit(this, map, player);
            new GameBp.Redball(this, map);

            var tutorialString = "collect the colors\n reach the goal!";
            this.game.add.bitmapText(10, 400, 'bmFont', tutorialString, 25);
        };

        GameScene.prototype.onWin = function () {
            this.hitSound.play();
            this.game.state.start('Win');
        };

        GameScene.prototype.onLose = function () {
            this.hitSound.play();
            this.game.state.start('Lose');
        };

        GameScene.prototype.shutdown = function () {
            //            this.game.gameplayMusic.stop();
        };

        GameScene.prototype.render = function () {
            //            this.game.debug.body(this.player);
        };
        return GameScene;
    })(Phaser.State);
    GameBp.GameScene = GameScene;
})(GameBp || (GameBp = {}));
var GameBp;
(function (GameBp) {
    var MainMenu = (function (_super) {
        __extends(MainMenu, _super);
        function MainMenu() {
            _super.apply(this, arguments);
        }
        MainMenu.prototype.preload = function () {
            this.load.image('mainMenuBg', 'assets/placeholder/img/squareGradientTopDownGrey.png');
            this.load.image('logo', 'assets/placeholder/img/starGreen.png');
            //            this.game.mainMenuMusic.play();
        };

        MainMenu.prototype.create = function () {
            this.background = this.add.sprite(0, 0, 'mainMenuBg');
            this.background.width = this.game.world.width;
            this.background.height = this.game.world.height;
            this.background.alpha = 0;

            this.logo = this.add.bitmapText(this.world.centerX, -200, 'bmFont', 'phaser-bp', 120);
            this.logo.x = this.world.centerX - this.logo.width / 2;

            this.add.tween(this.background).to({ alpha: 1 }, 1000, Phaser.Easing.Bounce.InOut, true);
            this.add.tween(this.logo).to({ y: 70 }, 1000, Phaser.Easing.Elastic.Out, true, 2000);

            var startBtn = new GameBp.DecoratedButton("Start", this.game, this.onStart, this, 65, this.game.width / 5, 4 * this.game.height / 5);
            this.add.existing(startBtn);
            var creditsBtn = new GameBp.DecoratedButton("Credtis", this.game, this.onCredits, this, 40, 4 * this.game.width / 5, 4 * this.game.height / 5);
            this.add.existing(creditsBtn);
        };

        MainMenu.prototype.onStart = function () {
            //            this.game.clickSound.play();
            this.fadeOut(this.startGame, this);
        };

        MainMenu.prototype.onCredits = function () {
            //            this.game.clickSound.play();
            this.game.state.start('Credits');
        };

        MainMenu.prototype.fadeOut = function (callback, callbackContext) {
            this.add.tween(this.background).to({ alpha: 0 }, 1000, Phaser.Easing.Linear.None, true);
            var tween = this.add.tween(this.logo).to({ y: 800 }, 1000, Phaser.Easing.Linear.None, true);
            tween.onComplete.add(callback, callbackContext);
        };

        MainMenu.prototype.startGame = function () {
            this.game.state.start('GameScene');
        };

        MainMenu.prototype.startCredits = function () {
            this.game.state.start('Credits');
        };

        MainMenu.prototype.shutdown = function () {
            //            this.game.mainMenuMusic.stop();
        };
        return MainMenu;
    })(Phaser.State);
    GameBp.MainMenu = MainMenu;
})(GameBp || (GameBp = {}));
var GameBp;
(function (GameBp) {
    var Bootloader = (function (_super) {
        __extends(Bootloader, _super);
        function Bootloader() {
            _super.apply(this, arguments);
        }
        Bootloader.prototype.preload = function () {
            this.load.image('preloaderBg', 'assets/placeholder/img/squareGradientTopDownBlue.png');
            this.load.image('preloaderBar', 'assets/placeholder/img/squareGreen3D.png');
        };

        Bootloader.prototype.create = function () {
            //  Unless you specifically need to support multitouch I would recommend setting this to 1
            this.input.maxPointers = 1;

            //  Phaser will automatically pause if the browser tab the game is in loses focus. You can disable that here:
            this.stage.disableVisibilityChange = true;

            if (this.game.device.desktop) {
                // If you have any desktop specific settings, they can go in here
                // this.stage.scale.pageAlignHorizontally = true;
            } else {
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
        };
        return Bootloader;
    })(Phaser.State);
    GameBp.Bootloader = Bootloader;
})(GameBp || (GameBp = {}));
window.onload = function () {
    var game = new GameBp.GameBp();
};
var GameBp;
(function (_GameBp) {
    var GameBp = (function (_super) {
        __extends(GameBp, _super);
        function GameBp() {
            _super.call(this, 640, 480, Phaser.AUTO, '');

            this.state.add('Bootloader', _GameBp.Bootloader);
            this.state.add('Preloader', _GameBp.Preloader);
            this.state.add('MainMenu', _GameBp.MainMenu);
            this.state.add('Credits', _GameBp.Credits);
            this.state.add('GameScene', _GameBp.GameScene);
            this.state.add('Win', _GameBp.Win);
            this.state.add('Lose', _GameBp.Lose);

            this.state.start('Bootloader');
        }
        return GameBp;
    })(Phaser.Game);
    _GameBp.GameBp = GameBp;
})(GameBp || (GameBp = {}));
var GameBp;
(function (GameBp) {
    var creditsString = "We thank anyone.\n\n" + "This game is based on\n" + "*phaser boiler plate code*.\n" + "Check out\n" + "https://github.com/Waog/phaser-bp";

    var Credits = (function (_super) {
        __extends(Credits, _super);
        function Credits() {
            _super.apply(this, arguments);
        }
        Credits.prototype.preload = function () {
            this.load.image('creditsBg', 'assets/placeholder/img/squareGradientTopDownBlue.png');
            //            this.game.creditsMus
        };

        Credits.prototype.create = function () {
            this.bg = this.add.sprite(0, 0, "creditsBg");
            this.bg.width = this.game.world.width;
            this.bg.height = this.game.world.height;

            var text = this.game.add.bitmapText(0, 0, 'bmFont', creditsString);
            text.align = 'center';
            text.x = (this.game.world.width - text.width) / 2;
            text.y = 20;

            var backBtn = new GameBp.DecoratedButton("Back", this.game, this.onBack, this);
            backBtn.y = this.world.height - backBtn.height - 20;
            this.add.existing(backBtn);
        };

        Credits.prototype.onBack = function () {
            //            this.game.clickSound.play();
            this.game.state.start('MainMenu');
        };

        Credits.prototype.shutdown = function () {
            //            this.game.creditsMusic.stop();
        };
        return Credits;
    })(Phaser.State);
    GameBp.Credits = Credits;
    ;
})(GameBp || (GameBp = {}));
var GameBp;
(function (GameBp) {
    var Player = (function (_super) {
        __extends(Player, _super);
        function Player(game, x, y, ground, onWinCb, onLoseCb, onWinLoseContext) {
            _super.call(this, game, x, y, 'player', 0);
            this.ground = ground;
            this.onWinCb = onWinCb;
            this.onLoseCb = onLoseCb;
            this.onWinLoseContext = onWinLoseContext;
            this.stopUpdates = false;
            this.anchor.setTo(0.5, 0.5);
            game.physics.enable(this, Phaser.Physics.ARCADE);
            game.add.existing(this);
        }
        Player.preload = function (scene) {
            scene.load.image('player', 'assets/player.png');
        };

        Player.prototype.update = function () {
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
        };

        Player.prototype.die = function () {
            if (this.stopUpdates) {
                return;
            }

            console.log("I'm dead");
            this.stopUpdates = true;
            this.body.velocity.x = 0;
            this.body.velocity.y = 0;

            var spriteTween = this.game.add.tween(this);
            spriteTween.to({ rotation: 40, alpha: 0, width: 0, height: 0 }, 3000);
            spriteTween.onComplete.add(this.onLoseCb, this.onWinLoseContext);
            spriteTween.start();

            var fallTo = this.body.y + 40;
            var bodyTween = this.game.add.tween(this.body);
            bodyTween.to({ y: fallTo }, 3000);
            bodyTween.start();
        };

        Player.prototype.win = function () {
            if (this.stopUpdates) {
                return;
            }

            console.log("I won!");
            this.stopUpdates = true;
            this.body.velocity.x = 0;
            this.body.velocity.y = 0;

            var bodyY = this.body.y;
            this.game.add.tween(this.body).to({ y: bodyY - 10 }, 300, Phaser.Easing.Circular.Out).to({ y: bodyY }, 500, Phaser.Easing.Bounce.Out).loop().start();

            this.game.add.tween({}).to({}, 5000).start().onComplete.add(this.onWinCb, this.onWinLoseContext);
        };
        Player.MAX_SPEED = 150;
        return Player;
    })(Phaser.Sprite);
    GameBp.Player = Player;
})(GameBp || (GameBp = {}));
var Utils;
(function (Utils) {
    function createButton(callbackContext, game, textString, callback, x, y) {
        var button = game.add.button(0, 0, 'button', callback, callbackContext, 2, 1, 0);
        button.width = 35 * textString.length;
        button.height = 100;
        button.x = x;
        button.y = y;
        button.anchor.setTo(0.5, 0.5);

        var textStyle = {
            font: "65px Arial",
            fill: "#123456",
            align: "center"
        };
        var text = game.add.text(button.x, button.y, textString, textStyle);
        text.anchor.set(0.5, 0.5);
    }
    Utils.createButton = createButton;
    ;

    function getAudioFileArray(fileNameWithoutExtention) {
        return [
            fileNameWithoutExtention + '.mp3',
            fileNameWithoutExtention + '.ogg',
            fileNameWithoutExtention + '.m4a'];
    }
    Utils.getAudioFileArray = getAudioFileArray;
    ;
})(Utils || (Utils = {}));
var GameBp;
(function (GameBp) {
    var Win = (function (_super) {
        __extends(Win, _super);
        function Win() {
            _super.apply(this, arguments);
        }
        Win.prototype.preload = function () {
            this.load.image('winBg', 'assets/placeholder/img/squareGradientTopDownGreen.png');
            //            this.game.winSceneMusic.play();
        };

        Win.prototype.create = function () {
            this.bg = this.add.sprite(0, 0, "winBg");
            this.bg.width = this.game.world.width;
            this.bg.height = this.game.world.height;
            this.bg.inputEnabled = true;
            this.bg.events.onInputDown.add(this.onInteraction, this);

            var text = this.game.add.bitmapText(0, 0, 'bmFont', 'Win!', 80);
            text.align = 'center';
            text.x = this.game.world.centerX - text.width / 2;
            text.y = this.game.world.centerY - text.height / 2;
        };

        Win.prototype.onInteraction = function () {
            //            this.game.clickSound.play();
            this.game.state.start('MainMenu');
        };

        Win.prototype.shutdown = function () {
            //            this.game.winSceneMusic.stop();
        };
        return Win;
    })(Phaser.State);
    GameBp.Win = Win;
})(GameBp || (GameBp = {}));
var GameBp;
(function (GameBp) {
    var Exit = (function (_super) {
        __extends(Exit, _super);
        function Exit(scene, tilemap, player) {
            _super.call(this, scene.game);
            this.tilemap = tilemap;
            this.player = player;

            this.enableBody = true;
            tilemap.createFromObjects('objects', 29, 'exit', 0, true, false, this);
        }
        Exit.preload = function (scene) {
            scene.load.image('exit', 'assets/exit.png');
        };

        Exit.prototype.update = function () {
            _super.prototype.update.call(this);

            this.game.physics.arcade.overlap(this.player, this, this.onExit, null, this);
        };

        Exit.prototype.onExit = function () {
            this.player.win();
        };
        return Exit;
    })(Phaser.Group);
    GameBp.Exit = Exit;
})(GameBp || (GameBp = {}));
var GameBp;
(function (GameBp) {
    var Redball = (function (_super) {
        __extends(Redball, _super);
        function Redball(scene, tilemap) {
            _super.call(this, scene.game);
            this.tilemap = tilemap;

            this.enableBody = true;
            tilemap.createFromObjects('objects', 8, 'redball', 0, true, false, this);
        }
        Redball.preload = function (scene) {
            scene.load.image('redball', 'assets/redball.png');
        };
        return Redball;
    })(Phaser.Group);
    GameBp.Redball = Redball;
})(GameBp || (GameBp = {}));
//# sourceMappingURL=minijam.js.map

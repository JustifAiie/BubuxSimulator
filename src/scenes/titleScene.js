import phaser from 'phaser'
import {CST} from '../CST.js'
import {GameScene} from './gameScene.js'
import {SplitGameScene} from './splitGameScene.js'
import {TutoScene} from './tutoScene.js'
import {LeaderboardScene} from './leaderboardScene.js'

export class TitleScene extends Phaser.Scene {
	constructor() {
		super({
			key: CST.SCENES.TITLE
		});

		this.background;
		this.onePlayerButton;
		this.twoPlayerButton;
		this.fullscreenButton;
		this.tutoButton;
		this.trophyButton;
		this.goToGame;
		this.goToSplitGame;
		this.goFullscreen;
		this.goToLeaderboard;
		this.canvas;
		this.fullscreen;
		this.pub;
		this.flag;
		this.plane;
		this.bus;
	}

	create() {
		this.background = this.add.image(0, 0, 'background').setOrigin(0).setScale(2.85).setDepth(0); // Adripy : 3.52, Jupy: 2.85

		this.onePlayerButton = this.add.sprite(this.game.renderer.width / 2.5, this.game.renderer.height / 2.1, 'oneP').setDepth(1).setScale(1.6);
		
		this.twoPlayerButton = this.add.sprite(this.game.renderer.width / 1.75, this.game.renderer.height / 2.1, 'twoP').setDepth(1).setScale(1.6);

		this.fullscreenButton = this.add.image(this.game.renderer.width - 64, 0, 'fullscreenButton').setOrigin(0,0).setDepth(1);

		this.tutoButton = this.add.sprite(this.game.renderer.width / 2.05, this.game.renderer.height / 3, 'tuto').setDepth(1).setScale(1.4);

		this.trophyButton = this.add.sprite(this.game.renderer.width / 2.178, this.game.renderer.height / 1.95, 'trophy').setOrigin(0).setDepth(1);

		this.title = this.add.image(this.game.renderer.width / 2, this.game.renderer.height / 9, 'title').setDepth(2).setScale(0.3);

		this.plane = this.physics.add.sprite(-1000, -200, 'titlePlane').setOrigin(0).setScale(3).setDepth(1);
		this.plane.body.setVelocityX(200);

		this.bus = this.physics.add.sprite(-400, 540, 'bus').setOrigin(0).setScale(1.5).setDepth(1);
		this.bus.anims.play('busRight', true);
		this.bus.body.setVelocityX(250);

		this.pub = this.add.sprite(this.game.renderer.width / 30, this.game.renderer.height / 1.774, 'pub').setScale(2.85).setOrigin(0,0); // 57 236 3.5
		this.pub.anims.play('pub', true);

		this.flag = this.physics.add.sprite(this.game.renderer.width / 1.598, this.game.renderer.height / 1.52, 'flag').setScale(5).setOrigin(0,0); // 1060 635 6
		this.flag.flipX = true;
		this.flag.anims.play('wave', true);

		this.onePlayerButton.setInteractive();
		this.twoPlayerButton.setInteractive();
		this.fullscreenButton.setInteractive();
		this.tutoButton.setInteractive();
		this.trophyButton.setInteractive();

		this.onePlayerButton.on('pointerover', function() {
			this.onePlayerButton.anims.play('pushOne', true);
			this.goToGame = true;
			document.querySelector('body').addEventListener('click', () => {this.launchGameFunc(this.goToGame); });
		}, this);

		this.onePlayerButton.on('pointerout', function() {
			this.onePlayerButton.anims.stop();
			this.onePlayerButton.anims.play('stopOne', true);
			this.goToGame = false;
		}, this);

		this.twoPlayerButton.on('pointerover', function() {
			this.twoPlayerButton.anims.play('pushTwo', true);
			this.goToSplitGame = true;
			document.querySelector('body').addEventListener('click', () => {this.launchTwoPlayerGameFunc(this.goToSplitGame); });
		}, this);

		this.twoPlayerButton.on('pointerout', function() {
			this.twoPlayerButton.anims.stop();
			this.twoPlayerButton.anims.play('stopTwo', true);
			this.goToSplitGame = false;
		}, this);

		this.tutoButton.on('pointerover', function() {
			this.tutoButton.anims.play('pushTuto', true);
			this.goToTuto = true;
			document.querySelector('body').addEventListener('click', () => {this.launchTutoFunc(this.goToTuto); });
		}, this);

		this.tutoButton.on('pointerout', function() {
			this.tutoButton.anims.stop();
			this.tutoButton.anims.play('stopTuto', true);
			this.goToTuto = false;
		}, this);

		this.canvas = this.sys.game.canvas;
		this.fullscreen = this.sys.game.device.fullscreen;

		this.fullscreenButton.on('pointerover', function() {
			this.goFullscreen = true;
			document.querySelector('body').addEventListener('click', () => { this.fullscreenFunc(this.goFullscreen); });
		}, this);

		this.fullscreenButton.on('pointerout', function() {
			this.goFullscreen = false;
		}, this);

		this.trophyButton.on('pointerover', function() {
			this.trophyButton.anims.play('trophyButton', true);
			this.goToLeaderboard = true;
			document.querySelector('body').addEventListener('click', () => { this.leaderboardFunc(this.goToLeaderboard); });
		}, this);

		this.trophyButton.on('pointerout', function() {
			this.trophyButton.anims.stop();
			this.trophyButton.anims.play('stopTrophy', true);
			this.goToLeaderboard = false;
		}, this);
	}

	update(time, delta) {
		super.update(time, delta);

		if (this.plane.x > this.game.renderer.width + 3000) {
			this.movePlane();
		}

		if (this.bus.x > this.game.renderer.width + 700) {
			this.moveBus('goLeft');
		}
		if (this.bus.x < this.game.renderer.width - 3000) {
			this.moveBus('goRight');
		}
	}

	launchGameFunc(condition) {
		if (condition) {
			this.scene.add(CST.SCENES.GAME, GameScene, false);
			this.scene.start(CST.SCENES.GAME,);
			this.goToGame = false;
		}
	}

	launchTwoPlayerGameFunc(condition) {
		if (condition) {
			this.scene.add(CST.SCENES.SPLITGAME, SplitGameScene, false);
			this.scene.start(CST.SCENES.SPLITGAME);
			this.goToSplitGame = false;
		}
	}

	fullscreenFunc(condition) {
		if (condition) {
			this.canvas[this.fullscreen.request]();
		}
	}

	launchTutoFunc(condition) {
		if (condition) {
			this.scene.add(CST.SCENES.TUTO, TutoScene, false);
			this.scene.start(CST.SCENES.TUTO);
			this.goToTuto = false;
		}
	}

	leaderboardFunc(condition) {
		if (condition) {
			this.scene.add(CST.SCENES.LEADERBOARD, LeaderboardScene, false);
			this.scene.start(CST.SCENES.LEADERBOARD);
			this.scene.remove(CST.SCENES.TITLE);
			this.goToLeaderboard = false;
		}
	}

	movePlane() {
		this.plane.body.reset(-1000, -200);
		this.plane.body.setVelocityX(200);
	}

	moveBus(direction) {
		if (direction == 'goLeft') {
			this.bus.anims.play('busLeft', true);
			this.bus.body.setVelocityX(-250);
		} else if (direction == 'goRight') {
			this.bus.anims.play('busRight', true);
			this.bus.body.setVelocityX(250);
		}
	}
}
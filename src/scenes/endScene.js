import phaser from 'phaser'
import {CST} from '../CST.js'
import {GameScene} from './gameScene.js'

export class EndScene extends Phaser.Scene {
	constructor() {
		super({
			key: CST.SCENES.END
		});

		this.bus;
		this.nickname;

		this.replayButton;
		this.quitButton;

		this.replay;
		this.quit;
	}

	init(data) {
		this.bus = data.obj[0];
		this.nickname = data.obj[1];
	}

	create() {
		this.add.image(0, 0, 'endingBackground').setOrigin(0).setScale(0.45);
		this.add.text(this.game.renderer.width / 3.7, this.game.renderer.height / 7, 'Bravo ' + this.nickname + ' tu as déposé ' + this.bus.deposited + ' personnes !', { fontSize: '19px', fill: '#000' });
		this.add.text(this.game.renderer.width / 5, this.game.renderer.height / 7 + 85, 'Si chacune de ces personnes avait pris une voiture,', { fontSize: '19px', fill: '#000' });
		this.add.text(this.game.renderer.width / 4.8, this.game.renderer.height / 7 + 170, this.bus.score + ' Kg de CO2 auraient été émis dans l\'atmosphère !', { fontSize: '19px', fill: '#000' });
		this.add.text(this.game.renderer.width / 3.4, this.game.renderer.height / 7 + 255, 'Vive les transports en commun !', { fontSize: '19px', fill: '#000' });

		this.replayButton = this.add.sprite(this.game.renderer.width / 2.5, this.game.renderer.height / 1.25, 'replay').setDepth(1).setScale(1.6);
		this.quitButton = this.add.sprite(this.game.renderer.width / 1.75, this.game.renderer.height / 1.25, 'quit').setDepth(1).setScale(1.6);
		this.replayButton.setInteractive();
		this.quitButton.setInteractive();

		this.replayButton.on('pointerover', function() {
			this.replayButton.anims.play('pushReplay', true);
			this.replay = true;
			document.querySelector('body').addEventListener('click', () => {this.replayFunc(this.replay); });
		}, this);

		this.replayButton.on('pointerout', function() {
			this.replayButton.anims.stop();
			this.replayButton.anims.play('stopReplay', true);
			this.replay = false;
		}, this);

		this.quitButton.on('pointerover', function() {
			this.quitButton.anims.play('pushQuit', true);
			this.quit = true;
			document.querySelector('body').addEventListener('click', () => {this.quitFunc(this.quit); });
		}, this);

		this.quitButton.on('pointerout', function() {
			this.quitButton.anims.stop();
			this.quitButton.anims.play('stopQuit', true);
			this.quit = false;
		}, this);
	}

	replayFunc(condition) {
		if (condition) {
			this.scene.add(CST.SCENES.GAME, GameScene, false);
			this.scene.start(CST.SCENES.GAME);
			this.replay = false;
		}
	}

	quitFunc(condition) {
		if (condition) {
			this.scene.start(CST.SCENES.TITLE);
			this.quit = false;
		}
	}
}
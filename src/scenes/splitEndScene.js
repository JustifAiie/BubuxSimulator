import phaser from 'phaser'
import {CST} from '../CST.js'
import {SplitGameScene} from './splitGameScene.js'

export class SplitEndScene extends Phaser.Scene {
	constructor() {
		super({
			key: CST.SCENES.SPLITEND
		});

		this.bus;
		this.bus2;
		this.nickname;
		this.nickname2;

		this.replayButton;
		this.quitButton;

		this.replay;
		this.quit;
	}

	init(data) {
		this.bus = data.obj[0];
		this.nickname = data.obj[2];
		this.bus2 = data.obj[1];
		this.nickname2 = data.obj[3];
	}

	create() {
		console.log(this.bus2.score);
		this.add.image(0, 0, 'splitEndingBackground').setOrigin(0).setScale(0.72);
		this.add.text(this.game.renderer.width / 18, this.game.renderer.height / 6, 'Bravo ' + this.nickname + ' tu as déposé ' + this.bus.deposited + ' personnes !', { fontSize: '13px', fill: '#000' });
		this.add.text(this.game.renderer.width / 45, this.game.renderer.height / 6 + 40, 'Si chacune de ces personnes avait pris une voiture,', { fontSize: '13px', fill: '#000' });
		this.add.text(this.game.renderer.width / 35, this.game.renderer.height / 6 + 80, this.bus.score + ' Kg de CO2 auraient été émis dans l\'atmosphère !', { fontSize: '13px', fill: '#000' });
		this.add.text(this.game.renderer.width / 15, this.game.renderer.height / 6 + 120, 'Vive les transports en commun !', { fontSize: '13px', fill: '#000' });

		this.add.text(this.game.renderer.width / 1.36, this.game.renderer.height / 5.18, 'Bravo ' + this.nickname2 + ' tu as déposé ' + this.bus2.deposited + ' personnes !', { fontSize: '13px', fill: '#000' });
		this.add.text(this.game.renderer.width / 1.44, this.game.renderer.height / 5.18 + 40, 'Si chacune de ces personnes avait pris une voiture,', { fontSize: '13px', fill: '#000' });
		this.add.text(this.game.renderer.width / 1.42, this.game.renderer.height / 5.18 + 80, this.bus2.score + ' Kg de CO2 auraient été émis dans l\'atmosphère !', { fontSize: '13px', fill: '#000' });
		this.add.text(this.game.renderer.width / 1.32, this.game.renderer.height / 5.18 + 120, 'Vive les transports en commun !', { fontSize: '13px', fill: '#000' });


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
			this.scene.add(CST.SCENES.SPLITGAME, SplitGameScene, false);
			this.scene.start(CST.SCENES.SPLITGAME);
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
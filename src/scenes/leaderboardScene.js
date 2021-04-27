import phaser from 'phaser'
import {CST} from '../CST.js'
import {TitleScene} from './titleScene.js'

export class LeaderboardScene extends Phaser.Scene {
	constructor() {
		super({
			key: CST.SCENES.LEADERBOARD
		});

		this.highscore = [];

		this.quitButton;
		this.quit;
	}

	create() {

		this.quitButton = this.add.sprite(this.game.renderer.width, 0, 'quit').setDepth(2).setScale(1.6).setOrigin(1,0);
		this.quitButton.setInteractive();

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

		this.add.image(0,0, 'backgroundLeader').setScale(1.425).setOrigin(0);

		this.add.bitmapText(this.game.renderer.width / 4.8, this.game.renderer.height / 50, 'arcade', 'LEADERBOARD').setLetterSpacing(10);

		this.highscore = this.getHighscore();
		var scoreTab = [];

		for (var i = 0; i < this.highscore.length; ++i) {

			var scoreObj = {
				nickname: this.highscore[i].split('=')[0],
				score: this.highscore[i].split('=')[1]
			};

			scoreTab[i] = scoreObj;
		}

		var sorted = this.bubbleSort(scoreTab);

		for (var i = 0; i < sorted.length; ++i) {

			this.add.bitmapText(this.game.renderer.width / 4, this.game.renderer.height / 7 + i * 60, 'arcade', scoreTab[i].nickname + ' ' + scoreTab[i].score).setLetterSpacing(10);
		}
	}

	getHighscore() {

		var raw = document.cookie;
		var array = raw.split('; ');

		return array;
	}

	bubbleSort(a) {
		var swapped;
		do {
			swapped = false;
			for (var i = 0; i < a.length-1; ++i) {
				if (parseFloat(a[i].score) < parseFloat(a[i+1].score)) {
					var temp = a[i];
					a[i] = a[i+1];
					a[i+1] = temp;
					swapped = true;
				}
			}
		} while (swapped);

		return a;
	}

	quitFunc(condition) {
		if (condition) {
			this.scene.add(CST.SCENES.TITLE, TitleScene, false);
			this.scene.start(CST.SCENES.TITLE);
			this.scene.remove(CST.SCENES.LEADERBOARD);
			this.quit = false;
		}
	}
}
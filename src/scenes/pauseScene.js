import phaser from 'phaser'
import {CST} from '../CST.js'

export class PauseScene extends Phaser.Scene {
	constructor() {
		super({
			key: CST.SCENES.PAUSE
		});

		this.resumeButton;
		this.quitButton;

		this.resume;
		this.quit;

		this.sceneKey;
		this.infoSceneKey;
	}

	init(data) {
		this.sceneKey = data.obj;
		this.infoSceneKey = data.obj2;
	}

	create() {
		this.add.image(0, 0, 'pauseBackground').setOrigin(0).setScale(3.5);

        this.resumeButton = this.add.sprite(this.game.renderer.width / 2 - 100, this.game.renderer.height / 2, 'resume').setDepth(2).setScale(1.6);
        this.resumeButton.setInteractive();

        this.resumeButton.on('pointerover', function() {
			this.resumeButton.anims.play('pushResume', true);
			this.resume = true;
			document.querySelector('body').addEventListener('click', () => {this.resumeFunc(this.resume); });
		}, this);

		this.resumeButton.on('pointerout', function() {
			this.resumeButton.anims.stop();
			this.resumeButton.anims.play('stopResume', true);
			this.resume = false;
		}, this);

        this.quitButton = this.add.sprite(this.game.renderer.width / 2 + 100, this.game.renderer.height / 2, 'quit').setDepth(2).setScale(1.6);
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
	}

	resumeFunc(condition) {
		if (condition) {
			this.scene.resume(this.sceneKey);
			this.scene.wake(this.infoSceneKey);
			this.scene.remove(CST.SCENES.PAUSE);
			this.resume = false;
		}
	}

	quitFunc(condition) {
		if (condition) {
			this.scene.remove(this.sceneKey);
			this.scene.remove(this.infoSceneKey);
			this.scene.start(CST.SCENES.TITLE);
			this.scene.remove(CST.SCENES.PAUSE);
			this.quit = false;
		}
	}
}
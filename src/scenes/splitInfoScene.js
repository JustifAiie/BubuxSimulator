import phaser from 'phaser'
import {CST} from '../CST.js'
export class SplitInfoScene extends Phaser.Scene {
	constructor() {
		super({
			key: CST.SCENES.SPLITINFO
		});

		this.bus;
		this.freeText;
		this.redCollectedText;
		this.blueCollectedText;

		this.bus2;
		this.freeText2;
		this.redCollectedText2;
		this.blueCollectedText2;
	}

	init(data) {
		this.bus = data.obj[0];
		this.bus2 = data.obj[1];
	}

	create() {
		this.add.image(0, 0, 'hud1').setOrigin(0).setDepth(1).setScale(0.8);
		this.add.image(this.game.renderer.width / 2, 0, 'hud2').setOrigin(1,0).setDepth(1).setScale(0.8);

		this.add.image(this.game.renderer.width / 2 + 10, 0, 'hud1').setOrigin(0).setDepth(1).setScale(0.8);
		this.add.image(this.game.renderer.width, 0, 'hud2').setOrigin(1,0).setDepth(1).setScale(0.8);

		this.freeText = this.add.text(180, 3, this.bus.free, { fontSize: '23px', fill: '#000' }).setDepth(1);
		this.redCollectedText = this.add.text(13, 8, this.bus.redCollected, { fontSize: '25px', fill: '#000' }).setDepth(1);
		this.blueCollectedText = this.add.text(13, 46, this.bus.blueCollected, { fontSize: '25px', fill: '#000' }).setDepth(1);

		this.freeText2 = this.add.text(this.game.renderer.width / 1.565, 3, this.bus2.free, { fontSize: '23px', fill: '#000' }).setDepth(1);
		this.redCollectedText2 = this.add.text(this.game.renderer.width / 1.94, 8, this.bus2.redCollected, { fontSize: '25px', fill: '#000' }).setDepth(1);
		this.blueCollectedText2 = this.add.text(this.game.renderer.width / 1.94, 46, this.bus2.blueCollected, { fontSize: '25px', fill: '#000' }).setDepth(1);
	}

	update(time, delta) {
		super.update(time, delta);

		this.updateInfos();
	}

	updateInfos() {
		this.freeText.setText(this.bus.free);
		this.redCollectedText.setText(this.bus.redCollected);
		this.blueCollectedText.setText(this.bus.blueCollected);

		this.freeText2.setText(this.bus2.free);
		this.redCollectedText2.setText(this.bus2.redCollected);
		this.blueCollectedText2.setText(this.bus2.blueCollected);
	}
}
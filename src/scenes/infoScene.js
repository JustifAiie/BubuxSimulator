import phaser from 'phaser'
import {CST} from '../CST.js'

export class InfoScene extends Phaser.Scene {
	constructor() {
		super({
			key: CST.SCENES.INFO
		});

		this.freeText;

		this.redCollectedText;
		this.blueCollectedText;

		this.bus;

		this.isTuto;
	}

	init(data) {
		this.bus = data.obj;
		this.isTuto = data.obj2;
	}

	create() {
		this.add.image(0, 0, 'hud1').setOrigin(0).setDepth(1);
		if (!this.isTuto) {
			this.add.image(this.game.renderer.width, 0, 'hud2').setOrigin(1,0).setDepth(1);
		}
		
		this.freeText = this.add.text(225, 5, this.bus.free, { fontSize: '25px', fill: '#000' }).setDepth(2);
		this.redCollectedText = this.add.text(15, 10, this.bus.redCollected, { fontSize: '32px', fill: '#000' }).setDepth(2);
		this.blueCollectedText = this.add.text(15, 55, this.bus.blueCollected, { fontSize: '32px', fill: '#000' }).setDepth(2);
	}

	update(time, delta) {
		super.update(time, delta);

		this.updateInfos();
	}

	updateInfos() {
		this.freeText.setText(this.bus.free);
		this.redCollectedText.setText(this.bus.redCollected);
		this.blueCollectedText.setText(this.bus.blueCollected);
	}
}
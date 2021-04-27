import phaser from 'phaser'
import {CST} from '../CST.js'
import {Bus} from '../bus.js'
import {Bonus} from '../bonus.js'

export class BonusScene extends Phaser.Scene {
	constructor() {
		super({
			key: CST.SCENES.BONUS
		});

		this.bonus;
		this.bonusLogo;
		this.bonusLogo2;
		this.bonusRoll;
		this.bonusRoll2;

		this.bonusLogoTimer;

		this.isSplit;
		this.whichBus;
	}

	init(data) {
		this.bonus = data.obj;
		this.bus = data.obj2;
		this.isSplit = data.obj3;
		this.whichBus = data.obj4;
	}

	create() {

		if (!this.isSplit) {

			this.bonusRoll = this.add.sprite(this.game.renderer.width / 1.052 - 20, this.game.renderer.height / 44 - 10, 'bonusImg').setScale(0.9).setOrigin(0).setDepth(1);
    		this.bonusRoll.on('animationcomplete', () => { this.applyBonus(this.bonus.i, this.isSplit) }, this);
        	this.bonusRoll.anims.play('bonusRoll');
		}
		else {

			if (this.whichBus == 0) {

				this.bonusRoll = this.add.sprite(this.game.renderer.width / 2.23, this.game.renderer.height / 44 - 10, 'bonusImg').setScale(0.75).setOrigin(0).setDepth(1);
    			this.bonusRoll.on('animationcomplete', () => { this.applyBonus(this.bonus.i, this.isSplit) }, this);
        		this.bonusRoll.anims.play('bonusRoll');
			}
			else {

				this.bonusRoll2 = this.add.sprite(this.game.renderer.width / 1.052, this.game.renderer.height / 44 - 10, 'bonusImg').setScale(0.75).setOrigin(0).setDepth(1);
    			this.bonusRoll2.on('animationcomplete', () => { this.applyBonus(this.bonus.i, this.isSplit) }, this);
        		this.bonusRoll2.anims.play('bonusRoll');
			}
		}
		
	}

	applyBonus(i, condition) {
		if (!condition) {
			
			this.bonusRoll.destroy();
			if (i == 0) {
				this.bonusLogo = this.add.image(this.game.renderer.width / 1.052 - 20, this.game.renderer.height / 44 - 10, 'speed').setScale(0.9).setOrigin(0).setDepth(1);
				this.bonus.increaseSpeed(this.bus);
				this.startBonusLogoTimer();
			}
			if (i == 1) {
				this.bonusLogo = this.add.image(this.game.renderer.width / 1.052 - 20, this.game.renderer.height / 44 - 10, 'add').setScale(0.9).setOrigin(0).setDepth(1);
				this.bonus.increaseSize(this.bus);
				this.startBonusLogoTimer();
			}
			if (i == 2) {
				this.bonusLogo = this.add.image(this.game.renderer.width / 1.052 - 20, this.game.renderer.height / 44 - 10, 'swap').setScale(0.9).setOrigin(0).setDepth(1);
				this.bonus.oneColor(this.bus);
				this.startBonusLogoTimer();
			}
		}
		else {
			if (this.whichBus == 0) {
				console.log('slt');
				this.bonusRoll.destroy();
				if (i == 0) {
					this.bonusLogo = this.add.image(this.game.renderer.width / 2.23, this.game.renderer.height / 44 - 10, 'speed').setScale(0.75).setOrigin(0).setDepth(1);
					this.bonus.increaseSpeed(this.bus);
					this.startBonusLogoTimer();
				}
				if (i == 1) {
					this.bonusLogo = this.add.image(this.game.renderer.width / 2.23, this.game.renderer.height / 44 - 10, 'add').setScale(0.75).setOrigin(0).setDepth(1);
					this.bonus.increaseSize(this.bus);
					this.startBonusLogoTimer();
				}
				if (i == 2) {
					this.bonusLogo = this.add.image(this.game.renderer.width / 2.23, this.game.renderer.height / 44 - 10, 'swap').setScale(0.75).setOrigin(0).setDepth(1);
					this.bonus.oneColor(this.bus);
					this.startBonusLogoTimer();
				}
			}
			else {

				this.bonusRoll2.destroy();
				if (i == 0) {
					this.bonusLogo = this.add.image(this.game.renderer.width / 1.052, this.game.renderer.height / 44 - 10, 'speed').setScale(0.75).setOrigin(0).setDepth(1);
					this.bonus.increaseSpeed(this.bus);
					this.startBonusLogoTimer();
				}
				if (i == 1) {
					this.bonusLogo = this.add.image(this.game.renderer.width / 1.052, this.game.renderer.height / 44 - 10, 'add').setScale(0.75).setOrigin(0).setDepth(1);
					this.bonus.increaseSize(this.bus);
					this.startBonusLogoTimer();
				}
				if (i == 2) {
					this.bonusLogo = this.add.image(this.game.renderer.width / 1.052, this.game.renderer.height / 44 - 10, 'swap').setScale(0.75).setOrigin(0).setDepth(1);
					this.bonus.oneColor(this.bus);
					this.startBonusLogoTimer();
				}
			}
		}
	}

	startBonusLogoTimer() {
		this.bonusLogoTimer = this.time.addEvent({ delay: 20000, callback: this.endOfBonusLogoTimer, callbackScope: this });
	}

	endOfBonusLogoTimer() {
		this.bonusLogo.destroy();
		this.scene.remove(CST.SCENES.BONUS);
	}
}
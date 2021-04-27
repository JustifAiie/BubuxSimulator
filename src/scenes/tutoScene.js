import phaser from 'phaser'
import {CST} from '../CST.js'
import {Bus} from '../bus.js'
import {Stop} from '../stop.js'
import {Bonus} from '../bonus.js'
import {InfoScene} from './infoScene.js'
import {PauseScene} from './pauseScene.js'

export class TutoScene extends Phaser.Scene {
	constructor() {
		super({
			key: CST.SCENES.TUTO
		});

		this.keyP;
		
		this.depositText;

		this.bus;

		this.redDeposit;
		this.blueDeposit;

		this.stop;
		this.stop2;

		this.score = 0;

		this.pub;		
		this.flag;
		this.flag2;
		this.flag3;
		this.flag4;

		this.isTuto = true;
	}

	create() {

		// Create map

		const map = this.make.tilemap({ key: 'tuto' });
		const tileset = [];

		tileset.push(map.addTilesetImage('overworld', 'overworld'));
		tileset.push(map.addTilesetImage('building', 'building'));
		tileset.push(map.addTilesetImage('Trees', 'trees'));
		tileset.push(map.addTilesetImage('road', 'roads'));

		const groundLayer = map.createStaticLayer('Ground', tileset, 0, 0);
		const roadLayer = map.createStaticLayer('Road', tileset, 0, 0);
		const housingLayer = map.createStaticLayer('Building', tileset, 0, 0);
		const decorationLayer = map.createStaticLayer('Decoration', tileset, 0, 0);
		
		groundLayer.setCollisionByProperty({ collides: true });

		// Animated fixed elements on the map

		this.pub = this.physics.add.sprite(1000, 744, 'pub');
		this.pub.anims.play('pub');
		
		this.flag = this.physics.add.sprite(505, 710, 'flag');
		this.flag.anims.play('wave', true);
		this.flag2 = this.physics.add.sprite(439, 710, 'flag');
		this.flag2.flipX = true;
		this.flag2.anims.play('wave', true);
		this.flag3 = this.physics.add.sprite(1161, 918, 'flag');
		this.flag3.anims.play('wave', true);
		this.flag4 = this.physics.add.sprite(1095, 918, 'flag');
		this.flag4.flipX = true;
		this.flag4.anims.play('wave', true);

		// Bubux

		this.bus = new Bus(this, 796, 825, 'bus').setDepth(1); //1336 376
		this.add.existing(this.bus);
		this.physics.add.collider(this.bus, groundLayer);

		this.scene.add(CST.SCENES.INFO, InfoScene, false);
		this.scene.launch(CST.SCENES.INFO, { obj: this.bus, obj2 : this.isTuto });

		// Deposit

		this.redDeposit = this.physics.add.sprite(1129, 944, 'redDeposit').setScale(0.8);
		this.add.existing(this.redDeposit);
		this.physics.add.overlap(this.bus, this.redDeposit, this.updateRedDepositedNumber, null, this);
		this.blueDeposit = this.physics.add.sprite(473, 736, 'blueDeposit').setScale(0.8);
		this.add.existing(this.blueDeposit);
		this.physics.add.overlap(this.bus, this.blueDeposit, this.updateBlueDepositedNumber, null, this);

		// Bus stops

		this.stop = new Stop(this, 584, 772, 'stop', 579, 755).setScale(1.35);
		this.add.existing(this.stop);
		this.stop.setStop();
		this.physics.add.overlap(this.bus, this.stop, this.updateWaitingNumber, null, this);

		this.stop2 = new Stop(this, 1003, 887, 'stopLeft', 1000, 872).setScale(1.35);
		this.add.existing(this.stop2);
		this.stop2.setStop();
		this.physics.add.overlap(this.bus, this.stop2, this.updateWaitingNumber, null, this);

		// Camera

		const camera = this.cameras.main;
		camera.startFollow(this.bus);
		camera.setBounds(0, 0, 1600, 1600);
		camera.setZoom(2);
		this.physics.world.setBounds(0, 0, 1600, 1600);

		// Text

		this.depositText = this.add.text(725, 713, 'Personnes déposées: 0', { fontSize: '11px', fill: '#000' });
		this.scoreText = this.add.text(725, 733, 'Score: 0 Kg de CO2', { fontSize: '11px', fill: '#000' });

		// Pause

		this.keyP =  this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.P);
		this.keyP.on('down', () => { this.pauseGame() }); 
	}

	update(time, delta) {
		super.update(time, delta);
	}

	updateWaitingNumber(bus, stop) {
		if (bus.isAtStop != true) {
			bus.isAtStop = true;
			stop.startTimer();
			bus.startTimer();
			bus.collectPeople(stop);
		}
	}

	updateRedDepositedNumber() {
		this.bus.depositRedPeople();
		this.updateDepositScore(this.bus.deposited);
		this.updateScore(this.bus.deposited);
	}

	updateBlueDepositedNumber() {
		this.bus.depositBluePeople();
		this.updateDepositScore(this.bus.deposited);
		this.updateScore(this.bus.deposited);
	}

	updateDepositScore(deposited) {
		this.depositText.setText('Personnes déposées: ' + deposited);
	}

	updateScore(deposited) {
		this.score = this.convertScoreIntoCO2Saved(deposited);
		this.scoreText.setText('Score: ' + this.score + ' Kg de CO2');
	}

	useBonus(bus, bonus) {
		bonus.randomBonus(bus, bonus);
		bonus.destroy();
	}

	convertScoreIntoCO2Saved(score) {
		//CO2 saved in Kg
		//average city trip of 2km with average emission of 131g of CO2 per km per car
		return (score * 262) / 1000;
	}

	pauseGame() {
		this.scene.pause(CST.SCENES.TUTO);
		this.scene.sleep(CST.SCENES.INFO);
		this.scene.add(CST.SCENES.PAUSE, PauseScene, false);
		this.scene.launch(CST.SCENES.PAUSE, { obj: CST.SCENES.TUTO, obj2: CST.SCENES.INFO });
	}
}
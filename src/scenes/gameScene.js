import phaser from 'phaser'
import {CST} from '../CST.js'
import {Bus} from '../bus.js'
import {Stop} from '../stop.js'
import {Bonus} from '../bonus.js'
import {InfoScene} from './infoScene.js'
import {PauseScene} from './pauseScene.js'
import {BonusScene} from './bonusScene.js'
import {NicknameScene} from './nicknameScene.js'

export class GameScene extends Phaser.Scene {
	constructor() {
		super({
			key: CST.SCENES.GAME
		});

		this.keyM;
		this.keyP;

		this.map;

		this.depositText;
		this.scoreText;
		this.timeText;
		this.countdownText;

		this.bus;

		this.redDeposit;
		this.blueDeposit;

		this.stop;
		this.stop2;
		this.stop3;
		this.stop4;
		this.stop5;
		this.stop6;
		this.stop7;
		this.stop8;

		this.bonus;
		this.bonus2;

		this.score = 0;
		this.timer;
		this.duration = 110000;
		this.countdown = 10000;

		this.fountain;
		this.graveyardFountain;
		
		this.cow1;
		this.cow2;
		
		this.flag;
		this.flag2;
		this.flag3;
		this.flag4;
		
		this.pub;
		this.pub2;
		this.pub3;
		this.pub4;

		this.skull;

		this.leftTp;
		this.rightTp;

		this.plane;
		this.isSplit = false;
	}

	create() {

		// Create map

		const map = this.make.tilemap({ key: 'town' });
		const tileset = [];

		tileset.push(map.addTilesetImage('overworld', 'overworld'));
		tileset.push(map.addTilesetImage('building', 'building'));
		tileset.push(map.addTilesetImage('Trees', 'trees'));
		tileset.push(map.addTilesetImage('road', 'roads'));

		const groundLayer = map.createStaticLayer('Ground', tileset, 0, 0);
		const roadLayer = map.createStaticLayer('Road', tileset, 0, 0);
		const housingLayer = map.createStaticLayer('Housing', tileset, 0, 0);
		const decorationLayer = map.createStaticLayer('Decoration', tileset, 0, 0);
		
		groundLayer.setCollisionByProperty({ collides: true });

		// Animated fixed elements on the map

		this.fountain = this.physics.add.sprite(776, 1257, 'fountain');
		this.fountain.anims.play('water', true);
		this.fountain.setSize(48,48);
		this.graveyardFountain = this.physics.add.sprite(1304, 170, 'fountain');
		this.graveyardFountain.anims.play('water', true);
		this.graveyardFountain.setSize(48,48);
		
		this.cow1 = this.physics.add.sprite(350, 228, 'cow').setScale(0.45);
		this.cow1.anims.play('right', true);
		this.cow2 = this.physics.add.sprite(435, 228, 'cow').setScale(0.45);
		this.cow2.anims.play('left', true);
		
		this.flag = this.physics.add.sprite(150, 156, 'flag');
		this.flag.anims.play('wave', true);
		this.flag2 = this.physics.add.sprite(90, 156, 'flag');
		this.flag2.flipX = true;
		this.flag2.anims.play('wave', true);
		this.flag3 = this.physics.add.sprite(1255, 1468, 'flag');
		this.flag3.anims.play('wave', true);
		this.flag4 = this.physics.add.sprite(1193, 1468, 'flag');
		this.flag4.flipX = true;
		this.flag4.anims.play('wave', true);

		this.pub = this.physics.add.sprite(1048, 536, 'pub');
		this.pub.anims.play('pub');
		this.pub2 = this.physics.add.sprite(376, 392, 'pub');
		this.pub2.anims.play('pub');
		this.pub3 = this.physics.add.sprite(1400, 1016, 'pub');
		this.pub3.anims.play('pub');
		this.pub4 = this.physics.add.sprite(456, 1432, 'pub');
		this.pub4.anims.play('pub');

		this.skull = this.physics.add.sprite(1475, 158, 'skull').setScale(1.2);
		this.skull.anims.play('skull');

		// Bubux

		this.bus = new Bus(this, 1340, 376, 'bus').setDepth(1); //1336 376
		this.add.existing(this.bus);
		this.physics.add.collider(this.bus, groundLayer);

		this.scene.add(CST.SCENES.INFO, InfoScene, false);
		this.scene.launch(CST.SCENES.INFO, { obj: this.bus });

		// Teleportation zones

		this.leftTp = this.physics.add.sprite(9, 808, 'tp');
		this.rightTp = this.physics.add.sprite(1591, 712, 'tp');
		this.physics.add.overlap(this.bus, this.leftTp, function() { 
			this.bus.body.reset(1540,712); 
			camera.fadeIn(300);
		}, null, this);
		this.physics.add.overlap(this.bus, this.rightTp, function() { 
			this.bus.body.reset(55,808); 
			camera.fadeIn(300);
		}, null, this);

		// Deposit

		this.redDeposit = this.physics.add.sprite(1226, 1504, 'redDeposit').setScale(0.8);
		this.add.existing(this.redDeposit);
		this.physics.add.overlap(this.bus, this.redDeposit, this.updateRedDepositedNumber, null, this);
		this.blueDeposit = this.physics.add.sprite(121, 207, 'blueDeposit').setScale(0.8);
		this.add.existing(this.blueDeposit);
		this.physics.add.overlap(this.bus, this.blueDeposit, this.updateBlueDepositedNumber, null, this);

		// Bus stops

		this.stop = new Stop(this, 296, 416, 'stop', 291, 399).setScale(1.35);
		this.add.existing(this.stop);
		this.stop.setStop();
		this.physics.add.overlap(this.bus, this.stop, this.updateWaitingNumber, null, this);

		this.stop2 = new Stop(this, 952, 256, 'stop', 947, 239).setScale(1.35);
		this.add.existing(this.stop2);
		this.stop2.setStop();
		this.physics.add.overlap(this.bus, this.stop2, this.updateWaitingNumber, null, this);

		this.stop3 = new Stop(this, 1532, 536, 'stopRight', 1523, 521).setScale(1.35);
		this.stop3.body.setOffset(-16,0);
		this.add.existing(this.stop3);
		this.stop3.setStop();
		this.physics.add.overlap(this.bus, this.stop3, this.updateWaitingNumber, null, this);

		this.stop4 = new Stop(this, 920, 688, 'stop', 915, 671).setScale(1.35);
		this.add.existing(this.stop4);
		this.stop4.setStop();
		this.physics.add.overlap(this.bus, this.stop4, this.updateWaitingNumber, null, this);

		this.stop5 = new Stop(this, 352, 848, 'stopLeft', 349, 833).setScale(1.35);
		this.add.existing(this.stop5);
		this.stop5.setStop();
		this.physics.add.overlap(this.bus, this.stop5, this.updateWaitingNumber, null, this);

		this.stop6 = new Stop(this, 1014, 1096, 'stopLeft', 1011, 1081).setScale(1.35);
		this.add.existing(this.stop6);
		this.stop6.setStop();
		this.physics.add.overlap(this.bus, this.stop6, this.updateWaitingNumber, null, this);

		this.stop7 = new Stop(this, 218, 1344, 'stop', 213, 1327).setScale(1.35);
		this.add.existing(this.stop7);
		this.stop7.setStop();
		this.physics.add.overlap(this.bus, this.stop7, this.updateWaitingNumber, null, this);

		this.stop8 = new Stop(this, 616, 1472, 'stop', 611, 1455).setScale(1.35);
		this.add.existing(this.stop8);
		this.stop8.setStop();
		this.physics.add.overlap(this.bus, this.stop8, this.updateWaitingNumber, null, this);

		//Bonus

		this.bonus = new Bonus(this, 'bonus');
		this.bonus.startTimer(Phaser.Math.Between(30000,75000));
		this.physics.add.overlap(this.bus, this.bonus, this.useBonus, null, this);

		// Camera

		const camera = this.cameras.main;
		camera.startFollow(this.bus);
		camera.setBounds(0, 0, 1600, 1600);
		camera.setZoom(1.7);
		this.physics.world.setBounds(0, 0, 1600, 1600);

		// Text

		this.depositText = this.add.text(760, 852, 'Personnes d??pos??es: 0', { fontSize: '13px', fill: '#000' });
		this.scoreText = this.add.text(760, 873, 'Score: 0 Kg de CO2', { fontSize: '13px', fill: '#000' });    
		this.timeText = this.add.text(760, 878, '', { font: '13px', fill: '#000' });

		this.countdownText = this.add.text(0, 0, '', { fontSize: '150px', color: '#f00', fontStyle: 'bold' }).setOrigin(0.5).setDepth(3).setVisible(false);

		this.timer = this.time.addEvent({ delay: this.duration, callback: this.endOfTimer, callbackScope: this });

		// Show map

		this.keyM = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.M);

		this.map = this.cameras.add(333, 40, 1600, 1600);
		this.map.visible = false;

		this.keyM.on('down', () => { this.displayMap() });

		// Pause

		this.keyP =  this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.P);
		this.keyP.on('down', () => { this.pauseGame() });

	}

	update(time, delta) {
		super.update(time, delta);
		var timeTab = this.convertTime(Math.floor(this.duration + this.countdown - this.timer.getElapsed()));
		this.timeText.setText('\nTime: ' + timeTab[0] + ' min ' + timeTab[1] + ' s');
		this.countdownText.setPosition(this.cameras.main.midPoint.x, this.cameras.main.midPoint.y);
		this.countdownText.setText(timeTab[1]);
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
		this.depositText.setText('Personnes d??pos??es: ' + deposited);
	}

	updateScore(deposited) {
		this.score = this.convertScoreIntoCO2Saved(deposited);
		this.scoreText.setText('Score: ' + this.score + ' Kg de CO2');
	}

	useBonus(bus, bonus) {
		bonus.randomBonus(bus, bonus);
		bonus.destroy();
		this.scene.add(CST.SCENES.BONUS, BonusScene, false);
		this.scene.launch(CST.SCENES.BONUS, { obj: bonus, obj2 : bus, obj3: this.isSplit});
	}

	convertScoreIntoCO2Saved(score) {
		//CO2 saved in Kg
		//average city trip of 2km with average emission of 131g of CO2 per km per car
		return (score * 262) / 1000;
	}

	convertTime(time) {
		var timeTab = [];
		timeTab.push(Math.floor(time / 60000));
		timeTab.push(Math.floor((time % 60000)*0.001));
		return timeTab;
	}

	displayMap() {
		if (!this.map.visible) {
			this.map.visible = true;
			this.map.setBounds(0, 0, 1600, 1600);	
			this.map.setZoom(0.45);
			this.bus.speed = 0;
		}
		else {
			this.map.visible = false;
			this.bus.speed = 150;
		}
	}

	goToNickname() {
		var isSplit = false;
		this.bus.score = this.score;
		this.scene.add(CST.SCENES.NICKNAME, NicknameScene, false);
		this.scene.launch(CST.SCENES.NICKNAME, { obj: this.bus, obj2: isSplit});
	}

	endOfTimer() {
		this.duration = 10000;
		this.countdown = 0;
		this.countdownText.setVisible(true);
		this.timer = this.time.addEvent({ delay: this.duration, callback: this.endGame, callbackScope: this, startAt: 10 });
	}

	pauseGame() {
		this.scene.pause(CST.SCENES.GAME);
		this.scene.sleep(CST.SCENES.INFO);
		this.scene.add(CST.SCENES.PAUSE, PauseScene, false);
		this.scene.launch(CST.SCENES.PAUSE, { obj: CST.SCENES.GAME, obj2: CST.SCENES.INFO });
	}

	endGame() {
		this.bus.speed = 0;
		this.countdownText.setVisible(false);
		this.scene.stop(CST.SCENES.INFO);
		this.cameras.main.fadeOut(2000);
		this.timer = this.time.addEvent({ delay: 2000, callback: function () {
			this.scene.remove(CST.SCENES.GAME);
			this.scene.remove(CST.SCENES.INFO);
			this.goToNickname();
		}, callbackScope: this });
	}
}
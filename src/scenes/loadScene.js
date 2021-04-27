import phaser from 'phaser'
import {CST} from '../CST.js'
import {TitleScene} from './titleScene.js'

export class LoadScene extends Phaser.Scene {
	constructor() {
		super({
			key: CST.SCENES.LOAD
		});
	}

	preload() {

		// LOADING TITLESCREEN ASSETS

		this.load.image('background', '../../assets/gfx/Background.png');
		this.load.image('fullscreenButton', '../../assets/gfx/fullscreen.png');
		this.load.spritesheet('oneP', '../../assets/gfx/oneplayer.png', { frameWidth: 80, frameHeight: 64 });
		this.load.spritesheet('twoP', '../../assets/gfx/twoplayer.png', { frameWidth: 80, frameHeight: 64 });
		this.load.spritesheet('tuto', '../../assets/gfx/tutorial.png', { frameWidth: 128, frameHeight: 64 });
		this.load.spritesheet('trophy', '../../assets/gfx/trophy.png', { frameWidth: 80, frameHeight: 80 });
		this.load.spritesheet('pub', '../../assets/gfx/pub.png', { frameWidth: 80, frameHeight: 48}, 73);
		this.load.image('titlePlane', '../../assets/gfx/titlePlane.png');
		this.load.image('title', '../../assets/gfx/title.png');

		// SETTING UP LOADING BAR

		var loadingBar = this.add.graphics({
			fillStyle: {
				color: 0x00ffff
			}
		});

		for (var i = 0; i < 200; i++) {
			this.load.spritesheet('oneP' + i, '../../assets/gfx/oneplayer.png', { frameWidth: 80, frameHeight: 64 });
		}

		this.load.on('progress', (percent)=>{
			loadingBar.fillRect(100, this.game.renderer.height / 2, (this.game.renderer.width - 200) * percent, 50);
			this.add.text(this.game.renderer.width / 5 + 215, this.game.renderer.height / 2 + 5, 'GAME LOADING PLEASE WAIT', { fontSize: '40px', fill: '#000'});
		})

		// LOADING GAME ASSETS

		this.load.image('overworld', '../../assets/gfx/Overworld.png');
		this.load.image('building', '../../assets/gfx/building.png');
		this.load.image('trees', '../../assets/gfx/trees.png');
		this.load.image('roads', '../../assets/gfx/Road.png');
		this.load.tilemapTiledJSON('town', '../../assets/Maps/town.json');
		this.load.tilemapTiledJSON('tuto', '../../assets/Maps/tuto.json');

		this.load.spritesheet('bus', '../../assets/gfx/bus.png', { frameWidth: 240, frameHeight: 208 }, 16);
		this.load.spritesheet('bus2', '../../assets/gfx/bus2.png', { frameWidth: 240, frameHeight: 208 }, 16);

		this.load.spritesheet('tp', '../../assets/gfx/tp.png', { frameWidth: 48, frameHeight: 16 });
		this.load.spritesheet('redDeposit', '../../assets/gfx/redDeposit.png', { frameWidth: 48, frameHeight: 16 });
		this.load.spritesheet('blueDeposit', '../../assets/gfx/blueDeposit.png', { frameWidth: 48, frameHeight: 16 });

		this.load.spritesheet('stop', '../../assets/gfx/stop.png', { frameWidth: 36, frameHeight: 24 });
		this.load.spritesheet('stopLeft', '../../assets/gfx/stopLeft.png', { frameWidth: 18, frameHeight: 35 });
		this.load.spritesheet('stopRight', '../../assets/gfx/stopRight.png', { frameWidth: 18, frameHeight: 35 });

		this.load.spritesheet('fountain', '../../assets/gfx/fountain.png', { frameWidth: 48, frameHeight: 48 });
		this.load.spritesheet('cow', '../../assets/gfx/cow.png', { frameWidth: 128, frameHeight: 128 }, 16);
		this.load.spritesheet('flag', '../../assets/gfx/flag.png', {frameWidth: 16, frameHeight: 32 });
		this.load.spritesheet('skull', '../../assets/gfx/skull.png', {frameWidth: 16, frameHeight: 16 });

		this.load.image('hud1', '../../assets/gfx/hud1.png');
		this.load.image('hud2', '../../assets/gfx/hud2.png');

		this.load.image('plane', '../../assets/gfx/plane.png');
		this.load.image('planeShadow', '../../assets/gfx/planeshadow.png');

		//LOADING BONUS ASSETS
		
		this.load.spritesheet('bonus', '../../assets/gfx/bonus.png', { frameWidth: 32, frameHeight: 48 });
		this.load.spritesheet('bonusImg', '../../assets/gfx/bonusImg.png', { frameWidth: 80, frameHeight: 80 });
		this.load.image('speed', '../../assets/gfx/speed.png');
		this.load.image('add', '../../assets/gfx/add.png');
		this.load.image('swap', '../../assets/gfx/swap.png');

		//LOADING LEADERBOARD ASSETS

		this.load.image('backgroundLeader', '../../assets/gfx/backgroundLeader.png');

		//LOADING NICKNAME ASSETS

		this.load.spritesheet('select', '../../assets/gfx/select.png', { frameWidth: 32, frameHeight: 32 });
		this.load.image('selectYellow', '../../assets/gfx/selectYellow.png');
		this.load.image('selectBlue', '../../assets/gfx/selectBlue.png');
		this.load.bitmapFont('arcade', 'assets/Fonts/myFont.png', 'assets/Fonts/myFont.xml');
		this.load.image('nicknameBackground', '../../assets/gfx/nicknameBackground.png');
		this.load.image('splitNicknameBackground', '../../assets/gfx/splitNicknameBackground.png');
		this.load.image('enter', '../../assets/gfx/enter.png');
		this.load.image('delete', '../../assets/gfx/delete.png');

		//LOADING ENDING AND PAUSE ASSETS

		this.load.image('endingBackground', '../../assets/gfx/ending.png');
		this.load.image('splitEndingBackground', '../../assets/gfx/splitEnding.png');
		this.load.image('pauseBackground', '../../assets/gfx/pauseBackground.png');
		this.load.spritesheet('replay', '../../assets/gfx/replay.png', {frameWidth: 64, frameHeight: 64 });
		this.load.spritesheet('quit', '../../assets/gfx/quit.png', {frameWidth: 64, frameHeight: 64 });
		this.load.spritesheet('resume', '../../assets/gfx/resume.png', {frameWidth: 80, frameHeight: 64 });

	}

	create() {

		// Animations

		this.anims.create({
			key: 'pushOne',
			frames: this.anims.generateFrameNumbers('oneP', { start: 0, end: 7 }),
			frameRate: 8,
			repeat: -1
		});

		this.anims.create({
			key: 'stopOne',
			frames: this.anims.generateFrameNumbers('oneP', { start: 2, end: 2 }),
			frameRate: 1,
			repeat: -1
		});

		this.anims.create({
			key: 'pushTwo',
			frames: this.anims.generateFrameNumbers('twoP', { start: 0, end: 7 }),
			frameRate: 8,
			repeat: -1
		});

		this.anims.create({
			key: 'stopTwo',
			frames: this.anims.generateFrameNumbers('twoP', { start: 2, end: 2 }),
			frameRate: 1,
			repeat: -1
		});

		this.anims.create({
			key: 'pushTuto',
			frames: this.anims.generateFrameNumbers('tuto', { start: 0, end: 7 }),
			frameRate: 8,
			repeat: -1
		});

		this.anims.create({
			key: 'stopTuto',
			frames: this.anims.generateFrameNumbers('tuto', { start: 2, end: 2 }),
			frameRate: 1,
			repeat: -1
		});

		this.anims.create({
			key: 'water',
			frames: this.anims.generateFrameNumbers('fountain', { start: 0, end: 2 }),
			frameRate: 6,
			repeat: -1
		});

		this.anims.create({ 
			key: 'left', 
			frames: this.anims.generateFrameNumbers('cow', { start: 4, end: 7 }), 
			frameRate: 4, 
			repeat: -1
		});

		this.anims.create({ 
			key: 'right', 
			frames: this.anims.generateFrameNumbers('cow', { start: 12, end: 15 }),
			frameRate:  4,
			repeat: -1 
		});

		this.anims.create({
			key: 'wave', 
			frames: this.anims.generateFrameNumbers('flag', { start: 0, end: 11 }),
			frameRate:  9,
			repeat: -1 
		});

		this.anims.create({
			key: 'pub',
			frames: this.anims.generateFrameNumbers('pub', { start: 0, end: 145 }),
			frameRate: 12,
			repeat: -1,
			yoyo: true
		});

		this.anims.create({
			key: 'skull',
			frames: this.anims.generateFrameNumbers('skull', { start: 0, end: 7 }),
			frameRate: 4,
			repeat: -1,
			yoyo: true
		});

		this.anims.create({
			key: 'bonus',
			frames: this.anims.generateFrameNumbers('bonus', { start: 0, end: 9 }),
			frameRate: 10,
			repeat: -1,
			yoyo: true
		});

		this.anims.create({
			key: 'busRight',
			frames: this.anims.generateFrameNumbers('bus', { start: 0, end: 3 }),
			frameRate: 7,
			repeat: -1
		});

		this.anims.create({
			key: 'busLeft',
			frames: this.anims.generateFrameNumbers('bus', { start: 4, end: 7 }),
			frameRate: 7,
			repeat: -1
		});

		this.anims.create({
			key: 'busUp',
			frames: this.anims.generateFrameNumbers('bus', { start: 8, end: 10 }),
			frameRate: 7,
			repeat: -1
		});

		this.anims.create({
			key: 'busDown',
			frames: this.anims.generateFrameNumbers('bus', { start: 12, end: 14 }),
			frameRate: 7,
			repeat: -1
		});

		this.anims.create({
			key: 'bus2Right',
			frames: this.anims.generateFrameNumbers('bus2', { start: 0, end: 3 }),
			frameRate: 7,
			repeat: -1
		});

		this.anims.create({
			key: 'bus2Left',
			frames: this.anims.generateFrameNumbers('bus2', { start: 4, end: 7 }),
			frameRate: 7,
			repeat: -1
		});

		this.anims.create({
			key: 'bus2Up',
			frames: this.anims.generateFrameNumbers('bus2', { start: 8, end: 10 }),
			frameRate: 7,
			repeat: -1
		});

		this.anims.create({
			key: 'bus2Down',
			frames: this.anims.generateFrameNumbers('bus2', { start: 12, end: 14 }),
			frameRate: 7,
			repeat: -1
		});

		this.anims.create({
			key: 'pushReplay',
			frames: this.anims.generateFrameNumbers('replay', { start: 0, end: 7 }),
			frameRate: 8,
			repeat: -1
		});

		this.anims.create({
			key: 'stopReplay',
			frames: this.anims.generateFrameNumbers('replay', { start: 2, end: 2 }),
			frameRate: 1,
			repeat: -1
		});

		this.anims.create({
			key: 'pushQuit',
			frames: this.anims.generateFrameNumbers('quit', { start: 0, end: 7 }),
			frameRate: 8,
			repeat: -1
		});

		this.anims.create({
			key: 'stopQuit',
			frames: this.anims.generateFrameNumbers('quit', { start: 2, end: 2 }),
			frameRate: 1,
			repeat: -1
		});

		this.anims.create({
			key: 'pushResume',
			frames: this.anims.generateFrameNumbers('resume', { start: 0, end: 7 }),
			frameRate: 8,
			repeat: -1
		});

		this.anims.create({
			key: 'stopResume',
			frames: this.anims.generateFrameNumbers('resume', { start: 2, end: 2 }),
			frameRate: 1,
			repeat: -1
		});

		this.anims.create({
			key: 'bonusRoll',
			frames: this.anims.generateFrameNumbers('bonusImg', { start: 0, end: 2 }),
			frameRate: 10,
			repeat: 10
		});

		this.anims.create({
			key: 'trophyButton',
			frames: this.anims.generateFrameNumbers('trophy', { start: 0, end: 7 }),
			frameRate: 8,
			repeat: -1
		});

		this.anims.create({
			key: 'stopTrophy',
			frames: this.anims.generateFrameNumbers('trophy', { start: 2, end: 2 }),
			frameRate: 1,
			repeat: 1
		});

		// Launch scene
		this.scene.add(CST.SCENES.TITLE, TitleScene, false);
		this.scene.start(CST.SCENES.TITLE);
		this.scene.stop();
	}
}
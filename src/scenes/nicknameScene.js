import phaser from 'phaser'
import {CST} from '../CST.js'

export class NicknameScene extends Phaser.Scene {
	constructor() {
		super({
			key: CST.SCENES.NICKNAME
		});

		this.background;
		this.splitBackground;
		this.select;
		this.select2;
		this.enter;
		this.delete;

		this.cursors;
		this.letters;
		this.nickname;
		this.nickname2;
		this.playerText;
		this.playerText2; 	

		this.chars;
		this.pos;
		this.pos2;
		this.nameLength;
		this.nameLength2;
		this.lastChar;
		this.lastChar2;

		this.bus;
		this.bus2;

		this.isSplit;
		this.submited;
		this.submited2;

		this.highscore;
	}

	init(data) {
		this.bus = data.obj;
		this.bus2 = data.obj2;
		this.isSplit = data.obj3;
	}

	create() {

		this.chars = [
			[ 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J' ],
			[ 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T' ],
			[ 'U', 'V', 'W', 'X', 'Y', 'Z', '.', '-' ]
		];

		this.lastChar = [];

		this.lastChar2 = [];

		this.pos = { x: 0, y: 0 };

		this.pos2 = { x: 0, y: 0 };

		this.nickname = '___';

		this.nickname2 = '___'

		this.nameLength = 0;

		this.nameLength2 = 0;

		this.submited = false;

		this.submited2 = false;

		this.select = this.add.sprite(this.game.renderer.width / 4, this.game.renderer.height / 2, 'selectYellow').setDepth(1).setScale(2.05).setOrigin(0);

		this.letters = this.add.bitmapText(this.game.renderer.width / 4 + 7, this.game.renderer.height / 2 + 4, 'arcade', 'ABCDEFGHIJ\nKLMNOPQRST\nUVWXYZ.-').setLetterSpacing(10).setScale(0.9).setDepth(1);

		this.enter = this.add.image(this.game.renderer.width / 1.4, this.game.renderer.height / 1.43, 'enter').setDepth(1).setScale(0.9);

		this.delete = this.add.image(this.game.renderer.width / 1.505, this.game.renderer.height / 1.43, 'delete').setDepth(1).setScale(0.9);

		this.scene.scene.physics.world.enable(this.select);

		this.cursors = this.scene.scene.input.keyboard.addKeys({
            up:Phaser.Input.Keyboard.KeyCodes.Z,
            down:Phaser.Input.Keyboard.KeyCodes.S,
            left:Phaser.Input.Keyboard.KeyCodes.Q,
            right:Phaser.Input.Keyboard.KeyCodes.D
        });﻿

		this.cursors.right.on('down', () => { this.moveRight(this.select); });

		this.cursors.left.on('down', () => { this.moveLeft(this.select); });

		this.cursors.down.on('down', () => { this.moveDown(this.select); });

		this.cursors.up.on('down', () => { this.moveUp(this.select); });

		this.tweens.add({
            targets: this.select,
            alpha: 0.2,
            yoyo: true,
            repeat: -1,
            ease: 'Sine.easeInOut',
            duration: 350
        });

        if (!this.isSplit) {

        	this.background = this.add.image(0, 0, 'nicknameBackground').setOrigin(0).setScale(1.425);

			this.playerText = this.add.bitmapText(this.game.renderer.width / 2.275, this.game.renderer.height / 5.7, 'arcade', this.nickname).setScale(0.8);

			this.input.keyboard.on('keyup', () => { this.setNickname(event); });
        }
        else {

        	this.splitBackground = this.add.image(0, 0, 'splitNicknameBackground').setOrigin(0).setScale(1.425).setDepth(0);

        	this.select2 = this.add.image(this.game.renderer.width / 4, this.game.renderer.height / 2, 'selectBlue').setDepth(1).setScale(2.05).setOrigin(0);

        	this.scene.scene.physics.world.enable(this.select2);

        	this.tweens.add({
            	targets: this.select2,
            	alpha: 0.2,
            	yoyo: true,
            	repeat: -1,
            	ease: 'Sine.easeInOut',
            	duration: 350
        	});

        	this.cursors2 = this.scene.scene.input.keyboard.createCursorKeys();

        	this.cursors2.right.on('down', () => { this.moveRight2(this.select2); });

			this.cursors2.left.on('down', () => { this.moveLeft2(this.select2); });

			this.cursors2.down.on('down', () => { this.moveDown2(this.select2); });

			this.cursors2.up.on('down', () => { this.moveUp2(this.select2); });

        	this.playerText = this.add.bitmapText(this.game.renderer.width / 4.2, this.game.renderer.height / 5.7, 'arcade', this.nickname).setScale(0.8);

        	this.playerText2 = this.add.bitmapText(this.game.renderer.width / 1.54, this.game.renderer.height / 5.7, 'arcade', this.nickname2).setScale(0.8);

        	this.input.keyboard.on('keyup', () => { this.setSplitNickname(event); });
        }
	}

	moveRight(obj) {
		if (this.select.body.x < 900) {
			obj.body.reset(this.select.body.x + 67, this.select.body.y);
			this.pos.x++;
		}	
	}

	moveLeft(obj) {
		if (this.select.body.x > 349) {
			obj.body.reset(this.select.body.x - 67, this.select.body.y);
			this.pos.x--;	
		}
	}

	moveDown(obj) {
		if (this.select.body.y < 503) {
			obj.body.reset(this.select.body.x, this.select.body.y + 60);
			this.pos.y++;
		}
	}

	moveUp(obj) {
		if (this.select.body.y > 385) {
			obj.body.reset(this.select.body.x, this.select.body.y - 60);
			this.pos.y--;
		}
	}

	moveRight2(obj) {
		if (this.select2.body.x < 900) {
			obj.body.reset(this.select2.body.x + 67, this.select2.body.y);
			this.pos2.x++;
		}	
	}

	moveLeft2(obj) {
		if (this.select2.body.x > 349) {
			obj.body.reset(this.select2.body.x - 67, this.select2.body.y);
			this.pos2.x--;	
		}
	}

	moveDown2(obj) {
		if (this.select2.body.y < 503) {
			obj.body.reset(this.select2.body.x, this.select2.body.y + 60);
			this.pos2.y++;
		}
	}

	moveUp2(obj) {
		if (this.select2.body.y > 385) {
			obj.body.reset(this.select2.body.x, this.select2.body.y - 60);
			this.pos2.y--;
		}
	}

	setNickname(event) {
		if (event.keyCode === 13 && (this.pos.x !== 8 || this.pos.y !== 2) && (this.pos.x !== 9 || this.pos.y !== 2)) {
			if (this.nameLength < 3) {
				this.playerText.destroy();
				this.nickname = this.nickname.replace('_', this.chars[this.pos.y][this.pos.x]);
				this.playerText = this.add.bitmapText(this.game.renderer.width / 2.275, this.game.renderer.height / 5.7, 'arcade', this.nickname).setScale(0.8);
				this.nameLength++;
				this.lastChar.push(this.chars[this.pos.y][this.pos.x]);
			}			
		}

        if (event.keyCode === 13 && (this.pos.x === 8 && this.pos.y === 2)) {
        	if (this.nameLength > 0) {
        		this.playerText.destroy();
        		this.nickname = this.nickname.replace(this.lastChar[this.lastChar.length - 1], '_');
        		this.lastChar.pop();
        		this.playerText = this.add.bitmapText(this.game.renderer.width / 2.275, this.game.renderer.height / 5.7, 'arcade', this.nickname).setScale(0.8);
        		this.nameLength--;
        	}
        }

        if (event.keyCode === 13 && (this.pos.x === 9 && this.pos.y === 2)) {
        	if (this.nameLength == 3) {
        		this.goToEnd(this.isSplit);
        	}
        }
	}

	setSplitNickname(event) {
		if (event.keyCode === 32 && (this.pos.x !== 8 || this.pos.y !== 2) && (this.pos.x !== 9 || this.pos.y !== 2)) {
			if (this.nameLength < 3) {
				this.playerText.destroy();
				this.nickname = this.nickname.replace('_', this.chars[this.pos.y][this.pos.x]);
				this.playerText = this.add.bitmapText(this.game.renderer.width / 4.2, this.game.renderer.height / 5.7, 'arcade', this.nickname).setScale(0.8);
				this.nameLength++;
				this.lastChar.push(this.chars[this.pos.y][this.pos.x]);
			}			
		}

        if (event.keyCode === 32 && (this.pos.x === 8 && this.pos.y === 2)) {
        	if (this.nameLength > 0) {
        		this.playerText.destroy();
        		this.nickname = this.nickname.replace(this.lastChar[this.lastChar.length - 1], '_');
        		this.lastChar.pop();
        		this.playerText = this.add.bitmapText(this.game.renderer.width / 4.2, this.game.renderer.height / 5.7, 'arcade', this.nickname).setScale(0.8);
        		this.nameLength--;
        	}
        }

        if (event.keyCode === 32 && (this.pos.x === 9 && this.pos.y === 2)) {
        	if (this.nameLength == 3) {
        		this.select.destroy();
        		this.submited = true
        		this.goToEnd(this.isSplit, this.submited, this.submited2)
        	}
        }

        if (event.keyCode === 13 && (this.pos2.x !== 8 || this.pos2.y !== 2) && (this.pos2.x !== 9 || this.pos2.y !== 2)) {
			if (this.nameLength2 < 3) {
				this.playerText2.destroy();
				this.nickname2 = this.nickname2.replace('_', this.chars[this.pos2.y][this.pos2.x]);
				this.playerText2 = this.add.bitmapText(this.game.renderer.width / 1.54, this.game.renderer.height / 5.7, 'arcade', this.nickname2).setScale(0.8);
				this.nameLength2++;
				this.lastChar2.push(this.chars[this.pos2.y][this.pos2.x]);
			}			
		}

        if (event.keyCode === 13 && (this.pos2.x === 8 && this.pos2.y === 2)) {
        	if (this.nameLength2 > 0) {
        		this.playerText2.destroy();
        		this.nickname2 = this.nickname2.replace(this.lastChar2[this.lastChar2.length - 1], '_');
        		this.lastChar2.pop();
        		this.playerText2 = this.add.bitmapText(this.game.renderer.width / 1.54, this.game.renderer.height / 5.7, 'arcade', this.nickname2).setScale(0.8);
        		this.nameLength2--;
        	}
        }

        if (event.keyCode === 13 && (this.pos2.x === 9 && this.pos2.y === 2)) {
        	if (this.nameLength2 == 3) {
        		this.select2.destroy();
        		this.submited2 = true
        		this.goToEnd(this.isSplit, this.submited, this.submited2)
        	}
        }
	}

	goToEnd(condition, check, check2) {

		if (!condition) {

			
			document.cookie = this.nickname + ' = ' + this.bus.score;
			

			this.scene.launch(CST.SCENES.END, { obj: [this.bus, this.nickname] });
			this.scene.remove(CST.SCENES.NICKNAME);
		}
		else {

			if (check && check2) {

				document.cookie = this.nickname + ' = ' + this.bus.score;

				document.cookie = this.nickname2 + ' = ' + this.bus2.score;
				

				this.scene.launch(CST.SCENES.SPLITEND, { obj: [this.bus, this.bus2, this.nickname, this.nickname2] });
				this.scene.remove(CST.SCENES.NICKNAME);
			}
		}
	}
}
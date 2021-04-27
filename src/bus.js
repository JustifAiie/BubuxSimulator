import phaser from 'phaser'

export class Bus extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture) {
        super(scene, x, y);
        this.scene.physics.world.enable(this);
        this.setTexture(texture);
        this.setScale(0.3);
        this.body.setSize(150,60);
        this.body.setOffset(35,70);
        this.body.setCollideWorldBounds(true);

        this.texture = texture;

        this.busLeft;
        this.busRight;
        this.busUp;
        this.busDown;

        this.speed = 150;

        this.size = 15;

        this.collected = 0;

        this.redCollected = 0;

        this.blueCollected = 0;

        this.free = this.size - this.collected;

        this.deposited = 0;

        this.isAtStop = false;

        this.score = 0;

        this.timer;
        this.accelerationTimer;
        this.sizeTimer;

        this.cursors;
        this.animations = [];
        
        if (this.texture == 'bus') {
            this.cursors = this.scene.input.keyboard.addKeys({
                up:Phaser.Input.Keyboard.KeyCodes.Z,
                down:Phaser.Input.Keyboard.KeyCodes.S,
                left:Phaser.Input.Keyboard.KeyCodes.Q,
                right:Phaser.Input.Keyboard.KeyCodes.D
            });﻿
            this.animations = ['busLeft','busRight','busUp','busDown'];
        } else if (this.texture == 'bus2') {
            this.cursors = this.scene.input.keyboard.createCursorKeys();
            this.animations = ['bus2Left','bus2Right','bus2Up','bus2Down'];
        }

        this.scene.add.existing(this);
    }

    preUpdate(time, delta) {
        super.preUpdate(time, delta);

        const cursors = this.cursors;

        this.body.setVelocity(0);

        if (cursors.left.isDown) {
            this.body.setVelocityX(-this.speed);
            if (!this.busUp && !this.busDown) {
                this.setScale(0.3);
                this.body.setSize(150,60);
                this.body.setOffset(50,70);
                this.anims.play(this.animations[0], true);
            }
            this.busLeft = true;
            this.busRight = false;
            this.busUp = false;
            this.busDown = false;
        } else if (cursors.right.isDown) {
            this.body.setVelocityX(this.speed);
            if (!this.busUp && !this.busDown) {
                this.setScale(0.3);
                this.body.setSize(150,60);
                this.body.setOffset(35,70);
                this.anims.play(this.animations[1], true);
            }
            this.busLeft = false;
            this.busRight = true;
            this.busUp = false;
            this.busDown = false;
        }

        if (cursors.up.isDown) {
            this.body.setVelocityY(-this.speed);
            if (!this.busLeft && !this.busRight) {
                this.setScale(0.25);
                this.body.setSize(60,150);
                this.body.setOffset(90,20);
                this.anims.play(this.animations[2], true);
            }
            this.busLeft = false;
            this.busRight = false;
            this.busUp = true;
            this.busDown = false;
        } else if (cursors.down.isDown) {
            this.body.setVelocityY(this.speed);
            if (!this.busLeft && !this.busRight) {
                this.setScale(0.25);
                this.body.setSize(60,150);
                this.body.setOffset(90,20);
                this.anims.play(this.animations[3], true);
            }
            this.busLeft = false;
            this.busRight = false;
            this.busUp = false;
            this.busDown = true;
        }
        this.body.velocity.normalize().scale(this.speed);
    }

    collectPeople(stop) {
        this.free = this.size - this.collected;
        
        if (stop.peopleWaiting <= this.free) {
            this.collected += stop.peopleWaiting;
            this.free -= stop.peopleWaiting;
            this.redCollected += stop.redPeople;
            this.blueCollected += stop.bluePeople;
            stop.peopleWaiting = 0;
            stop.redPeople = 0;
            stop.bluePeople = 0;
        } else {
            this.collected += this.free;
            stop.peopleWaiting -= this.free;
            for (var i = 0; i < this.free; i++) {
                var index = Phaser.Math.Between(0,1);
                if (index == 0 && stop.redPeople > 0) {
                    this.redCollected += 1;
                    stop.redPeople -= 1;
                } else if (index == 1 && stop.bluePeople > 0) {
                    this.blueCollected += 1;
                    stop.bluePeople -= 1;
                } else if (index == 0 && stop.redPeople == 0) {
                    this.blueCollected += 1;
                    stop.bluePeople -= 1;
                } else if (index == 1 && stop.bluePeople == 0) {
                    this.redCollected += 1;
                    stop.redPeople -= 1;
                }
            }
            this.free = 0;
        }
        stop.updateStopText();
    }

    depositRedPeople() {
        this.deposited += this.redCollected;
        this.free += this.redCollected;
        this.collected -= this.redCollected; 
        this.redCollected -= this.redCollected;
    }

    depositBluePeople() {
        this.deposited += this.blueCollected;
        this.free += this.blueCollected;
        this.collected -= this.blueCollected; 
        this.blueCollected -= this.blueCollected;
    }

    startTimer() {
        this.timer = this.scene.time.addEvent({ delay: 3000, callback: this.endOfTimer, callbackScope: this });
    }

    endOfTimer() {
        this.isAtStop = false;
    }

    startAccelerationTimer(time) {
        this.accelerationTimer = this.scene.time.addEvent({ delay: time, callback: this.setNormalSpeed, callbackScope: this });
    }

    setNormalSpeed() {
        this.speed = 200;
    }

    startSizeTimer(time) {
        this.free = this.size - this.collected;
        this.sizeTimer = this.scene.time.addEvent({ delay: time, callback: this.setNormalSize, callbackScope: this });
    }

    setNormalSize() {
        this.size = 15;
        this.free = this.size - this.collected;
    }
}
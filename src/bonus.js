import phaser from 'phaser'

var position = [325,1217,1294,32,1552,1575,518,330,778,1408,26,848,1338,842, /**/ 1021,600,992,800,704,96,96,528,1408,1168,1376,720,381,288];

export class Bonus extends Phaser.GameObjects.Sprite {
    constructor(scene, texture) {
        super(scene);
        this.setTexture(texture);
        this.setScale(0.5);
        this.setVisible(false);

        this.timer;
 
        this.scene.add.existing(this);

        this.i;
    }

    setXY(x,y) {
        var size = (position.length / 2);
        var i = Phaser.Math.Between(0, size-1); 
        this.setPosition(position[i], position[i + size]);

        position.splice(i, 1);
        position.splice(i + size - 1, 1);
    }

    startTimer(time) {
        this.timer = this.scene.time.addEvent({ delay: time, callback: this.endOfTimer, callbackScope: this });
    }

    endOfTimer() {
        this.setXY();
        this.scene.physics.world.enable(this);
        this.setVisible(true);
        this.anims.play('bonus', true);
    }

    increaseSpeed(bus) {
        bus.speed = 225;
        bus.startAccelerationTimer(20000);
    }

    increaseSize(bus) {
        bus.size += 5;
        bus.startSizeTimer(20000);
    }

    oneColor(bus) {
        if (bus.redCollected >= bus.blueCollected) {
            bus.redCollected += bus.blueCollected;
            bus.blueCollected = 0;
        } else {
            bus.blueCollected += bus.redCollected;
            bus.redCollected = 0;
        }
    }

    randomBonus(bus, bonus) {
        this.i = Phaser.Math.Between(0,2);
    } 
}
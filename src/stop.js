import phaser from 'phaser'

export class Stop extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, text_X, text_Y) {
        super(scene, x, y);
        this.scene.physics.world.enable(this);
        this.setTexture(texture);

        this.size = 9;

        this.peopleWaiting = 0;
        this.bluePeople = 0;
        this.redPeople = 0;

        // arret face : x-5 et y - 17 arret droite : x-9 y-15 arret gauche : x-3 et y-15
        this.text = scene.add.text(text_X, text_Y, this.peopleWaiting, { fontSize: '16px', color: '#fff', fontStyle: 'bold' }).setDepth(1);

        this.timer;
        
        this.scene.add.existing(this);
    }

    setStop() {
        this.peopleWaiting = Phaser.Math.Between(1,5);
        for (var i = 0; i < this.peopleWaiting; i++) {
            var index = Phaser.Math.Between(0,1);
            if (index == 0) {
                this.redPeople += 1;
            } else {
                this.bluePeople += 1;
            }
        }
        this.updateStopText();
    }

    updateStopText() {
        this.text.setText(this.peopleWaiting);
    }

    startTimer() {
        this.timer = this.scene.time.addEvent({ delay: Phaser.Math.Between(13000, 25000), callback: this.endOfTimer, callbackScope: this });
    }

    endOfTimer() {
        var addPeople = Phaser.Math.Between(1,5);
        if ((this.peopleWaiting + addPeople) > this.size) {
            addPeople = this.size - this.peopleWaiting;
        }

        this.peopleWaiting += addPeople;
        for (var i = 0; i < addPeople; i++) {
            var index = Phaser.Math.Between(0,1);
            if (index == 0) {
                this.redPeople += 1;
            } else {
                this.bluePeople += 1;
            }
        }
        this.updateStopText();
    }
}
document.title = 'Bubux'

import phaser from 'phaser'
import {LoadScene} from './scenes/loadScene.js'
import {EndScene} from './scenes/endScene.js'
import {SplitEndScene} from './scenes/splitEndScene.js'
import {PauseScene} from './scenes/pauseScene.js'

var config = {
  type: Phaser.AUTO,
  width: 1366,
  height: 768,
  physics: {
    default: 'arcade',
    arcade: {
      // debug: true,
      gravity: { y: 0 }
    }
  },
  scene: [
    LoadScene,
    EndScene,
    SplitEndScene
  ],
  render: {
    pixelArt: true
  }
};

var game = new Phaser.Game(config);
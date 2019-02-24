import 'phaser'
import MainScene from './scenes/mainScene'
import PreloadScene from './scenes/preloadScene'

const DEFAULT_WIDTH = 1280
const DEFAULT_HEIGHT = 720

const config: GameConfig = {
  parent: 'phaser',
  backgroundColor: '#ffffff',

  width: DEFAULT_WIDTH,
  height: DEFAULT_HEIGHT,

  // The game will be scaled manually
  scale: {
    //mode: Phaser.Scale.FIT,
    //autoCenter: Phaser.Scale.CENTER_BOTH
  },
  scene: [PreloadScene, MainScene],
  physics: {
    default: 'arcade',
    arcade: {
      debug: false,
      gravity: { y: 400 }
    }
  }
}

window.addEventListener('load', () => {
  let game = new Phaser.Game(config)
})

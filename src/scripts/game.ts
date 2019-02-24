import 'phaser'
import MainScene from './scenes/mainScene'
import PreloadScene from './scenes/preloadScene'

// fix the width and height based on the height
const w = window.innerWidth
const h = window.innerHeight
const ratio = Math.max(w / h, h / w)
const DEFAULT_HEIGHT = 720
const DEFAULT_WIDTH = ratio * DEFAULT_HEIGHT

const config: GameConfig = {
  parent: 'phaser',
  backgroundColor: '#ffffff',

  width: DEFAULT_WIDTH,
  height: DEFAULT_HEIGHT,

  // this game will be scaled manually in mainScene.tsx
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

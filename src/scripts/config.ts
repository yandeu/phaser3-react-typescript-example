import MainScene from './scenes/mainScene'
import PreloadScene from './scenes/preloadScene'

export const DEFAULT_WIDTH = 1280
export const DEFAULT_HEIGHT = 720

export const config: GameConfig = {
  backgroundColor: '#ffffff',
  scale: {
    parent: 'phaser', // this has to match the div id in index.html
    fullscreenTarget: 'body', // this has to be the wrapping element
    width: 1280,
    height: 720,
    mode: Phaser.Scale.NONE // we scale the game manually in resize()
    // autoCenter: Phaser.Scale.CENTER_BOTH
  },
  dom: {
    createContainer: true
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

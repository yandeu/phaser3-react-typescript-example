import 'phaser'
import MainScene from './scenes/mainScene'
import PreloadScene from './scenes/preloadScene'

const config: GameConfig = {
  backgroundColor: '#ffffff',
  scale: {
    parent: 'phaser', // this has to match the div id in index.html
    fullscreenTarget: 'body', // this has to be the wrapping element
    width: 1280,
    height: 720,
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH
  },
  dom: {
    createContainer: false
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

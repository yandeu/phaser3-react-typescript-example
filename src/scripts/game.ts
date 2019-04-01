import 'phaser'
import MainScene from './scenes/mainScene'
import PreloadScene from './scenes/preloadScene'
import FullScreenEvent from './scenes/fullscreenEvent'

const DEFAULT_WIDTH = 1280
const DEFAULT_HEIGHT = 720

const config: GameConfig = {
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

const resize = (game: Phaser.Game) => {
  game.scale.resize(DEFAULT_WIDTH, DEFAULT_HEIGHT)
}

window.addEventListener('load', () => {
  let game = new Phaser.Game(config)

  // added this because it did not always automatically work in Phaser 3.16.2
  FullScreenEvent(() => resize(game))

  window.addEventListener('resize', () => {
    resize(game)
  })
  resize(game)
})

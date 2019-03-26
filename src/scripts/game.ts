import 'phaser'
import MainScene from './scenes/mainScene'
import PreloadScene from './scenes/preloadScene'

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

const resize = (game: Phaser.Game) => {
  const w = window.innerWidth
  const h = window.innerHeight

  const width = DEFAULT_WIDTH
  const height = DEFAULT_HEIGHT

  const scale = Math.min(w / width, h / height)

  const newWidth = width * scale
  const newHeight = height * scale

  // resize the game
  game.scale.resize(width, height)

  // scale the width and height of the css
  game.canvas.style.width = newWidth + 'px'
  game.canvas.style.height = newHeight + 'px'

  // center the game with css margin
  game.canvas.style.marginTop = `${(h - newHeight) / 2}px`
  game.canvas.style.marginLeft = `${(w - newWidth) / 2}px`
}

window.addEventListener('load', () => {
  let game = new Phaser.Game(config)

  window.addEventListener('resize', () => {
    resize(game)
  })
  resize(game)
})

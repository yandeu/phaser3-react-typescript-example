import 'phaser'
import FullScreenEvent from './scenes/fullscreenEvent'
import { config } from './config'
import { resize } from './resize'

window.addEventListener('load', () => {
  let game = new Phaser.Game(config)

  // added this because it did not always automatically work in Phaser 3.16.2
  FullScreenEvent(() => resize(game))

  window.addEventListener('resize', () => {
    resize(game)
  })
  resize(game)
})

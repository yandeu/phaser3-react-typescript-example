import { DEFAULT_WIDTH, DEFAULT_HEIGHT } from './config'

export const resize = (game: Phaser.Game) => {
  game.scale.resize(DEFAULT_WIDTH, DEFAULT_HEIGHT)
}

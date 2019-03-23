export default class PreloadScene extends Phaser.Scene {
  constructor() {
    super({ key: 'PreloadScene' })
  }

  preload() {
    this.load.image('phaser-logo', 'assets/img/phaser-logo.png')
    this.load.spritesheet('fullscreen', 'assets/img/fullscreen.png', { frameWidth: 64, frameHeight: 64 })
  }

  create() {
    this.scene.start('MainScene')
  }
}

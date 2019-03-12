import React from 'react'
import { render } from 'react-dom'

import Box from '../components/box'
import Header from '../components/header'
import Button from '../components/button'

export default class MainScene extends Phaser.Scene {
  username: Phaser.GameObjects.Text
  password: Phaser.GameObjects.Text

  constructor() {
    super({ key: 'MainScene' })
  }

  create() {
    /**
     * NOTE
     * to emit an event to react you can use 'REACT_EVENT'
     * always in the format { action: string, payload?: any }
     * (this is how I would do it)
     */

    // username
    this.username = this.add
      .text(this.cameras.main.width / 2 - 100, 100, 'username', {
        color: '#000000',
        fontSize: 26
      })
      .setOrigin(0.5)

    // password
    this.password = this.add
      .text(this.cameras.main.width / 2 + 100, 100, 'password', {
        color: '#000000',
        fontSize: 26
      })
      .setOrigin(0.5)

    // if pressed, changes the color of the <Header />
    this.add
      .text(50, this.cameras.main.height / 2, 'ChangeColor!', { color: '#000000', fontSize: 52 })
      .setOrigin(0, 0.5)
      .setInteractive()
      .on('pointerdown', () => {
        this.events.emit('REACT_EVENT', { action: 'CHANGE_COLOR' })
      })

    // if pressed, changes the size of the <Header />
    this.add
      .text(this.cameras.main.width - 50, this.cameras.main.height / 2, 'ChangeSize!', {
        color: '#000000',
        fontSize: 52
      })
      .setOrigin(1, 0.5)
      .setInteractive()
      .on('pointerdown', () => {
        this.events.emit('REACT_EVENT', { action: 'CHANGE_SIZE' })
      })

    // a random number
    let randomNumber = this.add.text(50, this.cameras.main.height - 150, `${Phaser.Math.RND.between(1, 100)}`, {
      color: '#000000',
      fontSize: 26
    })
    this.events.addListener('REACT_EVENT', event => {
      if (event.action === 'CHANGE_RANDOM_NUMBER') randomNumber.setText(event.payload)
    })

    // create the react App component
    const App = () => (
      <div style={{ textAlign: 'center' }}>
        <Button scene={this} />
        <Header scene={this} />
        <Box scene={this} />
      </div>
    )

    // creating the react dom element
    let reactDiv = document.getElementById('react')
    // @ts-ignore
    let react = this.add.dom(0, 0, reactDiv)

    // seems not to work on the dom elements :/
    this.input.setTopOnly(true)

    // scale react
    const scaleReact = () => {
      let scale = this.game.scale.displaySize.width / this.game.scale.gameSize.width

      react.setScale(scale).setOrigin(0)
      react.node.style.top = this.game.canvas.offsetTop + 'px'
      react.node.style.left = this.game.canvas.offsetLeft + 'px'
      react.node.style.height = this.cameras.main.displayHeight + 'px'
      react.node.style.width = this.cameras.main.displayWidth + 'px'
    }

    // initialize react and scale
    render(<App />, react.node)
    scaleReact()

    this.scale.on('resize', gameSize => {
      this.cameras.resize(gameSize.width, gameSize.height)

      let body = document.getElementById('body')
      if (!body) return

      // if the activeElement is not the body
      // the keyboard is probably open
      // means we do not scale
      // and set the overflow-y to auto
      if (this.game.device.input.touch && document.activeElement && document.activeElement.tagName !== 'BODY') {
        body.style.overflowY = 'auto'
        body.style.height = `${this.game.scale.displaySize.height * 2}px`
      } else {
        body.style.overflowY = 'hidden'
        body.style.height = ''
        scaleReact()
      }
    })
  }
}

import React from 'react'
import { render } from 'react-dom'
import { resize as Resize } from '../resize'

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
    if (!reactDiv) throw new Error('#react not found')
    reactDiv.addEventListener('mousedown', (event: Event) => {
      // if the click is not on the root react div, we call stopPropagation()
      let target = event.target as HTMLElement
      if (target.id !== 'react') event.stopPropagation()
    })

    // @ts-ignore
    let react = this.add.dom(0, 0, reactDiv)

    // seems not to work on the dom elements :/
    this.input.setTopOnly(true)

    // scale phaser
    const scalePhaser = () => {
      const w = window.innerWidth
      const h = window.innerHeight

      const width = this.scale.gameSize.width
      const height = this.scale.gameSize.height

      const scale = Math.min(w / width, h / height)

      const newWidth = width * scale
      const newHeight = height * scale
      // scale the width and height of the css
      this.scale.canvas.style.width = newWidth + 'px'
      this.scale.canvas.style.height = newHeight + 'px'

      // center the game with css margin
      this.scale.canvas.style.marginTop = `${(h - newHeight) / 2}px`
      this.scale.canvas.style.marginLeft = `${(w - newWidth) / 2}px`
    }

    // scale react
    const scaleReact = () => {
      let scale = 1 / this.scale.displayScale.x

      react.setScale(scale).setOrigin(0)
      react.node.style.top = this.scale.canvas.offsetTop + 'px'
      react.node.style.left = this.scale.canvas.offsetLeft + 'px'
      react.node.style.height = this.cameras.main.displayHeight + 'px'
      react.node.style.width = this.cameras.main.displayWidth + 'px'
    }

    // initialize react and scale
    render(<App />, react.node)
    scalePhaser()
    scaleReact()

    // toggle fullscreen
    let button = this.add
      .image(this.cameras.main.width - 24, 24, 'fullscreen', 0)
      .setOrigin(1, 0)
      .setInteractive()

    button.on('pointerup', () => {
      if (this.scale.isFullscreen) {
        button.setFrame(0)
        this.scale.stopFullscreen()
      } else {
        button.setFrame(1)
        this.scale.startFullscreen()
      }
    })

    this.scale.on('resize', gameSize => {
      this.cameras.resize(gameSize.width, gameSize.height)

      let body = document.getElementById('body')
      let html = document.getElementById('html')
      if (!body || !html) return

      // if the activeElement is not the body
      // the keyboard is probably open
      // means we do not scale (fixe the height)
      // and set the overflow-y to scroll
      if (this.game.device.input.touch && document.activeElement && document.activeElement.tagName !== 'BODY') {
        body.style.overflowY = 'scroll'
        body.style.height = `100%`
        html.style.overflowY = 'scroll'
        html.style.height = `100%`
      } else {
        body.style.overflowY = 'hidden'
        body.style.height = ''
        html.style.overflowY = 'hidden'
        html.style.height = ''
        scalePhaser()
        scaleReact()
      }
    })
    Resize(this.game)
  }
}

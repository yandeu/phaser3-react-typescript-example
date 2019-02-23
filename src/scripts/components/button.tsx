import React from 'react'
import MainScene from '../scenes/mainScene'
import { Scene } from 'phaser'

interface ButtonProps {
  scene: MainScene
}
/**
 * This functional component emits an event to the Phaser MainScene
 */
const Button: React.SFC<ButtonProps> = ({ scene }) => (
  <button
    style={{ position: 'absolute', left: 50, bottom: 50, fontSize: 26 }}
    onClick={() => {
      scene.events.emit('REACT_EVENT', { action: 'CHANGE_RANDOM_NUMBER', payload: Phaser.Math.RND.between(1, 100) })
    }}
  >
    Change the number from React
  </button>
)

export default Button

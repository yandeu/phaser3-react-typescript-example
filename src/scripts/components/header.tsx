import React from 'react'
import MainScene from '../scenes/mainScene'

interface HeaderProps {
  scene: MainScene
}
class Header extends React.Component<HeaderProps> {
  state = {
    color: '#000000',
    fontSize: '2em'
  }

  componentDidMount() {
    this.props.scene.events.addListener('REACT_EVENT', (event: PhaserEvent) => {
      if (event.action === 'CHANGE_COLOR') this.setState({ color: this.getRandomColor() })
      if (event.action === 'CHANGE_SIZE') this.setState({ fontSize: this.getRandomFontSize() })
    })
  }

  getRandomFontSize() {
    return `${Phaser.Math.RND.between(10, 30) / 10}em`
  }

  getRandomColor() {
    var letters = '0123456789ABCDEF'
    var color = '#'
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)]
    }
    return color
  }

  render() {
    return <h1 style={{ fontSize: this.state.fontSize, color: this.state.color }}>Phaser 3 + React</h1>
  }
}

export default Header

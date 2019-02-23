import React from 'react'
import MainScene from '../scenes/mainScene'

interface BoxProps {
  scene: MainScene
}

class Box extends React.Component<BoxProps> {
  state = {
    username: '',
    password: '',
    hidden: true
  }

  componentDidMount() {
    const { scene } = this.props
    scene.add
      .text(scene.cameras.main.width / 2, scene.cameras.main.height / 2, 'OpenBox!', { color: '#000000', fontSize: 52 })
      .setOrigin(0.5)
      .setInteractive()
      .on('pointerdown', () => {
        this.setState({ hidden: false })
      })
  }

  submit(event) {
    event.preventDefault()

    const { scene } = this.props

    scene.username.setText(this.state.username)
    scene.password.setText(this.state.password)

    this.setState({ hidden: true })
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value })
  }

  render() {
    const inputStyle = {
      fontSize: 26
    }

    return !this.state.hidden ? (
      <div
        style={{
          width: 440,
          borderRadius: 8,
          backgroundColor: '#dfd4d4',
          border: '2px #aeacac solid',
          margin: '0 auto',
          position: 'absolute',
          top: 200,
          left: 'calc(50% - 220px)',
          padding: 25
        }}
      >
        <h2>Enter your username and password</h2>
        <form
          onSubmit={this.submit.bind(this)}
          style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-around', minHeight: 140 }}
        >
          <input
            style={inputStyle}
            placeholder="username"
            type="text"
            name="username"
            value={this.state.username}
            onChange={this.handleChange.bind(this)}
          />
          <input
            style={inputStyle}
            placeholder="password"
            type="password"
            name="password"
            value={this.state.password}
            onChange={this.handleChange.bind(this)}
          />
          <input style={inputStyle} type="submit" value="Submit" />
        </form>
      </div>
    ) : null
  }
}

export default Box

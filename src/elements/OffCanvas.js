import React, { Component } from 'react'
import styled from 'styled-components'

const Canvas = styled.div`
  background: rgba(100%, 100%, 100%, 0.9);
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  transform: ${props =>
    props.active ? 'translate(0%, 0px)' : 'translate(0%, 20%) scale(.8)'};
  opacity: ${props => (props.active ? 1 : 0)};
  transition: transform 200ms;
  backface-visibility: ${props => (props.active ? 'visible' : 'hidden')};
  z-index: ${props => (props.active ? 150 : -1000)};
`
const CanvasInner = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  flex-direction: column;
`

export default class OffCanvas extends Component {
  constructor(props) {
    super(props)
    this.elRef = React.createRef()
  }
  componentDidUpdate(prevProps) {
    if (document && this.props.visible !== prevProps.visible) {
      document.body.style.overflow = this.props.visible ? 'hidden' : ''
      if (this.props.visible) {
        const node = this.elRef.current
        node.focus()
      }
    }
  }
  render() {
    const { visible, children, ...rest } = this.props
    return (
      <Canvas active={visible} {...rest} ref={this.elRef}>
        <CanvasInner>{children}</CanvasInner>
      </Canvas>
    )
  }
}

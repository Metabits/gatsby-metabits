import React from 'react'
import Element from './Element'

const Title = props => {
  switch (props.level) {
    case 1:
      return <Element as="h1" mb={1} size={4} bold {...props} />
    case 2:
      return <Element as="h2" mb={1} size={3} {...props} />
    case 3:
      return <Element as="h3" mb={1} size={2} bold {...props} />
    case 4:
      return <Element as="h4" bold {...props} />
    default:
      return <Element as="h2" mb={1} bold {...props} />
  }
}

export default Title

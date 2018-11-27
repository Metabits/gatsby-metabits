import React from 'react'
import { Link as GatsbyLink } from 'gatsby'

const Link = ({ children, ...rest }) => {
  return (
    <GatsbyLink {...rest}>
      {children}
    </GatsbyLink>
  )
}

export default Link

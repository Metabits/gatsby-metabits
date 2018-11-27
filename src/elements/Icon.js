import React from 'react'
import PropTypes from 'prop-types'
import styled, { css } from 'styled-components'

import Element from './Element'

import pencil from '@fortawesome/fontawesome-free-solid/faPencilAlt'
import mobile from '@fortawesome/fontawesome-free-solid/faMobileAlt'
import rocket from '@fortawesome/fontawesome-free-solid/faRocket'
import globe from '@fortawesome/fontawesome-free-solid/faGlobe'
import cog from '@fortawesome/fontawesome-free-solid/faCog'
import home from '@fortawesome/fontawesome-free-solid/faHome'
import bars from '@fortawesome/fontawesome-free-solid/faBars'
import close from '@fortawesome/fontawesome-free-solid/faTimes'
import left from '@fortawesome/fontawesome-free-solid/faChevronLeft'
import wordpress from '@fortawesome/fontawesome-free-brands/faWordpress'

const icons = {
  pencil,
  wordpress,
  mobile,
  rocket,
  globe,
  cog,
  home,
  bars,
  close,
  left,
}

const IconBase = styled.svg`
  height: 1em;
  width: 1em;
  margin: 0 !important;
`

const Container = styled(Element)`
  display: inline-flex;
  align-self: center;
  position: relative;
  height: 1em;
  width: 1em;
  vertical-align: baseline;
  ${props =>
    props.baseline
      ? css`
          ${IconBase} {
            bottom: -0.125em;
            position: absolute;
          }
        `
      : ''} ${props =>
    props.size
      ? css`
          ${IconBase} {
            height: ${props.size}em;
            width: ${props.size}em;
          }
        `
      : ''};
`

const Icon = ({ icon, ...rest }) => {
  if (!icons[icon]) {
    return null
  }
  const rawIcon = icons[icon]
  return (
    <Container as="i" {...rest}>
      <IconBase
        aria-hidden="true"
        role="img"
        xmlns="http://www.w3.org/2000/svg"
        viewBox={`0 0 ${rawIcon.icon[0]} ${rawIcon.icon[1]}`}
      >
        <path fill="currentColor" d={rawIcon.icon[4]} />
      </IconBase>
    </Container>
  )
}

Icon.propTypes = {
  icon: PropTypes.oneOf(Object.keys(icons)).isRequired,
  baseline: PropTypes.bool,
  size: PropTypes.number,
}

export default Icon

const RoundedContainer = styled(Element)`
  height: 2em;
  width: 2em;
  display: inline-flex;
  font-size: ${props => `${props.size || 2}rem`};
  border-radius: 50%;
  align-items: center;
  justify-content: center;
`

export const RoundedIcon = ({ icon, ...rest }) => {
  return (
    <RoundedContainer as="i" {...rest}>
      <Icon icon={icon} />
    </RoundedContainer>
  )
}

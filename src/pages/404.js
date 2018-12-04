import React from 'react'
import styled from 'styled-components'

import LayoutContainer from '../containers/LayoutContainer'
import Link from '../elements/Link'
import Title from '../elements/Title'
import Element from '../elements/Element'

const StyledLink = styled(Link)`
  color: ${props => props.theme.colors.primary};
  font-weigth: bold;
`

const NotFoundPage = () => (
  <LayoutContainer title="Side ikke funnet">
    <Title level="1">Siden ble ikke funnet (404 feil)</Title>
    <Element as="p" mb={1}>
      Siden du forsøkte å nå ble ikke funnet.{' '}
      <StyledLink to="/">Gå tilbake til forsiden</StyledLink>
    </Element>
  </LayoutContainer>
)

export default NotFoundPage
